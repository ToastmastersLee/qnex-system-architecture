# Q-NEX 终端体系与开关机联动架构仿真器 (Terminal Architecture Simulator)

这是一个位于 `Emulators/SystemArchitecture/terminal-architecture/` 的纯静态离线仿真器与可视化沙盘系统。直接在 Edge 或 Chrome 浏览器中双击打开 `index.html` 即可运行，无任何构建步骤，不发起外部网络请求。

---

## 🧭 五大动态可视化与脚本动画模块

本模块全面摒弃纯文字罗列，采用 **规范拓扑接线、SVG 矢量机箱、CSS3 状态动力学动画、DOM 脚本沙盘** 等高交互性可视化手段讲透架构：

### 1. Q-NEX 核心拓扑与在线配置下发 (Topology & Online Delivery)
严格遵循《Q-NEX 产品线拓扑图设计规范》与售前产品清单高清图像构建：
- **标准接线与图例**：
  - 🟦 **LAN / PoE+ (`#0074D9`)**：连接 Cloud $\rightarrow$ NMP、NMP $\rightarrow$ Touch Panel CPL20
  - 🟣 **RS232 (`#B10DC9`)**：连接 NMP $\rightarrow$ Room Display (IFP)
  - 🟠 **Relay 继电器 (`#FF851B`)**：连接 NMP $\rightarrow$ 投影仪 (Display口)、幕布 (Screen口)、灯光 (Power 1&2口)
  - ⚫ **Internet / 链路 (`#888888`)**：连接 Web Console / App $\rightarrow$ 云服务
- **点击深度交互**：
  - **点击 NMP 节点**：展开抽屉展示**固件层 (Flash)** 保存的 7 项配置（Power1/2强制断电、Display延时、幕布、刷卡锁、电子锁、输入源、串口联动）以及在线清除铁律与 Reset 孔真实功能（仅开启 DHCP）；
  - **点击 Touch Panel (CPL20)**：展开抽屉展示**从云端下发到触控屏本地**的配置（空调红外码库、普通串口小部件、UI导航排序/隐藏、组织模板全量覆盖规则）。
- **在线配置下发动态流程**：
  - 点击【⚡ 模拟云端配置下发】，动态呈现报文从 Web Console 飞入云端、云端通过 MQTT 通道向 NMP 写入固件 Flash 与向 Touch Panel 刷新界面的流动光效，以及终端返回 ACK 闭环。

---

### 2. 终端机身物理端口与 SVG 矢量图解 (Terminal Chassis & Ports)
- **矢量机身面板**：以真实工业设计为基准绘制 1U/集成机身面板 SVG，包含 AC IN、Power 1 & 2、Display 继电器、Screen 升降、RS232/485 凤凰端子、RJ45 网口（带绿色脉冲 Link LED）、HDMI 矩阵接口以及 **醒目的红圈物理微动 RESET 小孔**。
- **点击交互高亮**：点击任意物理端口，机箱自动聚焦并展示该端口的电气特性与接线外设。

---

### 3. 开关机受控联动时序动态仿真沙盘 (Animated Power Linkage)
直观呈现开关机过程中物理继电器的开合与外设状态跃迁：
- **投影仪受控 Display 接口**：内置 CSS 动态旋转散热风扇（`🌀 spinning`），在关机延时阶段动态旋转，并伴随 30 秒倒计时散热环。
- **电动投影幕布动态卷轴**：模拟投影幕布画卷，Display 上电时平滑向下展开铺满（Down），Display 关机时卷收回轴（Up）。
- **OPS 6P 检测电平表**：动态显示 Pin 4 状态电压表盘，关机为 `0.0V 关断`，脉冲开机后跳变为绿色 `5.3V 互锁吸合`。
- **两路受控核心电源 (Power 1 & 2)**：固件层硬写死强保护，关机强制切断市电，杜绝带电触电隐患。

---

### 4. 配置三层存储与在线清空模拟器 (3-Tier Storage Matrix)
- **设备在线 (Online) vs 离线 (Offline) 动态切换**：
  - 在线状态点击【从后台删除设备】：平台指令成功下发，固件层与云端数据全量清空；
  - 离线状态点击【从后台删除设备】：触发严重避坑警报，直观揭示“云端记录虽删，但固件层旧联动（Display/电源口）顽固残留”的工程隐患。
- **NMP311 网口旁边 Reset 微动孔**：
  - 点击【戳 NMP311 Reset 孔】：动态揭秘该孔**仅开启设备 DHCP 自动获取 IP 功能**（用于找回遗忘的固定 IP），绝不具备恢复出厂配置功能！

---

### 5. NDP 数智讲台内部升降控制与互锁沙盘 (NDP Mechanism & Circuit Sandbox)
- **盖板推拉与碰珠锁止防误触**：
  - 未推到底时：碰珠未锁止，K1 继电器线圈断开保持常闭 **NC (Pin 1)**，面板亮 **🔴 红灯**，电机按键硬互锁禁用；
  - 推到底卡入碰珠：碰珠紧扣，行程开关闭合，K1 吸合切换至常开 **NO (Pin 2)**，面板转 **🟢 绿灯**，MOTOR V 送电，按键激活！
- **推杆升降电机驱动平台**：
  - 点击【▲ 升起】：推杆缓缓向上伸长，中屏仰角实时倾斜抬起，显示 H 桥极性 `+12V (线A: +12V, 线B: GND)`；
  - 点击【▼ 下降】：推杆平缓收缩，中屏倾角回平，显示反转极性 `-12V (线A: GND, 线B: +12V)`；
  - 点击【⚡ 双键防误触测试】：两端均进 +12V，电位差 0V，电机无压差静止，直观展示为何双按不烧机。
- **K1 继电器 5PIN 权威定义**：
  - Pin 1 (NC): 面板红灯；Pin 2 (NO): MOTOR V；Pin 3: 行程开关；Pin 4: 接地+B5819二极管；Pin 5 (COM): 12V常电。

---

## 📏 代码规模与工程规范验证

全工程通过 `tools/check-source-size.ps1` 校验，无构建依赖，所有单文件均 $\le 300$ 行：

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\check-source-size.ps1
# All source files are within the 300-line target.
```
