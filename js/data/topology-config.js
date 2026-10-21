/**
 * Canvas dimensions, wiring colors and node positions.
 */
(function (app) {
    app.data.topology.config = {
        canvasWidth: 1440,
        canvasHeight: 1200,
        colors: {
            lan: '#0074D9',
            hdmi: '#FF4136',
            audio: '#2ECC40',
            rs232: '#B10DC9',
            relay: '#FF851B',
            power: '#111111',
            wireless: '#0284c7',
            cloudControl: '#38bdf8',
            rtmpStream: '#f97316'
        }
    };

    app.data.topology.positions = {
        console: { x: 75, y: 110, w: 140, h: 112 },
        app: { x: 75, y: 410, w: 140, h: 115 },
        cloud: { x: 440, y: 65, w: 165, h: 112 },
        router: { x: 440, y: 260, w: 165, h: 112 },
        switch: { x: 440, y: 480, w: 165, h: 115 },
        mediaserver: { x: 430, y: 740, w: 185, h: 124 },
        ndp600: { x: 800, y: 70, w: 140, h: 112 },
        ifp_a: { x: 1020, y: 65, w: 135, h: 112 },
        spk_a: { x: 1210, y: 65, w: 105, h: 112 },
        nmp: { x: 800, y: 260, w: 140, h: 112 },
        ifp_b: { x: 1020, y: 255, w: 135, h: 112 },
        spk_b: { x: 1210, y: 255, w: 105, h: 112 },
        ndp200: { x: 800, y: 450, w: 140, h: 112 },
        ifp_h: { x: 1020, y: 445, w: 135, h: 112 },
        spk_h: { x: 1210, y: 445, w: 105, h: 112 },
        sl100: { x: 800, y: 640, w: 140, h: 112 },
        ifp_sl: { x: 1020, y: 635, w: 135, h: 112 },
        spk_sl: { x: 1210, y: 635, w: 105, h: 112 },
        mbx_corridor: { x: 800, y: 830, w: 140, h: 112 },
        disp_c: { x: 1020, y: 825, w: 135, h: 112 },
        spk_c: { x: 1210, y: 825, w: 105, h: 112 },
        mbx_library: { x: 800, y: 1020, w: 140, h: 112 },
        disp_l: { x: 1020, y: 1015, w: 135, h: 112 },
        spk_l: { x: 1210, y: 1015, w: 105, h: 112 }
    };
})(window.QnexApp);
