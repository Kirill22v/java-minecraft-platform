/**
 * Java Minecraft Platform — Main Application
 * 
 * Основное приложение с логикой:
 * - Инициализация Monaco Editor
 * - Управление уроками и песочницей
 * - Проверка кода и симуляция компиляции
 * - Интеграция с Firebase для сохранения прогресса
 * - Геймификация (XP, уровни, бейджи)
 */

import {
    auth, db,
    signIn, signUp, logOut, onAuthChange, getCurrentUser, updateProfile,
    getUserData, updateUserData, completeLesson, awardBadge, saveSettings,
    saveToLocalStorage, getFromLocalStorage
} from './firebase-config.js';

import { LessonsData } from './lessons-data.js';

// ============================================
// Глобальное состояние приложения
// ============================================
const AppState = {
    user: null,
    userData: null,
    currentLesson: null,
    editor: null,
    settings: {
        theme: 'dark',
        editorFont: 'JetBrains Mono',
        editorFontSize: 14,
        autoSave: true,
        soundEffects: true
    }
};

// ============================================
// Инициализация приложения
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('[App] Инициализация приложения...');

    // Подсчитываем реальное количество уроков и задач
    updateHeroStats();

    // Загрузка настроек из LocalStorage
    loadSettings();

    // Инициализация UI
    initNavigation();
    initAuth();
    initSettingsModal();
    initProfileModal();
    initLessonCards();

    // Подписка на изменения аутентификации
    onAuthChange((user) => {
        AppState.user = user;
        handleAuthChange(user);
    });

    console.log('[App] Инициализация завершена');
});

function updateHeroStats() {
    // Подсчитываем количество уроков
    const lessonsCount = Object.keys(LessonsData).length;
    const lessonsEl = document.getElementById('hero-lessons-count');
    if (lessonsEl) {
        lessonsEl.textContent = lessonsCount;
    }

    // Подсчитываем количество задач (уроки с task)
    let tasksCount = 0;
    Object.values(LessonsData).forEach(lesson => {
        if (lesson.task && lesson.task.trim().length > 0) {
            tasksCount++;
        }
    });
    const tasksEl = document.getElementById('hero-tasks-count');
    if (tasksEl) {
        tasksEl.textContent = tasksCount;
    }

    // Количество достижений (фиксировано)
    const achievementsEl = document.getElementById('hero-achievements-count');
    if (achievementsEl) {
        achievementsEl.textContent = '25';
    }
}

// ============================================
// Аутентификация
// ============================================
function initAuth() {
    const loginBtn = document.getElementById('btn-login');
    const signupBtn = document.getElementById('btn-signup');
    const logoutBtn = document.getElementById('btn-logout');
    const authModal = document.getElementById('auth-modal');
    const authForm = document.getElementById('auth-form');
    const signupForm = document.getElementById('signup-form');
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');
    const authClose = document.getElementById('auth-close');

    loginBtn?.addEventListener('click', () => {
        authModal.showModal();
        signupForm.hidden = true;
        authForm.hidden = false;
        document.getElementById('auth-title').textContent = 'Вход в аккаунт';
    });

    signupBtn?.addEventListener('click', () => {
        authModal.showModal();
        authForm.hidden = true;
        signupForm.hidden = false;
        document.getElementById('auth-title').textContent = 'Регистрация';
    });

    logoutBtn?.addEventListener('click', async () => {
        await logOut();
        updateAuthUI(null);
    });

    authClose?.addEventListener('click', () => {
        authModal.close();
    });

    showSignupLink?.addEventListener('click', (e) => {
        e.preventDefault();
        authForm.hidden = true;
        signupForm.hidden = false;
        document.getElementById('auth-title').textContent = 'Регистрация';
    });

    showLoginLink?.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.hidden = true;
        authForm.hidden = false;
        document.getElementById('auth-title').textContent = 'Вход в аккаунт';
    });

    authForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('auth-email').value;
        const password = document.getElementById('auth-password').value;

        const result = await signIn(email, password);
        if (result.success) {
            authModal.close();
            authForm.reset();
        } else {
            showNotification(result.error, 'error');
        }
    });

    signupForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        const result = await signUp(email, password, username);
        if (result.success) {
            authModal.close();
            signupForm.reset();
        } else {
            showNotification(result.error, 'error');
        }
    });
}

