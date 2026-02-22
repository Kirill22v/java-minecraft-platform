/**
 * Firebase Configuration Module
 * 
 * Модуль для инициализации Firebase SDK и экспорта сервисов.
 * Использует Firebase v9+ Modular SDK (tree-shakable).
 * 
 * @see https://firebase.google.com/docs/web/setup
 * @see https://firebase.google.com/docs/firestore
 */

// Импортируем необходимые функции из Firebase SDK v9+
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    updatePassword
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    increment,
    arrayUnion,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

// ============================================
// КОНФИГУРАЦИЯ FIREBASE
// Замените на ваши данные из Firebase Console
// ============================================
const firebaseConfig = {
  apiKey: "AIzaSyCjAD17wZ-KfaZ-PHrLJpeC-bn9nuZ4tok",
  authDomain: "java-minecraft-platform.firebaseapp.com",
  projectId: "java-minecraft-platform",
  storageBucket: "java-minecraft-platform.firebasestorage.app",
  messagingSenderId: "1008830536819",
  appId: "1:1008830536819:web:4e9ef29dcc745907641e06",
  measurementId: "G-BYDTJQKB3V"
};

// ============================================
// Инициализация Firebase
// ============================================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ============================================
// Экспорт сервисов
// ============================================
export { auth, db, updateProfile };

// ============================================
// Функции аутентификации
// ============================================

/**
 * Регистрация нового пользователя
 * @param {string} email - Email пользователя
 * @param {string} password - Пароль
 * @param {string} username - Имя пользователя
 * @returns {Promise<Object>} Данные пользователя
 */
export async function signUp(email, password, username) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Обновляем профиль с именем пользователя
        await updateProfile(userCredential.user, {
            displayName: username
        });
        
        // Создаем документ пользователя в Firestore с начальными данными
        await initializeUserDocument(userCredential.user.uid, username, email);
        
        return {
            success: true,
            user: userCredential.user
        };
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        return {
            success: false,
            error: getAuthErrorMessage(error.code)
        };
    }
}

/**
 * Вход пользователя
 * @param {string} email - Email
 * @param {string} password - Пароль
 * @returns {Promise<Object>}
 */
export async function signIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return {
            success: true,
            user: userCredential.user
        };
    } catch (error) {
        console.error('Ошибка входа:', error);
        return {
            success: false,
            error: getAuthErrorMessage(error.code)
        };
    }
}

/**
 * Выход из аккаунта
 * @returns {Promise<void>}
 */
export async function logOut() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error('Ошибка выхода:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Подписка на изменения состояния аутентификации
 * @param {Function} callback - Функция обратного вызова
 * @returns {Function} Функция отписки
 */
export function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}

/**
 * Получение текущего пользователя
 * @returns {import('firebase/auth').User | null}
 */
export function getCurrentUser() {
    return auth.currentUser;
}

// ============================================
// Функции Firestore для работы с пользователем
// ============================================

/**
 * Инициализация документа пользователя в Firestore
 * @param {string} uid - ID пользователя
 * @param {string} username - Имя пользователя
 * @param {string} email - Email
 */
async function initializeUserDocument(uid, username, email) {
    const userRef = doc(db, 'users', uid);
    
    const initialData = {
        username,
        email,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        
        // Прогресс
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        totalXpEarned: 0,
        
        // Навыки (прогресс в процентах)
        skills: {
            events: 0,
            commands: 0,
            storage: 0,
            gui: 0
        },
        
        // Завершённые уроки
        completedLessons: [],
        
        // Текущий урок
        currentLessonId: null,
        
        // Бейджи
        badges: [],
        
        // Настройки
        settings: {
            theme: 'dark',
            editorFont: 'JetBrains Mono',
            editorFontSize: 14,
            autoSave: true,
            soundEffects: true
        },
        
        // Статистика
        stats: {
            lessonsCompleted: 0,
            tasksSolved: 0,
            tasksFailed: 0,
            timeSpentMinutes: 0,
            streakDays: 0,
            lastActiveDate: null
        }
    };
    
    await setDoc(userRef, initialData);
}

/**
 * Получение данных пользователя из Firestore
 * @param {string} uid - ID пользователя
 * @returns {Promise<Object|null>}
 */
export async function getUserData(uid) {
    try {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
            return userSnap.data();
        }
        return null;
    } catch (error) {
        console.error('Ошибка получения данных пользователя:', error);
        return null;
    }
}

/**
 * Обновление данных пользователя
 * @param {string} uid - ID пользователя
 * @param {Object} data - Данные для обновления
 */
