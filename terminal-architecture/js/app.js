/* ==========================================================================
   Q-NEX Terminal Architecture & Power Linkage - Main Application Entry
   规范：顶层控制器与标签切换，行数 <= 300 行
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 初始化标签栏切换
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-tab");
            
            tabBtns.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));

            btn.classList.add("active");
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add("active");
        });
    });

    // 初始化国际化引擎与语言切换
    if (window.I18n) {
        window.I18n.init();
        const langToggleBtn = document.getElementById("btn-toggle-lang");
        if (langToggleBtn) {
            langToggleBtn.addEventListener("click", () => {
                window.I18n.toggleLanguage();
            });
        }
    }

    // 初始化深浅色主题切换
    const themeToggleBtn = document.getElementById("btn-toggle-theme");
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("theme-dark");
            const isDark = document.body.classList.contains("theme-dark");
            const lightHtml = window.I18n?.t("ui.theme_btn_light", "<span>☀️</span> 浅色");
            const darkHtml = window.I18n?.t("ui.theme_btn_dark", "<span>🌙</span> 深色");
            themeToggleBtn.innerHTML = isDark ? lightHtml : darkHtml;
        });
    }

    // 初始化子模块
    if (window.TopologyDelivery) {
        window.TopologyDelivery.init();
    }
    if (window.TerminalViewer) {
        window.TerminalViewer.init();
    }
    if (window.SequenceSimulator) {
        window.SequenceSimulator.init();
    }
    if (window.StorageInspector) {
        window.StorageInspector.init();
    }
    if (window.CircuitSimulator) {
        window.CircuitSimulator.init();
    }

    console.log("Q-NEX Terminal Architecture & Power Linkage Simulator initialized successfully with i18n support.");
});
