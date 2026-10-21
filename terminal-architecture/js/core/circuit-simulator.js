/* ==========================================================================
   Q-NEX Circuit Simulator - NDP 机械滑盖、K1继电器与推杆动态交互沙盘
   规范：纯脚本交互动画，单一职责，行数 <= 300 行
   ========================================================================== */

window.CircuitSimulator = {
    isPushedLeft: false,
    actuatorHeight: 40, // 40px to 140px
    screenAngle: 0,     // 0deg to 18deg
    intervalId: null,

    init: function () {
        this.bindEvents();
        this.updateState();
        if (window.I18n) {
            window.I18n.onLanguageChange(() => {
                this.updateState();
                this.renderActuator();
            });
        }
    },

    bindEvents: function () {
        const sliderHandle = document.getElementById("slider-handle");
        const track = document.getElementById("slide-track");
        const btnUp = document.getElementById("btn-motor-up");
        const btnDown = document.getElementById("btn-motor-down");
        const btnBoth = document.getElementById("btn-motor-both");

        if (sliderHandle) {
            sliderHandle.addEventListener("click", (e) => {
                e.stopPropagation();
                this.toggleCoverPosition();
            });
        }
        if (track) {
            track.addEventListener("click", () => this.toggleCoverPosition());
        }

        if (btnUp) {
            btnUp.addEventListener("mousedown", () => this.startMotorMove(1));
            btnUp.addEventListener("mouseup", () => this.stopMotorMove());
            btnUp.addEventListener("mouseleave", () => this.stopMotorMove());
            btnUp.addEventListener("click", () => this.stepMotor(1));
        }

        if (btnDown) {
            btnDown.addEventListener("mousedown", () => this.startMotorMove(-1));
            btnDown.addEventListener("mouseup", () => this.stopMotorMove());
            btnDown.addEventListener("mouseleave", () => this.stopMotorMove());
            btnDown.addEventListener("click", () => this.stepMotor(-1));
        }

        if (btnBoth) {
            btnBoth.addEventListener("click", () => this.simulateBothKeys());
        }
    },

    toggleCoverPosition: function () {
        this.isPushedLeft = !this.isPushedLeft;
        this.updateState();
    },

    updateState: function () {
        const isEn = window.I18n?.currentLang === "en";
        const handle = document.getElementById("slider-handle");
        const lockSpot = document.getElementById("plunger-lock-spot");
        const ledIndicator = document.getElementById("relay-led-indicator");
        const k1Contact = document.getElementById("k1-contact-text");
        const motorStateText = document.getElementById("motor-state-text");
        const btnUp = document.getElementById("btn-motor-up");
        const btnDown = document.getElementById("btn-motor-down");

        if (handle) {
            handle.classList.toggle("pushed-left", this.isPushedLeft);
            handle.innerHTML = this.isPushedLeft 
                ? (isEn ? "<span>🔒</span> Cover Locked In Position" : "<span>🔒</span> 盖板已推死卡入")
                : (isEn ? "<span>👉</span> Click to Push to Left" : "<span>👉</span> 点击推至左侧卡位");
        }

        if (lockSpot) {
            lockSpot.classList.toggle("locked", this.isPushedLeft);
            lockSpot.title = this.isPushedLeft 
                ? (isEn ? "Ball plunger locked" : "碰珠已牢牢锁止卡槽") 
                : (isEn ? "Plunger unlocked" : "未卡入碰珠");
        }

        if (this.isPushedLeft) {
            if (ledIndicator) {
                ledIndicator.className = "badge badge-success";
                ledIndicator.textContent = isEn ? "🟢 Green (NO Closed: MOTOR V ON)" : "🟢 绿灯 (NO闭合：MOTOR V送电中)";
            }
            if (k1Contact) {
                k1Contact.innerHTML = isEn 
                    ? "<strong>K1 Contact: NO (Pin 2 Conducts)</strong> -> +12V delivered to button board" 
                    : "<strong>K1 触点：NO (Pin 2 导通)</strong> -> +12V 已送达电机按键板";
            }
            if (btnUp) btnUp.disabled = false;
            if (btnDown) btnDown.disabled = false;
            if (motorStateText) {
                motorStateText.textContent = isEn ? "Power circuit ready, buttons active" : "供电回路就绪，可按键升降";
            }
        } else {
            if (ledIndicator) {
                ledIndicator.className = "badge badge-danger";
                ledIndicator.textContent = isEn ? "🔴 Red (NC Closed: Mechanically Locked)" : "🔴 红灯 (NC闭合：机械锁定断电)";
            }
            if (k1Contact) {
                k1Contact.innerHTML = isEn 
                    ? "<strong>K1 Contact: NC (Pin 1 Conducts)</strong> -> Red LED locked, motor cut" 
                    : "<strong>K1 触点：NC (Pin 1 导通)</strong> -> 红灯锁定，电机完全断电";
            }
            if (btnUp) btnUp.disabled = true;
            if (btnDown) btnDown.disabled = true;
            if (motorStateText) {
                motorStateText.textContent = isEn ? "⚠️ Cover not in place: Hardware interlock active" : "⚠️ 盖板未到位，硬互锁断电保护生效中";
            }
            this.stopMotorMove();
        }
    },

    stepMotor: function (dir) {
        if (!this.isPushedLeft) return;
        this.actuatorHeight = Math.max(40, Math.min(130, this.actuatorHeight + dir * 15));
        this.screenAngle = ((this.actuatorHeight - 40) / 90) * 15;
        this.renderActuator();
        this.updatePolarity(dir);
    },

    startMotorMove: function (dir) {
        if (!this.isPushedLeft) return;
        this.stopMotorMove();
        this.intervalId = setInterval(() => {
            this.stepMotor(dir);
            if (this.actuatorHeight >= 130 || this.actuatorHeight <= 40) {
                this.stopMotorMove();
            }
        }, 100);
    },

    stopMotorMove: function () {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.updatePolarity(0);
    },

    simulateBothKeys: function () {
        if (!this.isPushedLeft) return;
        this.stopMotorMove();
        const isEn = window.I18n?.currentLang === "en";
        const polarBox = document.getElementById("motor-polarity-box");
        if (polarBox) {
            polarBox.className = "alert-box alert-warning";
            polarBox.innerHTML = isEn
                ? "⚡ <strong>Dual-Key Protection Active</strong>: Wire A (+12V) & Wire B (+12V), potential difference = 0V. Motor halts safely without short-circuit damage!"
                : "⚡ <strong>双键防误触保护触发</strong>：线 A (+12V) 且 线 B (+12V)，电位差 = 0V，电机无压差静止，绝不短路烧机！";
        }
    },

    updatePolarity: function (dir) {
        const isEn = window.I18n?.currentLang === "en";
        const polarBox = document.getElementById("motor-polarity-box");
        if (!polarBox) return;
        if (dir > 0) {
            polarBox.className = "alert-box alert-success";
            polarBox.innerHTML = isEn
                ? "🔼 <strong>Actuator Rising</strong>: Wire A (+12V), Wire B (GND), potential difference = <strong>+12V</strong>, screen tilts up."
                : "🔼 <strong>推杆上升状态</strong>：线 A 接入 +12V，线 B 保持 GND，电位差 = <strong>+12V</strong>，推杆顶升，中屏倾角抬起。";
        } else if (dir < 0) {
            polarBox.className = "alert-box alert-primary";
            polarBox.innerHTML = isEn
                ? "🔽 <strong>Actuator Lowering</strong>: Wire A (GND), Wire B (+12V), polarity reversed = <strong>-12V</strong>, screen folds down."
                : "🔽 <strong>推杆下降收缩</strong>：线 A 接 GND，线 B 接 +12V，极性反转 = <strong>-12V</strong>，推杆电机反转收拢。";
        } else {
            polarBox.className = "alert-box alert-box";
            polarBox.innerHTML = isEn
                ? "⏸️ <strong>Motor Idle Normal</strong>: Wire A and Wire B both grounded (GND), 0V difference, mechanical self-lock."
                : "⏸️ <strong>电机静止常态</strong>：线 A 与 线 B 均接地 (GND)，电位差 0V，电机机械自锁。";
        }
    },

    renderActuator: function () {
        const isEn = window.I18n?.currentLang === "en";
        const rod = document.getElementById("actuator-rod");
        const mount = document.getElementById("screen-mount");
        const heightLabel = document.getElementById("actuator-height-val");

        if (rod) rod.style.height = `${this.actuatorHeight}px`;
        if (mount) mount.style.transform = `rotate(-${this.screenAngle}deg) translateY(-${(this.actuatorHeight - 40) * 0.5}px)`;
        if (heightLabel) {
            heightLabel.textContent = isEn
                ? `Actuator: ${(this.actuatorHeight - 40)}mm (Tilt ${this.screenAngle.toFixed(1)}°)`
                : `推杆行程: ${(this.actuatorHeight - 40)}mm (仰角 ${this.screenAngle.toFixed(1)}°)`;
        }
    }
};
