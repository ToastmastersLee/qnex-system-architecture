(function (app) {
    const TOPOLOGY_CONFIG = app.data.topology.config;
    app.data.topology.connections = [
    // 1. PC Console -> Cloud Server
    {
        id: 'link_console_cloud',
        from: 'console',
        to: 'cloud',
        type: 'wireless',
        color: TOPOLOGY_CONFIG.colors.wireless,
        dashed: true,
        label: 'Internet / HTTPS API',
        pathType: 'orthogonal',
        points: [[215, 160], [330, 160], [330, 120], [440, 120]]
    },
    // 2. Mobile App -> Cloud Server
    {
        id: 'link_app_cloud',
        from: 'app',
        to: 'cloud',
        type: 'wireless',
        color: TOPOLOGY_CONFIG.colors.wireless,
        dashed: true,
        label: 'Internet / 4G MQTT',
        pathType: 'orthogonal',
        points: [[215, 460], [330, 460], [330, 140], [440, 140]]
    },
    // 3. Cloud Server -> Campus Gateway
    {
        id: 'link_cloud_router',
        from: 'cloud',
        to: 'router',
        type: 'lan',
        color: TOPOLOGY_CONFIG.colors.cloudControl,
        dashed: false,
        label: 'Cloud Control / WAN',
        pathType: 'orthogonal',
        points: [[522, 177], [522, 260]]
    },
    // 4. Campus Gateway -> Core Switch
    {
        id: 'link_router_switch',
        from: 'router',
        to: 'switch',
        type: 'lan',
        color: TOPOLOGY_CONFIG.colors.lan,
        dashed: false,
        label: 'Gigabit LAN Uplink',
        pathType: 'orthogonal',
        points: [[522, 372], [522, 480]]
    },
    // 5. Media Server -> Core Switch
    {
        id: 'link_mediaserver_switch',
        from: 'mediaserver',
        to: 'switch',
        type: 'lan',
        color: TOPOLOGY_CONFIG.colors.lan,
        dashed: false,
        label: 'Gigabit LAN (RTMP Engine)',
        pathType: 'orthogonal',
        points: [[522, 740], [522, 595]]
    },

    // 6. Core Switch -> Room Endpoints (Dedicated vertical lanes x = 755, 745, 735, 725, 715, 705)
    // Classroom A: NDP600
    {
        id: 'link_switch_ndp600',
        from: 'switch',
        to: 'ndp600',
        type: 'lan',
        color: TOPOLOGY_CONFIG.colors.lan,
        dashed: false,
        label: 'PoE+ LAN',
        pathType: 'orthogonal',
        points: [[605, 500], [755, 500], [755, 115], [800, 115]]
    },
    // Classroom B: NMP311
    {
        id: 'link_switch_nmp',
        from: 'switch',
        to: 'nmp',
        type: 'lan',
        color: TOPOLOGY_CONFIG.colors.lan,
        dashed: false,
        label: 'PoE+ LAN',
        pathType: 'orthogonal',
        points: [[605, 510], [745, 510], [745, 305], [800, 305]]
    },
    // Lecture Hall: NDP200
    {
        id: 'link_switch_ndp200',
        from: 'switch',
        to: 'ndp200',
        type: 'lan',
        color: TOPOLOGY_CONFIG.colors.lan,
        dashed: false,
        label: 'Gigabit LAN',
        pathType: 'orthogonal',
        points: [[605, 520], [735, 520], [735, 495], [800, 495]]
    },
    // Classroom C: SL100 (Default lacks broadcast decoder)
    {
        id: 'link_switch_sl100',
        from: 'switch',
        to: 'sl100',
        type: 'lan',
        color: TOPOLOGY_CONFIG.colors.lan,
        dashed: false,
        label: 'LAN Control',
        pathType: 'orthogonal',
        points: [[605, 530], [725, 530], [725, 685], [800, 685]]
    },
    // Corridor: MBX100
    {
        id: 'link_switch_mbx_c',
        from: 'switch',
        to: 'mbx_corridor',
        type: 'lan',
        color: TOPOLOGY_CONFIG.colors.lan,
        dashed: false,
        label: 'Gigabit LAN',
        pathType: 'orthogonal',
        points: [[605, 540], [715, 540], [715, 875], [800, 875]]
    },
    // Library: MBX100
    {
        id: 'link_switch_mbx_l',
        from: 'switch',
        to: 'mbx_library',
        type: 'lan',
        color: TOPOLOGY_CONFIG.colors.lan,
        dashed: false,
        label: 'Gigabit LAN',
        pathType: 'orthogonal',
        points: [[605, 550], [705, 550], [705, 1065], [800, 1065]]
    },

    // 7. HDMI Video Links (#FF4136 Red) - Straight horizontal from Terminal to Screen
    {
        id: 'link_ndp600_ifp_a',
        from: 'ndp600',
        to: 'ifp_a',
        type: 'hdmi',
        color: TOPOLOGY_CONFIG.colors.hdmi,
        dashed: false,
        label: 'HDMI Video',
        pathType: 'linear',
        points: [[940, 115], [1020, 115]]
    },
    {
        id: 'link_nmp_ifp_b',
        from: 'nmp',
        to: 'ifp_b',
        type: 'hdmi',
        color: TOPOLOGY_CONFIG.colors.hdmi,
        dashed: false,
        label: 'HDMI Video',
        pathType: 'linear',
        points: [[940, 305], [1020, 305]]
    },
    {
        id: 'link_ndp200_ifp_h',
        from: 'ndp200',
        to: 'ifp_h',
        type: 'hdmi',
        color: TOPOLOGY_CONFIG.colors.hdmi,
        dashed: false,
        label: 'HDMI 4K',
        pathType: 'linear',
        points: [[940, 495], [1020, 495]]
    },
    {
        id: 'link_sl100_ifp_sl',
        from: 'sl100',
        to: 'ifp_sl',
        type: 'hdmi',
        color: TOPOLOGY_CONFIG.colors.hdmi,
        dashed: false,
        label: 'HDMI Video',
        pathType: 'linear',
        points: [[940, 685], [1020, 685]]
    },
    {
        id: 'link_mbx_c_disp_c',
        from: 'mbx_corridor',
        to: 'disp_c',
        type: 'hdmi',
        color: TOPOLOGY_CONFIG.colors.hdmi,
        dashed: false,
        label: 'HDMI Video',
        pathType: 'linear',
        points: [[940, 875], [1020, 875]]
    },
    {
        id: 'link_mbx_l_disp_l',
        from: 'mbx_library',
        to: 'disp_l',
        type: 'hdmi',
        color: TOPOLOGY_CONFIG.colors.hdmi,
        dashed: false,
        label: 'HDMI Video',
        pathType: 'linear',
        points: [[940, 1065], [1020, 1065]]
    },

    // 8. Audio In/Out Links (#2ECC40 Green) - Swoops smoothly UNDERNEATH the screen!
    {
        id: 'link_ndp600_spk_a',
        from: 'ndp600',
        to: 'spk_a',
        type: 'audio',
        color: TOPOLOGY_CONFIG.colors.audio,
        dashed: false,
        label: 'Audio (Amped)',
        pathType: 'cubic',
        points: [[940, 160], [1010, 195], [1140, 195], [1210, 160]]
    },
    {
        id: 'link_nmp_spk_b',
        from: 'nmp',
        to: 'spk_b',
        type: 'audio',
        color: TOPOLOGY_CONFIG.colors.audio,
        dashed: false,
        label: 'Audio (Amped)',
        pathType: 'cubic',
        points: [[940, 350], [1010, 385], [1140, 385], [1210, 350]]
    },
    {
        id: 'link_ndp200_spk_h',
        from: 'ndp200',
        to: 'spk_h',
        type: 'audio',
        color: TOPOLOGY_CONFIG.colors.audio,
        dashed: false,
        label: 'Line Out / Audio',
        pathType: 'cubic',
        points: [[940, 540], [1010, 575], [1140, 575], [1210, 540]]
    },
    {
        id: 'link_sl100_spk_sl',
        from: 'sl100',
        to: 'spk_sl',
        type: 'audio',
        color: TOPOLOGY_CONFIG.colors.audio,
        dashed: false,
        label: 'Audio (Local)',
        pathType: 'cubic',
        points: [[940, 730], [1010, 765], [1140, 765], [1210, 730]]
    },
    {
        id: 'link_mbx_c_spk_c',
        from: 'mbx_corridor',
        to: 'spk_c',
        type: 'audio',
        color: TOPOLOGY_CONFIG.colors.audio,
        dashed: false,
        label: 'Audio Out',
        pathType: 'cubic',
        points: [[940, 920], [1010, 955], [1140, 955], [1210, 920]]
    },
    {
        id: 'link_mbx_l_spk_l',
        from: 'mbx_library',
        to: 'spk_l',
        type: 'audio',
        color: TOPOLOGY_CONFIG.colors.audio,
        dashed: false,
        label: 'Audio Out',
        pathType: 'cubic',
        points: [[940, 1110], [1010, 1145], [1140, 1145], [1210, 1110]]
    }
    ];
})(window.QnexApp);
