(function (App) {
    const state = App.state;
    const renderRoom = (...args) => App.renderRoom(...args);
    const planMicrophoneDevices = (...args) => App.planMicrophoneDevices(...args);
    const planSpeakerDevices = (...args) => App.planSpeakerDevices(...args);

    function buildProductRecommendation() {
        const micDevices = planMicrophoneDevices();
        const speakerDevices = planSpeakerDevices(micDevices);
        return [...micDevices, ...speakerDevices];
    }

    function recalculateProductPlan() {
        state.devices = buildProductRecommendation();
        document.getElementById('presetSelect').value = 'custom';
        renderRoom();
    }

    App.buildProductRecommendation = buildProductRecommendation;
    App.recalculateProductPlan = recalculateProductPlan;
})(window.AISpeech);
