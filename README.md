# MTranServer 翻译插件 (Bob)

这是一个基于 [MTranServer](https://github.com/xxnuo/MTranServer) 的 Bob 翻译插件，可以让您在 Bob 中使用自己部署的 MTranServer 翻译服务。从此告别用量焦虑和速度焦虑。

**本文档和插件由 manus 强力驱动，作者只是 AI 的搬运工**

![image](https://github.com/user-attachments/assets/19a46c6b-73af-44ac-9f57-04713e051999)


## 功能特点

- 支持自己部署的MTranServer服务，本地运行速度飞起
- 支持自定义 API 地址和 Token

## 安装方法

1. 确保您已安装 [Bob](https://bobtranslate.com/) (版本 >= 0.5.0)
2. 下载此插件: [[mtranserver-translate.bobplugin](https://github.com/gray0128/bob-plugin-MTranServer/releases/download/v1.2.0/MTranServer-1.2.0.bobplugin)
3. 双击下载的 `.bobplugin` 文件，Bob 会自动安装

## 配置说明

安装完成后，需要在 Bob 的偏好设置中配置插件：

1. 打开 Bob 的偏好设置
2. 选择「服务」选项卡
3. 找到「翻译」服务列表，点击底部的「+」按钮
4. 在弹出的菜单中选择「MTranServer翻译」
5. 在配置界面中填写以下信息：
   - **API地址**：您的 MTranServer 服务地址，例如 `https://mtranserver.xxx.xyz`
   - **API Token**：如果您的服务器设置了 Token，请填写，否则可以留空
6. 点击「验证」按钮测试连接是否成功
7. 点击「保存」按钮

## 使用方法

配置完成后，您可以在 Bob 的翻译服务中选择「MTranServer翻译」作为默认翻译服务，或者在翻译时手动选择该服务。

## 支持的语言（请确保你的mtranserver安装了相关模型）

- 自动检测 (auto)
- 中文简体 (zh-Hans)
- 中文繁体 (zh-Hant)
- 英语 (en)
- 日语 (ja)
- 韩语 (ko)
- 法语 (fr)
- 德语 (de)
- 西班牙语 (es)
- 意大利语 (it)
- 俄语 (ru)
- 葡萄牙语 (pt)
- 阿拉伯语 (ar)
- 波兰语 (pl)
- 波斯语 (fa)

## 常见问题

### 1. 插件无法连接到服务器

- 检查您的 API 地址是否正确
- 确认 MTranServer 服务是否正常运行
- 如果设置了 Token，请确认 Token 是否正确

### 2. 翻译结果不准确

MTranServer 专注于速度和多种设备私有部署，翻译质量可能不如大模型翻译的效果。如果需要高质量的翻译，建议使用在线大模型 API。

## 关于 MTranServer

MTranServer 是一个超低资源消耗超快的离线翻译服务器，英译中模型仅需 860MB 内存即可运行，无需显卡。单个请求平均响应时间 50ms。支持全世界主要语言的翻译。

更多信息请访问 [MTranServer GitHub 仓库](https://github.com/xxnuo/MTranServer)。
