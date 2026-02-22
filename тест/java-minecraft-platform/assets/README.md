# assets/ — Статические ресурсы

Эта папка предназначена для хранения статических файлов проекта.

## Текущие файлы

### Корневые файлы
- `favicon.svg` — Иконка сайта (100×100, градиент J-логотип)
- `logo.svg` — Основной логотип (200×200, для аватарок)
- `logo-horizontal.svg` — Горизонтальный логотип (400×80, для хедера)
- `og-image.svg` — Превью для соцсетей (1200×630)
- `README.md` — Эта документация

### icons/ — SVG-иконки
- `github.svg` — Иконка GitHub
- `discord.svg` — Иконка Discord
- `youtube.svg` — Иконка YouTube

### sounds/ — Звуки
- `sound-manager.js` — Модуль генерации звуков через Web Audio API

## Звуковые эффекты

Звуки генерируются программно через **Web Audio API** — не требуют внешних файлов.

### Доступные звуки

| Звук | Метод | Описание |
|------|-------|----------|
| Success | `playSuccess()` | Трёхнотный мажорный аккорд (C-E-G) |
| Error | `playError()` | Низкий нисходящий тон |
| Level Up | `playLevelUp()` | Восходящая арпеджио (C-E-G-C) |
| Badge | `playBadge()` | Колокольчик |
| Lesson Complete | `playLessonComplete()` | Длинный успешный аккорд |
| Click | `playClick()` | Короткий клик |

### Использование

```javascript
// Инициализация (после взаимодействия пользователя)
soundManager.init();

// Воспроизведение
soundManager.playSuccess();
soundManager.playError();
soundManager.playLevelUp();

// Настройки
soundManager.setEnabled(false);  // Выключить звуки
soundManager.setVolume(0.5);     // 50% громкости
```

## Рекомендуемые файлы для добавления

### Изображения
- `screenshot-lesson.png` — Скриншот редактора кода для документации
- `badge-*.svg` — Иконки для бейджей (если нужны уникальные)

### Шрифты (опционально)
Если захотите хостить шрифты локально вместо Google Fonts:
- `fonts/inter-var.woff2`
- `fonts/jetbrains-mono.woff2`

## Генерация og-image.png

Для создания превью можно использовать:
- [Canva](https://canva.com/) — шаблон 1200×630
- [Figma](https://figma.com/) — экспорт PNG
- [OG Image Generator](https://www.opengraph.xyz/)

Текущий `og-image.svg` уже готов к использованию. Для конвертации в PNG:
```bash
# Используя ImageMagick
convert -density 300 og-image.svg -resize 1200x630 og-image.png
```
