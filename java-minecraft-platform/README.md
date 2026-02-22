# Java Minecraft Platform

Современная образовательная веб-платформа для изучения Java с фокусом на разработку плагинов для Minecraft.

## 🚀 Особенности

- **70% практики, 30% теории** — обучение через написание кода
- **Встроенный редактор** — Monaco Editor (движок VS Code) с подсветкой Java
- **Геймификация** — уровни, XP, бейджи, таблица лидеров
- **Актуальный стек** — Java 21 LTS, PaperMC/Spigot 1.21+
- **Serverless архитектура** — Firebase Auth + Firestore
- **Адаптивный дизайн** — Mobile-first, Modern Dark Tech

## 📁 Структура проекта

```
java-minecraft-platform/
├── index.html              # Главная страница с семантической версткой
├── FIRESTORE_SCHEMA.md     # Документация структуры данных Firestore
├── README.md               # Этот файл
├── css/
│   └── styles.css          # Стили в стиле Modern Dark Tech
├── js/
│   ├── firebase-config.js  # Конфигурация Firebase и функции API
│   └── app.js              # Основная логика приложения
└── assets/                 # Изображения, иконки
```

## ⚙️ Настройка Firebase

### 1. Создайте проект в Firebase Console

1. Перейдите на [Firebase Console](https://console.firebase.google.com/)
2. Создайте новый проект
3. Включите **Authentication** (Email/Password)
4. Создайте базу данных **Firestore**

### 2. Получите конфигурацию

В Firebase Console:
1. Project Settings → General
2. Прокрутите до "Your apps"
3. Выберите Web (</>)
4. Скопируйте `firebaseConfig`

### 3. Обновите конфигурацию в коде

Откройте `js/firebase-config.js` и замените:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890",
    measurementId: "G-XXXXXXXXXX"
};
```

### 4. Настройте правила безопасности

В Firebase Console → Firestore Database → Rules вставьте правила из `FIRESTORE_SCHEMA.md`.

## 🌐 Запуск

### Вариант 1: Локальный сервер (рекомендуется)

```bash
# Используя Python
python -m http.server 8000

# Используя Node.js (если установлен)
npx serve .

# Используя PHP
php -S localhost:8000
```

Откройте `http://localhost:8000` в браузере.

### Вариант 2: Хостинг

Задеплойте на любой статический хостинг:
- **Firebase Hosting** (рекомендуется)
- **Vercel**
- **Netlify**
- **GitHub Pages**

#### Деплой на Firebase Hosting:

```bash
# Установите Firebase CLI
npm install -g firebase-tools

# Войдите в аккаунт
firebase login

# Инициализируйте проект
firebase init hosting

# Выберите ваш проект
# Укажите public directory: . (текущая папка)
# Configure as SPA: No

# Деплой
firebase deploy
```

## 🎮 Как это работает

### Архитектура

```
┌─────────────────────────────────────────────────────────┐
│                     Браузер клиента                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │   HTML/CSS  │  │ Monaco Ed.  │  │   Vanilla JS    │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTPS
                          ▼
┌─────────────────────────────────────────────────────────┐
│                      Firebase                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │    Auth     │  │  Firestore  │  │     Hosting     │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Поток данных

1. Пользователь открывает сайт → загрузка HTML/CSS/JS
2. Вход/регистрация → Firebase Auth
3. Загрузка прогресса → Firestore
4. Написание кода → Monaco Editor
5. Проверка кода → валидация на клиенте
6. Сохранение прогресса → Firestore + LocalStorage (кэш)

## 📚 Структура уроков

Уроки определены в `js/app.js` в объекте `LessonsData`:

```javascript
const LessonsData = {
    1: {
        id: 1,
        title: 'Создание первого плагина',
        xp: 20,
        skill: 'events',
        theory: '...',
        starterCode: '...',
        validation: { ... }
    },
    // ...
};
```

### Добавление нового урока

1. Добавьте запись в `LessonsData`
2. Укажите валидацию кода
3. Обновите прогресс навыка
4. (Опционально) Добавьте бейдж

## 🏆 Система бейджей

Бейджи награждаются автоматически при выполнении условий:

| Бейдж | Условие |
|-------|---------|
| 🏆 Первый плагин | Завершить урок 1 |
| ⚡ Мастер событий | 80% прогресса в Events |
| 🥷 Code Ninja | 50 задач без ошибок |
| 🏃 Спидраннер | Урок за 5 минут |

## 🎨 Настройки дизайна

### Цветовая схема

Переопределите CSS-переменные в `css/styles.css`:

```css
:root {
    --color-accent-primary: #00ff88;    /* Неоновый зелёный */
    --color-accent-secondary: #7c3aed;  /* Фиолетовый */
    /* ... */
}
```

### Темы

В настройках пользователя доступны:
- **Dark Tech** (по умолчанию)
- **Ultra Dark**
- **Light** (в разработке)

## 🔧 Расширение функционала

### Добавление новой версии Minecraft

1. Обновите селект в `index.html`
2. Добавьте версию в `LessonsData[].versions`
3. Реализуйте переключение контента

### Интеграция с реальной компиляцией

Для реальной компиляции Java кода потребуется backend:

```javascript
// Пример отправки кода на сервер
async function compileCode(code) {
    const response = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, mcVersion: AppState.mcVersion })
    });
    return await response.json();
}
```

## 📊 Аналитика

Для отслеживания прогресса пользователей добавьте:

```javascript
// В firebase-config.js
import { getAnalytics, logEvent } from 'firebase/analytics';

const analytics = getAnalytics(app);

// Отслеживание завершения урока
logEvent(analytics, 'lesson_complete', {
    lesson_id: lessonId,
    xp_earned: xp,
    time_spent: timeSpent
});
```

## 🐛 Отладка

В консоли браузера доступны глобальные объекты:

```javascript
window.AppState      // Текущее состояние
window.LessonsData   // Данные уроков
```

## 📄 Лицензия

Образовательный проект. Используйте код в учебных целях.

## 🔗 Ресурсы

- [Oracle Java Docs](https://docs.oracle.com/en/java/)
- [PaperMC Javadocs](https://jd.papermc.io/)
- [SpigotMC Wiki](https://www.spigotmc.org/wiki/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
