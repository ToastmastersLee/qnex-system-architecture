/**
 * Application state and lifecycle coordinator.
 * Feature methods are attached by the focused controller scripts that follow.
 */
(function (app) {
    class QnexSimulator {
        constructor() {
            // New preference key also resets the old Chinese-first default once.
            this.lang = 'en';
            try {
                const saved = localStorage.getItem('qnex_arch_lang_v2');
                if (Object.hasOwn(app.data.i18n, saved)) this.lang = saved;
            } catch (error) {}
            this.theme = 'light';
            try { this.theme = localStorage.getItem('qnex_theme') || 'light'; } catch (error) {}
            this.currentScenario = 'standby';
            this.mediaServerEnabled = false;
            try {
                this.mediaServerEnabled = localStorage.getItem('qnex_media_server') === 'true';
            } catch (error) {}
            this.scenarioSoundTimer = null;
            this.isPlaying = true;
            this.speed = 1.0;
            this.selectedDevice = null;
            this.particles = [];
            this.particleGenerators = [];
            this.animationFrameId = null;
            this.lastTimestamp = 0;
            this.cableFilters = {
                lan: true,
                hdmi: true,
                audio: true,
                wireless: true
            };
            this.isSidebarCollapsed = false;
            this.isScenariosCollapsed = true;

            // Compatibility for extensions that previously read these properties.
            this.screenStates_zh = app.data.screenStates.zh;
            this.screenStates_en = app.data.screenStates.en;
        }

        init() {
            this.renderCanvas();
            this.updateMediaServerControls();
            this.bindEvents();
            this.applyTheme(this.theme);
            this.applyLanguage(this.lang);
            this.setScenario('standby');
            this.startAnimationLoop();
        }
    }

    app.services.QnexSimulator = QnexSimulator;
})(window.QnexApp);
