class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25分
        this.breakTime = 5 * 60; // 5分
        this.isWorking = true;
        this.isRunning = false;
        this.interval = null;
        
        this.initializeElements();
        this.initializeEventListeners();
    }

    initializeElements() {
        this.timerElement = document.getElementById('timer');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.workTimeInput = document.getElementById('workTime');
        this.breakTimeInput = document.getElementById('breakTime');
    }

    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.startTimer());
        this.stopBtn.addEventListener('click', () => this.stopTimer());
        this.resetBtn.addEventListener('click', () => this.resetTimer());
        this.workTimeInput.addEventListener('change', () => {
            this.workTime = parseInt(this.workTimeInput.value) * 60;
            this.updateTimerDisplay();
        });
        this.breakTimeInput.addEventListener('change', () => {
            this.breakTime = parseInt(this.breakTimeInput.value) * 60;
            this.updateTimerDisplay();
        });
    }

    startTimer() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startBtn.disabled = true;
            this.stopBtn.disabled = false;
            this.resetBtn.disabled = false;
            this.interval = setInterval(() => this.tick(), 1000);
        }
    }

    stopTimer() {
        if (this.isRunning) {
            this.isRunning = false;
            this.startBtn.disabled = false;
            this.stopBtn.disabled = true;
            clearInterval(this.interval);
        }
    }

    resetTimer() {
        this.stopTimer();
        this.isWorking = true;
        this.workTimeInput.value = 25;
        this.breakTimeInput.value = 5;
        this.workTime = 25 * 60;
        this.breakTime = 5 * 60;
        this.updateTimerDisplay();
        this.resetBtn.disabled = true;
    }

    tick() {
        if (this.isWorking) {
            if (this.workTime > 0) {
                this.workTime--;
                this.updateTimerDisplay();
            } else {
                this.isWorking = false;
                this.workTime = parseInt(this.workTimeInput.value) * 60;
                this.breakTime = parseInt(this.breakTimeInput.value) * 60;
                this.updateTimerDisplay();
            }
        } else {
            if (this.breakTime > 0) {
                this.breakTime--;
                this.updateTimerDisplay();
            } else {
                this.isWorking = true;
                this.workTime = parseInt(this.workTimeInput.value) * 60;
                this.breakTime = parseInt(this.breakTimeInput.value) * 60;
                this.updateTimerDisplay();
            }
        }
    }

    updateTimerDisplay() {
        const time = this.isWorking ? this.workTime : this.breakTime;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// インスタンスの作成
const pomodoroTimer = new PomodoroTimer();
