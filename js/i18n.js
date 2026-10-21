/**
 * Q-NEX System Architecture Simulator - Bilingual i18n Dictionaries (Chinese / English)
 */

const I18N_DATA = {
    zh: {
        media_server_option: 'Media Server（可选）',
        export_png: '导出 PNG',
        export_busy: '正在导出…',
        export_success: 'PNG 已导出',
        export_error: 'PNG 导出失败，请重试；如仍失败，请刷新页面。',
        app_title: '系统架构全景仿真器 (System Architecture Simulator)',
        app_tag: 'Online Training v3.0',
        app_subtitle: '基于《Q-NEX 产品线拓扑图设计规范》的动态信号流仿真与新手教学系统',
        
        // Header Controls
        theme_light: '<span>☀️</span> 皮肤：浅色明亮',
        theme_dark: '<span>🌙</span> 皮肤：深色模式',
        lang_btn: '<span>🌐</span> 语言：中文',
        tour_btn: '<span>🎓</span> 新手培训向导',
        sound_on: '<span>🔊</span> 音效：已开启',
        sound_off: '<span>🔇</span> 音效：已静音',
        pause: '<span>⏸️</span> 暂停',
        play: '<span>▶️</span> 播放',
        speed_slow: '0.5x 慢速演示',
        speed_normal: '1.0x 正常速度',
        speed_fast: '2.0x 快速流向',
        reset: '<span>🔄</span> 重置拓扑',
        fullscreen_enter: '<span>⛶</span> 全屏显示',
        fullscreen_exit: '<span>🗗</span> 退出全屏',
        settings_btn: '更多设置',
        settings_btn_text: '更多',
        scenarios_toggle_btn: '场景：',
        scenarios_collapse_btn: '收起 ▴',
        settings_heading: '工具与设置',
        setting_speed_label: '动画速度',
        setting_sound_label: '交互音效',
        setting_theme_label: '界面皮肤',
        setting_lang_label: '显示语言',
        setting_fullscreen_label: '屏幕显示',
        sidebar_collapse_btn: '<span>📋</span> 收起说明',
        sidebar_expand_btn: '<span>📋</span> 展开说明',
        sidebar_heading: '📋 详细说明与规范',
        sidebar_close: '收起 ❯',
        sidebar_tab: '❮ 展开说明',

        // Scenario Bar
        scenario_bar_title: '培训演练场景：',
        scenarios: {
            standby: {
                btn: '<span>🌐</span> 待机心跳与拓扑',
                badge: '待机总览',
                title: '校园物联待机拓扑 (Normal Standby & IoT Heartbeat)',
                desc: '全校所有 Q-NEX 终端（数字讲台、NMP处理器、SL100、公共区域 MBX 媒体盒）与云端管理平台保持轻量 MQTT 心跳连接，用于实时检测在线/离线状态；校园局域网与流媒体引擎处于低功耗就绪状态。'
            },
            live_broadcast: {
                btn: '<span>📡</span> 全校视讯直播 (RTMP推流)',
                badge: '视讯直播',
                title: '全校视讯直播 (Campus Live Streaming & RTMP Distribution)',
                desc: '【重点演练】：流媒体服务器作为内网分发中心，将超高清直播流推往各终端；【核心考点】：SL100 专为本地多媒体互动演示设计，流媒体不往 SL100 走，有效节省网络带宽。'
            },
            bell_music: {
                btn: '<span>🎵</span> 定时打铃与午间音乐 (内网音频)',
                badge: '定时广播',
                title: '作息打铃与午间音乐 (Scheduled Bell & Lunch Break Music)',
                desc: '【重点演练】：打铃本质上是流媒体音频分发。流媒体服务器内置定时作息引擎自动触发铃声与轻音乐，通过校园千兆内网推送到各个终端（Classroom A 的 NDP600、Classroom B 的 NMP311、报告厅的 NDP200 以及走廊/图书馆的 MBX），终端内置/外接功放驱动扬声器同步播放作息打铃与背景音乐！'
            },
            cloud_control: {
                btn: '<span>⚡</span> 云端批量控制 (MQTT信令)',
                badge: '云端中控',
                title: '云端批量统一控制 (Cloud Remote Control & IoT Management)',
                desc: '【重点演练】：管理员在 PC Web Console 或手机 App 点击一键批量开机，指令经由 Q-NEX 云端 -> 网关 -> 交换机秒级下发，教室设备统一通电并同步自检。'
            },
            emergency_alert: {
                btn: '<span>🚨</span> 突发火警文本广播',
                badge: '云端文本广播',
                title: '突发火警文本广播 (Emergency Evacuation Text Notice)',
                desc: '【应急文本下发】：管理员或消防联动通过 Q-NEX 云端直接下发紧急疏散文本通知（基于轻量 MQTT 协议），各终端大屏接收并显示撤离指引。【核心考点】：火警系云端直接下发的纯文本广播，无需流媒体服务器，SL100 等讲台终端亦全面支持文本通知接收与大屏展示。'
            },
            local_teaching: {
                btn: '<span>💻</span> 教室本地授课模式 (零网络开销)',
                badge: '本地模式',
                title: '教室本地教学授课模式 (Classroom Local Teaching Mode)',
                desc: '【售前培训点】：NDP600、NMP311、NDP200 与 SL100 均全面支持本地教学授课模式！教师在讲台连接笔记本课件、实物展台或讲台鹅颈麦，音视频信号直接经由终端本地 HDMI 矩阵与内置功放切换输出至大屏与音箱，完全不消耗校园网络带宽，彰显 Q-NEX 强大的本地自主中控能力。'
            }
        },

        // Canvas Zones & Rooms
        zones: {
            cloud_plane: '☁️ Internet / Public Cloud Management Plane (公有云信令中枢与外网访问区)',
            campus_lan: '🏫 Campus Gigabit Local Area Network (校园千兆局域网 / 核心内网保护区)',
            room_a: 'Classroom A (多功能集控讲台方案)',
            room_b: 'Classroom B (标准多媒体教室 - NMP中控方案)',
            room_h: 'Lecture Hall (大型报告厅 - NDP200落地讲台方案)',
            room_sl: 'Classroom C (高端精品智慧教室 - SL100讲台方案)',
            room_c: 'Corridor (公共教学走廊 - MBX广播电视)',
            room_l: 'Library (图书馆阅览大厅 - 视听与通知)'
        },

        // Inspector & Legend
        inspector: {
            role_label: '设备架构职责 (Role in Architecture)',
            ports_label: '关键端口与物理接口 (I/O Ports)',
            scenarios_label: '核心业务与使用场景 (Application Scenarios)',
            scenario_teaching: '教学互动场景',
            scenario_control: '设备集控场景',
            scenario_cascading: '全校级联管控 (Cascading)',
            test_btn_prefix: '🚀 发送',
            test_btn_suffix: '自检诊断报文',
            ping_success: '[自检成功] 设备响应正常 (RTT: 4.2ms)'
        },
        legend: {
            title: '接线规范图例 (Wiring Standards)',
            filter_hint: '可勾选过滤图层',
            lan: '🟦 LAN / 网络线 / PoE+ (#0074D9)',
            hdmi: '🔴 HDMI / 4K 视讯传输线 (#FF4136)',
            audio: '🟢 Audio / 音频线 / 喇叭线 (#2ECC40)',
            wireless: '📶 无线网络 / 4G / 麦克风 (虚线)'
        },

        // Tour Steps
        tour: {
            step_badge: '步骤',
            prev_btn: '← 上一步',
            next_btn: '下一步 →',
            finish_btn: '完成培训 🎉',
            close_btn: '✕ 关闭'
        }
    },

    en: {
        media_server_option: 'Media Server (optional)',
        export_png: 'Export PNG',
        export_busy: 'Exporting…',
        export_success: 'PNG exported',
        export_error: 'PNG export failed. Please retry or reload the page.',
        app_title: 'System Architecture Simulator',
        app_tag: 'Online Training v3.0',
        app_subtitle: 'Interactive Dynamic Signal Flow Simulator based on Q-NEX Topology Wiring Specifications',

        // Header Controls
        theme_light: '<span>☀️</span> Theme: Light',
        theme_dark: '<span>🌙</span> Theme: Dark',
        lang_btn: '<span>🌐</span> Lang: English',
        tour_btn: '<span>🎓</span> Newbie Guide',
        sound_on: '<span>🔊</span> Sound: ON',
        sound_off: '<span>🔇</span> Sound: Muted',
        pause: '<span>⏸️</span> Pause',
        play: '<span>▶️</span> Play',
        speed_slow: '0.5x Slow Motion',
        speed_normal: '1.0x Normal Speed',
        speed_fast: '2.0x Fast Stream',
        reset: '<span>🔄</span> Reset Topology',
        fullscreen_enter: '<span>⛶</span> Fullscreen',
        fullscreen_exit: '<span>🗗</span> Exit Fullscreen',
        settings_btn: 'More Settings',
        settings_btn_text: 'More',
        scenarios_toggle_btn: 'Scenario: ',
        scenarios_collapse_btn: 'Collapse ▴',
        settings_heading: 'Tools & Settings',
        setting_speed_label: 'Animation Speed',
        setting_sound_label: 'Sound Effects',
        setting_theme_label: 'Color Theme',
        setting_lang_label: 'Language',
        setting_fullscreen_label: 'Display Mode',
        sidebar_collapse_btn: '<span>📋</span> Hide Inspector',
        sidebar_expand_btn: '<span>📋</span> Show Inspector',
        sidebar_heading: '📋 Details & Standards',
        sidebar_close: 'Hide ❯',
        sidebar_tab: '❮ Show Inspector',

        // Scenario Bar
        scenario_bar_title: 'Training Scenarios:',
        scenarios: {
            standby: {
                btn: '<span>🌐</span> Standby & Topology',
                badge: 'STANDBY',
                title: 'Campus IoT Standby Topology (Normal Standby & IoT Heartbeat)',
                desc: 'All Q-NEX terminals across campus (Smart Podiums, NMP, SL100, and corridor/library MBX media boxes) maintain lightweight MQTT heartbeat connections with Q-NEX Cloud to determine real-time online/offline status.'
            },
            live_broadcast: {
                btn: '<span>📡</span> Live Broadcast (RTMP)',
                badge: 'LIVE ON AIR',
                title: 'Campus Live Streaming & Video Distribution (RTMP Distribution)',
                desc: '[Key Architecture Lesson]: Media Server distributes video across campus Gigabit LAN to endpoints. [Key Exam Rule]: SL100 focuses on local interactive lectures; live streams do not route to SL100, conserving network bandwidth.'
            },
            bell_music: {
                btn: '<span>🎵</span> Bell & Lunch Music (Audio)',
                badge: 'SCHEDULED AUDIO',
                title: 'Scheduled Bell & Lunch Break Music (Internal LAN Broadcast)',
                desc: '[Key Architecture Lesson]: School bells and BGM are streaming audio. Media Server scheduled engine automatically dispatches audio streams via campus LAN to all endpoints—NDP600 in Classroom A, NMP311 in Classroom B, NDP200 in Lecture Hall, and MBX in Corridor/Library. Built-in and hall amplifiers drive connected speakers synchronously!'
            },
            cloud_control: {
                btn: '<span>⚡</span> Cloud Control (MQTT)',
                badge: 'CLOUD CONTROL',
                title: 'Centralized Cloud Remote Control & IoT Management (MQTT Control)',
                desc: '[Key Architecture Lesson]: Administrator clicks batch power-on from PC Web Console or Mobile App. Lightweight MQTT commands traverse Q-NEX Cloud -> Gateway -> Switch -> Endpoints in milliseconds.'
            },
            emergency_alert: {
                btn: '<span>🚨</span> Emergency Text Broadcast',
                badge: 'TEXT BROADCAST',
                title: 'Campus Emergency Evacuation Text Broadcast',
                desc: '[Emergency Text Push]: Administrators or fire linkage systems trigger emergency evacuation text notices directly from Q-NEX Cloud via lightweight MQTT. [Key Exam Rule]: Fire alerts are text-only broadcasts pushed from the Cloud without needing the Media Server; SL100 natively supports text broadcast display.'
            },
            local_teaching: {
                btn: '<span>💻</span> Local Teaching Mode (No LAN)',
                badge: 'LOCAL AV',
                title: 'Classroom Local Teaching & AV Presentation Mode',
                desc: '[Presales Key Point]: NDP600, NMP311, NDP200, and SL100 all fully support local teaching mode! Teachers connect laptops, document cameras, or podium gooseneck mics; AV signals route directly via local HDMI matrices and amplifiers to room displays and speakers without consuming campus LAN bandwidth, demonstrating robust independent control.'
            }
        },

        // Canvas Zones & Rooms
        zones: {
            cloud_plane: '☁️ Internet / Public Cloud Management Plane (Q-NEX Cloud & Remote Admin)',
            campus_lan: '🏫 Campus Gigabit Local Area Network (Core Intranet Protected Zone)',
            room_a: 'Classroom A (Multi-Function Control Lectern)',
            room_b: 'Classroom B (Standard Classroom - NMP Processor)',
            room_h: 'Lecture Hall (Auditorium - NDP200 Podium)',
            room_sl: 'Classroom C (Premium Smart Classroom - SL100 Podium)',
            room_c: 'Corridor (Public Area - MBX Broadcast Display)',
            room_l: 'Library (Reading Hall - Audio & Bulletin)'
        },

        // Inspector & Legend
        inspector: {
            role_label: 'ROLE IN ARCHITECTURE',
            ports_label: 'I/O PORTS & CONNECTORS',
            scenarios_label: 'APPLICATION & USAGE SCENARIOS',
            scenario_teaching: 'Teaching & Interactive AV',
            scenario_control: 'Central Control & Relays',
            scenario_cascading: 'Campus Cascading & Sync',
            test_btn_prefix: '🚀 Send',
            test_btn_suffix: 'Self-Test Ping',
            ping_success: '[Diagnostic OK] Device responding normally (RTT: 4.2ms)'
        },
        legend: {
            title: 'WIRING STANDARDS',
            filter_hint: 'Filter Layers',
            lan: '🟦 LAN / Ethernet / PoE+ (#0074D9)',
            hdmi: '🔴 HDMI / Video Transmission (#FF4136)',
            audio: '🟢 Audio / Speaker Cable (#2ECC40)',
            wireless: '📶 Wireless / 4G / Mic UHF (Dashed)'
        },

        // Tour Steps
        tour: {
            step_badge: 'Step',
            prev_btn: '← Previous',
            next_btn: 'Next Step →',
            finish_btn: 'Finish Tour 🎉',
            close_btn: '✕ Close'
        }
    }
};

window.QnexApp.data.i18n = I18N_DATA;
window.I18N_DATA = I18N_DATA;