function handleAuthChange(user) {
    AppState.user = user;

    if (user) {
        loadUserData(user.uid);
    } else {
        AppState.userData = null;
        resetDashboard();
    }

    setTimeout(() => updateAuthUI(user), 100);
}

function updateAuthUI(user) {
    const authButtons = document.getElementById('auth-buttons');
    const userProfile = document.getElementById('user-profile');
    const userName = document.getElementById('user-name');

    if (!authButtons || !userProfile) return;

    if (user) {
        authButtons.style.display = 'none';
        userProfile.style.display = 'flex';
        userProfile.hidden = false;
        if (userName) {
            userName.textContent = user.displayName || user.email.split('@')[0];
        }
    } else {
        authButtons.style.display = 'flex';
        userProfile.style.display = 'none';
        userProfile.hidden = true;
    }
}

async function loadUserData(uid) {
    const cachedData = getFromLocalStorage(`user_${uid}`);

    if (cachedData) {
        AppState.userData = cachedData;
        updateDashboard(cachedData);
    }

    const userData = await getUserData(uid);
    if (userData) {
        AppState.userData = userData;
        AppState.settings = { ...AppState.settings, ...userData.settings };
        updateDashboard(userData);
        saveToLocalStorage(`user_${uid}`, userData);
    }
}

// ============================================
// Dashboard и прогресс
// ============================================
function updateDashboard(userData) {
    document.getElementById('user-level').textContent = userData.level;
    document.getElementById('xp-fill').style.width = `${(userData.xp / userData.xpToNextLevel) * 100}%`;
    document.getElementById('xp-text').textContent = `${userData.xp} / ${userData.xpToNextLevel} XP`;

    // Обновляем прогресс модулей
    updateModuleProgress(userData.completedLessons);
    
    updateAchievements(userData.badges);
    updateLessonCards(userData.completedLessons);
}

function updateModuleProgress(completedLessons) {
    // Модули: 1-6, 7-12, 13-18, 19-24, 25-30, 31-36...
    const moduleRanges = [
        { id: 'basics', start: 1, end: 6 },
        { id: 'advanced', start: 7, end: 12 },
        { id: 'bukkit', start: 13, end: 18 },
        { id: 'commands', start: 19, end: 24 },
        { id: 'storage', start: 25, end: 30 },
        { id: 'gui', start: 31, end: 36 }
    ];
    
    moduleRanges.forEach(module => {
        const total = module.end - module.start + 1;
        const completed = completedLessons.filter(id => id >= module.start && id <= module.end).length;
        const percent = Math.round((completed / total) * 100);
        
        const fill = document.getElementById(`module-${module.id}`);
        const valueText = document.getElementById(`module-${module.id}-value`);
        
        if (fill && valueText) {
            fill.style.width = `${percent}%`;
            valueText.textContent = `${percent}%`;
        }
    });
}

function resetDashboard() {
    document.getElementById('user-level').textContent = '1';
    document.getElementById('xp-fill').style.width = '0%';
    document.getElementById('xp-text').textContent = '0 / 100 XP';

    // Сброс прогресса модулей
    ['basics', 'advanced', 'bukkit', 'commands', 'storage', 'gui'].forEach(moduleId => {
        const fill = document.getElementById(`module-${moduleId}`);
        const valueText = document.getElementById(`module-${moduleId}-value`);
        if (fill && valueText) {
            fill.style.width = '0%';
            valueText.textContent = '0%';
        }
    });
}

function updateAchievements(userAchievements = []) {
    const achievementCards = document.querySelectorAll('.achievement-card');

    achievementCards.forEach(card => {
        const achievementId = card.dataset.achievement;
        const icon = card.querySelector('.achievement-card__icon');

        if (userAchievements.includes(achievementId)) {
            card.dataset.unlocked = 'true';
            icon?.classList.remove('achievement-card__icon--locked');
        } else {
            card.dataset.unlocked = 'false';
            icon?.classList.add('achievement-card__icon--locked');
        }
    });
}