export async function updateUserData(uid, data) {
    try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
            ...data,
            lastLoginAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error('Ошибка обновления данных:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// Функции для сохранения прогресса
// ============================================

/**
 * Сохранение прогресса урока
 * @param {string} uid - ID пользователя
 * @param {number} lessonId - ID урока
 * @param {Object} progressData - Данные прогресса
 */
export async function saveLessonProgress(uid, lessonId, progressData) {
    try {
        const userRef = doc(db, 'users', uid);
        
        const updateData = {
            currentLessonId: lessonId,
            lastActiveDate: new Date().toISOString().split('T')[0],
            [`lessons.${lessonId}`]: {
                ...progressData,
                lastAttempt: serverTimestamp()
            }
        };
        
        await updateDoc(userRef, updateData);
        return { success: true };
    } catch (error) {
        console.error('Ошибка сохранения прогресса урока:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Завершение урока с начислением XP
 * @param {string} uid - ID пользователя
 * @param {number} lessonId - ID урока
 * @param {number} xpEarned - Полученный опыт
 * @param {string} skillType - Тип навыка (events, commands, storage, gui)
 */
export async function completeLesson(uid, lessonId, xpEarned, skillType) {
    try {
        const userRef = doc(db, 'users', uid);
        
        // Получаем текущие данные
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        
        // Рассчитываем новый уровень и XP
        let newXp = userData.xp + xpEarned;
        let newLevel = userData.level;
        let xpToNext = userData.xpToNextLevel;
        
        // Проверка на повышение уровня
        while (newXp >= xpToNext) {
            newXp -= xpToNext;
            newLevel++;
            xpToNext = Math.floor(xpToNext * 1.5); // Каждый следующий уровень сложнее
        }
        
        // Обновляем навык
        const newSkillValue = Math.min(100, userData.skills[skillType] + 20);
        
        const updateData = {
            level: newLevel,
            xp: newXp,
            xpToNextLevel: xpToNext,
            totalXpEarned: increment(xpEarned),
            completedLessons: arrayUnion(lessonId),
            [`skills.${skillType}`]: newSkillValue,
            'stats.lessonsCompleted': increment(1),
            'stats.tasksSolved': increment(1),
            lastActiveDate: new Date().toISOString().split('T')[0]
        };
        
        await updateDoc(userRef, updateData);
        
        return {
            success: true,
            leveledUp: newLevel > userData.level,
            newLevel,
            newXp
        };
    } catch (error) {
        console.error('Ошибка завершения урока:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Добавление бейджа пользователю
 * @param {string} uid - ID пользователя
 * @param {string} badgeId - ID бейджа
 */
export async function awardBadge(uid, badgeId) {
    try {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        
        // Проверяем, нет ли уже такого бейджа
        if (userData.badges.includes(badgeId)) {
            return { success: true, alreadyOwned: true };
        }
        
        await updateDoc(userRef, {
            badges: arrayUnion(badgeId)
        });
        
        return { success: true, alreadyOwned: false };
    } catch (error) {
        console.error('Ошибка получения бейджа:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Сохранение настроек пользователя
 * @param {string} uid - ID пользователя
 * @param {Object} settings - Настройки
 */
export async function saveSettings(uid, settings) {
    try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
            settings
        });
        return { success: true };
    } catch (error) {
        console.error('Ошибка сохранения настроек:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Сохранение прогресса в LocalStorage (для кэширования)
 * @param {string} key - Ключ
 * @param {Object} data - Данные
 */
export function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(`javamc_${key}`, JSON.stringify(data));
    } catch (error) {
        console.error('Ошибка сохранения в LocalStorage:', error);
    }
}

/**
 * Получение данных из LocalStorage
 * @param {string} key - Ключ
 * @returns {Object|null}
 */
export function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(`javamc_${key}`);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Ошибка получения из LocalStorage:', error);
        return null;
    }
}

/**
 * Очистка кэша LocalStorage
 * @param {string} key - Ключ (опционально)
 */
export function clearLocalStorage(key) {
    if (key) {
        localStorage.removeItem(`javamc_${key}`);
    } else {
        const keys = Object.keys(localStorage).filter(k => k.startsWith('javamc_'));
        keys.forEach(k => localStorage.removeItem(k));
    }
}

// ============================================
// Утилиты
// ============================================

/**
 * Преобразование кода ошибки Firebase в понятное сообщение
 * @param {string} code - Код ошибки
 * @returns {string}
 */
function getAuthErrorMessage(code) {
    const messages = {
        'auth/email-already-in-use': 'Этот email уже зарегистрирован',
        'auth/invalid-email': 'Некорректный email',
        'auth/operation-not-allowed': 'Регистрация отключена',
        'auth/weak-password': 'Пароль слишком слабый (минимум 6 символов)',
        'auth/user-disabled': 'Аккаунт заблокирован',
        'auth/user-not-found': 'Пользователь не найден',
        'auth/wrong-password': 'Неверный пароль',
        'auth/too-many-requests': 'Слишком много попыток. Попробуйте позже',
        'auth/network-request-failed': 'Ошибка сети. Проверьте подключение'
    };
    
    return messages[code] || 'Произошла ошибка. Попробуйте ещё раз.';
}

/**
 * Форматирование числа с разделителями
 * @param {number} num - Число
 * @returns {string}
 */
export function formatNumber(num) {
    return new Intl.NumberFormat('ru-RU').format(num);
}

/**
 * Проверка, является ли пользователь авторизованным
 * @returns {boolean}
 */
export function isAuthenticated() {
    return auth.currentUser !== null;
}

// Логирование инициализации
console.log('[Firebase] Модуль инициализирован');
console.log('[Firebase] Auth:', auth ? 'OK' : 'ERROR');
console.log('[Firebase] Firestore:', db ? 'OK' : 'ERROR');
