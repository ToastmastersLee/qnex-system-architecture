/** Bilingual display states for all simulator scenarios. */
(function (app) {
    const zh = {
            standby: {
                ifp_a:  { title: '集控讲台教室待机中', desc: '等待主讲教师刷卡或开机', badge: 'STANDBY', color: '#1e293b' },
                ifp_b:  { title: '标准教室待机中', desc: '当前无课程，处于节能待机', badge: 'STANDBY', color: '#1e293b' },
                ifp_h:  { title: '报告厅超大屏待机', desc: 'Q-NEX 统一欢迎桌面', badge: 'STANDBY', color: '#1e293b' },
                ifp_sl: { title: '高端精品讲台待机中', desc: '等待主讲人开机或连接笔记本', badge: 'STANDBY', color: '#1e293b' },
                disp_c: { title: '走廊校园资讯', desc: '今日气温 24℃ / 星期一', badge: 'SIGNAGE', color: '#0f172a' },
                disp_l: { title: '图书馆阅览大厅', desc: '闭馆时间：22:00 请保持安静', badge: 'NOTICE', color: '#0f172a' }
            },
            live_broadcast: {
                ifp_a:  { title: '🔴 全校直播：开学典礼校长致辞', desc: '1080P@60fps RTMP 实时视频推流', badge: 'LIVE ON AIR', color: '#b91c1c' },
                ifp_b:  { title: '🔴 全校直播：开学典礼校长致辞', desc: '1080P@60fps 同步低延迟接收', badge: 'LIVE ON AIR', color: '#b91c1c' },
                ifp_h:  { title: '🔴 全校直播主现场 (报告厅直播源)', desc: '主讲人发言画面正在全校分发中', badge: 'BROADCAST HOST', color: '#b91c1c' },
                ifp_sl: { title: '智能演讲台待机中', desc: '用于常规教室教学，未参与全校视讯推流', badge: 'STANDBY', color: '#1e293b' },
                disp_c: { title: '🔴 走廊电视直播：校长开学致辞', desc: '公共区域师生同步收看', badge: 'LIVE BROADCAST', color: '#b91c1c' },
                disp_l: { title: '🔴 图书馆静音直播：配字幕直播', desc: '避免噪音，画面滚动字幕', badge: 'LIVE SILENT', color: '#b91c1c' }
            },
            bell_music: {
                ifp_a:  { title: '🎵 作息打铃与午间音乐', desc: 'NDP600 内置功放驱动 PS610 播放中', badge: 'BGM PLAYING', color: '#047857' },
                ifp_b:  { title: '🎵 午间音乐电台 / 作息打铃', desc: '正在播放：校园轻音乐《卡农》', badge: 'BGM PLAYING', color: '#047857' },
                ifp_h:  { title: '🎵 报告厅作息广播 / 背景音乐', desc: 'NDP200 平衡音频送大厅扩声系统播放', badge: 'BGM PLAYING', color: '#047857' },
                ifp_sl: { title: '智能演讲台待机中', desc: '常规本地待机状态，无广播任务', badge: 'STANDBY', color: '#1e293b' },
                disp_c: { title: '🔔 走廊广播中：下课打铃与午休播音', desc: '走廊吸顶音箱立体声播放', badge: 'BELL & BGM', color: '#047857' },
                disp_l: { title: '📚 图书馆柔和背景音乐', desc: '轻柔古典音乐伴读中', badge: 'SOFT BGM', color: '#047857' }
            },
            cloud_control: {
                ifp_a:  { title: '⚡ 云端批量开机与锁屏控制', desc: '已接收 Q-NEX 云端控制指令', badge: 'CLOUD SYNC', color: '#0369a1' },
                ifp_b:  { title: '⚡ 设备电源自检与输入源轮询', desc: 'MQTT 心跳检测正常', badge: 'CLOUD SYNC', color: '#0369a1' },
                ifp_h:  { title: '⚡ 报告厅设备统一加电', desc: '幕布、灯光、投影联动中', badge: 'CLOUD SYNC', color: '#0369a1' },
                ifp_sl: { title: '⚡ 云端批量控制响应', desc: '设备定时开关机与自检正常 (MQTT 控制有效)', badge: 'CLOUD SYNC', color: '#0369a1' },
                disp_c: { title: '⚡ 走廊显示屏唤醒', desc: '按作息时间表统一通电', badge: 'CLOUD SYNC', color: '#0369a1' },
                disp_l: { title: '⚡ 图书馆终端在线自检', desc: '巡检状态：良好', badge: 'CLOUD SYNC', color: '#0369a1' }
            },
            emergency_alert: {
                ifp_a:  { title: '疏散文本通知：请有序撤离', desc: '实验楼发生消防告警，请按安全通道撤离', badge: '云端通知', color: '#1e293b' },
                ifp_b:  { title: '疏散文本通知：请有序撤离', desc: '按指定逃生通道撤离至操场安全区域', badge: '云端通知', color: '#1e293b' },
                ifp_h:  { title: '疏散文本通知：请有序撤离', desc: '报告厅已开启所有应急安全出口', badge: '云端通知', color: '#1e293b' },
                ifp_sl: { title: '疏散文本通知：请有序撤离', desc: 'SL100 支持云端文本广播：显示疏散通知 (无需 Media Server)', badge: '云端通知', color: '#1e293b' },
                disp_c: { title: '疏散文本通知：请走安全通道', desc: '请勿使用电梯，走安全通道', badge: '云端通知', color: '#1e293b' },
                disp_l: { title: '疏散文本通知：请有序撤离', desc: '请读者保持镇静，听从管理员指挥', badge: '云端通知', color: '#1e293b' }
            },
            local_teaching: {
                ifp_a:  { title: '💻 教师笔记本 4K 课件演示', desc: 'NDP600 本地 HDMI 切换 (零网络开销)', badge: 'LOCAL PPT', color: '#1d4ed8' },
                ifp_b:  { title: '💻 多媒体课件与实物展台授课', desc: 'NMP311 本地 HDMI/展台直通 (零网络开销)', badge: 'LOCAL DOC', color: '#1d4ed8' },
                ifp_h:  { title: '🎤 报告厅学术演讲与双屏投影', desc: 'NDP200 讲台鹅颈麦扩声与双屏直通 (零网络开销)', badge: 'LOCAL LECTURE', color: '#1d4ed8' },
                ifp_sl: { title: '💻 SL100 本地互动课件演示', desc: '23.8寸电容屏本地信号直通 (完全独立运行)', badge: 'LOCAL PPT', color: '#1d4ed8' },
                disp_c: { title: '走廊校园资讯', desc: '今日气温 24℃ / 正常轮播', badge: 'SIGNAGE', color: '#0f172a' },
                disp_l: { title: '图书馆公告栏', desc: '读者自主借还书正常', badge: 'NOTICE', color: '#0f172a' }
            }
        };

    const en = {
            standby: {
                ifp_a:  { title: 'Control Lectern Standby', desc: 'Waiting for teacher RFID badge swipe', badge: 'STANDBY', color: '#1e293b' },
                ifp_b:  { title: 'Standard Classroom Standby', desc: 'No scheduled class, power-saving mode', badge: 'STANDBY', color: '#1e293b' },
                ifp_h:  { title: 'Auditorium Dual Display Standby', desc: 'Q-NEX Unified Welcome Screen', badge: 'STANDBY', color: '#1e293b' },
                ifp_sl: { title: 'Premium Podium Standby', desc: 'Ready for presenter presentation or laptop input', badge: 'STANDBY', color: '#1e293b' },
                disp_c: { title: 'Corridor Digital Signage', desc: 'Campus Weather 24°C / Monday', badge: 'SIGNAGE', color: '#0f172a' },
                disp_l: { title: 'Library Information Board', desc: 'Closing Time: 22:00 Please keep quiet', badge: 'NOTICE', color: '#0f172a' }
            },
            live_broadcast: {
                ifp_a:  { title: '🔴 Campus Live: Principal Speech', desc: '1080P@60fps RTMP Video Stream', badge: 'LIVE ON AIR', color: '#b91c1c' },
                ifp_b:  { title: '🔴 Campus Live: Principal Speech', desc: '1080P@60fps Low-Latency Sync', badge: 'LIVE ON AIR', color: '#b91c1c' },
                ifp_h:  { title: '🔴 Campus Live Host Stage (Auditorium)', desc: 'Speaker stream pushing campus-wide', badge: 'BROADCAST HOST', color: '#b91c1c' },
                ifp_sl: { title: 'Smart Podium Standby', desc: 'Configured for local teaching; not receiving campus live stream', badge: 'STANDBY', color: '#1e293b' },
                disp_c: { title: '🔴 Corridor TV Live: Principal Speech', desc: 'Public broadcast across hallway', badge: 'LIVE BROADCAST', color: '#b91c1c' },
                disp_l: { title: '🔴 Library Silent Live Stream', desc: 'Muted audio with live captions', badge: 'LIVE SILENT', color: '#b91c1c' }
            },
            bell_music: {
                ifp_a:  { title: '🎵 Bell Chime & Lunch Music', desc: 'NDP600 built-in amp driving PS610 speakers', badge: 'BGM PLAYING', color: '#047857' },
                ifp_b:  { title: '🎵 Lunch Music / School Chime', desc: 'Playing: Campus Classic Melody', badge: 'BGM PLAYING', color: '#047857' },
                ifp_h:  { title: '🎵 Auditorium Chime & BGM', desc: 'NDP200 line-out driving hall sound system', badge: 'BGM PLAYING', color: '#047857' },
                ifp_sl: { title: 'Smart Podium Standby', desc: 'Standard local standby, no broadcast tasks', badge: 'STANDBY', color: '#1e293b' },
                disp_c: { title: '🔔 Hallway Chime & Lunch Broadcast', desc: 'Ceiling speakers playing stereo audio', badge: 'BELL & BGM', color: '#047857' },
                disp_l: { title: '📚 Library Soft Background Music', desc: 'Gentle ambient reading acoustics', badge: 'SOFT BGM', color: '#047857' }
            },
            cloud_control: {
                ifp_a:  { title: '⚡ Cloud Batch Power & Lock Control', desc: 'Q-NEX Cloud IoT Command Received', badge: 'CLOUD SYNC', color: '#0369a1' },
                ifp_b:  { title: '⚡ Device Self-Test & Source Polling', desc: 'MQTT heartbeat signal nominal', badge: 'CLOUD SYNC', color: '#0369a1' },
                ifp_h:  { title: '⚡ Auditorium Hardware Power-On', desc: 'Motorized screen & projector triggered', badge: 'CLOUD SYNC', color: '#0369a1' },
                ifp_sl: { title: '⚡ Cloud Control Responding', desc: 'IoT power management & telemetry nominal via MQTT', badge: 'CLOUD SYNC', color: '#0369a1' },
                disp_c: { title: '⚡ Corridor Display Awakened', desc: 'Automated power schedule active', badge: 'CLOUD SYNC', color: '#0369a1' },
                disp_l: { title: '⚡ Library Terminal Health Check', desc: 'Telemetry status: Excellent', badge: 'CLOUD SYNC', color: '#0369a1' }
            },
            emergency_alert: {
                ifp_a:  { title: 'Evacuation Notice: Evacuate Calmly', desc: 'Fire alarm notice: proceed to assembly ground', badge: 'TEXT NOTICE', color: '#1e293b' },
                ifp_b:  { title: 'Evacuation Notice: Evacuate Calmly', desc: 'Follow exit signs to emergency stairs', badge: 'TEXT NOTICE', color: '#1e293b' },
                ifp_h:  { title: 'Evacuation Notice: Evacuate Calmly', desc: 'Auditorium fire exits are open', badge: 'TEXT NOTICE', color: '#1e293b' },
                ifp_sl: { title: 'Evacuation Notice: Evacuate Calmly', desc: 'SL100 supports cloud text alerts without Media Server', badge: 'TEXT NOTICE', color: '#1e293b' },
                disp_c: { title: 'Evacuation Notice: Use Stairs', desc: 'Do NOT use elevators, take fire stairs', badge: 'TEXT NOTICE', color: '#1e293b' },
                disp_l: { title: 'Evacuation Notice: Evacuate Calmly', desc: 'Library notice: remain calm and exit orderly', badge: 'TEXT NOTICE', color: '#1e293b' }
            },
            local_teaching: {
                ifp_a:  { title: '💻 Teacher Laptop 4K Presentation', desc: 'NDP600 Local HDMI Direct (Zero LAN Traffic)', badge: 'LOCAL PPT', color: '#1d4ed8' },
                ifp_b:  { title: '💻 Multimedia Lesson & Document Camera', desc: 'NMP311 Local HDMI Direct (Zero LAN Traffic)', badge: 'LOCAL DOC', color: '#1d4ed8' },
                ifp_h:  { title: '🎤 Auditorium Keynote & Dual Projection', desc: 'NDP200 Local Mic & Dual HDMI (Zero LAN Traffic)', badge: 'LOCAL LECTURE', color: '#1d4ed8' },
                ifp_sl: { title: '💻 SL100 Local Presentation', desc: '23.8" capacitive screen local presentation', badge: 'LOCAL PPT', color: '#1d4ed8' },
                disp_c: { title: 'Corridor Campus Information', desc: 'Regular digital signage playback', badge: 'SIGNAGE', color: '#0f172a' },
                disp_l: { title: 'Library Bulletin Board', desc: 'Self-service book checkout active', badge: 'NOTICE', color: '#0f172a' }
            }
        };

    app.data.screenStates = { zh, en };
})(window.QnexApp);