function updateLessonCards(completedLessons = []) {
    const lessonCards = document.querySelectorAll('.lesson-card');

    lessonCards.forEach(card => {
        const lessonId = parseInt(card.dataset.lessonId);

        // Отмечаем завершённые уроки
        if (completedLessons.includes(lessonId)) {
            card.dataset.completed = 'true';
        }

        // Разблокируем следующий урок если предыдущий пройден
        if (completedLessons.includes(lessonId - 1)) {
            card.removeAttribute('data-locked');
            const btn = card.querySelector('.lesson-card__btn');
            if (btn) {
                btn.disabled = false;
                btn.textContent = 'Начать урок';
                btn.classList.remove('btn--secondary');
                btn.classList.add('btn--primary');
            }
            // Убираем замок
            const lock = card.querySelector('.lesson-card__lock');
            if (lock) {
                lock.remove();
            }
        }
    });
    
    // Показываем сообщение если есть ещё уроки
    const maxUnlocked = completedLessons.length + 1;
    if (maxUnlocked < 60) {
        const moreSection = document.getElementById('lessons-more');
        if (moreSection) {
            moreSection.hidden = false;
        }
    }
}

// ============================================
// Навигация
// ============================================
function initNavigation() {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    navToggle?.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu?.classList.toggle('active');
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');

            if (href === '#profile') {
                e.preventDefault();
                if (AppState.user && AppState.userData) {
                    openProfileModal();
                } else {
                    showNotification('Войдите в аккаунт, чтобы просмотреть профиль', 'info');
                }
                navMenu?.classList.remove('active');
                navToggle?.setAttribute('aria-expanded', 'false');
                return;
            }

            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                target?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// Уроки и редактор кода
// ============================================
function initLessonCards() {
    const lessonButtons = document.querySelectorAll('.lesson-card__btn');

    lessonButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lessonId = parseInt(btn.dataset.lesson);
            openLesson(lessonId);
        });
    });

    const backBtn = document.getElementById('back-to-lessons');
    backBtn?.addEventListener('click', () => {
        closeLesson();
    });
}

function openLesson(lessonId) {
    const lesson = LessonsData[lessonId];
    if (!lesson) {
        console.error('Урок не найден:', lessonId);
        showNotification('Урок не найден', 'error');
        return;
    }

    AppState.currentLesson = lesson;

    document.getElementById('lessons').hidden = true;
    document.getElementById('sandbox').hidden = false;

    document.getElementById('lesson-theory-title').textContent = lesson.title;
    
    // Добавляем теорию и задание (если есть)
    const taskContent = lesson.task ? `<div class="task-section">${lesson.task}</div>` : '';
    document.getElementById('lesson-theory').innerHTML = lesson.theory + taskContent;

    initMonacoEditor(lesson.starterCode || '// Напишите ваш код здесь');

    document.getElementById('sandbox').scrollIntoView({ behavior: 'smooth' });
}

function closeLesson() {
    document.getElementById('sandbox').hidden = true;
    document.getElementById('lessons').hidden = false;
    AppState.currentLesson = null;

    if (AppState.editor) {
        AppState.editor.dispose();
        AppState.editor = null;
    }

    const consoleOutput = document.getElementById('console-output');
    if (consoleOutput) {
        consoleOutput.innerHTML = `
            <div class="console-placeholder">
                <span>Нажмите "Проверить код" для запуска компиляции...</span>
            </div>
        `;
    }
}

// ============================================
// Monaco Editor
// ============================================
function initMonacoEditor(initialCode) {
    const requireConfig = {
        paths: {
            vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs'
        }
    };

    const loaderScript = document.createElement('script');
    loaderScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs/loader.min.js';
    loaderScript.onload = () => {
        window.require.config(requireConfig);
        window.require(['vs/editor/editor.main'], () => {
            createEditor(initialCode);
        });
    };

    document.head.appendChild(loaderScript);
}

function createEditor(initialCode) {
    const editorContainer = document.getElementById('monaco-editor');

    if (!editorContainer) return;

    editorContainer.innerHTML = '';

    AppState.editor = window.monaco.editor.create(editorContainer, {
        value: initialCode,
        language: 'java',
        theme: 'vs-dark',
        fontSize: AppState.settings.editorFontSize,
        fontFamily: AppState.settings.editorFont,
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 4,
        insertSpaces: true,
        wordWrap: 'on',
        lineNumbers: 'on',
        renderWhitespace: 'selection',
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
        folding: true,
        bracketPairColorization: { enabled: true }
    });

    AppState.editor.onDidChangeModelContent(() => {
        if (AppState.settings.autoSave && AppState.currentLesson) {
            const code = AppState.editor.getValue();
            saveToLocalStorage(`draft_${AppState.currentLesson.id}`, {
                code,
                timestamp: Date.now()
            });
        }
    });

    const draft = getFromLocalStorage(`draft_${AppState.currentLesson?.id}`);
    if (draft?.code) {
        AppState.editor.setValue(draft.code);
    }
}

