/* ==========================================================================
   Q-NEX i18n Core Engine - 多语言国际化核心引擎
   规范：支持中英及后续多语言扩展，单一职责，行数 <= 300 行
   ========================================================================== */

window.I18n = {
    currentLang: "zh",
    supportedLangs: {
        zh: { label: "中文", flag: "🇨🇳", next: "en" },
        en: { label: "English", flag: "🇺🇸", next: "zh" }
    },
    locales: {},
    listeners: [],

    init: function () {
        const saved = localStorage.getItem("qnex_terminal_lang");
        if (saved && this.supportedLangs[saved]) {
            this.currentLang = saved;
        }
        document.documentElement.lang = this.currentLang === "zh" ? "zh-CN" : "en";
        this.updateDOM();
        this.updateLangBtn();
    },

    registerLocale: function (lang, data) {
        this.locales[lang] = data;
    },

    setLanguage: function (lang) {
        if (!this.supportedLangs[lang]) return;
        this.currentLang = lang;
        try {
            localStorage.setItem("qnex_terminal_lang", lang);
        } catch (e) {}
        document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
        this.updateDOM();
        this.updateLangBtn();
        this.listeners.forEach(fn => {
            try { fn(this.currentLang); } catch (e) { console.error(e); }
        });
    },

    toggleLanguage: function () {
        const nextLang = this.supportedLangs[this.currentLang]?.next || "zh";
        this.setLanguage(nextLang);
    },

    onLanguageChange: function (fn) {
        this.listeners.push(fn);
    },

    t: function (path, fallback) {
        const langData = this.locales[this.currentLang] || this.locales["zh"] || {};
        const parts = path.split(".");
        let curr = langData;
        for (const p of parts) {
            if (curr && typeof curr === "object" && p in curr) {
                curr = curr[p];
            } else {
                return fallback !== undefined ? fallback : path;
            }
        }
        return curr !== undefined ? curr : (fallback !== undefined ? fallback : path);
    },

    getData: function (domain) {
        const langData = this.locales[this.currentLang] || this.locales["zh"] || {};
        return langData[domain] || {};
    },

    updateDOM: function () {
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            const val = this.t(key);
            if (val) el.textContent = val;
        });
        document.querySelectorAll("[data-i18n-html]").forEach(el => {
            const key = el.getAttribute("data-i18n-html");
            const val = this.t(key);
            if (val) el.innerHTML = val;
        });
        document.querySelectorAll("[data-i18n-title]").forEach(el => {
            const key = el.getAttribute("data-i18n-title");
            const val = this.t(key);
            if (val) el.setAttribute("title", val);
        });
    },

    updateLangBtn: function () {
        const btn = document.getElementById("btn-toggle-lang");
        if (!btn) return;
        const nextKey = this.supportedLangs[this.currentLang]?.next || "en";
        const nextInfo = this.supportedLangs[nextKey] || { label: "English" };
        btn.innerHTML = `<span>🌐</span> ${nextInfo.label}`;
        btn.title = this.currentLang === "zh" ? "切换为英文 (Switch to English)" : "切换为中文 (Switch to Chinese)";
    }
};
