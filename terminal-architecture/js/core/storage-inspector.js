/* ==========================================================================
   Q-NEX Storage Inspector - 三层存储与在线清空模拟器
   规范：在线/离线删除对比、Reset孔真相演示，行数 <= 300 行
   ========================================================================== */

window.StorageInspector = {
    isDeviceOnline: true,

    init: function () {
        this.bindEvents();
        this.renderStorageTable();
        this.renderResetFact();
        if (window.I18n) {
            window.I18n.onLanguageChange(() => {
                this.updateOnlineBadge();
                this.renderStorageTable();
                this.renderResetFact();
            });
        }
    },

    getStorageData: function () {
        const d = window.I18n?.getData("storage");
        return (d && d.tiers) ? d : window.StorageData;
    },

    bindEvents: function () {
        const toggleOnlineBtn = document.getElementById("btn-toggle-online");
        const btnDeleteDevice = document.getElementById("btn-sim-delete");
        const btnRebind = document.getElementById("btn-sim-rebind");
        const btnPressReset = document.getElementById("btn-sim-reset-hole");

        if (toggleOnlineBtn) {
            toggleOnlineBtn.addEventListener("click", () => {
                this.isDeviceOnline = !this.isDeviceOnline;
                this.updateOnlineBadge();
            });
        }

        if (btnDeleteDevice) {
            btnDeleteDevice.addEventListener("click", () => this.simulateDelete());
        }

        if (btnRebind) {
            btnRebind.addEventListener("click", () => this.simulateRebind());
        }

        if (btnPressReset) {
            btnPressReset.addEventListener("click", () => this.simulateResetHole());
        }
    },

    updateOnlineBadge: function () {
        const isEn = window.I18n?.currentLang === "en";
        const badge = document.getElementById("device-online-badge");
        const btn = document.getElementById("btn-toggle-online");
        if (badge) {
            badge.className = `badge ${this.isDeviceOnline ? 'badge-success' : 'badge-danger'}`;
            badge.textContent = isEn 
                ? (this.isDeviceOnline ? "🟢 Device: Online" : "🔴 Device: Offline")
                : (this.isDeviceOnline ? "🟢 设备状态：在线 (Online)" : "🔴 设备状态：离线 (Offline)");
        }
        if (btn) {
            btn.textContent = isEn 
                ? (this.isDeviceOnline ? "Switch to Offline" : "Switch to Online")
                : (this.isDeviceOnline ? "切换为离线模拟" : "切换为在线模拟");
        }
        this.showFeedback(
            this.isDeviceOnline ? "info" : "warning",
            isEn 
                ? `Simulated device status is now [${this.isDeviceOnline ? 'ONLINE' : 'OFFLINE'}]. Network connection required to clear firmware configs!`
                : `模拟设备状态已切换为【${this.isDeviceOnline ? '在线' : '离线'}】。下发配置清空指令需要网络保持连通！`
        );
    },

    simulateDelete: function () {
        const isEn = window.I18n?.currentLang === "en";
        if (this.isDeviceOnline) {
            this.showFeedback(
                "success",
                isEn
                    ? "✅ [Online Deletion Succeeded]: Cloud issued wipe command to NMP MCU! Firmware settings (Power 1&2, Display delay, screen, lock) and cloud records were completely erased!"
                    : "✅【在线删除成功】：平台端向 NMP/NDP 固件成功下发清除指令！固件层（Power1/2联动、Display延时、幕布、电子锁）与平台端配置均被彻底清空！"
            );
        } else {
            this.showFeedback(
                "danger",
                isEn
                    ? "⚠️ [Critical Pitfall Warning - Offline Wipe Failed]: Device is OFFLINE! Cloud record was deleted, but wipe packet NEVER reached hardware. Firmware linkages remain active indefinitely!"
                    : "⚠️【重大避坑警告 - 离线删除失效】：设备处于离线状态！平台端记录虽已删除，但清除报文无法触达主板！保存在【固件层】中的电源联动、Display配置永久驻留！"
            );
        }
    },

    simulateRebind: function () {
        const isEn = window.I18n?.currentLang === "en";
        if (this.isDeviceOnline) {
            this.showFeedback(
                "info",
                isEn
                    ? "🔄 [Rebinding to New Org]: Touch panel local cache (IR & serial codes) was automatically overwritten by new org template! If previously deleted online, firmware is clean."
                    : "🔄【跨组织重新绑定】：触控面板本地缓存的空调红外码与串口参数已被新组织模板自动覆盖清空！若此前在线解绑，固件配置已干净；若此前离线解绑，旧固件配置仍生效！"
            );
        } else {
            this.showFeedback(
                "warning",
                isEn
                    ? "⚠️ Device is offline and cannot sync new org templates. Local cache retains all parameters from previous organization!"
                    : "⚠️ 设备离线无法完成新组织配置同步，本地依然沿用所有旧组织既有参数！"
            );
        }
    },

    simulateResetHole: function () {
        const truth = this.getStorageData().resetHoleTruth;
        const isEn = window.I18n?.currentLang === "en";
        alert(
            `[${truth.title}]\n\n` +
            `• ${isEn ? 'Actual Function' : '实际功能'}：${truth.actualFunction}\n` +
            `• ${isEn ? 'Factory Reset?' : '是否恢复出厂设置'}：${truth.isFactoryReset ? (isEn ? 'YES' : '是') : (isEn ? 'NO! Never resets factory configs' : '【否！绝不恢复出厂设置】')}\n\n` +
            `• ${isEn ? 'Design Background' : '设计背景'}：${truth.designIntent}\n\n` +
            `• ${isEn ? 'Warning & Rules' : '避坑提示'}：${truth.warning}`
        );
    },

    renderStorageTable: function () {
        const tbody = document.getElementById("storage-table-body");
        if (!tbody) return;

        const data = this.getStorageData();
        tbody.innerHTML = data.tiers.map(tier => `
            <tr>
                <td style="font-weight: 700; color: var(--primary-color);">${tier.layer}<br>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${tier.hardwareLocation}</span>
                </td>
                <td>
                    <ul style="padding-left: 16px; margin: 0;">
                        ${tier.configs.map(c => `<li>${c}</li>`).join("")}
                    </ul>
                </td>
                <td style="color: var(--text-secondary);">${tier.clearCondition}</td>
                <td style="font-size: 0.78rem; color: var(--warning-color);">${tier.rebindBehavior}</td>
            </tr>
        `).join("");
    },

    renderResetFact: function () {
        const container = document.getElementById("reset-fact-box");
        if (!container) return;
        const r = this.getStorageData().resetHoleTruth;
        const isEn = window.I18n?.currentLang === "en";
        const titleTag = isEn ? "Core Architecture Clarification" : "核心技术澄清";
        const funcTag = isEn ? "Actual Function" : "真实功能";
        const warnTag = isEn ? "Warning & Iron Rule" : "避坑规范";
        container.innerHTML = `
            <div class="alert-box alert-warning">
                <strong>🔍 ${titleTag}：${r.title}</strong>
                <p style="margin-top: 4px;">• ${funcTag}：<strong>${r.actualFunction}</strong></p>
                <p style="margin-top: 4px;">• ${warnTag}：${r.warning}</p>
            </div>
        `;
    },

    showFeedback: function (type, text) {
        const box = document.getElementById("storage-feedback-box");
        if (!box) return;
        box.className = `alert-box alert-${type}`;
        box.innerHTML = text;
    }
};
