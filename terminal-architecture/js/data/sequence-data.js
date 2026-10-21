/* ==========================================================================
   Q-NEX Sequence Data - 开关机联动与电路时序定义
   规范：纯数据模块，挂载至 window.SequenceData，行数 <= 300 行
   ========================================================================== */

window.SequenceData = {
    powerOnSteps: [
        {
            step: 1,
            title: "身份触发与解锁 (Auth & Trigger)",
            desc: "教师通过 NFC 刷卡解锁触控屏，或云端下发定时开机 MQTT 指令。",
            ports: { power12: "断开", display: "断开", screen: "保持", ops: "待机 0V" },
            log: "[触发] 收到开机信号，NMP 核心板主控唤醒。"
        },
        {
            step: 2,
            title: "核心电源吸合 (Core Power 1 & 2 Energized)",
            desc: "固件底层驱动 Power 1 & Power 2 继电器强制闭合送电，外接基础用电设备通电。",
            ports: { power12: "通电 (+220V)", display: "断开", screen: "保持", ops: "待机 0V" },
            log: "[固件联动] Power 1 & 2 闭合供电，状态由固件层硬件看门狗硬锁。"
        },
        {
            step: 3,
            title: "Display 接口供电 (Display Relay Closed)",
            desc: "Display 继电器吸合送电。NDP200 固件与后台默认开启此接口供电以保障 OPS 通电。",
            ports: { power12: "通电", display: "通电 (受控送电)", screen: "保持", ops: "就绪 0V" },
            log: "[显示供电] Display 继电器吸合，向显示设备/受控排插送电。"
        },
        {
            step: 4,
            title: "投影幕布联动降下 (Screen Down Triggered)",
            desc: "Display 上电触发幕布控制继电器，驱动电动幕布平稳降下到底位（机械限位切断）。",
            ports: { power12: "通电", display: "通电", screen: "下降中 ⬇️", ops: "就绪 0V" },
            log: "[幕布联动] 固件幕布联动逻辑激活：Display 开启 -> 幕布降下。"
        },
        {
            step: 5,
            title: "串口指令唤醒外显 (RS232 / 485 Wakeup)",
            desc: "RS232-1 端口向液晶屏/投影仪发送十六进制开机指令代码 (Power ON)，屏幕点亮。",
            ports: { power12: "通电", display: "通电", screen: "已到位", ops: "就绪 0V" },
            log: "[串口联动] RS232 发送 Power ON 指令码，液晶/投影仪启动。"
        },
        {
            step: 6,
            title: "OPS 脉冲触发与电平检测 (OPS Pulse & 5.3V Lock)",
            desc: "OPS 尾板 6P 控制线 Pin 1&2 短接输出开机脉冲；Pin 4 检测脚由 0V 跳变至 5.3V 互锁吸合完成整机开机！",
            ports: { power12: "通电", display: "通电", screen: "已到位", ops: "开机运行 5.3V 互锁" },
            log: "[OPS 启动] 6P 线触发脉冲，Pin 4 状态电压升至 5.3V，整机进入授课就绪状态！"
        }
    ],

    powerOffSteps: [
        {
            step: 1,
            title: "关机信号触发 (Power Off Triggered)",
            desc: "教师点击面板【一键下课/关机】，或平台执行定时关机任务。",
            ports: { power12: "通电", display: "通电", screen: "保持", ops: "运行 5.3V" },
            log: "[关机] 关机指令已下发，系统启动安全关断时序。"
        },
        {
            step: 2,
            title: "外设与 OPS 安全关断 (Serial & OPS Shutdown)",
            desc: "RS232 发送显示设备关机指令；OPS 6P 发送脉冲触发系统正常关机，Pin 4 检测脚回落至 0V。",
            ports: { power12: "通电", display: "通电", screen: "保持", ops: "关机 0V" },
            log: "[外设关断] OPS 操作系统关机，液晶/投影仪进入待机。"
        },
        {
            step: 3,
            title: "Display 关机延时散热中 (Delay Cooling Active)",
            desc: "Display 接口进入自定义关机延时倒计时 (如 30s)，保持供电让投影仪风扇充分排出余热！",
            ports: { power12: "通电", display: "延时送电中 ⏳", screen: "保持", ops: "已断电 0V" },
            log: "[保护延时] 启动投影延时保护倒计时，防止高温损坏灯泡与光学组件。"
        },
        {
            step: 4,
            title: "投影幕布联动升起 (Screen Up Triggered)",
            desc: "幕布继电器触发升起动作，电动幕布收纳回卷轴，到位后机械限位切断。",
            ports: { power12: "通电", display: "延时送电中", screen: "上升中 ⬆️", ops: "已断电 0V" },
            log: "[幕布联动] Display 关机信号触发幕布升起指令。"
        },
        {
            step: 5,
            title: "Display 继电器安全断电 (Display Relay Cutoff)",
            desc: "延时倒计时归零，风扇冷却完成，Display 继电器咔哒断开切断外设供电。",
            ports: { power12: "通电", display: "断电 (安全断开)", screen: "已收起", ops: "已断电 0V" },
            log: "[冷却完成] Display 继电器释放，排插 A 彻底断电。"
        },
        {
            step: 6,
            title: "Power 1 & 2 强制切断 (Core Power Cutoff)",
            desc: "固件底层强制断开核心电源输出，切断全部受控设备市电，系统进入零功耗防触电保护待机。",
            ports: { power12: "强制断电 0V", display: "断电", screen: "已收起", ops: "已断电 0V" },
            log: "[时序终点] Power 1 & 2 强制断电，开关机联动流程完毕，教室环境安全！"
        }
    ],

    k1RelayPins: [
        { pin: "1 脚", label: "NC (常闭触点)", function: "接 RED LED+ (面板红灯正极)", state: "盖板未推到位时闭合导通，亮红灯提示锁定禁止升降" },
        { pin: "2 脚", label: "NO (常开触点)", function: "接 MOTOR V (受控 +12V 电机输出)", state: "盖板推到位行程开关闭合后导通，向电机送电，指示灯转绿" },
        { pin: "3 脚", label: "线圈 +", function: "接行程开关信号输出端", state: "盖板推到底触发行程开关闭合，送入 +12V 激励线圈吸合触点" },
        { pin: "4 脚", label: "线圈 -", function: "接 GND (电路地)", state: "线圈负极回路，反向并联 B5819 续流二极管吸收反向电动势" },
        { pin: "5 脚", label: "COM (公共端)", function: "接入 DC IN +12V 常供电", state: "电源总输入端，持续提供 12V 驱动功率源" }
    ],

    ops6PPins: [
        { pin: "Pin 1 & 2", label: "开关机脉冲脚", function: "1脚 3.3V / 2脚 GND", desc: "短接 1 与 2 脚发出瞬态脉冲触发开机或关机" },
        { pin: "Pin 4", label: "电源状态检测脚", function: "0V / 5.3V 跳变检测", desc: "OPS 关机为 0V；开机跳变至 5.3V 驱动继电器完成互锁" },
        { pin: "Pin 5", label: "控制地", function: "GND", desc: "逻辑控制公共参考地" }
    ]
};
