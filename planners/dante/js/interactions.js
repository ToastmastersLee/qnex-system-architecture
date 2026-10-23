(function (App) {
    const state = App.state;
    const PPM = App.PPM;
    const svgCanvas = App.svgCanvas;
    const renderDevices = (...args) => App.renderDevices(...args);
    const calculateCoverage = (...args) => App.calculateCoverage(...args);

    let draggingDevice = null;

    function getMousePosition(evt) {
        var CTM = svgCanvas.getScreenCTM();
        return {
            x: (evt.clientX - CTM.e) / CTM.a,
            y: (evt.clientY - CTM.f) / CTM.d
        };
    }

    svgCanvas.addEventListener('mousedown', (e) => {
        let target = e.target;
        while (target && target.nodeName !== 'g' && !target.classList?.contains('device')) {
            target = target.parentNode;
            if (target === svgCanvas) return; 
        }
        if (target && target.classList?.contains('device')) {
            const id = parseInt(target.getAttribute('data-id'));
            draggingDevice = state.devices.find(d => d.id === id);
        }
    });

    svgCanvas.addEventListener('mousemove', (e) => {
        if (draggingDevice) {
            const pos = getMousePosition(e);
            let tx = pos.x / PPM;
            let ty = pos.y / PPM;
            
            // Boundary collision prevention
            tx = Math.max(0, Math.min(state.roomLength, tx));
            ty = Math.max(0, Math.min(state.roomWidth, ty));
            
            draggingDevice.x = tx;
            draggingDevice.y = ty;
            
            renderDevices();
            calculateCoverage();
        }
    });

    svgCanvas.addEventListener('dblclick', (e) => {
        let target = e.target;
        while (target && target.nodeName !== 'g' && !target.classList?.contains('device')) {
            target = target.parentNode;
            if (target === svgCanvas) return; 
        }
        if (target && target.classList?.contains('device')) {
            const id = parseInt(target.getAttribute('data-id'));
            const idx = state.devices.findIndex(d => d.id === id);
            if (idx > -1) {
                state.devices.splice(idx, 1);
                renderDevices();
                calculateCoverage();
                document.getElementById('presetSelect').value = 'custom';
            }
        }
    });

    window.addEventListener('mouseup', () => { draggingDevice = null; });
    svgCanvas.addEventListener('mouseleave', () => { draggingDevice = null; });

    App.getMousePosition = getMousePosition;
})(window.AISpeech);
