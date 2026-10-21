/* ==========================================================================
   Q-NEX Terminal Viewer - 终端设备卡片与 SVG 机身端口渲染
   规范：负责终端家族切换与机箱物理端口可视化交互，行数 <= 300 行
   ========================================================================== */

window.TerminalViewer = {
    currentTerminalId: "NMP311",

    init: function () {
        this.renderSelectorChips();
        this.renderTerminalDetail(this.currentTerminalId);
        if (window.I18n) {
            window.I18n.onLanguageChange(() => {
                this.renderSelectorChips();
                this.renderTerminalDetail(this.currentTerminalId);
            });
        }
    },

    getTerminals: function () {
        const list = window.I18n?.getData("terminals");
        return (Array.isArray(list) && list.length > 0) ? list : (window.TerminalData?.terminals || []);
    },

    renderSelectorChips: function () {
        const container = document.getElementById("terminal-chips");
        const terminals = this.getTerminals();
        if (!container || !terminals.length) return;

        container.innerHTML = terminals.map(t => `
            <button class="chip-btn ${t.id === this.currentTerminalId ? 'active' : ''}" 
                    data-id="${t.id}">
                ${t.name} (${t.category})
            </button>
        `).join("");

        container.querySelectorAll(".chip-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                this.selectTerminal(id);
            });
        });
    },

    selectTerminal: function (id) {
        this.currentTerminalId = id;
        document.querySelectorAll("#terminal-chips .chip-btn").forEach(btn => {
            btn.classList.toggle("active", btn.getAttribute("data-id") === id);
        });
        this.renderTerminalDetail(id);
    },

    renderTerminalDetail: function (id) {
        const terminal = this.getTerminals().find(t => t.id === id);
        if (!terminal) return;

        // 渲染主信息
        const titleEl = document.getElementById("terminal-detail-title");
        const categoryEl = document.getElementById("terminal-detail-category");
        const roleEl = document.getElementById("terminal-detail-role");
        const factEl = document.getElementById("terminal-detail-fact");

        if (titleEl) titleEl.textContent = `${terminal.name} - ${terminal.title}`;
        if (categoryEl) categoryEl.textContent = terminal.generation;
        if (roleEl) roleEl.textContent = terminal.role;
        if (factEl) factEl.textContent = terminal.resetHoleFact;

        // 渲染电源架构卡片
        const powerContainer = document.getElementById("terminal-power-arch");
        if (powerContainer) {
            const p = terminal.powerArchitecture;
            let phtml = `<ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">`;
            for (let [k, v] of Object.entries(p)) {
                phtml += `<li style="font-size: 0.85rem;"><strong style="color: var(--primary-color);">• ${v}</strong></li>`;
            }
            phtml += `</ul>`;
            powerContainer.innerHTML = phtml;
        }

        // 渲染端口列表
        const portsContainer = document.getElementById("terminal-ports-list");
        const inspectHint = window.I18n?.currentLang === "en" ? "Inspect" : "点击查看";
        const highlightLabel = window.I18n?.currentLang === "en" ? "Port Spotlight" : "物理端口高亮";
        if (portsContainer) {
            portsContainer.innerHTML = terminal.ports.map((port, idx) => `
                <div class="terminal-port-item" data-idx="${idx}" style="background: var(--bg-surface-alt); padding: 8px 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--primary-color); cursor: pointer;">
                    <div style="font-weight: 700; font-size: 0.85rem; color: var(--text-primary); display: flex; justify-content: space-between;">
                        <span>${port.name}</span>
                        <span style="font-size: 0.72rem; color: var(--primary-color);">${inspectHint}</span>
                    </div>
                    <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 2px;">${port.desc}</div>
                </div>
            `).join("");

            portsContainer.querySelectorAll(".terminal-port-item").forEach(item => {
                item.addEventListener("click", () => {
                    const idx = item.getAttribute("data-idx");
                    this.highlightPort(terminal.ports[idx], highlightLabel);
                });
            });
        }

        // 渲染 SVG 物理机身面板图
        this.renderChassisSvg(id);
    },

    highlightPort: function (port, label) {
        const spot = document.getElementById("port-spotlight-box");
        if (!spot) return;
        const tag = label || (window.I18n?.currentLang === "en" ? "Port Spotlight" : "物理端口高亮");
        spot.className = "alert-box alert-success";
        spot.innerHTML = `<strong>🔌 ${tag}：${port.name}</strong><p style="margin-top: 4px;">${port.desc}</p>`;
    },

    renderChassisSvg: function (id) {
        const container = document.getElementById("chassis-svg-container");
        if (!container) return;

        container.innerHTML = `
            <svg viewBox="0 0 760 160" width="100%" height="160" style="background: #1e293b; border-radius: 8px; border: 2px solid #475569;">
                <!-- 机箱面板底壳与螺丝孔 -->
                <rect x="8" y="8" width="744" height="144" rx="6" fill="#0f172a" stroke="#334155" stroke-width="2"/>
                <circle cx="20" cy="20" r="3" fill="#64748b"/>
                <circle cx="740" cy="20" r="3" fill="#64748b"/>
                <circle cx="20" cy="140" r="3" fill="#64748b"/>
                <circle cx="740" cy="140" r="3" fill="#64748b"/>
                
                <!-- 品牌丝印 -->
                <text x="36" y="32" fill="#38bdf8" font-size="12" font-weight="bold" font-family="sans-serif">Q-NEX ${id}</text>
                <text x="36" y="46" fill="#94a3b8" font-size="9" font-family="sans-serif">SMART TERMINAL INTERFACE</text>

                <!-- 电源输入区 (AC IN) -->
                <rect x="36" y="60" width="70" height="74" rx="4" fill="#1e293b" stroke="#e2e8f0" stroke-width="1.5"/>
                <text x="71" y="80" fill="#f8fafc" font-size="9" text-anchor="middle">AC IN</text>
                <circle cx="55" cy="104" r="5" fill="#475569"/><circle cx="87" cy="104" r="5" fill="#475569"/><circle cx="71" cy="118" r="5" fill="#475569"/>

                <!-- Power 1 & Power 2 受控电源 -->
                <rect x="120" y="60" width="110" height="74" rx="4" fill="#1e293b" stroke="#4ade80" stroke-width="1.5"/>
                <text x="175" y="78" fill="#4ade80" font-size="9" font-weight="bold" text-anchor="middle">POWER 1 & 2</text>
                <rect x="130" y="88" width="40" height="36" rx="2" fill="#0f172a" stroke="#4ade80"/><rect x="180" y="88" width="40" height="36" rx="2" fill="#0f172a" stroke="#4ade80"/>
                <text x="150" y="110" fill="#4ade80" font-size="8" text-anchor="middle">P1 ⚡</text><text x="200" y="110" fill="#4ade80" font-size="8" text-anchor="middle">P2 ⚡</text>

                <!-- Display 受控口 -->
                <rect x="244" y="60" width="80" height="74" rx="4" fill="#1e293b" stroke="#fb923c" stroke-width="1.5"/>
                <text x="284" y="78" fill="#fb923c" font-size="9" font-weight="bold" text-anchor="middle">DISPLAY</text>
                <rect x="256" y="88" width="56" height="36" rx="2" fill="#0f172a" stroke="#fb923c"/>
                <text x="284" y="110" fill="#fb923c" font-size="8" text-anchor="middle">RELAY ⏳</text>

                <!-- 幕布继电器 -->
                <rect x="338" y="60" width="80" height="74" rx="4" fill="#1e293b" stroke="#c084fc" stroke-width="1.5"/>
                <text x="378" y="78" fill="#c084fc" font-size="9" text-anchor="middle">SCREEN</text>
                <rect x="348" y="90" width="28" height="32" rx="2" fill="#0f172a" stroke="#c084fc"/><rect x="382" y="90" width="28" height="32" rx="2" fill="#0f172a" stroke="#c084fc"/>
                <text x="362" y="110" fill="#c084fc" font-size="7" text-anchor="middle">UP</text><text x="396" y="110" fill="#c084fc" font-size="7" text-anchor="middle">DOWN</text>

                <!-- 串口控制区 RS232 / 485 -->
                <rect x="432" y="60" width="110" height="74" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
                <text x="487" y="78" fill="#38bdf8" font-size="9" text-anchor="middle">RS232 / RS485</text>
                <rect x="442" y="90" width="42" height="32" rx="2" fill="#0f172a" stroke="#38bdf8"/><rect x="492" y="90" width="42" height="32" rx="2" fill="#0f172a" stroke="#38bdf8"/>
                <text x="463" y="110" fill="#38bdf8" font-size="7" text-anchor="middle">232-1</text><text x="513" y="110" fill="#38bdf8" font-size="7" text-anchor="middle">485-1</text>

                <!-- LAN 网口与 RESET 微动孔 -->
                <rect x="556" y="60" width="90" height="74" rx="4" fill="#1e293b" stroke="#60a5fa" stroke-width="1.5"/>
                <text x="586" y="78" fill="#60a5fa" font-size="9" text-anchor="middle">LAN</text>
                <rect x="566" y="90" width="40" height="34" rx="2" fill="#0f172a" stroke="#60a5fa"/>
                <circle cx="572" cy="85" r="2" fill="#4ade80"/> <!-- Link LED -->
                <text x="586" y="112" fill="#60a5fa" font-size="8" text-anchor="middle">RJ45</text>
                
                <!-- 醒目的 RESET 微动小孔 -->
                <rect x="618" y="90" width="20" height="34" rx="2" fill="#331818" stroke="#f87171"/>
                <circle cx="628" cy="107" r="4" fill="#ef4444" stroke="#ffffff" stroke-width="1"/>
                <text x="628" y="78" fill="#f87171" font-size="8" font-weight="bold" text-anchor="middle">RESET</text>
                <text x="628" y="136" fill="#f87171" font-size="6" text-anchor="middle">DHCP</text>

                <!-- HDMI 区域 -->
                <rect x="660" y="60" width="76" height="74" rx="4" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
                <text x="698" y="78" fill="#f43f5e" font-size="9" text-anchor="middle">HDMI</text>
                <rect x="670" y="92" width="25" height="14" rx="1" fill="#0f172a" stroke="#f43f5e"/><rect x="702" y="92" width="25" height="14" rx="1" fill="#0f172a" stroke="#f43f5e"/>
                <text x="682" y="103" fill="#f43f5e" font-size="6" text-anchor="middle">IN</text><text x="714" y="103" fill="#f43f5e" font-size="6" text-anchor="middle">OUT</text>
            </svg>
        `;
    }
};
