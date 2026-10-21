/* ==========================================================================
   Q-NEX Topology Delivery Controller - 拓扑渲染、点击抽屉与双路在线下发
   规范：支持单步步进与连续播放、双路分别下发、移除 ACK 阶段，行数 <= 300 行
   ========================================================================== */

window.TopologyDelivery = {
    currentStep: 0, // 0:就绪, 1:管理端提交, 2:下发CPL20, 3:下发NMP, 4:完成就绪
    isAutoPlaying: false,
    autoTimer: null,
    selectedNodeType: null,

    init: function () {
        this.renderTopologyNodes();
        this.renderSvgCables();
        this.bindEvents();
        this.updateStepUI();
        if (window.I18n) {
            window.I18n.onLanguageChange(() => this.onLanguageChange());
        }
    },

    onLanguageChange: function () {
        this.renderTopologyNodes();
        this.updateStepUI();
        if (this.selectedNodeType) this.openDrawer(this.selectedNodeType);
        const statusEl = document.getElementById("delivery-status-indicator");
        if (statusEl) {
            statusEl.textContent = window.TopologyData.getStatusText(this.currentStep) || window.I18n?.t("ui.topology.ready_status");
        }
    },

    bindEvents: function () {
        const on = (id, fn) => document.getElementById(id)?.addEventListener("click", fn);
        on("btn-delivery-auto", () => this.toggleAutoPlay());
        on("btn-delivery-step", () => this.stepForward());
        on("btn-delivery-reset", () => this.resetFlow());
        on("btn-close-drawer", () => this.closeDrawer());
    },

    renderTopologyNodes: function () {
        const container = document.getElementById("topology-stage");
        if (!container || !window.TopologyData) return;
        container.querySelectorAll(".topo-device-node").forEach(n => n.remove());

        const clickHint = window.I18n?.t("ui.topology.click_hint", "点我");
        window.TopologyData.nodes.forEach(node => {
            const el = document.createElement("div");
            el.className = `topo-device-node node-${node.id}`;
            el.id = `node-${node.id}`;
            el.style.left = `${node.x}px`;
            el.style.top = `${node.y}px`;
            const role = window.TopologyData.getNodeRole(node.id) || node.role;
            el.innerHTML = `
                <img src="${node.img}" alt="${node.name}" class="topo-device-img">
                <div class="topo-device-label">
                    <span>${node.name}</span>
                    ${node.isClickable ? `<span class="badge-click-hint">${clickHint}</span>` : ''}
                </div>
            `;
            if (node.isClickable) {
                el.addEventListener("click", (e) => {
                    e.stopPropagation();
                    this.openDrawer(node.id);
                });
            }
            container.appendChild(el);
        });
    },

    renderSvgCables: function () {
        const svg = document.getElementById("topology-svg-layer");
        if (!svg || !window.TopologyData) return;
        const nodesMap = {};
        window.TopologyData.nodes.forEach(n => nodesMap[n.id] = n);

        let svgHtml = `<defs>
            <marker id="arrow-lan" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#0074D9"/></marker>
            <marker id="arrow-rs232" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#B10DC9"/></marker>
            <marker id="arrow-relay" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#FF851B"/></marker>
            <marker id="arrow-internet" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#888888"/></marker>
        </defs>`;

        window.TopologyData.links.forEach(l => {
            const src = nodesMap[l.from], dst = nodesMap[l.to];
            if (!src || !dst) return;
            const dash = l.dashed ? 'stroke-dasharray="6,5"' : '';
            svgHtml += `<line x1="${src.x}" y1="${src.y}" x2="${dst.x}" y2="${dst.y}" stroke="${l.color}" stroke-width="2.5" ${dash} marker-end="url(#arrow-${l.type})"/>`;
        });

        svg.innerHTML = svgHtml + `<g id="delivery-particles-layer"></g>`;
    },

    openDrawer: function (nodeId) {
        this.selectedNodeType = nodeId;
        const drawer = document.getElementById("inspection-drawer");
        if (!drawer || !window.TopologyData) return;

        document.querySelectorAll(".topo-device-node").forEach(n => n.classList.remove("selected-node"));
        document.getElementById(`node-${nodeId}`)?.classList.add("selected-node");

        const d = nodeId === "nmp" ? window.TopologyData.getFirmwareDetails() : window.TopologyData.getTouchPanelDetails();
        document.getElementById("drawer-title-text").textContent = d.title;
        document.getElementById("drawer-tag-text").textContent = d.tag;
        document.getElementById("drawer-items-container").innerHTML = d.items.map(it => `
            <li class="drawer-item-card ${it.isHardcoded ? 'item-hardcoded' : ''}">
                <div class="card-item-title-row">
                    <strong>• ${it.name}</strong>
                    ${it.isHardcoded ? `<span class="badge-hardcoded">${it.tag || '固件写死·不可修改'}</span>` : ''}
                </div>
                <div>${it.desc}</div>
            </li>
        `).join("");
        document.getElementById("drawer-alerts-container").innerHTML = d.alerts.map(a => `
            <div class="alert-box alert-${a.type}" style="margin-bottom: 8px;"><strong>${a.title}</strong><div style="margin-top: 3px;">${a.text}</div></div>
        `).join("");
        drawer.classList.add("open");
    },

    closeDrawer: function () {
        document.getElementById("inspection-drawer")?.classList.remove("open");
        document.querySelectorAll(".topo-device-node").forEach(n => n.classList.remove("selected-node"));
    },

    // 单步步进学习
    stepForward: function (onStepDone) {
        if (this.currentStep >= 4) {
            this.currentStep = 0;
            this.resetNodeHighlights();
        }
        this.currentStep++;
        this.executeCurrentStep(onStepDone);
    },

    executeCurrentStep: function (callback) {
        const setStatus = (txt, color) => {
            const el = document.getElementById("delivery-status-indicator");
            if (el) el.innerHTML = `<span style="color: ${color || 'var(--primary-color)'};">${txt}</span>`;
        };
        this.updateStepUI();

        const sTxt = window.TopologyData.getStatusText(this.currentStep);
        if (this.currentStep === 1) {
            setStatus(sTxt || "📡 [步骤 1/4] Web Console 提交配置至云端服务...", "var(--primary-color)");
            this.animatePath([{ x: 120, y: 110 }, { x: 210, y: 220 }, { x: 420, y: 180 }], "#00b4d8", 900, callback);
        } else if (this.currentStep === 2) {
            setStatus(sTxt || "📲 [步骤 2/4] 云端下发控制码与UI配置至 Touch Panel 本地缓存...", "#c084fc");
            this.animatePath([{ x: 420, y: 180 }, { x: 170, y: 440 }], "#c084fc", 850, () => {
                document.getElementById("node-panel")?.classList.add("selected-node");
                if (callback) callback();
            });
        } else if (this.currentStep === 3) {
            setStatus(sTxt || "💾 [步骤 3/4] 云端下发联动与受控参数至 NMP 固件层...", "#0074D9");
            this.animatePath([{ x: 420, y: 180 }, { x: 450, y: 360 }], "#0074D9", 800, () => {
                document.getElementById("node-nmp")?.classList.add("selected-node");
                if (callback) callback();
            });
        } else if (this.currentStep === 4) {
            setStatus(sTxt || "✅ [步骤 4/4] 双路配置下发完成，已在固件层与触控屏本地就绪生效！", "var(--success-color)");
            document.getElementById("node-panel")?.classList.add("selected-node");
            document.getElementById("node-nmp")?.classList.add("selected-node");
            if (callback) callback();
        }
    },

    toggleAutoPlay: function () {
        this.isAutoPlaying ? this.pauseAutoPlay() : this.startAutoPlay();
    },

    startAutoPlay: function () {
        this.isAutoPlaying = true;
        const btn = document.getElementById("btn-delivery-auto");
        if (btn) btn.innerHTML = window.I18n?.t("ui.topology.btn_pause", "<span>⏸️</span> 暂停演示");
        if (this.currentStep >= 4) this.resetFlow();

        const runNext = () => {
            if (!this.isAutoPlaying) return;
            if (this.currentStep < 4) {
                this.stepForward(() => {
                    this.autoTimer = setTimeout(runNext, 900);
                });
            } else {
                this.pauseAutoPlay();
            }
        };
        runNext();
    },

    pauseAutoPlay: function () {
        this.isAutoPlaying = false;
        if (this.autoTimer) clearTimeout(this.autoTimer);
        const btn = document.getElementById("btn-delivery-auto");
        if (btn) btn.innerHTML = window.I18n?.t("ui.topology.btn_auto", "<span>▶️</span> 自动连续演示");
    },

    resetFlow: function () {
        this.pauseAutoPlay();
        this.currentStep = 0;
        this.resetNodeHighlights();
        this.closeDrawer();
        const layer = document.getElementById("delivery-particles-layer");
        if (layer) layer.innerHTML = "";
        const statusEl = document.getElementById("delivery-status-indicator");
        if (statusEl) statusEl.textContent = window.TopologyData.getStatusText(0) || window.I18n?.t("ui.topology.ready_status");
        this.updateStepUI();
    },

    resetNodeHighlights: function () {
        document.querySelectorAll(".topo-device-node").forEach(n => n.classList.remove("selected-node"));
    },

    updateStepUI: function () {
        const badge = document.getElementById("delivery-step-badge");
        if (!badge) return;
        const readyTxt = window.I18n?.t("ui.topology.badge_ready", "就绪 (0/4)");
        const stepPrefix = window.I18n?.t("ui.topology.badge_step", "步骤");
        const steps = window.TopologyData.getDeliverySteps();
        if (this.currentStep === 0) {
            badge.textContent = readyTxt;
        } else {
            const curTitle = steps[this.currentStep - 1]?.title || "";
            badge.textContent = `${stepPrefix} ${this.currentStep}/4: ${curTitle}`;
        }
        badge.className = `badge ${this.currentStep === 4 ? 'badge-success' : 'badge-primary'}`;
    },

    animatePath: function (points, color, totalDuration, onComplete) {
        if (!points || points.length < 2) {
            if (onComplete) onComplete();
            return;
        }
        let idx = 0;
        const segDuration = (totalDuration || 900) / (points.length - 1);
        const nextStep = () => {
            if (idx >= points.length - 1) {
                if (onComplete) onComplete();
                return;
            }
            const p1 = points[idx], p2 = points[idx + 1];
            idx++;
            this.animateSegment(p1.x, p1.y, p2.x, p2.y, color, segDuration, nextStep);
        };
        nextStep();
    },

    animateSegment: function (x1, y1, x2, y2, color, duration, onDone) {
        const layer = document.getElementById("delivery-particles-layer");
        if (!layer) {
            if (onDone) onDone();
            return;
        }

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("r", "6");
        circle.setAttribute("fill", color);
        circle.setAttribute("filter", "drop-shadow(0 0 6px " + color + ")");
        circle.setAttribute("cx", x1);
        circle.setAttribute("cy", y1);
        layer.appendChild(circle);

        const startTime = performance.now();
        const d = duration || 400;

        function step(now) {
            const p = Math.min((now - startTime) / d, 1);
            circle.setAttribute("cx", x1 + (x2 - x1) * p);
            circle.setAttribute("cy", y1 + (y2 - y1) * p);
            if (p < 1) {
                requestAnimationFrame(step);
            } else {
                circle.remove();
                if (onDone) onDone();
            }
        }
        requestAnimationFrame(step);
    }
};
