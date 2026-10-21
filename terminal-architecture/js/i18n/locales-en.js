/* ==========================================================================
   Q-NEX i18n English Dictionary (en) - 英文语言包
   规范：涵括专业售前标准化英文术语与架构规范，行数 <= 300 行
   ========================================================================== */

(function () {
    const en = {
        ui: {
            brand_badge: "Q-NEX",
            title: "Terminal Architecture & Power Linkage Simulator",
            version: "v2.2 Bilingual Edition",
            subtitle: "Topology & Delivery · Power Sequencing · Storage Architecture · NDP Circuit Sandbox",
            back_btn: "<span>←</span> Back to Panorama",
            theme_btn_dark: "<span>🌙</span> Dark",
            theme_btn_light: "<span>☀️</span> Light",
            lang_btn: "<span>🌐</span> 中文",
            tabs: {
                topology: "<span>🌐</span> Topology & Delivery",
                terminals: "<span>🔌</span> Terminals & Chassis",
                sequence: "<span>⚡</span> Power Sequencing",
                storage: "<span>🗄️</span> Storage & Reset Rules",
                circuit: "<span>🎛️</span> NDP Circuit Sandbox"
            },
            topology: {
                title: "<span>🌐</span> Q-NEX Smart Classroom Core Topology & Online Delivery (Standard Wiring)",
                btn_step: "<span>⏭️</span> Step-by-Step",
                btn_auto: "<span>▶️</span> Auto Demo",
                btn_pause: "<span>⏸️</span> Pause Demo",
                btn_reset: "<span>🔄</span> Reset",
                badge_ready: "Ready (0/4)",
                badge_step: "Step",
                ready_status: "Ready: Click [Step-by-Step] or [Auto Demo] to observe dual-path delivery flow",
                click_hint: "Click Me",
                legend_title: "Wiring Standards (Legend)",
                legend_lan: "🟦 LAN / PoE+ (#0074D9)",
                legend_rs232: "🟣 RS232 Control (#B10DC9)",
                legend_relay: "🟠 Relay Control (#FF851B)",
                legend_link: "⚫ Internet / Link"
            },
            terminals: {
                title: "<span>📱</span> Q-NEX Terminal Product Family Specs & Interface Panorama",
                chassis_hint: "🖥️ Physical Chassis Port Layout (Click port in right list to inspect)",
                spotlight_default: "💡 Tip: Click any port in the list below to inspect wiring and function.",
                ports_heading: "Physical Controlled Interfaces (Click to Highlight)",
                power_heading: "Power Architecture & Electrical Characteristics",
                fact_heading: "💡 Architecture & Pitfall Prevention Notes"
            },
            sequence: {
                title: "<span>⚡</span> Q-NEX Automated Power Linkage & Relay Sequencing",
                btn_on: "<span>▶️</span> Power ON Sequence Demo",
                btn_off: "<span>⏹️</span> Power OFF Sequence Demo",
                btn_reset: "<span>🔄</span> Reset Sequence",
                status_ready: "System in standby. Click buttons above to trigger power on/off sequence.",
                fan_alert: "💨 Display Cooling Delay active: Projector fan running. DO NOT cut master AC power!",
                status_heading: "Real-Time Terminal Port Control Status",
                log_heading: "Sequence Execution Log",
                screen_state: "Screen State",
                fan_state: "Cooling Fan"
            },
            storage: {
                title: "<span>🗄️</span> Q-NEX 3-Tier Storage Architecture & Platform Reset Rules",
                btn_online: "<span>🟢</span> Simulate Online Deletion (Full Wipe)",
                btn_offline: "<span>🔴</span> Simulate Offline Deletion (Residual Config)",
                col_layer: "Storage Tier",
                col_hardware: "Hardware Carrier",
                col_configs: "Stored Configuration Types",
                col_clear: "Clear / Overwrite Condition",
                col_rebind: "Rebinding to New Org Impact",
                truth_heading: "🔍 Core Truth: Physical Reset Pinhole & Online Wipe Rule",
                rules_heading: "📐 Priority & Multi-Device Template Rules",
                sim_result_heading: "Simulation Output Feedback"
            },
            circuit: {
                title: "<span>🎛️</span> NDP Podium Mechanism Circuit & Actuator Interlock Sandbox",
                cover_heading: "1. Sliding Cover Ball Plunger & Microswitch",
                relay_heading: "2. K1 Relay Drive Circuit",
                motor_heading: "3. Actuator Motor Dynamic Posture",
                btn_up: "▲ Tilt Up",
                btn_down: "▼ Tilt Down",
                btn_both: "⚠️ Simulate Dual Key Conflict",
                cover_closed: "Cover CLOSED (Red LED ON, actuator de-energized & locked)",
                cover_open: "Cover OPEN (Microswitch closed, K1 energized, actuator ready)"
            }
        },
        topology_data: {
            roles: {
                pc: "Cloud Web Console", phone: "Mobile App Control", internet: "Public Internet",
                cloud: "Cloud IoT Service", panel: "Desktop Touch Panel", nmp: "Classroom Media Processor",
                ifp: "Interactive Flat Panel", projector: "Controlled Projector", screen: "Motorized Screen", lights: "Classroom Lighting"
            },
            steps: [
                { step: 1, title: "Submit Configuration", desc: "Admin submits configuration on Web Console, routed via Internet to Q-NEX Cloud." },
                { step: 2, title: "Path 1: Push to CPL20 Panel", desc: "Cloud pushes IR codes, serial codes, and UI navigation items to panel local cache." },
                { step: 3, title: "Path 2: Push to NMP Firmware", desc: "Cloud pushes hardware & linkage parameters into NMP firmware Flash (click NMP for details)." },
                { step: 4, title: "Dual Delivery Complete & Active", desc: "Configurations are now active in NMP firmware and touch panel local storage." }
            ],
            status_text: [
                "Ready: Click [Step-by-Step] or [Auto Demo] to observe dual-path delivery flow",
                "📡 [Step 1/4] Web Console submits configuration to Cloud Service...",
                "📲 [Step 2/4] Cloud delivers control codes & UI config to Touch Panel cache...",
                "💾 [Step 3/4] Cloud delivers hardware & linkage parameters to NMP firmware...",
                "✅ [Step 4/4] Dual-path delivery complete, active in firmware & panel local cache!"
            ],
            nmp_firmware: {
                title: "NMP Firmware Storage (Flash Memory)",
                tag: "Main MCU Flash / EEPROM Hardware Storage",
                items: [
                    { name: "Power 1 & 2 Shutdown Linkage (Firmware Hardcoded)", desc: "Hardcoded in firmware (cannot be configured via software). Forced AC cut on shutdown to prevent leakage risks.", isHardcoded: true, tag: "Firmware Hardcoded · Read-Only" },
                    { name: "Display Linkage & Cooling Delay", desc: "Designed for projector lamp cooling (30s~180s delay). Enabled by default." },
                    { name: "Motorized Screen Linkage", desc: "Screen lowers on Display ON and rises on Display OFF, stored in firmware." },
                    { name: "RFID Card Unlock & Password Lock", desc: "Local card ID database stored in firmware; disabled by default from factory." },
                    { name: "Electronic Lock & Power-Off Mode", desc: "Power-off unlock/lock, auto relock after 1-255s (default 5s), stored in firmware." },
                    { name: "HDMI Video Matrix Mapping", desc: "HDMI 3x2 matrix default priority input channels stored in firmware." },
                    { name: "Serial Display Power Linkage", desc: "Binds serial Power ON/OFF hex codes in firmware for automated control." }
                ],
                alerts: [
                    { type: "danger", title: "🚨 Online Deletion Iron Rule", text: "Configurations can only be cleared from firmware when the device is ONLINE! If offline, old configs remain forever and persist after rebinding!" },
                    { type: "warning", title: "🔍 Reset Hole Truth", text: "The physical Reset pinhole next to LAN port only enables DHCP to retrieve forgotten static IPs; it NEVER resets factory configurations!" }
                ]
            },
            touch_panel: {
                title: "Touch Panel (CPL20) Local Storage",
                tag: "Touch Panel Local Cache (Cloud Push)",
                items: [
                    { name: "Air Conditioning IR Control Codes", desc: "IR remote code library and temperature widgets saved in panel local cache." },
                    { name: "Peripheral RS232 / 485 Control Codes", desc: "General serial command parameters and key bindings saved in panel local storage." },
                    { name: "UI Navigation Item Sorting & Visibility", desc: "Per Singapore customer request: Panel only supports reordering and hiding, not renaming or icon changes." },
                    { name: "Organization Global Default Template", desc: "New unconfigured devices inherit org template; per-device custom settings take precedence." }
                ],
                alerts: [
                    { type: "success", title: "🔄 Rebind Overwrite Rule", text: "When rebound to a new organization, panel local configs are automatically overwritten by the new organization's template once online!" },
                    { type: "info", title: "🚫 Panel Editing Restrictions", text: "Touch panel does not support renaming interfaces or changing icons (must be configured on Web Console)." }
                ]
            }
        }
    };

    if (window.I18n) window.I18n.registerLocale("en", en);
    else window.I18N_LOCALES = window.I18N_LOCALES || {}, window.I18N_LOCALES.en = en;
})();
