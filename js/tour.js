/**
 * Q-NEX System Architecture Simulator - Newbie Training Guided Tour
 * Bilingual support (Chinese & English)
 */

class NewbieTour {
    constructor() {
        this.currentStep = 0;
        
        this.steps_zh = [
            {
                title: '第 1 站：云端与远程管理层 (Cloud & Management Layer)',
                targetNodes: ['console', 'app', 'cloud'],
                description: `
                    <p class="tour-text"><strong>Q-NEX 采用混合云架构体系：</strong></p>
                    <ul class="tour-list">
                        <li><strong>Web Console (PC 控制台)：</strong> 管理员在办公室通过任意浏览器访问，进行课表录入、广播排期、用电能耗报表与批量设备管理。</li>
                        <li><strong>Q-NEX App (手机端)：</strong> 教师与运维人员的随身数字钥匙，随时进行即时开机、身份扫码鉴权与应急调度。</li>
                        <li><strong>Q-NEX Cloud Server (公有云管理平台)：</strong> 全局信令中枢，负责设备注册与 MQTT 心跳。<strong>重要考点：</strong> 云端仅传输轻量控制指令与元数据，不承载大流量校内音视频，确保极高稳定性！</li>
                    </ul>
                `
            },
            {
                title: '第 2 站：校园流媒体核心中枢 (Media Server inside Campus LAN)',
                targetNodes: ['mediaserver', 'switch', 'router'],
                description: `
                    <p class="tour-text"><strong>【售前与技术关键设计】：为什么流媒体服务器必须部署在校园局域网？</strong></p>
                    <ul class="tour-list">
                        <li><strong>带宽瓶颈拦截：</strong> 如果全校 100 间教室直接向公网云端拉取 1080P/4K 直播流，校园公网出口总带宽会瞬间被挤爆瘫痪。</li>
                        <li><strong>本地推流分发：</strong> 将 <code>Media Server</code> 置于校园千兆局域网核心交换机下，校领导讲话或外部推流仅需一条低码率流入，由本地服务器通过内网 RTMP/组播瞬间分发给所有终端，延迟低于 200ms 且<strong>零公网流量消耗</strong>！</li>
                        <li><strong>本地离线作息保活：</strong> 校园上下课铃声、午间广播直接存储于本地服务器，即使公网偶发断网，学校上下课打铃系统依然 100% 准时运行。</li>
                    </ul>
                `
            },
            {
                title: '第 3 站：物联终端核心家族：NDP vs NMP vs SL100 vs MBX 选型全解',
                targetNodes: ['ndp600', 'nmp', 'ndp200', 'sl100', 'mbx_corridor', 'mbx_library'],
                description: `
                    <p class="tour-text"><strong>针对不同应用场景的精准产品选型原则：</strong></p>
                    <ul class="tour-list">
                        <li><strong>NDP600 (桌面式多功能集控讲台)：</strong> 桌面多功能集控方案核心。集成 23.8 寸电容手写屏、10.1 寸中控触控屏、3×3 HDMI 1.4 矩阵无缝切换与 Type-C 视讯触控，一站式桌面级设备全能集控。</li>
                        <li><strong>NMP311 (网络媒体处理器)：</strong> 标准多媒体教室中流砥柱。隐藏安装于传统讲台内，内置 3×3 HDMI 1.4 矩阵无缝切换，连接触控面板、大屏、灯光空调继电器与无源音箱。</li>
                        <li><strong>NDP200 (旗舰落地式数字讲台)：</strong> 专为大型阶梯教室、学术报告厅设计。电动升降高度、专业防啸叫鹅颈麦克风与双屏交互。</li>
                        <li><strong>SL100 (高端精品智能演讲台)：</strong> 搭载 23.8 寸主动电容触摸屏、8.8 寸中控屏与电动丝杆升降。内置 3×3 HDMI 矩阵与 3×3 USB KVM 矩阵。<strong>售前重要考点：</strong> SL100 专为高端多媒体互动演示设计，流媒体不往 SL100 走；但全面支持云端直接下发的 MQTT 文本广播（如突发火警文本通知无需 Media Server 支持，可在大屏显示）！</li>
                        <li><strong>MBX100 (网络广播媒体盒)：</strong> 专为走廊、食堂、图书馆等公共区域设计。无本地繁杂按键，作为高性价比纯接收终端驱动走廊发布电视与广播音箱，全面支持云端 MQTT 心跳检测（在线/离线判断）与远程批量管控！</li>
                    </ul>
                `
            },
            {
                title: '第 4 站：末端音视频呈现与功放一体化 (Displays & Amplification)',
                targetNodes: ['ifp_a', 'spk_a', 'ifp_b', 'spk_b', 'ifp_h', 'spk_h', 'ifp_sl', 'spk_sl', 'disp_c', 'spk_c', 'disp_l', 'spk_l'],
                description: `
                    <p class="tour-text"><strong>Q-NEX 独具优势的端到端声画一体集成：</strong></p>
                    <ul class="tour-list">
                        <li><strong>内置数字大功放：</strong> NMP 与 NDP 均内置 2×40W 高效数字功放模块，MBX 内置 2×20W 功放。绿色音频线从大屏底部环绕直接驱动 <code>PS610</code> 等无源教学音箱，<strong>客户无需额外掏钱购买独立功放机</strong>！</li>
                        <li><strong>HDMI 4K 超高清视讯：</strong> 终端 HDMI 端口直连大屏 (IFP) 或投影，支持本地课件投影、云端定时广播画面与紧急图文通知全自动同显。</li>
                    </ul>
                `
            },
            {
                title: '第 5 站：接线颜色标准规范 (Authoritative Wiring Standards)',
                targetNodes: [],
                description: `
                    <p class="tour-text"><strong>请所有售前与技术人员务必牢记《Q-NEX 产品线拓扑图设计规范》配色标准：</strong></p>
                    <div class="tour-color-grid">
                        <div class="color-item"><span class="color-dot" style="background: #0074D9;"></span><strong>蓝色 (#0074D9)：</strong> LAN / 网络线 / PoE+ (行业统一规范)</div>
                        <div class="color-item"><span class="color-dot" style="background: #FF4136;"></span><strong>红色 (#FF4136)：</strong> HDMI / 4K 视讯传输线 (高识别度)</div>
                        <div class="color-item"><span class="color-dot" style="background: #2ECC40;"></span><strong>绿色 (#2ECC40)：</strong> Audio / 音频线 / 音箱喇叭线</div>
                        <div class="color-item"><span class="color-dot" style="background: #B10DC9;"></span><strong>紫色 (#B10DC9)：</strong> RS232 / RS485 串口控制线</div>
                        <div class="color-item"><span class="color-dot" style="background: #FF851B;"></span><strong>橙色 (#FF851B)：</strong> Relay / 强电继电器触发控制线</div>
                        <div class="color-item"><span class="color-dot" style="background: #334155; border: 1px dashed #38bdf8;"></span><strong>虚线：</strong> 无线通信 (Wi-Fi / 4G / 麦克风无线频段)</div>
                    </div>
                `
            }
        ];

        this.steps_en = [
            {
                title: 'Step 1: Cloud & Remote Management Plane',
                targetNodes: ['console', 'app', 'cloud'],
                description: `
                    <p class="tour-text"><strong>Q-NEX Hybrid Cloud Architecture:</strong></p>
                    <ul class="tour-list">
                        <li><strong>Web Console (PC Admin):</strong> Accessible from any modern browser for timetable management, automated broadcasting schedules, energy metering, and fleet IoT control.</li>
                        <li><strong>Q-NEX Mobile App:</strong> Digital pass for teachers and IT admins on smartphone—supporting one-tap power on, QR code lectern authentication, and instant alerts.</li>
                        <li><strong>Q-NEX Cloud Server (Cloud Hosted):</strong> Central control signaling engine handling device registration and MQTT heartbeats. <strong>Key Rule:</strong> Cloud transfers only lightweight telemetry and metadata—NOT high-bandwidth local video streams!</li>
                    </ul>
                `
            },
            {
                title: 'Step 2: Campus Media Core (Media Server inside Campus LAN)',
                targetNodes: ['mediaserver', 'switch', 'router'],
                description: `
                    <p class="tour-text"><strong>[Key Architectural Rule]: Why must the Media Server reside inside the campus LAN?</strong></p>
                    <ul class="tour-list">
                        <li><strong>Bandwidth Bottleneck Prevention:</strong> If 100 classrooms independently pull 1080P/4K video streams from the public cloud, the school's WAN gateway would immediately collapse.</li>
                        <li><strong>Local RTMP Distribution:</strong> Deploying the <code>Media Server</code> directly beneath the Core Gigabit Switch allows live broadcast streams to be distributed internally via RTMP/multicast with sub-200ms latency and <strong>zero public internet traffic</strong>!</li>
                        <li><strong>Offline Resiliency:</strong> School bells, announcements, and BGM are stored locally on the server. Even if public internet goes down, campus schedules remain 100% functional.</li>
                    </ul>
                `
            },
            {
                title: 'Step 3: Terminal Hardware Selection: NDP vs NMP vs SL100 vs MBX',
                targetNodes: ['ndp600', 'nmp', 'ndp200', 'sl100', 'mbx_corridor', 'mbx_library'],
                description: `
                    <p class="tour-text"><strong>Selection principles across diverse educational spaces:</strong></p>
                    <ul class="tour-list">
                        <li><strong>NDP600 (Desktop Multi-Function Control Lectern):</strong> Compact desktop central control lectern integrating 23.8" pen display, 10.1" capacitive touch panel, 3×3 HDMI 1.4 seamless matrix switching, and Type-C AV & touch.</li>
                        <li><strong>NMP311 (Networked Media Processor):</strong> The workhorse of standard classrooms. Built-in 3×3 HDMI 1.4 seamless matrix, orchestrating displays, lights, AC relays, and passive speakers.</li>
                        <li><strong>NDP200 (Flagship Standing Smart Podium):</strong> Engineered for auditoriums and large lecture halls. Features motorized height adjustment, anti-howling gooseneck mics, and dual-screen workflow.</li>
                        <li><strong>SL100 (Premium Smart Digital Podium):</strong> Premium digital podium equipped with 23.8" capacitive pen display, 8.8" control panel, and electric lead-screw lift. Built-in 3×3 HDMI & 3×3 USB KVM matrices. <strong>Presales Key Rule:</strong> SL100 is engineered for interactive presentations; live streaming does not route to SL100. It natively supports cloud-pushed MQTT text broadcasts (e.g. fire alarm text alerts without needing Media Server)!</li>
                        <li><strong>MBX100 (Media Broadcast Box):</strong> Budget-friendly networked broadcast terminal for corridors and libraries. Drives signage displays and ceiling speakers; fully supports cloud MQTT heartbeat (online/offline detection) and remote batch control!</li>
                    </ul>
                `
            },
            {
                title: 'Step 4: Integrated Audio Amplification & 4K Display',
                targetNodes: ['ifp_a', 'spk_a', 'ifp_b', 'spk_b', 'ifp_h', 'spk_h', 'ifp_sl', 'spk_sl', 'disp_c', 'spk_c', 'disp_l', 'spk_l'],
                description: `
                    <p class="tour-text"><strong>All-in-One AV Power Advantages:</strong></p>
                    <ul class="tour-list">
                        <li><strong>Built-in Digital Power Amplifiers:</strong> NMP and NDP feature 2x40W high-efficiency digital amps (MBX features 2x20W). Terminals directly drive <code>PS610</code> passive speakers via audio cables looping below the screens—<strong>no standalone external amplifier needed</strong>!</li>
                        <li><strong>4K UHD HDMI Switching:</strong> Direct red HDMI connection to Interactive Flat Panels (IFP) or video walls, synchronizing local lesson PPT, cloud streaming, and emergency alerts.</li>
                    </ul>
                `
            },
            {
                title: 'Step 5: Authoritative Wiring & Color Standards',
                targetNodes: [],
                description: `
                    <p class="tour-text"><strong>Always strictly follow the official Q-NEX Wiring Specifications:</strong></p>
                    <div class="tour-color-grid">
                        <div class="color-item"><span class="color-dot" style="background: #0074D9;"></span><strong>Blue (#0074D9):</strong> LAN / Ethernet / PoE+ (Industry Standard)</div>
                        <div class="color-item"><span class="color-dot" style="background: #FF4136;"></span><strong>Red (#FF4136):</strong> HDMI / Video Transmission (High Visibility)</div>
                        <div class="color-item"><span class="color-dot" style="background: #2ECC40;"></span><strong>Green (#2ECC40):</strong> Audio / Speaker Cable / Line Out</div>
                        <div class="color-item"><span class="color-dot" style="background: #B10DC9;"></span><strong>Purple (#B10DC9):</strong> RS232 / RS485 Serial Control</div>
                        <div class="color-item"><span class="color-dot" style="background: #FF851B;"></span><strong>Orange (#FF851B):</strong> Relay / Power & Logic Trigger</div>
                        <div class="color-item"><span class="color-dot" style="background: #334155; border: 1px dashed #38bdf8;"></span><strong>Dashed Line:</strong> Wireless (Wi-Fi / 4G / Mic UHF)</div>
                    </div>
                `
            }
        ];
    }

