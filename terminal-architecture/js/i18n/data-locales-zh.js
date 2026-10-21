/* ==========================================================================
   Q-NEX i18n Chinese Data Dictionary (data-locales-zh.js)
   规范：涵盖终端规格、开关机时序、存储三层矩阵与电路沙盘中文数据，行数 <= 300 行
   ========================================================================== */

(function () {
    const zhData = {
        terminals: [
            {
                id: "NMP311",
                name: "NMP311",
                category: "核心处理器",
                title: "网络媒体处理器主板 (Networked Media Processor)",
                generation: "现款主流核心中枢",
                role: "多媒体教室与讲台的核心主控板，融合视讯切换、音频功放、电源联动与物联网络。",
                powerArchitecture: {
                    mainSupply: "AC 100-240V 宽压输入",
                    corePowers: "Power 1 & Power 2 (固件层强制联动受控输出)",
                    displayPort: "Display 接口 (独立受控继电器，支持关机散热延时)",
                    electronicLock: "12V 电子锁接口 (支持断电开锁/闭锁，延时恢复)"
                },
                ports: [
                    { name: "Power 1 & 2", desc: "受控核心电源口，固件硬写死关机断电，杜绝带电漏电" },
                    { name: "Display", desc: "受控显示设备电源，支持关机延时 30~180 秒散热保护" },
                    { name: "Screen Up / Down", desc: "投影幕布升降继电器，联动 Display 电源状态" },
                    { name: "RS232-1 / 2", desc: "液晶大屏、投影仪串口电源及信号控制" },
                    { name: "RS485-1 / 2", desc: "窗帘、空调扩展物联控制" },
                    { name: "HDMI 3进2出", desc: "4K 视讯矩阵切换" },
                    { name: "Reset 物理孔", desc: "网口旁微动孔：【仅开启 DHCP 恢复搜机】，绝不恢复出厂配置！" }
                ],
                resetHoleFact: "该物理 Reset 孔唯一功能为开启设备 DHCP 以找回遗忘的固定 IP。绝无清空联动配置或密码功能！"
            },
            {
                id: "NDP200",
                name: "NDP200",
                category: "数智讲台",
                title: "智能双屏数智讲台 (Networked Digital Podium)",
                generation: "现款主力双屏高端讲台",
                role: "集成了 NMP311、OPS 电脑、触控中屏、升降机构与音频收发的高集成一体化讲台。",
                powerArchitecture: {
                    mainSupply: "整机双独立电源 + 双排插架构",
                    independentPower1: "电源 1：专供 OPS 电脑，杜绝大功率瞬间拉扯干扰计算单元",
                    independentPower2: "电源 2：专供升降推杆电机、控制电路板、触控中屏",
                    stripA: "排插 A (受控)：接入 NMP311 的 DISPLAY 继电器，随系统开关机",
                    stripB: "排插 B (常电)：自带空气开关直通市电，10A / 2000W 额定承载"
                },
                ports: [
                    { name: "Display 接口", desc: "固件与后台默认强制勾选供电，避免 OPS 无法通电黑屏" },
                    { name: "OPS 6P 控制线", desc: "Pin 1/2 短接脉冲开关机；Pin 4 检测 5.3V 开机状态互锁" },
                    { name: "升降 K1 继电器", desc: "5PIN 继电器：NC 接红灯锁止，NO 接 MOTOR V 送电推杆电机" },
                    { name: "碰珠锁止机构", desc: "盖板左上角机械碰珠吸收回弹，防微动触点接触不良闪烁" }
                ],
                resetHoleFact: "内置 NMP311 主控板，遵循相同的仅 DHCP 复位规则。升级需整体更换天线与接口钣金。"
            },
            {
                id: "NDP100",
                name: "NDP100",
                category: "数智讲台",
                title: "智能单屏数智讲台",
                generation: "早期单屏讲台 (NMP211 架构)",
                role: "单主屏教学讲台。主控为旧款 NMP211，目前售后更换需升级为 NMP311 规范总成。",
                powerArchitecture: {
                    mainSupply: "单电源供电架构",
                    corePowers: "单一受控输出回路，未做大功率机构隔离",
                    displayPort: "Display 电源直连主显示屏"
                },
                ports: [
                    { name: "NMP211 主控", desc: "旧款主控板，已被 NMP311 全面替代" },
                    { name: "旧款钣金", desc: "无法直接原位安装 NMP311，需配合专用转接配件包" }
                ],
                resetHoleFact: "旧架构同样仅复位 DHCP，历史遗留固件升级须走售后专用指导方案。"
            },
            {
                id: "NDP600",
                name: "NDP600",
                category: "旗舰讲台",
                title: "旗舰视讯交互讲台",
                generation: "新一代大屏沉浸式讲台",
                role: "超大主副屏、内置高性能本地 3x3 HDMI 视讯矩阵，适合阶梯报告厅与大型会议厅。",
                powerArchitecture: {
                    mainSupply: "三路独立电源输入回路",
                    corePowers: "智能分时吸合防浪涌继电器阵列",
                    displayPort: "多路 Display 独立散热延迟通道"
                },
                ports: [
                    { name: "HDMI 3x3 矩阵", desc: "高宽带 4K@60Hz 无缝切换" },
                    { name: "双 OPS 扩展位", desc: "支持教师自带电脑与内嵌工控机快速轮切" }
                ],
                resetHoleFact: "具备独立的网络恢复微动孔，行为逻辑与 NMP311 保持严格一致。"
            },
            {
                id: "MBX100",
                name: "MBX100",
                category: "多媒体盒",
                title: "校园公共区域媒体终端 (Media Box)",
                generation: "走廊/图书馆/食堂广播专用",
                role: "专门用于校园公共区域的视讯广播分发，内置硬件解码芯片，接收内网流媒体直播与定时打铃。",
                powerArchitecture: {
                    mainSupply: "PoE+ 供电或 12V DC 直流电源适配器",
                    corePowers: "低功耗长期待机物联引擎",
                    displayPort: "HDMI CEC 唤醒联动公共显示屏"
                },
                ports: [
                    { name: "PoE+ LAN", desc: "单网线同时供电与接收超高清视频流" },
                    { name: "HDMI Out", desc: "输出到走廊宣传大屏" },
                    { name: "Line Out", desc: "接入广播功放与吸顶喇叭" }
                ],
                resetHoleFact: "支持网络自动探测，长按可开启本地调试配网模式。"
            },
            {
                id: "CBX100",
                name: "CBX100",
                category: "无线扩展",
                title: "2.4GHz 无线设备控制盒 (Control Box)",
                generation: "无线免布线扩展模块",
                role: "通过 2.4GHz 无线射频免布线受控于 NMP 或直接联动云端，扩展空调红外、灯光与幕布继电器。",
                powerArchitecture: {
                    mainSupply: "AC 100-240V 市电输入",
                    corePowers: "两路 10A 强电继电器输出 (灯光/设备)",
                    displayPort: "一路空调红外发射接口"
                },
                ports: [
                    { name: "2.4GHz RF", desc: "免布线低延迟双向射频通信" },
                    { name: "Relay Out 1/2", desc: "教室照明、排气扇等强电设备启闭" },
                    { name: "IR Emitter", desc: "贴片式红外发射头对准空调遥控接收窗" }
                ],
                resetHoleFact: "按住 5 秒进入 2.4GHz 射频对码学习模式。"
            }
        ],
        sequence: {
            powerOnSteps: [
                {
                    step: 1, title: "身份触发与解锁 (Auth & Trigger)",
                    desc: "教师通过 NFC 刷卡解锁触控屏，或云端下发定时开机 MQTT 指令。",
                    ports: { power12: "断开", display: "断开", screen: "保持", ops: "待机 0V" },
                    log: "[触发] 收到开机信号，NMP 核心板主控唤醒。"
                },
                {
                    step: 2, title: "核心电源吸合 (Core Power 1 & 2 Energized)",
                    desc: "固件底层驱动 Power 1 & Power 2 继电器强制闭合送电，外接基础用电设备通电。",
                    ports: { power12: "通电 (+220V)", display: "断开", screen: "保持", ops: "待机 0V" },
                    log: "[固件联动] Power 1 & 2 闭合供电，状态由固件层硬件看门狗硬锁。"
                },
                {
                    step: 3, title: "Display 接口供电 (Display Relay Closed)",
                    desc: "Display 继电器吸合送电。NDP200 固件与后台默认开启此接口供电以保障 OPS 通电。",
                    ports: { power12: "通电", display: "通电 (受控送电)", screen: "保持", ops: "就绪 0V" },
                    log: "[显示供电] Display 继电器吸合，向显示设备/受控排插送电。"
                },
                {
                    step: 4, title: "投影幕布联动降下 (Screen Down Triggered)",
                    desc: "Display 上电触发幕布控制继电器，驱动电动幕布平稳降下到底位（机械限位切断）。",
                    ports: { power12: "通电", display: "通电", screen: "下降中 ⬇️", ops: "就绪 0V" },
                    log: "[幕布联动] 固件幕布联动逻辑激活：Display 开启 -> 幕布降下。"
                },
                {
                    step: 5, title: "串口指令唤醒外显 (RS232 / 485 Wakeup)",
                    desc: "RS232-1 端口向液晶屏/投影仪发送十六进制开机指令代码 (Power ON)，屏幕点亮。",
                    ports: { power12: "通电", display: "通电", screen: "已到位", ops: "就绪 0V" },
                    log: "[串口联动] RS232 发送 Power ON 指令码，液晶/投影仪启动。"
                },
                {
                    step: 6, title: "OPS 脉冲触发与电平检测 (OPS Pulse & 5.3V Lock)",
                    desc: "OPS 尾板 6P 控制线 Pin 1&2 短接输出开机脉冲；Pin 4 检测脚由 0V 跳变至 5.3V 互锁吸合完成整机开机！",
                    ports: { power12: "通电", display: "通电", screen: "已到位", ops: "开机运行 5.3V 互锁" },
                    log: "[OPS 启动] 6P 线触发脉冲，Pin 4 状态电压升至 5.3V，整机进入授课就绪状态！"
                }
            ],
            powerOffSteps: [
                {
                    step: 1, title: "关机信号触发 (Power Off Triggered)",
                    desc: "教师点击面板【一键下课/关机】，或平台执行定时关机任务。",
                    ports: { power12: "通电", display: "通电", screen: "保持", ops: "运行 5.3V" },
                    log: "[关机] 关机指令已下发，系统启动安全关断时序。"
                },
                {
                    step: 2, title: "串口关闭外显与幕布升起 (RS232 Off & Screen Up)",
                    desc: "RS232 端口发送关机指令使显示屏熄屏；幕布继电器触发电动幕布收起升回顶位。",
                    ports: { power12: "通电", display: "通电 (延时散热中)", screen: "上升中 ⬆️", ops: "软关机完成" },
                    log: "[联动] RS232 下发熄屏指令，投影幕布回卷升起。"
                },
                {
                    step: 3, title: "Display 延时散热倒计时 (Cooling Delay Countdown)",
                    desc: "保持 Display 继电器持续通电 30 秒，确保投影机内部高热灯泡风扇充分排风散热。",
                    ports: { power12: "通电", display: "通电 (30s 冷却)", screen: "已收起", ops: "0V 断电" },
                    log: "[延时保护] 开启 30 秒散热倒计时，投影仪风扇高速运转冷却。"
                },
                {
                    step: 4, title: "全盘切断切电保护 (Complete Power Cutoff)",
                    desc: "延时倒计时归零，Display 与 Power 1 & 2 继电器同时释放断开，整机彻底断电消除漏电隐患。",
                    ports: { power12: "断开 (0V)", display: "断开 (0V)", screen: "已收起", ops: "0V 断电" },
                    log: "[固件写死] 关机时序完毕，Power 1 & 2 强制断电，杜绝带电漏电风险！"
                }
            ]
        },
        storage: {
            tiers: [
                {
                    layer: "设备固件层 (Firmware Layer)",
                    hardwareLocation: "NMP / NDP 主板 Flash / EEPROM 固件芯片",
                    configs: [
                        "Power 1 & 2 核心开关机联动（底层强保护·写死）",
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
                    hardwareLocation: "7寸/10寸桌面触控屏本地存储器",
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
        }
    };

    if (window.I18n) {
        const existing = window.I18n.locales["zh"] || {};
        window.I18n.registerLocale("zh", Object.assign(existing, zhData));
    } else {
        window.I18N_LOCALES = window.I18N_LOCALES || {};
        window.I18N_LOCALES.zh = Object.assign(window.I18N_LOCALES.zh || {}, zhData);
    }
})();