// ============================================
// Проверка кода
// ============================================
function initCheckButton() {
    const checkBtn = document.getElementById('btn-check');
    const resetBtn = document.getElementById('btn-reset');
    const formatBtn = document.getElementById('btn-format');
    const clearConsoleBtn = document.getElementById('btn-clear-console');

    checkBtn?.addEventListener('click', checkCode);
    resetBtn?.addEventListener('click', resetCode);
    formatBtn?.addEventListener('click', formatCode);
    clearConsoleBtn?.addEventListener('click', clearConsole);
}

function initEditorActions() {
    initCheckButton();
}

async function checkCode() {
    if (!AppState.editor || !AppState.currentLesson) {
        showNotification('Редактор не инициализирован', 'error');
        return;
    }

    const code = AppState.editor.getValue();
    const lesson = AppState.currentLesson;
    const consoleOutput = document.getElementById('console-output');

    consoleOutput.innerHTML = '';

    addConsoleLog('🔨 Компиляция плагина...', 'info');
    await delay(800);

    addConsoleLog('📦 Java Version: 21 LTS', 'info');
    addConsoleLog('📦 PaperMC API: 1.21+', 'info');
    await delay(500);

    const validationResult = validateCode(code, lesson.validation);

    if (!validationResult.valid) {
        addConsoleLog('❌ Ошибка компиляции!', 'error');
        validationResult.errors.forEach(error => {
            addConsoleLog(`   └─ ${error}`, 'error');
        });
        addConsoleLog('\n💡 Подсказка: Проверьте теорию выше и попробуйте ещё раз.', 'warning');

        if (AppState.userData) {
            AppState.userData.stats.tasksFailed = (AppState.userData.stats.tasksFailed || 0) + 1;
        }

        if (AppState.settings.soundEffects) {
            playSound('error');
        }

        return;
    }

    addConsoleLog('✅ Компиляция успешна!', 'success');
    await delay(300);

    addConsoleLog('🔌 Загрузка плагина...', 'info');
    await delay(500);

    addConsoleLog(`✓ ${lesson.title} — выполнено!`, 'success');
    addConsoleLog(`✓ Получено ${lesson.xp} XP`, 'success');

    if (AppState.user) {
        const result = await completeLesson(
            AppState.user.uid,
            lesson.id,
            lesson.xp,
            lesson.skill
        );

        if (result.success) {
            if (result.leveledUp) {
                addConsoleLog(`🎉 НОВЫЙ УРОВЕНЬ: ${result.newLevel}!`, 'success');
                showNotification(`Поздравляем! Вы достигли уровня ${result.newLevel}!`, 'success');
                if (AppState.settings.soundEffects) {
                    playSound('levelup');
                }
            }

            await checkAndAwardAchievements(lesson, AppState.userData.completedLessons, AppState.userData);

            if (AppState.userData) {
                AppState.userData = await getUserData(AppState.user.uid);
                updateDashboard(AppState.userData);
            }
        }
    } else {
        addConsoleLog('\n⚠️ Войдите в аккаунт, чтобы сохранить прогресс!', 'warning');
    }

    if (AppState.settings.soundEffects) {
        playSound('success');
    }
}

