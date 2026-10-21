/* ==========================================================================
   Q-NEX Storage Data - 配置数据三层存储与清空机制
   规范：纯数据模块，挂载至 window.StorageData，行数 <= 300 行
   ========================================================================== */

window.StorageData = {
    tiers: [
        {
            layer: "设备固件层 (Firmware Layer)",
            hardwareLocation: "NMP / NDP 主板 Flash / EEPROM 固件芯片",
            configs: [
                "Power 1 & 2 核心开关机联动（底层强保护）",
                "Display 接口供电与关机延时散热参数",
                "投影幕布联动升降配置",
                "刷卡解锁与密码锁定安全策略",
                "12V 电子锁与断电保护模式",
                "视频矩阵输入源映射关系",
                "串口液晶/投影仪电源开关绑定"
            ],
            clearCondition: "必须设备在线保持 MQTT/TCP 连通！离线删除设备只删平台数据，固件层配置永久保留。",
            rebindBehavior: "移机到新学校或新组织后，旧固件联动配置依然生效，可能引发旧控制指令干扰。"
        },
        {
            layer: "触控面板本地 (Touch Panel Layer)",
            hardwareLocation: "7寸/10寸桌面触控屏本地存储存储器",
            configs: [
                "空调红外遥控码库与温度模式",
                "普通外接串口自定义控制参数",
                "面板本地按键自定义排序与图标隐藏"
            ],
            clearCondition: "设备重新绑定新组织并联网上线后，本地旧配置会被平台下发的组织模板全量清空覆盖。",
            rebindBehavior: "自动重置为新组织默认模板，旧面板红外与串口数据自动消除。"
        },
        {
            layer: "云平台端 (Web Console Cloud)",
            hardwareLocation: "Q-NEX 云服务器分布式数据库",
            configs: [
                "CBS 校园广播计划模板 (Campus Broadcast System)",
                "HTML UI 自定义网页控制面板布局",
                "全校组织架构与课表设备绑定"
            ],
            clearCondition: "由管理员随时在 Web Console 后台编辑或删除，与硬件板卡物理状态完全解耦。",
            rebindBehavior: "支持 CBS 模板一键跨批次批量覆盖应用到新设备。"
        }
    ],

    resetHoleTruth: {
        title: "NMP311 网口旁边 Reset 物理微动孔真实功能",
        isFactoryReset: false,
        actualFunction: "仅开启设备 DHCP 自动获取动态 IP 功能",
        designIntent: "早期设计用于防范用户误设了未知静态 IP 或网段，导致局域网无法搜到设备。戳 Reset 孔后让路由器重新分配 IP，以便 ConfigTool 或控制台重新找回设备。",
        warning: "严禁误认为戳 Reset 孔可以清除密码、恢复出厂配置或解绑联动！全量清除必须在平台在线状态下执行清空！"
    },

    priorityRules: [
        { name: "单设备自定义优先原则", desc: "单台设备所做的面板/接口自定义修改，优先级高于组织全局配置；组织全局下发不会覆盖已自定义的单台设备。" },
        { name: "新设备自动跟随原则", desc: "未做过单独修改的新添加设备，自动继承组织全局默认模板。" }
    ]
};
