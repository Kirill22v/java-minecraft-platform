# Структура данных Firebase Firestore

## Коллекции и документы

### 1. `users` — Пользователи

**Путь:** `/users/{uid}`

```typescript
interface UserDocument {
  // Основная информация
  username: string;           // Имя пользователя
  email: string;              // Email
  createdAt: Timestamp;       // Дата регистрации
  lastLoginAt: Timestamp;     // Последний вход
  
  // Прогресс
  level: number;              // Текущий уровень (начинается с 1)
  xp: number;                 // Текущий опыт (0 до xpToNextLevel)
  xpToNextLevel: number;      // Опыт для следующего уровня
  totalXpEarned: number;      // Всего заработано XP
  
  // Навыки (прогресс 0-100%)
  skills: {
    events: number;           // События (PlayerEvents, Listener)
    commands: number;         // Команды (CommandExecutor, Brigadier)
    storage: number;          // Хранение (Config, MySQL, SQLite)
    gui: number;              // GUI (Inventory, Items)
  };
  
  // Завершённые уроки
  completedLessons: number[]; // [1, 2, 3, ...]
  
  // Текущий активный урок
  currentLessonId: number | null;
  
  // Детали по урокам
  lessons: {
    [lessonId: string]: {
      completed: boolean;
      attempts: number;
      bestScore: number;
      lastAttempt: Timestamp;
      codeSubmitted: string;
    };
  };
  
  // Бейджи
  badges: string[];           // ['first-plugin', 'event-master', ...]
  
  // Настройки
  settings: {
    theme: 'dark' | 'darker' | 'light';
    editorFont: string;       // 'JetBrains Mono', 'Fira Code', ...
    editorFontSize: number;   // 12-24
    autoSave: boolean;
    soundEffects: boolean;
  };
  
  // Статистика
  stats: {
    lessonsCompleted: number;
    tasksSolved: number;
    tasksFailed: number;
    timeSpentMinutes: number;
    streakDays: number;       // Дней подряд
    lastActiveDate: string;   // 'YYYY-MM-DD'
  };
}
```

**Пример документа:**
```json
{
  "username": "Steve_Builder",
  "email": "steve@example.com",
  "createdAt": "Timestamp(2026-02-20T10:30:00Z)",
  "lastLoginAt": "Timestamp(2026-02-22T15:45:00Z)",
  "level": 5,
  "xp": 45,
  "xpToNextLevel": 500,
  "totalXpEarned": 890,
  "skills": {
    "events": 80,
    "commands": 40,
    "storage": 10,
    "gui": 0
  },
  "completedLessons": [1, 2, 3, 4, 5],
  "currentLessonId": 6,
  "lessons": {
    "1": {
      "completed": true,
      "attempts": 2,
      "bestScore": 100,
      "lastAttempt": "Timestamp(2026-02-20T12:00:00Z)",
      "codeSubmitted": "public class MainPlugin..."
    }
  },
  "badges": ["first-plugin", "event-master"],
  "settings": {
    "theme": "dark",
    "editorFont": "JetBrains Mono",
    "editorFontSize": 14,
    "autoSave": true,
    "soundEffects": true
  },
  "stats": {
    "lessonsCompleted": 5,
    "tasksSolved": 23,
    "tasksFailed": 7,
    "timeSpentMinutes": 180,
    "streakDays": 3,
    "lastActiveDate": "2026-02-22"
  }
}
```

---

### 2. `lessons` — Уроки

**Путь:** `/lessons/{lessonId}`

```typescript
interface LessonDocument {
  id: number;
  title: string;
  description: string;
  category: 'events' | 'commands' | 'storage' | 'gui' | 'basics';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  
  // Контент
  theory: string;             // HTML-контент теории
  codeExample: string;        // Пример кода
  starterCode: string;        // Начальный код для редактора
  task: string;               // Описание задачи
  
  // Валидация
  validation: {
    requiredClasses: string[];
    requiredMethods: string[];
    requiredStrings: string[];
    forbiddenStrings: string[];
    expectedOutput?: string;
  };

  // Мета
  order: number;              // Порядок в списке
  prerequisites: number[];    // [1, 2] — уроки, которые нужно пройти
  estimatedMinutes: number;
  
  // Статистика
  completionsCount: number;
  averageAttempts: number;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

### 3. `badges` — Бейджи

**Путь:** `/badges/{badgeId}`

```typescript
interface BadgeDocument {
  id: string;
  name: string;
  description: string;
  icon: string;               // Emoji или URL иконки
  category: 'progress' | 'achievement' | 'special';
  
  // Условия получения
  requirements: {
    type: 'lesson_complete' | 'xp_milestone' | 'skill_level' | 'streak';
    value: number | string;
  }[];
  
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpBonus: number;            // Бонусный XP при получении
  
  createdAt: Timestamp;
}
```

**Примеры бейджей:**
```json
{
  "id": "first-plugin",
  "name": "Первый плагин",
  "description": "Создайте и запустите свой первый плагин",
  "icon": "🏆",
  "category": "progress",
  "requirements": [
    { "type": "lesson_complete", "value": 1 }
  ],
  "rarity": "common",
  "xpBonus": 10
}

