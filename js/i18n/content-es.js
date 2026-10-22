/** Spanish device descriptions and training content. */
window.QnexApp.data.localeContent ??= {};
window.QnexApp.data.localeContent.es = {
    locations: ['Internet / Administración remota', 'Internet / Administración móvil', 'Nube pública', 'Perímetro de la LAN', 'Núcleo de la LAN', 'Servicios de la LAN'],
    devices: {
        console: ['Consola de administración web', 'Consola en la nube para gestionar horarios, emisiones programadas, consumo energético y estado de los equipos desde un navegador.'],
        app: ['Aplicación de administración móvil', 'Permite a docentes y administradores controlar alimentación, emisiones, alertas y acceso al atril desde el teléfono.'],
        cloud: ['Servidor Q-NEX Cloud', 'Gestiona autenticación, registro de equipos, señales MQTT y tareas programadas. No transporta los flujos de vídeo de gran volumen de la red interna.'],
        router: ['Puerta de enlace y cortafuegos', 'Gestiona NAT y las comunicaciones MQTT/HTTPS entre el campus e Internet y protege los equipos AV internos frente a accesos no autorizados.'],
        switch: ['Conmutador Gigabit PoE+ gestionable', 'Conecta los terminales del campus, proporciona alimentación PoE+ y distribuye vídeo en directo y audio programado por la LAN.'],
        mediaserver: ['Servidor multimedia', 'Instalado en la LAN, almacena audio y distribuye timbres y vídeo RTMP localmente, reduciendo las descargas individuales desde Internet.'],
        ndp600: ['Atril inteligente de sobremesa NDP600', 'Integra pantalla de escritura, panel de control, matriz HDMI, vídeo y control táctil Type-C, relés y amplificador para gestionar el AV del aula.'],
        nmp: ['Procesador multimedia en red', 'Unidad de control del aula estándar con matriz HDMI, conmutador Gigabit, amplificador de 2×40W, relés de alimentación y control RS232/RS485/IR.'],
        ndp200: ['Atril inteligente de pie NDP200', 'Para auditorios y aulas grandes. Integra NMP311, pantalla de escritura, elevación eléctrica, micrófonos de cuello de cisne y conexión a pantallas externas.'],
        sl100: ['Atril digital inteligente SL100', 'Integra matrices HDMI y USB KVM, panel de control de 8,8 pulgadas y elevación eléctrica. En esta configuración admite clases locales y avisos de texto desde la nube, sin recibir streaming del campus.'],
        mbx_corridor: ['Receptor multimedia MBX100 del pasillo', 'Terminal audiovisual para zonas comunes con supervisión MQTT, audio programado, señalización HDMI y control remoto.'],
        mbx_library: ['Receptor multimedia MBX100 de la biblioteca', 'Gestiona señalización, música ambiental y avisos de cierre, con supervisión en la nube y notificaciones de texto.'],
        ifp_a: ['Pantalla interactiva del aula A', 'Muestra el vídeo HDMI del NDP600 y permite retorno táctil, pizarra y visualización de emisiones en directo.'],
        spk_a: ['Altavoces pasivos del aula A', 'Conectados al amplificador de 2×40W del NDP600 para reproducir la voz del docente y el audio de los materiales.'],
        ifp_b: ['Pantalla interactiva del aula B', 'Recibe la salida HDMI del NMP311 para mostrar presentaciones, contenido programado y emisiones del campus.'],
        spk_b: ['Altavoces pasivos del aula B', 'Conectados al amplificador del NMP311 para reproducir timbres, música del almuerzo y audio de clase.'],
        ifp_h: ['Pantalla de gran formato del auditorio', 'Recibe HDMI desde NDP200 para mostrar presentaciones y vídeo del escenario.'],
        spk_h: ['Sistema de sonido del auditorio', 'Recibe audio de nivel de línea del NDP200 y utiliza amplificación externa para cubrir el auditorio.'],
        ifp_sl: ['Pantalla interactiva del aula C', 'Muestra presentaciones y anotaciones locales del SL100, además de avisos de texto desde la nube sin servidor multimedia.'],
        spk_sl: ['Altavoces de pared del aula C', 'Reproducen el micrófono y los materiales del SL100. No participan en las emisiones musicales programadas del campus.'],
        disp_c: ['Pantalla informativa del pasillo', 'Conectada al MBX100 para mostrar noticias del centro, señalización y emisiones en directo del campus.'],
        spk_c: ['Altavoces de difusión del pasillo', 'Conectados al MBX100 para reproducir timbres y emisiones de audio en zonas comunes.'],
        disp_l: ['Pantalla informativa de la biblioteca', 'Muestra normas de préstamo, horarios, recomendaciones y avisos de emergencia por texto desde la nube.'],
        spk_l: ['Altavoces de techo de la biblioteca', 'Reproducen música ambiental y avisos de cierre a bajo volumen.']
    },
    applications: {
        console: ['Gestiona el calendario académico y las reservas AV.', 'Controla proyectores, pantallas, climatización e iluminación.', 'Agrupa equipos por edificio o curso para control y avisos masivos.'],
        app: ['Controla el acceso al atril y los recursos AV desde el móvil.', 'Consulta estados, conecta equipos y ejecuta reinicios.', 'Envía avisos de evacuación por texto desde el teléfono.'],
        cloud: ['Coordina calendarios y recursos entre campus.', 'Gestiona registros, actualizaciones OTA y tareas programadas.', 'Distribuye comandos MQTT y avisos de emergencia.'],
        mediaserver: ['Almacena localmente vídeos y audio de clase.', 'Programa timbres y música del almuerzo.', 'Distribuye vídeo RTMP y audio a través de la LAN.'],
        ndp600: ['Permite clases locales con escritura, Type-C y HDMI.', 'Controla pantallas, proyección, climatización y volumen.', 'Recibe emisiones, timbres y avisos de texto del campus.'],
        nmp: ['Conmuta portátil, visualizador y OPS y amplifica el audio.', 'Controla equipos mediante CPL20 y relés.', 'Ejecuta audio programado, encendido por lotes y avisos de texto.'],
        ndp200: ['Permite conferencias con escritura, pantallas y micrófonos.', 'Controla altura, iluminación del escenario y pantallas.', 'Integra la emisión del auditorio con timbres y avisos del campus.'],
        sl100: ['Permite presentaciones locales con escritura y Type-C.', 'Controla panel, elevación, USB KVM y cerradura electrónica.', 'Puede combinarse con audio Dante para simplificar el cableado.'],
        mbx_corridor: ['Muestra noticias y eventos en las pantallas del pasillo.', 'Programa alimentación de pantallas por RS232.', 'Recibe audio programado y avisos para zonas comunes.'],
        mbx_library: ['Muestra información de la biblioteca.', 'Gestiona pantallas y música ambiental a bajo volumen.', 'Recibe avisos de cierre y mensajes del campus o de emergencia.']
    },
    ports: {
        console: ['RJ45 / Wi-Fi', 'Navegador web (Chrome/Edge)', 'HTTPS / WSS API'],
        app: ['Red móvil 4G/5G', 'Wi-Fi del campus', 'Notificaciones (APNs/FCM)'],
        cloud: ['Servidor MQTT (1883/8883)', 'REST API (443)', 'WebSocket', 'Base de datos'],
        mediaserver: ['LAN Gigabit doble', 'RTMP (1935)', 'RTSP (554)', 'Motor de audio programado'],
        ndp600: ['LAN Gigabit', 'Matriz HDMI', 'Vídeo y control táctil Type-C', 'Salida de altavoces 2×40W', 'Relés de pantalla, proyección y climatización', 'RS232 / RS485 / IR'],
        nmp: ['LAN Gigabit (4×RJ45, 2×PoE)', 'Matriz HDMI 3×3', 'Salida de altavoces 2×40W', 'Relés de alimentación', 'RS232 / RS485 / IR'],
        ndp200: ['LAN Gigabit (4×RJ45, 2×PoE)', 'Matriz HDMI 3×3', 'Amplificador 2×40W / salida XLR', 'RS232 / RS485 / relés', 'Elevación eléctrica'],
        sl100: ['LAN Gigabit (4×RJ45)', 'HDMI 3×3 / USB KVM 3×3', 'Type-C (DP/65W PD/táctil/LAN)', 'Elevación eléctrica'],
        mbx_corridor: ['LAN Gigabit', 'Salida HDMI (4K@30Hz)', 'Salida de altavoces 2×20W', 'Salida de línea', 'Adaptador de 19V CC']
    },
    tour: [
        { title: 'Nube y administración remota', paragraphs: ['La consola web y la aplicación son interfaces de gestión. La nube se ocupa de autenticación, programación y señales de actividad MQTT.', 'El vídeo y audio de gran volumen se distribuyen localmente; siguen una ruta distinta de las señales de control en la nube.'] },
        { title: 'Servidor multimedia de la LAN', paragraphs: ['El servidor multimedia opcional distribuye vídeo en directo y audio programado en la red del campus.', 'La distribución interna reduce las conexiones individuales a Internet. Al desactivar esta opción se ocultan los escenarios y el paso de formación correspondientes.'] },
        { title: 'Selección de terminales: NDP, NMP, SL100 y MBX', paragraphs: ['NDP600 es un atril de sobremesa; NMP311 controla el aula estándar; NDP200 es un atril de pie. MBX cubre las emisiones de zonas comunes.', 'SL100 admite presentaciones locales y texto desde la nube. En esta configuración no recibe las emisiones de vídeo ni de música del campus.'] },
        { title: 'Pantallas y sistema de sonido', paragraphs: ['HDMI lleva vídeo del terminal a las pantallas. Los altavoces se conectan a la salida de amplificación adecuada o al sistema de sonido externo.', 'Las líneas verdes representan audio; se distinguen del cableado de red.'] },
        { title: 'Colores de cableado', paragraphs: ['Azul #0074D9: LAN / PoE+. Rojo #FF4136: HDMI. Verde #2ECC40: audio.', 'Morado #B10DC9: RS232 / RS485. Naranja #FF851B: relés. Línea discontinua: comunicación inalámbrica.'] }
    ]
};