function validateCode(code, validation) {
    const errors = [];
    
    // Удаляем комментарии для проверки
    const codeWithoutComments = code
        .replace(/\/\/.*$/gm, '')
        .replace(/\/\*[\s\S]*?\*\//g, '');

    // Проверка обязательных классов
    validation.requiredClasses?.forEach(className => {
        const classRegex = new RegExp(`class\\s+${className}\\s+(extends|implements|{)`, 'i');
        if (!classRegex.test(codeWithoutComments)) {
            errors.push(`Не найден класс: ${className}`);
        }
    });

    // Проверка обязательных методов
    validation.requiredMethods?.forEach(method => {
        const methodRegex = new RegExp(`public\\s+(static\\s+)?\\w+\\s+${method}\\s*\\([^)]*\\)\\s*{`, 'i');
        if (!methodRegex.test(codeWithoutComments)) {
            errors.push(`Не найден метод: ${method}`);
        }
    });

    // Проверка обязательных строк (ключевые слова, импорты)
    validation.requiredStrings?.forEach(str => {
        if (!codeWithoutComments.includes(str)) {
            errors.push(`Отсутствует: ${str}`);
        }
    });

    // Проверка запрещённых конструкций
    validation.forbiddenStrings?.forEach(str => {
        if (code.includes(str)) {
            errors.push(`Недопустимо: ${str}`);
        }
    });
    
    // Дополнительная проверка: код должен быть не пустым и содержать хотя бы 3 строки
    const codeLines = codeWithoutComments.split('\n').filter(line => line.trim().length > 0);
    if (codeLines.length < 3) {
        errors.push('Код слишком короткий. Напишите больше кода!');
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

function resetCode() {
    if (!AppState.editor || !AppState.currentLesson) return;

    if (confirm('Сбросить код к начальному состоянию?')) {
        AppState.editor.setValue(AppState.currentLesson.starterCode);
        clearConsole();
    }
}

function formatCode() {
    if (!AppState.editor) return;

    const action = AppState.editor.getAction('editor.action.formatDocument');
    action?.run();
}

function clearConsole() {
    const consoleOutput = document.getElementById('console-output');
    if (consoleOutput) {
        consoleOutput.innerHTML = `
            <div class="console-placeholder">
                <span>Консоль очищена</span>
            </div>
        `;
    }
}

function addConsoleLog(message, type = 'info') {
    const consoleOutput = document.getElementById('console-output');
    if (!consoleOutput) return;

    const placeholder = consoleOutput.querySelector('.console-placeholder');
    if (placeholder) {
        placeholder.remove();
    }

    const logEntry = document.createElement('div');
    logEntry.className = `log-entry log-${type}`;
    logEntry.textContent = message;

    consoleOutput.appendChild(logEntry);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// ============================================
// Достижения
// ============================================
async function checkAndAwardAchievements(lesson, completedLessons, userData) {
    if (!AppState.user || !userData) return;

    const achievements = [];
    const currentAchievements = userData.badges || [];

    // Первый урок
    if (lesson.id === 1 && !currentAchievements.includes('first-lesson')) {
        achievements.push('first-lesson');
    }

    // Первый плагин (урок 7)
    if (lesson.id === 7 && !currentAchievements.includes('first-plugin')) {
        achievements.push('first-plugin');
    }

    // Завершение модуля Java Basics (уроки 1-6)
    const basicsCompleted = completedLessons.filter(id => id >= 1 && id <= 6).length;
    if (basicsCompleted === 6 && !currentAchievements.includes('java-novice')) {
        achievements.push('java-novice');
    }

    // Завершение модуля Advanced Java (уроки 7-12)
    const advancedCompleted = completedLessons.filter(id => id >= 7 && id <= 12).length;
    if (advancedCompleted === 6 && !currentAchievements.includes('java-advanced')) {
        achievements.push('java-advanced');
    }

    // Уровень 5
    if (userData.level >= 5 && !currentAchievements.includes('level-5')) {
        achievements.push('level-5');
    }

    // Уровень 10
    if (userData.level >= 10 && !currentAchievements.includes('level-10')) {
        achievements.push('level-10');
    }

    // 100 XP
    if (userData.totalXpEarned >= 100 && !currentAchievements.includes('xp-100')) {
        achievements.push('xp-100');
    }

    // 500 XP
    if (userData.totalXpEarned >= 500 && !currentAchievements.includes('xp-500')) {
        achievements.push('xp-500');
    }

    for (const achievementId of achievements) {
        const result = await awardBadge(AppState.user.uid, achievementId);
        if (result.success && !result.alreadyOwned) {
            addConsoleLog(`🏆 Получено достижение: ${getAchievementName(achievementId)}!`, 'success');
            showNotification(`Новое достижение: ${getAchievementName(achievementId)}!`, 'success');
            if (window.soundManager) {
                window.soundManager.playBadge();
            }
        }
    }
}

function getAchievementName(achievementId) {
    const names = {
        'first-plugin': 'Первый плагин',
        'first-lesson': 'Первый шаг',
        'hello-world': 'Hello, World!',
        'event-master': 'Мастер событий',
        'code-ninja': 'Code Ninja',
        'speedrunner': 'Спидраннер',
        'java-novice': 'Java Новичок',
        'java-advanced': 'Java Продвинутый',
        'bukkit-master': 'Bukkit Мастер',
        'commander': 'Коммандер',
        'data-keeper': 'Хранитель данных',
        'gui-designer': 'GUI Дизайнер',
        'level-5': 'Уровень 5',
        'level-10': 'Уровень 10',
        'level-25': 'Уровень 25',
        'level-50': 'Уровень 50',
        'xp-100': '100 XP',
        'xp-500': '500 XP',
        'xp-1000': '1000 XP',
        'streak-3': 'Серия 3',
        'streak-7': 'Серия 7',
        'streak-30': 'Серия 30',
        'perfectionist': 'Перфекционист',
        'dedication': 'Преданность',
        'legend': 'Легенда'
    };
    return names[achievementId] || achievementId;
}

// ============================================
// Профиль пользователя
// ============================================
function initProfileModal() {
    const profileBtn = document.getElementById('btn-profile');
    const profileModal = document.getElementById('profile-modal');
    const profileClose = document.getElementById('profile-close');
    const editUsernameBtn = document.getElementById('btn-edit-username');
    const cancelEditBtn = document.getElementById('btn-cancel-edit');
    const saveUsernameBtn = document.getElementById('btn-save-username');
    const editSection = document.getElementById('profile-edit-section');
    const usernameInput = document.getElementById('edit-username-input');

    profileBtn?.addEventListener('click', () => {
        if (AppState.user && AppState.userData) {
            openProfileModal();
        }
    });

    profileClose?.addEventListener('click', () => {
        profileModal.close();
        hideEditForm();
    });

    profileModal?.addEventListener('click', (e) => {
        if (e.target === profileModal) {
            profileModal.close();
            hideEditForm();
        }
    });

    editUsernameBtn?.addEventListener('click', () => {
        showEditForm();
    });

    cancelEditBtn?.addEventListener('click', () => {
        hideEditForm();
    });

    saveUsernameBtn?.addEventListener('click', async () => {
        await saveUsername();
    });

    usernameInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            saveUsername();
        }
        if (e.key === 'Escape') {
            hideEditForm();
        }
    });

    function showEditForm() {
        if (editSection) {
            editSection.style.display = 'block';
            editSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        if (usernameInput && AppState.user) {
            usernameInput.value = AppState.user.displayName || '';
            usernameInput.focus();
        }
    }

    function hideEditForm() {
        if (editSection) {
            editSection.style.display = 'none';
        }
        if (usernameInput) {
            usernameInput.value = '';
        }
    }

    async function saveUsername() {
        const newUsername = usernameInput?.value.trim();

        if (!newUsername) {
            showNotification('Введите никнейм', 'error');
            return;
        }

        if (newUsername.length < 3) {
            showNotification('Ник должен содержать минимум 3 символа', 'error');
            return;
        }

        if (newUsername.length > 20) {
            showNotification('Ник не должен превышать 20 символов', 'error');
            return;
        }

        saveUsernameBtn.disabled = true;
        saveUsernameBtn.textContent = 'Сохранение...';

        try {
            if (AppState.user) {
                await updateProfile(AppState.user, {
                    displayName: newUsername
                });

                await updateUserData(AppState.user.uid, {
                    username: newUsername
                });

                AppState.user.displayName = newUsername;
                if (AppState.userData) {
                    AppState.userData.username = newUsername;
                }

                document.getElementById('profile-username').textContent = newUsername;
                document.getElementById('user-name').textContent = newUsername;

                hideEditForm();
                showNotification('Никнейм успешно изменён', 'success');

                if (window.soundManager) {
                    window.soundManager.playSuccess();
                }
            }
        } catch (error) {
            console.error('Ошибка обновления ника:', error);
            showNotification('Не удалось изменить никнейм: ' + error.message, 'error');
        } finally {
            saveUsernameBtn.disabled = false;
            saveUsernameBtn.textContent = 'Сохранить';
        }
    }
}

function openProfileModal() {
    const userData = AppState.userData;
    const user = AppState.user;

    if (!userData || !user) return;

    document.getElementById('profile-username').textContent = user.displayName || user.email.split('@')[0];
    document.getElementById('profile-email').textContent = user.email;
    document.getElementById('profile-level').textContent = userData.level;

    const xpPercent = userData.xpToNextLevel > 0 ? (userData.xp / userData.xpToNextLevel) * 100 : 0;
    const xpRounded = Math.round(xpPercent * 10) / 10;

    document.getElementById('profile-xp-fill').style.width = `${xpPercent}%`;
    document.getElementById('profile-xp-value').textContent = `${userData.xp} / ${userData.xpToNextLevel} XP`;
    document.getElementById('profile-xp-text').textContent = `${xpRounded}%`;

    document.getElementById('stat-lessons').textContent = userData.stats?.lessonsCompleted || 0;
    document.getElementById('stat-tasks').textContent = userData.stats?.tasksSolved || 0;
    document.getElementById('stat-xp').textContent = userData.totalXpEarned || 0;
    document.getElementById('stat-achievements').textContent = userData.badges?.length || 0;

    updateProfileSkill('events', userData.skills?.events || 0);
    updateProfileSkill('commands', userData.skills?.commands || 0);
    updateProfileSkill('storage', userData.skills?.storage || 0);
    updateProfileSkill('gui', userData.skills?.gui || 0);

    updateProfileAchievements(userData.badges || []);

    if (userData.createdAt) {
        const createdDate = userData.createdAt.toDate ? userData.createdAt.toDate() : new Date(userData.createdAt);
        document.getElementById('profile-registered').textContent = formatDate(createdDate);
    } else {
        document.getElementById('profile-registered').textContent = '—';
    }

    if (userData.lastLoginAt) {
        const loginDate = userData.lastLoginAt.toDate ? userData.lastLoginAt.toDate() : new Date(userData.lastLoginAt);
        document.getElementById('profile-last-login').textContent = formatDate(loginDate);
    } else {
        document.getElementById('profile-last-login').textContent = '—';
    }

    const profileModal = document.getElementById('profile-modal');
    if (profileModal) {
        profileModal.showModal();
    }
}

function updateProfileSkill(skill, value) {
    const fill = document.getElementById(`profile-skill-${skill}`);
    const valueText = document.getElementById(`profile-skill-${skill}-value`);

    if (fill && valueText) {
        fill.style.width = `${value}%`;
        valueText.textContent = `${value}%`;
    }
}

function updateProfileAchievements(userAchievements) {
    const achievementsContainer = document.getElementById('profile-achievements-list');

    if (!achievementsContainer) return;

    if (userAchievements.length === 0) {
        achievementsContainer.innerHTML = '<p class="profile-achievements-empty">Пока нет достижений</p>';
        return;
    }

    const achievementNames = {
        'first-plugin': { name: 'Первый плагин', icon: '🏆' },
        'first-lesson': { name: 'Первый шаг', icon: '🎓' },
        'hello-world': { name: 'Hello, World!', icon: '👋' },
        'event-master': { name: 'Мастер событий', icon: '⚡' },
        'code-ninja': { name: 'Code Ninja', icon: '🥷' },
        'speedrunner': { name: 'Спидраннер', icon: '🏃' },
        'java-novice': { name: 'Java Новичок', icon: '☕' },
        'java-advanced': { name: 'Java Продвинутый', icon: '📚' },
        'bukkit-master': { name: 'Bukkit Мастер', icon: '🔌' },
        'commander': { name: 'Коммандер', icon: '⌨️' },
        'data-keeper': { name: 'Хранитель данных', icon: '💾' },
        'gui-designer': { name: 'GUI Дизайнер', icon: '🖼️' },
        'level-5': { name: 'Уровень 5', icon: '⭐' },
        'level-10': { name: 'Уровень 10', icon: '🌟' },
        'level-25': { name: 'Уровень 25', icon: '💫' },
        'level-50': { name: 'Уровень 50', icon: '✨' },
        'xp-100': { name: '100 XP', icon: '💎' },
        'xp-500': { name: '500 XP', icon: '🔮' },
        'xp-1000': { name: '1000 XP', icon: '👑' },
        'streak-3': { name: 'Серия 3', icon: '🔥' },
        'streak-7': { name: 'Серия 7', icon: '🔥🔥' },
        'streak-30': { name: 'Серия 30', icon: '🔥🔥🔥' },
        'perfectionist': { name: 'Перфекционист', icon: '💯' },
        'dedication': { name: 'Преданность', icon: '🎯' },
        'legend': { name: 'Легенда', icon: '🏅' }
    };

    achievementsContainer.innerHTML = userAchievements.map(achievementId => {
        const achievement = achievementNames[achievementId] || { name: achievementId, icon: '🏅' };
        return `
            <div class="profile-achievement-item" data-unlocked="true">
                <span class="profile-achievement-icon">${achievement.icon}</span>
                <span class="profile-achievement-name">${achievement.name}</span>
            </div>
        `;
    }).join('');
}

function formatDate(date) {
    return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// ============================================
// Настройки
// ============================================
function initSettingsModal() {
    const settingsModal = document.getElementById('settings-modal');
    const settingsOpenBtn = document.querySelector('a[href="#settings"]');
    const settingsClose = document.getElementById('settings-close');
    const settingsSave = document.getElementById('settings-save');

    settingsOpenBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        loadSettingsToForm();
        settingsModal.showModal();
    });

    settingsClose?.addEventListener('click', () => {
        settingsModal.close();
    });

    settingsModal?.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.close();
        }
    });

    const fontSizeRange = document.getElementById('editor-font-size');
    const fontSizeValue = document.getElementById('font-size-value');

    fontSizeRange?.addEventListener('input', () => {
        if (fontSizeValue) {
            fontSizeValue.textContent = `${fontSizeRange.value}px`;
        }
    });

    settingsSave?.addEventListener('click', () => {
        saveSettingsFromForm();
        settingsModal.close();
        showNotification('Настройки сохранены', 'success');
    });
}

