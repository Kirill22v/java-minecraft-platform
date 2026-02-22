/**
 * Sound Effects Module
 * 
 * Генерация звуковых эффектов через Web Audio API.
 * Не требует внешних файлов — звуки синтезируются в реальном времени.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
 */

class SoundManager {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.volume = 0.3;
    }

    /**
     * Инициализация AudioContext (должна быть вызвана после взаимодействия пользователя)
     */
    init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    /**
     * Включение/выключение звуков
     * @param {boolean} enabled
     */
    setEnabled(enabled) {
        this.enabled = enabled;
    }

    /**
     * Установка громкости (0.0 - 1.0)
     * @param {number} volume
     */
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    /**
     * Воспроизведение звука успеха
     * Трёхнотный мажорный аккорд (C-E-G)
     */
    playSuccess() {
        if (!this.enabled) return;
        this.init();

        const now = this.audioContext.currentTime;
        
        // Ноты: C5, E5, G5
        this.playTone(523.25, now, 0.15, 'sine');      // C5
        this.playTone(659.25, now + 0.1, 0.15, 'sine'); // E5
        this.playTone(783.99, now + 0.2, 0.2, 'sine');  // G5
    }

    /**
     * Воспроизведение звука ошибки
     * Низкий нисходящий тон
     */
    playError() {
        if (!this.enabled) return;
        this.init();

        const now = this.audioContext.currentTime;
        
        // Нисходящий звук
        this.playTone(200, now, 0.3, 'sawtooth');
        this.playTone(150, now + 0.15, 0.3, 'sawtooth');
    }

    /**
     * Воспроизведение звука повышения уровня
     * Восходящая арпеджио
     */
    playLevelUp() {
        if (!this.enabled) return;
        this.init();

        const now = this.audioContext.currentTime;
        
        // Арпеджио: C5-E5-G5-C6
        this.playTone(523.25, now, 0.2, 'sine');
        this.playTone(659.25, now + 0.15, 0.2, 'sine');
        this.playTone(783.99, now + 0.3, 0.2, 'sine');
        this.playTone(1046.50, now + 0.45, 0.4, 'sine');
    }

    /**
     * Воспроизведение звука клика
     */
    playClick() {
        if (!this.enabled) return;
        this.init();

        const now = this.audioContext.currentTime;
        this.playTone(800, now, 0.05, 'sine', 0.1);
    }

    /**
     * Воспроизведение звука получения бейджа
     * Яркий звонкий звук
     */
    playBadge() {
        if (!this.enabled) return;
        this.init();

        const now = this.audioContext.currentTime;
        
        // Колокольчик
        this.playTone(1046.50, now, 0.3, 'triangle');   // C6
        this.playTone(1318.51, now + 0.1, 0.4, 'triangle'); // E6
    }

    /**
     * Воспроизведение звука завершения урока
     * Длинный успешный аккорд
     */
    playLessonComplete() {
        if (!this.enabled) return;
        this.init();

        const now = this.audioContext.currentTime;
        
        // Мажорное трезвучие с басом
        this.playTone(261.63, now, 0.5, 'sine');  // C4
        this.playTone(329.63, now + 0.1, 0.5, 'sine'); // E4
        this.playTone(392.00, now + 0.2, 0.5, 'sine'); // G4
        this.playTone(523.25, now + 0.3, 0.6, 'sine'); // C5
    }

    /**
     * Внутренний метод для воспроизведения тона
     * @param {number} frequency - Частота в Гц
     * @param {number} startTime - Время начала в секундах
     * @param {number} duration - Длительность в секундах
     * @param {string} type - Тип волны: 'sine', 'square', 'sawtooth', 'triangle'
     * @param {number} gain - Громкость (0-1)
     */
    playTone(frequency, startTime, duration, type = 'sine', gain = null) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        const actualGain = gain !== null ? gain : this.volume;
        
        // Плавное затухание
        gainNode.gain.setValueAtTime(actualGain, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    }

    /**
     * Секретный звук (пасхалка)
     * Мелодия из Minecraft
     */
    playMinecraftEasterEgg() {
        if (!this.enabled) return;
        this.init();

        const now = this.audioContext.currentTime;
        const notes = [
            { freq: 659.25, time: 0 },      // E5
            { freq: 659.25, time: 0.3 },    // E5
            { freq: 659.25, time: 0.6 },    // E5
            { freq: 523.25, time: 0.9 },    // C5
            { freq: 659.25, time: 1.2 },    // E5
            { freq: 783.99, time: 1.5 },    // G5
            { freq: 392.00, time: 1.8 },    // G4
        ];

        notes.forEach(note => {
            this.playTone(note.freq, now + note.time, 0.25, 'sine', 0.2);
        });
    }
}

// Экспорт глобального экземпляра
window.soundManager = new SoundManager();

console.log('[SoundManager] Модуль загружен');