    get steps() {
        const lang = window.simulator?.lang || 'en';
        const content = window.QnexApp.data.localeContent?.[lang];
        const steps = content
            ? this.steps_en.map((step, index) => ({ ...step, ...content.tour[index] }))
            : (lang === 'zh' ? this.steps_zh : this.steps_en);
        return steps.filter(step => window.simulator?.mediaServerEnabled
            || !step.targetNodes.includes('mediaserver'));
    }

    start() {
        this.currentStep = 0;
        this.renderStep();
        if (window.soundSys) window.soundSys.playClick();
    }

    next() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.renderStep();
            if (window.soundSys) window.soundSys.playClick();
        } else {
            this.close();
        }
    }

    prev() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.renderStep();
            if (window.soundSys) window.soundSys.playClick();
        }
    }

    close() {
        const modal = document.getElementById('tour-modal');
        if (modal) modal.classList.add('hidden');
        this.clearHighlights();
        if (window.soundSys) window.soundSys.playClick();
    }

    renderStep() {
        this.currentStep = Math.min(this.currentStep, this.steps.length - 1);
        const modal = document.getElementById('tour-modal');
        if (!modal) return;
        modal.classList.remove('hidden');

        const lang = window.simulator?.lang || 'zh';
        const i18n = window.I18N_DATA[lang]?.tour || window.I18N_DATA.zh.tour;

        const step = this.steps[this.currentStep];
        document.getElementById('tour-step-counter').textContent = `${i18n.step_badge} ${this.currentStep + 1} / ${this.steps.length}`;
        document.getElementById('tour-title').textContent = step.title.replace(
            /^(Step |第 )\d+/, (_, prefix) => `${prefix}${this.currentStep + 1}`);
        document.getElementById('tour-body').innerHTML = step.description;

        const prevBtn = document.getElementById('tour-prev-btn');
        const nextBtn = document.getElementById('tour-next-btn');
        const closeBtn = document.getElementById('tour-close-btn');

        if (prevBtn) {
            prevBtn.textContent = i18n.prev_btn;
            prevBtn.disabled = (this.currentStep === 0);
        }
        if (nextBtn) {
            nextBtn.textContent = (this.currentStep === this.steps.length - 1) ? i18n.finish_btn : i18n.next_btn;
        }
        if (closeBtn) {
            closeBtn.textContent = i18n.close_btn;
        }

        this.applyHighlights(step.targetNodes);
    }

    applyHighlights(nodeIds) {
        this.clearHighlights();
        if (!nodeIds || nodeIds.length === 0) return;

        nodeIds.forEach(id => {
            const el = document.getElementById(`node-${id}`);
            if (el) {
                el.classList.add('node-highlighted');
            }
        });
    }

    clearHighlights() {
        document.querySelectorAll('.node-highlighted').forEach(el => {
            el.classList.remove('node-highlighted');
        });
    }
}

window.QnexApp.services.NewbieTour = NewbieTour;
window.newbieTour = new NewbieTour();
