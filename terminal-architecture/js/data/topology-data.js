/* ==========================================================================
   Q-NEX Topology Data - 拓扑设备坐标、规范线缆与分层存储定义
   规范：纯数据模块，挂载至 window.TopologyData，行数 <= 300 行
   ========================================================================== */

window.TopologyData = {
    // 拓扑节点 (严格匹配参考图布局与售前清单图像)
    nodes: [
        { id: "pc", name: "Web Console on PC", type: "management", x: 120, y: 110, img: "../assets/Q-NEX.png", role: "云端管理后台" },
        { id: "phone", name: "App on Smart Phone", type: "management", x: 300, y: 70, img: "../assets/Q-NEX-App.png", role: "移动端控制" },
        { id: "internet", name: "Internet", type: "cloud", x: 210, y: 220, img: "../assets/Internet.png", role: "公网互联" },
        { id: "cloud", name: "Q-NEX Cloud Service", type: "cloud", x: 420, y: 180, img: "../assets/CloudeServer.png", role: "云物联服务中枢" },
        { id: "panel", name: "Touch Panel CPL20", type: "panel", x: 170, y: 440, img: "../assets/CPL20-1.png", role: "桌面触控交互屏", isClickable: true, badgeText: "点击看面板下发配置" },
        { id: "nmp", name: "NMP", type: "terminal", x: 450, y: 360, img: "../assets/NMP-1.png", role: "教室核心媒体处理器", isClickable: true, badgeText: "点击看固件层存储" },
        { id: "ifp", name: "Room Display (IFP)", type: "peripheral", x: 740, y: 460, img: "../assets/IFP-1.png", role: "交互大屏显示" },
        { id: "projector", name: "Projector", type: "peripheral", x: 740, y: 230, img: "../assets/Projector.png", role: "受控投影仪" },
        { id: "screen", name: "Electric Curtain / Screen", type: "peripheral", x: 890, y: 230, img: "../assets/Motorized-Projection-Screen-1.png", role: "电动升降幕布" },
        { id: "lights", name: "Lights", type: "peripheral", x: 890, y: 460, img: "../assets/Light.png", role: "教室受控照明灯" }
    ],

    // 线缆连接 (云端双路分别直连 CPL20 与 NMP，外设接 NMP)
    links: [
        { from: "pc", to: "internet", type: "internet", color: "#888888", dashed: true, label: "HTTPS / Web API" },
        { from: "phone", to: "internet", type: "internet", color: "#888888", dashed: true, label: "4G / Wi-Fi" },
        { from: "internet", to: "cloud", type: "internet", color: "#888888", dashed: true, label: "Cloud Link" },
        { from: "cloud", to: "panel", type: "lan", color: "#0074D9", dashed: false, label: "PoE+ LAN / 云端一路直推 CPL20" },
        { from: "cloud", to: "nmp", type: "lan", color: "#0074D9", dashed: false, label: "LAN / 云端另一路下发 NMP 固件" },
        { from: "nmp", to: "ifp", type: "rs232", color: "#B10DC9", dashed: false, label: "RS232 (#B10DC9)" },
        { from: "nmp", to: "projector", type: "relay", color: "#FF851B", dashed: false, label: "Display Relay (#FF851B)" },
        { from: "nmp", to: "screen", type: "relay", color: "#FF851B", dashed: false, label: "Screen Relay (#FF851B)" },
        { from: "nmp", to: "lights", type: "relay", color: "#FF851B", dashed: false, label: "Power 1&2 Relay (#FF851B)" }
    ],

    // NMP 固件层详细存储内容
    nmpFirmwareDetails: {
        title: "NMP 固件层存储 (Firmware Flash)",
        tag: "主控芯片 Flash / EEPROM 硬件物理存储",
        items: [
            { name: "Power 1 & 2 关机联动（固件写死）", desc: "固件层写死强制生效（软件不可配置），设备关机强制切断市电输出，杜绝带电漏电风险。", isHardcoded: true, tag: "固件写死·不可配置" },
            { name: "Display 联动供电与关机延时", desc: "专为投影机散热设计的关机延时 (30s~180s)，NDP200 固件默认供电。" },
            { name: "投影幕布联动升降配置", desc: "幕布升降联动 Display 开关：开启降下，关闭升起，保存在固件层。" },
            { name: "刷卡解锁与密码锁定设置", desc: "本地刷卡卡号库保存在设备固件层；新出厂设备默认停用刷卡锁。" },
            { name: "电子锁设置与断电保护模式", desc: "断电开锁/闭锁，延时 1-255 秒（默认5秒）自动上锁，保存在固件层。" },
            { name: "输入源设置与视频矩阵映射", desc: "HDMI 3进2出矩阵的默认优先输入通道映射，保存在设备固件层。" },
            { name: "串口液晶/投影电源联动", desc: "绑定串口电源开、电源关控制代码，保存在设备固件层实现联动。" }
        ],
        alerts: [
            { type: "danger", title: "🚨 设备在线清空铁律", text: "只有设备在线时，删除操作才能下发指令清空固件层旧配置；若设备离线，固件层配置永久保留，重新绑定新组织后依然生效！" },
            { type: "warning", title: "🔍 Reset 物理孔真相", text: "NMP311 网口旁 reset 孔功能仅为开启设备 DHCP 以找回忘记的固定 IP，绝不具备还原出厂配置功能！" }
        ]
    },

    // Touch Panel 触控屏本地存储内容
    touchPanelDetails: {
        title: "Touch Panel (CPL20) 本地层下发存储",
        tag: "触控面板本地缓存 (云端直接下发)",
        items: [
            { name: "空调红外控制码 (IR Codes)", desc: "空调红外遥控码库与面板温度/风速控制小部件，保存在触控面板本地。" },
            { name: "普通外接 RS232 / 485 控制码", desc: "普通串口控制参数与按键映射，保存在触控面板本地存储。" },
            { name: "触控屏 UI 界面导航项排序与隐藏", desc: "来自新加坡客户需求：触控面板端仅支持调整顺序和隐藏，不支持修改名称/图标。" },
            { name: "组织端全局默认模板参数", desc: "未单独自定义的新增设备自动跟随组织模板；单台自定义优先级高于全局。" }
        ],
        alerts: [
            { type: "success", title: "🔄 跨组织重新绑定清空规则", text: "设备重新绑定到新组织后，只有触控面板存储的配置会在设备上线后被新组织模板清空覆盖！" },
            { type: "info", title: "🚫 面板端修改限制", text: "触控面板端不支持修改接口名称和更换图标（名称与图标必须在 Web Console 统一修改后下发）。" }
        ]
    },

    // 4 阶段下发流程定义 (精炼文案，双路分流)
    deliverySteps: [
        { step: 1, title: "管理端提交配置", desc: "管理员在 Web Console 提交配置，经公网路由送达 Q-NEX 云端服务。" },
        { step: 2, title: "一路：下发 CPL20 本地层", desc: "云端向 CPL20 推送红外码、普通串口码与 UI 界面导航项（写入面板本地缓存）。" },
        { step: 3, title: "另一路：下发 NMP 固件层", desc: "云端向 NMP 下发联动与受控参数，固化在固件 Flash 中（详情可点击 NMP 查看）。" },
        { step: 4, title: "双路下发完成，就绪生效", desc: "两路配置已分别在固件层与触控屏本地就绪生效。" }
    ],

    // 国际化动态读取接口
    getFirmwareDetails: function () {
        return window.I18n?.getData("topology_data")?.nmp_firmware || this.nmpFirmwareDetails;
    },
    getTouchPanelDetails: function () {
        return window.I18n?.getData("topology_data")?.touch_panel || this.touchPanelDetails;
    },
    getNodeRole: function (nodeId) {
        return window.I18n?.getData("topology_data")?.roles?.[nodeId] || "";
    },
    getDeliverySteps: function () {
        return window.I18n?.getData("topology_data")?.steps || this.deliverySteps;
    },
    getStatusText: function (step) {
        const arr = window.I18n?.getData("topology_data")?.status_text;
        return (arr && arr[step]) || "";
    }
};
