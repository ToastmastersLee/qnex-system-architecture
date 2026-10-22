/** Spanish interface and scenario descriptions. */
window.I18N_DATA.es = {
    media_server_option: 'Servidor multimedia (opcional)',
    export_png: 'Exportar PNG', export_busy: 'Exportando…', export_success: 'PNG guardado',
    export_error: 'No se pudo exportar el PNG. Inténtelo de nuevo o recargue la página.',
    app_title: 'Simulador de arquitectura del sistema', app_tag: 'Formación en línea v3.1',
    app_subtitle: 'Simulación interactiva del flujo de señales según las especificaciones de cableado de Q-NEX',
    theme_light: '☀️ Tema: claro', theme_dark: '🌙 Tema: oscuro', lang_btn: '🌐 Español',
    tour_btn: '🎓 Guía de inicio', sound_on: '🔊 Sonido: activado', sound_off: '🔇 Sonido: silenciado',
    pause: '⏸️ Pausar', play: '▶️ Reproducir',
    speed_slow: '0.5x Lento', speed_normal: '1.0x Velocidad normal', speed_fast: '2.0x Rápido',
    reset: '🔄 Restablecer topología', fullscreen_enter: '⛶ Pantalla completa', fullscreen_exit: '🗗 Salir de pantalla completa',
    settings_btn: 'Herramientas y ajustes', settings_btn_text: 'Más', settings_heading: 'Herramientas y ajustes',
    scenarios_toggle_btn: 'Escenario: ', scenarios_collapse_btn: 'Contraer ▴',
    setting_speed_label: 'Velocidad', setting_sound_label: 'Efectos de sonido', setting_theme_label: 'Tema',
    setting_lang_label: 'Idioma', setting_fullscreen_label: 'Visualización',
    sidebar_collapse_btn: '📋 Ocultar detalles', sidebar_expand_btn: '📋 Mostrar detalles',
    sidebar_heading: '📋 Detalles y normas', sidebar_close: 'Ocultar ❯', sidebar_tab: '❮ Mostrar detalles',
    scenario_bar_title: 'Escenarios de formación:',
    scenarios: {
        standby: {
            btn: '🌐 Espera y topología', badge: 'EN ESPERA', title: 'Topología IoT en espera y señales de actividad',
            desc: 'Los terminales Q-NEX mantienen conexiones MQTT ligeras con la nube para comprobar su estado en línea. La distribución de audio y vídeo del campus se realiza en la red local.'
        },
        live_broadcast: {
            btn: '📡 Emisión en directo (RTMP)', badge: 'EN DIRECTO', title: 'Distribución de vídeo en directo por el campus',
            desc: 'El servidor multimedia distribuye vídeo RTMP a los terminales mediante la LAN Gigabit. En esta configuración, SL100 se dedica a las presentaciones locales y no recibe la emisión en directo.'
        },
        bell_music: {
            btn: '🎵 Timbres y música programados', badge: 'AUDIO PROGRAMADO', title: 'Timbres escolares y música del almuerzo',
            desc: 'El servidor multimedia envía audio programado a NDP600, NMP311, NDP200 y a los MBX del pasillo y la biblioteca. Los amplificadores integrados o el sistema de sonido externo alimentan los altavoces. SL100 no participa en esta emisión.'
        },
        cloud_control: {
            btn: '⚡ Control desde la nube (MQTT)', badge: 'CONTROL REMOTO', title: 'Control centralizado y gestión IoT desde la nube',
            desc: 'El administrador activa el encendido por lotes desde la consola web o la aplicación. Los comandos MQTT pasan por Q-NEX Cloud, la puerta de enlace y el conmutador hasta los terminales del aula.'
        },
        emergency_alert: {
            btn: '🚨 Aviso de emergencia por texto', badge: 'AVISO DE TEXTO', title: 'Aviso de evacuación del campus por texto',
            desc: 'Q-NEX Cloud envía instrucciones de evacuación directamente por MQTT. No requiere servidor multimedia. Los terminales, incluido SL100, muestran el aviso en las pantallas conectadas. Este escenario representa un aviso de texto.'
        },
        local_teaching: {
            btn: '💻 Clase local (sin tráfico LAN)', badge: 'AV LOCAL', title: 'Clase y presentación audiovisual local',
            desc: 'Las señales del portátil, visualizador y micrófono se envían a pantallas y altavoces por las rutas AV locales de NDP600, NMP311, NDP200 o SL100, sin consumir ancho de banda de streaming de la LAN.'
        }
    },
    zones: {
        cloud_plane: '☁️ Internet / Gestión en la nube pública', campus_lan: '🏫 Red local Gigabit del campus',
        room_a: 'Aula A (atril de control multifunción)', room_b: 'Aula B (procesador NMP)',
        room_h: 'Auditorio (atril NDP200)', room_sl: 'Aula C (atril inteligente SL100)',
        room_c: 'Pasillo (difusión MBX)', room_l: 'Biblioteca (audio y avisos)'
    },
    inspector: {
        role_label: 'FUNCIÓN EN EL SISTEMA', ports_label: 'PUERTOS Y CONECTORES', scenarios_label: 'APLICACIONES Y USOS',
        scenario_teaching: 'Clases y AV', scenario_control: 'Control centralizado', scenario_cascading: 'Coordinación del campus',
        test_btn_prefix: '🚀 Enviar', test_btn_suffix: 'diagnóstico', ping_success: 'El equipo responde correctamente (RTT: 4.2ms)'
    },
    legend: {
        title: 'NORMAS DE CABLEADO', filter_hint: 'Filtrar capas', lan: '🟦 LAN / Ethernet (#0074D9)',
        hdmi: '🔴 HDMI / Vídeo (#FF4136)', audio: '🟢 Audio / Cable de altavoz (#2ECC40)',
        wireless: '📶 Inalámbrico / 4G / Micrófono UHF (discontinuo)'
    },
    tour: { step_badge: 'Paso', prev_btn: '← Anterior', next_btn: 'Siguiente →', finish_btn: 'Finalizar formación 🎉', close_btn: '✕ Cerrar' }
};
