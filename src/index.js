import '../src/css/common.css';

// создаём класс
class CountdownTimer{
    constructor({ selector, targetDate}){
        this.intervalId = null;
        this.selector = document.querySelector(`${selector}`);
        this.targetDate = targetDate;

        this.init();
    }

// очищаем интерфейс до формата 00:00:00
    init() {
        const time = this.getTimeComponents(0);
        this.updateClockFace(time);
    }

// таймер
    start() {
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this.targetDate - currentTime;
            
            const time = this.getTimeComponents(deltaTime);
            this.updateClockFace(time);
        }, 1000);
    }

// обновляем интерфейс
    updateClockFace({ days, hours, mins, secs }) {
        this.selector.querySelector('[data-value="days"]').textContent = days;
        this.selector.querySelector('[data-value="hours"]').textContent = hours;
        this.selector.querySelector('[data-value="mins"]').textContent = mins;
        this.selector.querySelector('[data-value="secs"]').textContent = secs;
    }

// принимает время в мс, вычисляет наеобходимые величины времени
    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(
        Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        );
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs };
    }
    
// принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
    pad(value) {
        return String(value).padStart(2, '0');
    }
}

// создаём экземпляр
const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Feb 28, 2021 23:59:59'),
});

// запускаем при загрузке страницы
window.onload = timer.start();