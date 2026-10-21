/* ==========================================================================
   Q-NEX i18n Chinese Dictionary (zh) - 中文语言包
   规范：涵盖静态UI与动态架构数据，行数 <= 300 行
   ========================================================================== */

(function () {
    const zh = {
        ui: {
            brand_badge: "Q-NEX",
            title: "终端体系与开关机联动架构仿真器",
            version: "v2.2 国际化双语版",
            subtitle: "拓扑与在线下发 · 动态开关机时序 · 固件/面板存储深度解析 · NDP 机械沙盘",
            back_btn: "<span>←</span> 返回全景拓扑",
            theme_btn_dark: "<span>🌙</span> 深色",
            theme_btn_light: "<span>☀️</span> 浅色",
            lang_btn: "<span>🌐</span> English",
            tabs: {
                topology: "<span>🌐</span> 拓扑与在线下发",
                terminals: "<span>🔌</span> 终端家族与机箱",
                sequence: "<span>⚡</span> 开关机动态时序",
                storage: "<span>🗄️</span> 配置存储与清空",
                circuit: "<span>🎛️</span> NDP 机构电路沙盘"
            },
            topology: {
                title: "<span>🌐</span> Q-NEX 智慧教室核心拓扑与在线配置下发 (规范接线)",
                btn_step: "<span>⏭️</span> 单步步进学习",
                btn_auto: "<span>▶️</span> 自动连续演示",
                btn_pause: "<span>⏸️</span> 暂停演示",
                btn_reset: "<span>🔄</span> 重置",
                badge_ready: "就绪 (0/4)",
                badge_step: "步骤",
                ready_status: "就绪：点击【单步步进学习】或【自动连续演示】观察双路下发流程",
                click_hint: "点我",
                legend_title: "接线图例规范 (Legend)",
                legend_lan: "🟦 LAN / PoE+ (#0074D9)",
                legend_rs232: "🟣 RS232 控制 (#B10DC9)",
                legend_relay: "🟠 Relay 继电器 (#FF851B)",
                legend_link: "⚫ Internet / 链路"
            },
            terminals: {
                title: "<span>📱</span> Q-NEX 终端产品家族规格与接口全景",
                chassis_hint: "🖥️ 终端物理机身端口布局（可点击右侧接口交互）",
                spotlight_default: "💡 提示：点击下方右侧接口列表，可高亮查看该接口在硬件架构中的接线与用途。",
                ports_heading: "物理接口受控规范 (点击高亮)",
                power_heading: "供电与电源架构特点",
                fact_heading: "💡 架构排坑与核心提示"
            },
            sequence: {
                title: "<span>⚡</span> Q-NEX 开关机自动化联动与继电器时序",
                btn_on: "<span>▶️</span> 一键开机联动演示",
                btn_off: "<span>⏹️</span> 一键关机联动演示",
                btn_reset: "<span>🔄</span> 重置时序",
                status_ready: "系统处于待机就绪状态，点击上方按钮触发开/关机联动流程",
                fan_alert: "💨 Display 延时散热倒计时中：投影仪风扇持续运转，禁止直接切断排插总电源！",
                status_heading: "实时终端接口受控状态",
                log_heading: "时序动作实时日志",
                screen_state: "幕布状态",
                fan_state: "风扇状态"
            },
            storage: {
                title: "<span>🗄️</span> Q-NEX 终端配置分层存储与平台清空机制",
                btn_online: "<span>🟢</span> 模拟设备在线清空 (全量清除)",
                btn_offline: "<span>🔴</span> 模拟设备离线删除 (旧配置残留)",
                col_layer: "存储层级",
                col_hardware: "物理硬件载体",
                col_configs: "存储的业务配置类型",
                col_clear: "清空 / 覆盖触发条件",
                col_rebind: "跨组织重新绑定影响",
                truth_heading: "🔍 核心架构澄清：物理 Reset 孔与清空铁律",
                rules_heading: "📐 优先级与多台设备模板规则",
                sim_result_heading: "仿真结果反馈"
            },
            circuit: {
                title: "<span>🎛️</span> NDP 讲台机构电路与推杆互锁动态沙盘",
                cover_heading: "1. 盖板碰珠与微动行程",
                relay_heading: "2. K1 继电器驱动电路",
                motor_heading: "3. 推杆电机动态姿态",
                btn_up: "▲ 仰角升高",
                btn_down: "▼ 仰角调低",
                btn_both: "⚠️ 模拟双键同按冲突",
                cover_closed: "盖板闭合 (红灯常亮，推杆断电锁死)",
                cover_open: "盖板推开 (微动吸合，K1 常开导通，推杆通电)"
            }
        },
        topology_data: {
            roles: {
                pc: "云端管理后台", phone: "移动端控制", internet: "公网互联",
                cloud: "云物联服务中枢", panel: "桌面触控交互屏", nmp: "教室核心媒体处理器",
                ifp: "交互大屏显示", projector: "受控投影仪", screen: "电动升降幕布", lights: "教室受控照明灯"
            },
            steps: [
                { step: 1, title: "管理端提交配置", desc: "管理员在 Web Console 提交配置，经公网路由送达 Q-NEX 云端服务。" },
                { step: 2, title: "一路：下发 CPL20 本地层", desc: "云端向 CPL20 推送红外码、普通串口码与 UI 界面导航项（写入面板本地缓存）。" },
                { step: 3, title: "另一路：下发 NMP 固件层", desc: "云端向 NMP 下发联动与受控参数，固化在固件 Flash 中（详情可点击 NMP 查看）。" },
                { step: 4, title: "双路下发完成，就绪生效", desc: "两路配置已分别在固件层与触控屏本地就绪生效。" }
            ],
            status_text: [
                "就绪：点击【单步步进学习】或【自动连续演示】观察双路下发流程",
                "📡 [步骤 1/4] Web Console 提交配置至云端服务...",
                "📲 [步骤 2/4] 云端下发控制码与UI配置至 Touch Panel 本地缓存...",
                "💾 [步骤 3/4] 云端下发联动与受控参数至 NMP 固件层（详情可点击NMP查看）...",
                "✅ [步骤 4/4] 双路配置下发完成，已在固件层与触控屏本地就绪生效！"
            ],
            nmp_firmware: {
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
            touch_panel: {
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
            }
        }
    };

    if (window.I18n) window.I18n.registerLocale("zh", zh);
    else window.I18N_LOCALES = window.I18N_LOCALES || {}, window.I18N_LOCALES.zh = zh;
})();
