/* ==========================================================================
   Q-NEX i18n English Data Dictionary (data-locales-en.js)
   规范：涵盖终端规格、开关机时序、存储三层矩阵与电路沙盘英文数据，行数 <= 300 行
   ========================================================================== */

(function () {
    const enData = {
        terminals: [
            {
                id: "NMP311",
                name: "NMP311",
                category: "Core Processor",
                title: "Networked Media Processor Board",
                generation: "Current Mainstream Hub",
                role: "The central motherboard for smart classrooms and podia, integrating AV matrix, amplifier, power relays, and IoT network.",
                powerArchitecture: {
                    mainSupply: "AC 100-240V Wide Voltage Input",
                    corePowers: "Power 1 & Power 2 (Firmware Hardcoded Controlled Relays)",
                    displayPort: "Display Port (Dedicated Relay with Cooling Delay)",
                    electronicLock: "12V Electronic Lock Port (Power-off unlock/lock, delayed reset)"
                },
                ports: [
                    { name: "Power 1 & 2", desc: "Core controlled AC outlets, firmware hardcoded cutoff on shutdown to prevent electrical leakage" },
                    { name: "Display", desc: "Display power outlet supporting 30-180s cooling delay for projector lamp protection" },
                    { name: "Screen Up / Down", desc: "Motorized screen relays linked with Display power status" },
                    { name: "RS232-1 / 2", desc: "Serial power & source control for IFP interactive flat panel and projectors" },
                    { name: "RS485-1 / 2", desc: "Curtain and air-conditioning expanded IoT automation" },
                    { name: "HDMI 3-in / 2-out", desc: "4K seamless AV matrix switching" },
                    { name: "Reset Pinhole", desc: "Microswitch next to LAN: [Enables DHCP for network discovery ONLY], NEVER resets factory settings!" }
                ],
                resetHoleFact: "This physical Reset pinhole only toggles DHCP to recover forgotten static IPs. It CANNOT wipe configs or reset passwords!"
            },
            {
                id: "NDP200",
                name: "NDP200",
                category: "Smart Podium",
                title: "Networked Digital Podium (Dual Screens)",
                generation: "Flagship Dual-Screen Model",
                role: "All-in-one smart teaching lectern integrating NMP311, OPS PC, touch screen, motorized tilt mechanism, and wireless audio.",
                powerArchitecture: {
                    mainSupply: "Dual Independent Power Inputs + Dual Power Strips",
                    independentPower1: "Power 1: Dedicated to OPS PC, preventing motor surge interference on compute module",
                    independentPower2: "Power 2: Dedicated to linear actuator motor, control PCB, and touch monitor",
                    stripA: "Power Strip A (Controlled): Connected to NMP DISPLAY relay, powers on/off with system",
                    stripB: "Power Strip B (Always-ON): AC mains with air switch, rated 10A / 2000W"
                },
                ports: [
                    { name: "Display Port", desc: "Firmware defaults to enabled state to guarantee OPS PC power supply" },
                    { name: "OPS 6P Cable", desc: "Pin 1/2 short pulse power toggle; Pin 4 checks 5.3V ON-state interlock" },
                    { name: "Lift K1 Relay", desc: "5-PIN relay: NC connects red LED lock, NO powers actuator motor" },
                    { name: "Ball Plunger", desc: "Upper-left spring ball absorbs cover rebound, preventing switch jitter" }
                ],
                resetHoleFact: "Embedded NMP311 motherboard follows the exact same DHCP-only reset behavior. Upgrading requires antenna & sheet-metal bracket replacement."
            },
            {
                id: "NDP100",
                name: "NDP100",
                category: "Smart Podium",
                title: "Single-Screen Digital Podium",
                generation: "Legacy Single-Screen (NMP211)",
                role: "Single-screen podium based on legacy NMP211. Replacement parts now require upgrading to NMP311 standard assembly.",
                powerArchitecture: {
                    mainSupply: "Single Power Supply Architecture",
                    corePowers: "Single output loop without mechanical surge isolation",
                    displayPort: "Display output directly powers main screen"
                },
                ports: [
                    { name: "NMP211 Board", desc: "Legacy controller board, completely superseded by NMP311" },
                    { name: "Legacy Chassis", desc: "Cannot directly mount NMP311 without official bracket adapter kit" }
                ],
                resetHoleFact: "Legacy architecture also resets DHCP only. Firmware upgrades require dedicated service guide."
            },
            {
                id: "NDP600",
                name: "NDP600",
                category: "Flagship Podium",
                title: "Flagship Interactive Podium",
                generation: "Next-Gen Large-Screen Lectern",
                role: "Ultra-wide main & sub displays, built-in 3x3 HDMI matrix, engineered for lecture auditoriums and congress halls.",
                powerArchitecture: {
                    mainSupply: "Triple Independent AC Input Circuits",
                    corePowers: "Time-sliced anti-surge power relay array",
                    displayPort: "Multi-channel Display independent cooling delays"
                },
                ports: [
                    { name: "HDMI 3x3 Matrix", desc: "High-bandwidth 4K@60Hz seamless switching" },
                    { name: "Dual OPS Bays", desc: "Supports rapid switching between guest laptop and embedded PC" }
                ],
                resetHoleFact: "Includes dedicated network recovery pinhole with identical NMP311 logic."
            },
            {
                id: "MBX100",
                name: "MBX100",
                category: "Media Box",
                title: "Campus Public Area Broadcast Terminal",
                generation: "Corridors / Library / Canteen",
                role: "Specialized in campus public audio/video distribution with hardware decoder, receiving intranet live stream and bell schedule.",
                powerArchitecture: {
                    mainSupply: "PoE+ Powered or 12V DC Adapter",
                    corePowers: "Low-power continuous standby IoT engine",
                    displayPort: "HDMI CEC wakeup linked with public display"
                },
                ports: [
                    { name: "PoE+ LAN", desc: "Single cable supplies power and receives ultra-HD video streams" },
                    { name: "HDMI Out", desc: "Outputs to corridor digital signage screens" },
                    { name: "Line Out", desc: "Connects to campus PA amplifier and ceiling speakers" }
                ],
                resetHoleFact: "Supports automatic network discovery; long press enables local debug configuration mode."
            },
            {
                id: "CBX100",
                name: "CBX100",
                category: "Wireless Extender",
                title: "2.4GHz Wireless Device Control Box",
                generation: "Cable-Free Wireless Module",
                role: "Cable-free expansion box controlled via 2.4GHz RF by NMP or Cloud, extending AC infrared, lights, and curtain relays.",
                powerArchitecture: {
                    mainSupply: "AC 100-240V Mains Input",
                    corePowers: "Dual 10A heavy-duty relays (Lighting / Appliances)",
                    displayPort: "One air-conditioning IR emitter port"
                },
                ports: [
                    { name: "2.4GHz RF", desc: "No wiring needed, low-latency bidirectional RF link" },
                    { name: "Relay Out 1/2", desc: "Classroom lights and exhaust fan ON/OFF switching" },
                    { name: "IR Emitter", desc: "Adhesive IR emitter aimed at AC infrared receiver" }
                ],
                resetHoleFact: "Hold button for 5 seconds to enter 2.4GHz RF pairing mode."
            }
        ],
        sequence: {
            powerOnSteps: [
                {
                    step: 1, title: "Auth & Trigger (NFC / Cloud)",
                    desc: "Teacher unlocks panel via NFC card, or cloud sends scheduled power-on MQTT command.",
                    ports: { power12: "OFF", display: "OFF", screen: "Hold", ops: "Standby 0V" },
                    log: "[Trigger] Startup signal received, NMP MCU wakes up."
                },
                {
                    step: 2, title: "Core Power Energized (Power 1 & 2)",
                    desc: "Firmware drives Power 1 & 2 relays to close, delivering AC mains to peripheral equipment.",
                    ports: { power12: "ON (+220V)", display: "OFF", screen: "Hold", ops: "Standby 0V" },
                    log: "[Firmware Linkage] Power 1 & 2 closed, locked by hardware watchdog."
                },
                {
                    step: 3, title: "Display Relay Closed (Display Power)",
                    desc: "Display relay closes. NDP200 defaults to enabled state to guarantee OPS PC power.",
                    ports: { power12: "ON", display: "ON (Controlled)", screen: "Hold", ops: "Ready 0V" },
                    log: "[Display Power] Display relay energized, sending power to monitors / controlled strip."
                },
                {
                    step: 4, title: "Motorized Screen Down Triggered",
                    desc: "Display power triggers screen relay, driving motorized screen down to bottom limit.",
                    ports: { power12: "ON", display: "ON", screen: "Lowering ⬇️", ops: "Ready 0V" },
                    log: "[Screen Linkage] Firmware linkage activated: Display ON -> Screen lowers."
                },
                {
                    step: 5, title: "RS232 / 485 Wakeup Outer Display",
                    desc: "RS232-1 sends HEX Power ON command code to IFP screen or projector, lighting up display.",
                    ports: { power12: "ON", display: "ON", screen: "Down", ops: "Ready 0V" },
                    log: "[Serial Linkage] RS232 sends Power ON command, display boots up."
                },
                {
                    step: 6, title: "OPS Pulse & 5.3V Interlock Lock",
                    desc: "OPS 6P cable Pin 1&2 pulse shorts to boot PC; Pin 4 jumps from 0V to 5.3V completing power on!",
                    ports: { power12: "ON", display: "ON", screen: "Down", ops: "Running (5.3V Lock)" },
                    log: "[OPS Boot] 6P pulse triggered, Pin 4 voltage rises to 5.3V. System ready for class!"
                }
            ],
            powerOffSteps: [
                {
                    step: 1, title: "Power Off Signal Triggered",
                    desc: "Teacher taps [End Class / Power Off] on panel, or cloud executes scheduled shutdown.",
                    ports: { power12: "ON", display: "ON", screen: "Hold", ops: "Running 5.3V" },
                    log: "[Shutdown] Power off command issued, safe shutdown sequence initiated."
                },
                {
                    step: 2, title: "RS232 Display Off & Screen Up",
                    desc: "RS232 sends power-off command to screens; relay triggers motorized screen to roll up.",
                    ports: { power12: "ON", display: "ON (Cooling Delay)", screen: "Rising ⬆️", ops: "Soft Shutdown Done" },
                    log: "[Linkage] RS232 sends sleep command; projection screen rolls up."
                },
                {
                    step: 3, title: "Display Cooling Delay Countdown",
                    desc: "Keeps Display relay energized for 30s to allow projector fan to dissipate bulb heat.",
                    ports: { power12: "ON", display: "ON (30s Cool)", screen: "Up", ops: "0V Cut" },
                    log: "[Cooling Protection] 30-second cooling countdown active; fan spinning at high speed."
                },
                {
                    step: 4, title: "Complete Power Cutoff (0V)",
                    desc: "Countdown reaches zero, Display and Power 1&2 relays release, cutting AC mains to prevent leakage.",
                    ports: { power12: "OFF (0V)", display: "OFF (0V)", screen: "Up", ops: "0V Cut" },
                    log: "[Firmware Hardcoded] Shutdown sequence complete. Power 1 & 2 forced cut, zero leakage risk!"
                }
            ]
        },
        storage: {
            tiers: [
                {
                    layer: "Firmware Layer (MCU Flash)",
                    hardwareLocation: "NMP / NDP Board Flash / EEPROM Chips",
                    configs: [
                        "Power 1 & 2 Core Linkage (Hardcoded Protection)",
                        "Display Relay & Cooling Delay Duration",
                        "Motorized Projection Screen Linkage",
                        "RFID Card Unlock & Password Policy",
                        "12V Electronic Lock Parameters",
                        "Video Matrix Default Input Routing",
                        "Serial Display Power ON/OFF Binding"
                    ],
                    clearCondition: "Device MUST be ONLINE with MQTT/TCP connected! Offline deletion only removes cloud record; firmware configs persist forever.",
                    rebindBehavior: "Rebinding to a new organization leaves old firmware linkages active, potentially causing legacy control conflicts."
                },
                {
                    layer: "Touch Panel Layer (Local Cache)",
                    hardwareLocation: "7-inch / 10-inch Touch Panel Local Storage",
                    configs: [
                        "Air Conditioner IR Remote Codes",
                        "Custom Peripheral Serial Control Parameters",
                        "Panel UI Button Order & Icon Visibility"
                    ],
                    clearCondition: "When rebound to a new organization and connected online, local cache is completely overwritten by cloud org template.",
                    rebindBehavior: "Automatically resets to new organization template; old IR and serial caches are fully purged."
                },
                {
                    layer: "Web Console Cloud (Platform)",
                    hardwareLocation: "Q-NEX Cloud Distributed Database",
                    configs: [
                        "CBS Campus Broadcast System Schedule Templates",
                        "Custom HTML UI Web Control Panel Layouts",
                        "Campus Hierarchy & Timetable Device Bindings"
                    ],
                    clearCondition: "Admins can edit or delete anytime via Web Console, completely decoupled from physical hardware status.",
                    rebindBehavior: "Supports one-click batch CBS template deployment to new devices."
                }
            ],
            resetHoleTruth: {
                title: "Actual Function of the Reset Pinhole next to LAN Port",
                isFactoryReset: false,
                actualFunction: "Enables DHCP automatic dynamic IP retrieval ONLY",
                designIntent: "Originally designed to recover from unknown static IPs or subnet mismatches where LAN discovery fails. Pressing Reset forces router DHCP allocation so ConfigTool can discover the unit.",
                warning: "NEVER assume pressing Reset clears passwords, resets factory configs, or unbinds linkages! Full wipe requires online platform clearing!"
            },
            priorityRules: [
                { name: "Single Device Priority Principle", desc: "Customizations made to a specific device take precedence over org global templates; org global pushes will not overwrite customized units." },
                { name: "New Device Auto-Inherit Principle", desc: "Newly added devices without custom settings automatically inherit org default templates." }
            ]
        }
    };

    if (window.I18n) {
        const existing = window.I18n.locales["en"] || {};
        window.I18n.registerLocale("en", Object.assign(existing, enData));
    } else {
        window.I18N_LOCALES = window.I18N_LOCALES || {};
        window.I18N_LOCALES.en = Object.assign(window.I18N_LOCALES.en || {}, enData);
    }
})();
