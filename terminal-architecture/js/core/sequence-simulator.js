/* ==========================================================================
   Q-NEX Sequence Simulator - 开关机联动动态时序模拟器
   规范：时序步进执行、倒计时、继电器状态跃迁，行数 <= 300 行
   ========================================================================== */

window.SequenceSimulator = {
    mode: "on", // "on" or "off"
    currentStepIndex: 0,
    timer: null,
    isPlaying: false,
    delaySeconds: 30,
    delayInterval: null,

    init: function () {
        this.bindEvents();
        this.renderSequence();
        this.updatePortsDisplay();
        if (window.I18n) {
            window.I18n.onLanguageChange(() => {
                this.renderSequence();
                this.updatePortsDisplay();
            });
        }
    },

    bindEvents: function () {
        const btnOn = document.getElementById("btn-seq-on");
        const btnOff = document.getElementById("btn-seq-off");
        const btnPlay = document.getElementById("btn-seq-play");
        const btnStep = document.getElementById("btn-seq-step");
        const btnReset = document.getElementById("btn-seq-reset");

        if (btnOn) btnOn.addEventListener("click", () => this.switchMode("on"));
        if (btnOff) btnOff.addEventListener("click", () => this.switchMode("off"));
        if (btnPlay) btnPlay.addEventListener("click", () => this.togglePlay());
        if (btnStep) btnStep.addEventListener("click", () => this.stepForward());
        if (btnReset) btnReset.addEventListener("click", () => this.reset());
    },

    switchMode: function (mode) {
        this.pause();
        this.mode = mode;
        this.currentStepIndex = 0;
        document.getElementById("btn-seq-on")?.classList.toggle("btn-primary", mode === "on");
        document.getElementById("btn-seq-off")?.classList.toggle("btn-primary", mode === "off");
        this.renderSequence();
        this.updatePortsDisplay();
        const isEn = window.I18n?.currentLang === "en";
        const msg = isEn ? `Switched to [${mode === 'on' ? 'Power ON' : 'Power OFF'}] mode` : `切换至【${mode === 'on' ? '模拟一键开机联动' : '模拟一键关机联动'}】模式`;
        this.logMessage(msg);
    },

    getCurrentSteps: function () {
        const seq = window.I18n?.getData("sequence");
        if (seq && seq.powerOnSteps && seq.powerOffSteps) {
            return this.mode === "on" ? seq.powerOnSteps : seq.powerOffSteps;
        }
        return this.mode === "on" 
            ? window.SequenceData.powerOnSteps 
            : window.SequenceData.powerOffSteps;
    },

    renderSequence: function () {
        const container = document.getElementById("sequence-stepper");
        if (!container) return;

        const isEn = window.I18n?.currentLang === "en";
        const stepWord = isEn ? "Step" : "步骤";
        const badgeRunning = isEn ? "Running" : "执行中";
        const badgeDone = isEn ? "Done" : "已完成";
        const badgePending = isEn ? "Pending" : "待触发";

        const steps = this.getCurrentSteps();
        container.innerHTML = steps.map((s, idx) => `
            <div class="timeline-step ${idx === this.currentStepIndex ? 'active' : ''} ${idx < this.currentStepIndex ? 'completed' : ''}" 
                 id="step-${idx}">
                <div class="step-header">
                    <span class="step-title">${stepWord} ${s.step}：${s.title}</span>
                    <span class="badge ${idx <= this.currentStepIndex ? 'badge-success' : 'badge-primary'}">
                        ${idx === this.currentStepIndex ? badgeRunning : (idx < this.currentStepIndex ? badgeDone : badgePending)}
                    </span>
                </div>
                <div class="step-desc">${s.desc}</div>
            </div>
        `).join("");
    },

    stepForward: function () {
        const steps = this.getCurrentSteps();
        if (this.currentStepIndex < steps.length - 1) {
            this.currentStepIndex++;
            this.renderSequence();
            this.updatePortsDisplay();
            const curStep = steps[this.currentStepIndex];
            this.logMessage(curStep.log);

            // 若在关机模式执行到第3步(Display 关机延时)，启动倒计时特效
            if (this.mode === "off" && this.currentStepIndex === 2) {
                this.triggerDelayCountdown();
            }
        } else {
            this.pause();
            this.logMessage(`【${this.mode === 'on' ? '开机联动' : '关机联动'}】全部步骤执行完毕。`);
        }
    },

    togglePlay: function () {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    },

    play: function () {
        const steps = this.getCurrentSteps();
        if (this.currentStepIndex >= steps.length - 1) {
            this.currentStepIndex = 0;
            this.renderSequence();
        }
        this.isPlaying = true;
        document.getElementById("btn-seq-play").innerHTML = "<span>⏸️</span> 暂停演示";
        this.timer = setInterval(() => {
            if (this.currentStepIndex < steps.length - 1) {
                this.stepForward();
            } else {
                this.pause();
            }
        }, 1800);
    },

    pause: function () {
        this.isPlaying = false;
        if (this.timer) clearInterval(this.timer);
        const btn = document.getElementById("btn-seq-play");
        if (btn) btn.innerHTML = "<span>▶️</span> 自动播放";
    },

    reset: function () {
        this.pause();
        if (this.delayInterval) clearInterval(this.delayInterval);
        const cdEl = document.getElementById("seq-countdown-badge");
        if (cdEl) cdEl.textContent = "关机延时: 30s 就绪";
        this.currentStepIndex = 0;
        this.renderSequence();
        this.updatePortsDisplay();
        this.logMessage("联动时序已重置为初始待机状态。");
    },

    triggerDelayCountdown: function () {
        let left = 30;
        const cdEl = document.getElementById("seq-countdown-badge");
        const isEn = window.I18n?.currentLang === "en";
        if (this.delayInterval) clearInterval(this.delayInterval);
        this.delayInterval = setInterval(() => {
            left--;
            if (cdEl) cdEl.textContent = isEn ? `Display cooling: ${left}s` : `Display 延时散热中: ${left}s`;
            if (left <= 0) {
                clearInterval(this.delayInterval);
                if (cdEl) cdEl.textContent = isEn ? "Cooling complete" : "Display 延时散热已完成";
            }
        }, 300); // 加速演示体验
    },

    updatePortsDisplay: function () {
        const steps = this.getCurrentSteps();
        const current = steps[this.currentStepIndex];
        if (!current) return;

        const isEn = window.I18n?.currentLang === "en";
        const ports = current.ports;
        const pDisp = isEn ? "Display Port" : "Display 受控口";
        const pScreen = isEn ? "Motorized Screen" : "投影幕布升降";
        const pOps = isEn ? "OPS PC (6P Wire)" : "OPS 电脑 (6P线)";

        const isPowerOn = String(ports.power12).includes("通电") || String(ports.power12).includes("ON");
        const isDispOn = String(ports.display).includes("通电") || String(ports.display).includes("延时") || String(ports.display).includes("ON");
        const isScreenDown = String(ports.screen).includes("下降") || String(ports.screen).includes("到位") || String(ports.screen).includes("Down") || String(ports.screen).includes("Lowering");
        const isOpsOn = String(ports.ops).includes("5.3V") || String(ports.ops).includes("Running");

        this.setPortCard("port-card-power12", "Power 1 & 2", ports.power12, isPowerOn);
        this.setPortCard("port-card-display", pDisp, ports.display, isDispOn);
        this.setPortCard("port-card-screen", pScreen, ports.screen, isScreenDown);
        this.setPortCard("port-card-ops", pOps, ports.ops, isOpsOn);
        this.updateVisualHardware(ports);
    },

    updateVisualHardware: function (ports) {
        const isEn = window.I18n?.currentLang === "en";
        const fan = document.getElementById("visual-fan");
        const isDispOn = String(ports.display).includes("通电") || String(ports.display).includes("延时") || String(ports.display).includes("ON");
        if (fan) fan.classList.toggle("spinning", isDispOn);

        const cloth = document.getElementById("visual-screen-cloth");
        const isScreenDown = String(ports.screen).includes("下降") || String(ports.screen).includes("到位") || String(ports.screen).includes("Down") || String(ports.screen).includes("Lowering");
        if (cloth) cloth.classList.toggle("down", isScreenDown);

        const opsGauge = document.getElementById("visual-ops-voltage");
        if (opsGauge) {
            const is5V = String(ports.ops).includes("5.3V") || String(ports.ops).includes("Running");
            opsGauge.classList.toggle("locked-5v", is5V);
            opsGauge.textContent = is5V ? (isEn ? "Pin 4: 5.3V Interlocked" : "Pin 4: 5.3V 互锁吸合") : (isEn ? "Pin 4: 0.0V Cutoff" : "Pin 4: 0.0V 关断");
        }
        const nodePower = document.getElementById("node-power12");
        if (nodePower) nodePower.classList.toggle("active-load", String(ports.power12).includes("通电") || String(ports.power12).includes("ON"));
        const nodeDisp = document.getElementById("node-projector");
        if (nodeDisp) nodeDisp.classList.toggle("active-load", isDispOn);
        const nodeOps = document.getElementById("node-ops");
        if (nodeOps) nodeOps.classList.toggle("active-load", String(ports.ops).includes("5.3V"));
    },

    setPortCard: function (id, name, stateText, isEnergized) {
        const el = document.getElementById(id);
        if (!el) return;
        el.className = `port-status-card ${isEnergized ? 'energized' : 'deenergized'}`;
        el.innerHTML = `
            <div class="port-name">${name}</div>
            <div class="port-state-text" style="color: ${isEnergized ? 'var(--success-color)' : 'var(--danger-color)'};">
                ${isEnergized ? '⚡' : '⚪'} ${stateText}
            </div>
        `;
    },

    logMessage: function (msg) {
        const logBox = document.getElementById("seq-log-box");
        if (!logBox) return;
        const time = new Date().toTimeString().split(" ")[0];
        logBox.innerHTML = `<div><span style="color: var(--text-muted); font-family: var(--font-mono);">[${time}]</span> ${msg}</div>` + logBox.innerHTML;
    }
};