function loadSettings() {
    const saved = getFromLocalStorage('settings');
    if (saved) {
        AppState.settings = { ...AppState.settings, ...saved };
    }
}

function loadSettingsToForm() {
    const themeSelect = document.getElementById('theme-select');
    const editorFont = document.getElementById('editor-font');
    const editorFontSize = document.getElementById('editor-font-size');
    const autoSave = document.getElementById('auto-save');
    const soundEffects = document.getElementById('sound-effects');
    const fontSizeValue = document.getElementById('font-size-value');

    if (themeSelect) themeSelect.value = AppState.settings.theme;
    if (editorFont) editorFont.value = AppState.settings.editorFont;
    if (editorFontSize) {
        editorFontSize.value = AppState.settings.editorFontSize;
        if (fontSizeValue) fontSizeValue.textContent = `${AppState.settings.editorFontSize}px`;
    }
    if (autoSave) autoSave.checked = AppState.settings.autoSave;
    if (soundEffects) soundEffects.checked = AppState.settings.soundEffects;
}

function saveSettingsFromForm() {
    const themeSelect = document.getElementById('theme-select');
    const editorFont = document.getElementById('editor-font');
    const editorFontSize = document.getElementById('editor-font-size');
    const autoSave = document.getElementById('auto-save');
    const soundEffects = document.getElementById('sound-effects');

    AppState.settings = {
        theme: themeSelect?.value || 'dark',
        editorFont: editorFont?.value || 'JetBrains Mono',
        editorFontSize: parseInt(editorFontSize?.value) || 14,
        autoSave: autoSave?.checked ?? true,
        soundEffects: soundEffects?.checked ?? true
    };

    saveToLocalStorage('settings', AppState.settings);

    if (AppState.user) {
        saveSettings(AppState.user.uid, AppState.settings);
    }

    if (AppState.editor) {
        AppState.editor.updateOptions({
            fontSize: AppState.settings.editorFontSize,
            fontFamily: AppState.settings.editorFont
        });
    }
}

// ============================================
// Утилиты
// ============================================
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showNotification(message, type = 'info') {
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
    };

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <span class="notification__icon">${icons[type] || icons.info}</span>
        <span class="notification__message">${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('hiding');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function playSound(type) {
    if (window.soundManager) {
        switch (type) {
            case 'success':
                window.soundManager.playSuccess();
                break;
            case 'error':
                window.soundManager.playError();
                break;
            case 'levelup':
                window.soundManager.playLevelUp();
                break;
            case 'badge':
                window.soundManager.playBadge();
                break;
            case 'complete':
                window.soundManager.playLessonComplete();
                break;
        }
    }
}

// Инициализация действий редактора после загрузки
window.addEventListener('load', () => {
    initEditorActions();
});

// Экспорт для отладки
window.AppState = AppState;
window.LessonsData = LessonsData;