{
  "id": "event-master",
  "name": "Мастер событий",
  "description": "Достигните 80% прогресса в навыке Events",
  "icon": "⚡",
  "category": "achievement",
  "requirements": [
    { "type": "skill_level", "value": { "skill": "events", "level": 80 } }
  ],
  "rarity": "rare",
  "xpBonus": 50
}

{
  "id": "code-ninja",
  "name": "Code Ninja",
  "description": "Решите 50 задач без единой ошибки",
  "icon": "🥷",
  "category": "achievement",
  "requirements": [
    { "type": "xp_milestone", "value": { "tasksSolved": 50, "tasksFailed": 0 } }
  ],
  "rarity": "epic",
  "xpBonus": 100
}

{
  "id": "speedrunner",
  "name": "Спидраннер",
  "description": "Пройдите любой урок менее чем за 5 минут",
  "icon": "🏃",
  "category": "special",
  "requirements": [
    { "type": "lesson_complete", "value": { "underMinutes": 5 } }
  ],
  "rarity": "rare",
  "xpBonus": 75
}
```

---

### 4. `leaderboard` — Таблица лидеров

**Путь:** `/leaderboard/{period}` (period: 'weekly', 'monthly', 'alltime')

```typescript
interface LeaderboardDocument {
  period: 'weekly' | 'monthly' | 'alltime';
  startDate: Timestamp;
  endDate: Timestamp | null;    // null для alltime
  
  entries: {
    rank: number;
    uid: string;
    username: string;
    xpGained: number;           // XP за период
    lessonsCompleted: number;
    badgesEarned: number;
  }[];
  
  updatedAt: Timestamp;
}
```

---

### 5. `code_submissions` — История отправок кода

**Путь:** `/code_submissions/{submissionId}`

```typescript
interface CodeSubmissionDocument {
  uid: string;
  lessonId: number;
  code: string;
  timestamp: Timestamp;
  
  // Результат
  success: boolean;
  errors: string[];
  executionTimeMs: number;
  
  // Версия
  mcVersion: string;
  javaVersion: string;
}
```

---

## Индексы Firestore

Создайте следующие индексы для оптимизации запросов:

```
Collection: users
Fields: level (descending), totalXpEarned (descending)
Scope: Collection

Collection: users
Fields: stats.streakDays (descending), lastActiveDate (descending)
Scope: Collection

Collection: code_submissions
Fields: uid (ascending), timestamp (descending)
Scope: Collection

Collection: code_submissions
Fields: lessonId (ascending), success (ascending), timestamp (descending)
Scope: Collection
```

---

## Правила безопасности Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Вспомогательная функция
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isOwner(userId);
      allow update: if isOwner(userId);
      allow delete: if false; // Нельзя удалить аккаунт напрямую
    }
    
    // Lessons collection - только чтение
    match /lessons/{lessonId} {
      allow read: if true; // Публичный доступ
      allow write: if false; // Только админ через Firebase Console
    }
    
    // Badges collection - только чтение
    match /badges/{badgeId} {
      allow read: if true;
      allow write: if false;
    }
    
    // Leaderboard - только чтение
    match /leaderboard/{period} {
      allow read: if true;
      allow write: if false;
    }
    
    // Code submissions
    match /code_submissions/{submissionId} {
      allow read: if isAuthenticated() && 
                    resource.data.uid == request.auth.uid;
      allow create: if isAuthenticated() && 
                       request.resource.data.uid == request.auth.uid;
      allow delete: if false;
    }
  }
}
```

---

## Примеры запросов

```javascript
// Получить топ-10 игроков по уровню
const topPlayers = await getDocs(
  query(
    collection(db, 'users'),
    orderBy('level', 'desc'),
    limit(10)
  )
);

// Получить все уроки категории 'events'
const eventsLessons = await getDocs(
  query(
    collection(db, 'lessons'),
    where('category', '==', 'events'),
    orderBy('order', 'asc')
  )
);

// Получить историю отправок пользователя
const userSubmissions = await getDocs(
  query(
    collection(db, 'code_submissions'),
    where('uid', '==', userId),
    orderBy('timestamp', 'desc'),
    limit(50)
  )
);

// Обновить прогресс урока
await updateDoc(doc(db, 'users', userId), {
  [`lessons.${lessonId}`]: {
    completed: true,
    attempts: increment(1),
    lastAttempt: serverTimestamp()
  },
  completedLessons: arrayUnion(lessonId)
});
```

---

## Миграция данных

При изменении структуры данных используйте Firebase Cloud Functions для миграции:

```javascript
// Пример: добавление нового поля skills всем пользователям
export const migrateAddSkillsField = onSchedule(
  '0 0 * * *', // Запуск по расписанию
  async (event) => {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    
    const batch = writeBatch(db);
    usersSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (!data.skills) {
        batch.update(doc.ref, {
          skills: { events: 0, commands: 0, storage: 0, gui: 0 }
        });
      }
    });
    
    await batch.commit();
  }
);
```
