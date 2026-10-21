/* ==========================================================================
   Q-NEX Terminal Data - 终端设备规格与架构参数
   规范：纯数据模块，挂载至 window.TerminalData，行数 <= 300 行
   ========================================================================== */

window.TerminalData = {
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
                mainSupply: "单主路供电分配",
                corePowers: "NMP211 核心电源输出 + Display 继电器"
            },
            ports: [
                { name: "侧面接口板", desc: "7 口板 (电源、HDMI IN 1/2、TOUCH USB、USB 3.0x2、LAN)" },
                { name: "天线系统", desc: "一体化五合一天线盒 (600-6000MHz)" }
            ],
            resetHoleFact: "采用 NMP211 核心板，已停产。更换为 NMP311 时严禁单换主板，须同步换天线与侧板。"
        },
        {
            id: "NDP600",
            name: "NDP600",
            category: "数智讲台",
            title: "旗舰会议数智讲台 (3进5出无缝矩阵)",
            generation: "大礼堂与高端报告厅旗舰",
            role: "内置无缝视讯切换矩阵与专业数字音频处理器，支持多屏同显、无缝异显与超低延时广播。",
            powerArchitecture: {
                mainSupply: "高规格工业冗余电源分配系统",
                corePowers: "多路继电器分区独立上电与时序缓冲"
            },
            ports: [
                { name: "HDMI 3进5出", desc: "硬件无缝切换，切换无黑屏" },
                { name: "速度优先适配", desc: "无缝矩阵支持 3~5 秒超低延迟广播，画面不丢帧" }
            ],
            resetHoleFact: "多板卡协同管理，网络配置通过集成主控分发管理。"
        },
        {
            id: "MBX100",
            name: "MBX100",
            category: "广播终端",
            title: "公共区域媒体广播盒 (Media Box)",
            generation: "走廊/图书馆/户外广播终端",
            role: "专用于教室外公共区域的视讯广播接收终端，支持定时打铃、应急疏散、音视频解码输出。",
            powerArchitecture: {
                mainSupply: "DC 12V / 2A 或 PoE+ 供电",
                corePowers: "低功耗长期待机网络节点"
            },
            ports: [
                { name: "HDMI OUT", desc: "接走廊壁挂液晶大屏" },
                { name: "扬声器定阻输出", desc: "内置功放驱动本地喇叭" }
            ],
            resetHoleFact: "支持网络广播与云端计划，配置全部由 Web Console 平台集中下发维护。"
        },
        {
            id: "CBX100",
            name: "CBX100",
            category: "控制扩展",
            title: "无线控制扩展盒 (Control Box)",
            generation: "无线外设与幕布空调扩展中继",
            role: "配合 NMP 实现天花板投影机、幕布、灯光的无线受控扩展，支持 CBS 模板批量覆盖。",
            powerArchitecture: {
                mainSupply: "AC 220V 接入，内置弱电控制继电器",
                corePowers: "强电常通，继电器干接点输出"
            },
            ports: [
                { name: "CBS 模板同步", desc: "平台端一键覆盖同步广播配置，避免高空逐台登梯配置" },
                { name: "无线配对", desc: "与 NMP 核心板射频绑定，新一代 CBX200 规划外置 Reset" }
            ],
            resetHoleFact: "配置信息全部存储在云平台端，与硬件主板解耦，随时可在后台重置或迁移。"
        }
    ]
};
