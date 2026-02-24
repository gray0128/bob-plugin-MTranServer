# GEMINI.md - Bob MTranServer 翻译插件开发上下文

此文件为 Gemini CLI 提供关于 `bob-plugin-mtranserver` 项目的背景信息、开发规范和指令建议。

## 项目概述

- **项目名称**: MTranServer 翻译插件 (Bob)
- **项目类型**: [Bob 翻译软件](https://bobtranslate.com/) 的第三方服务插件。
- **核心功能**: 对接自托管的 [MTranServer](https://github.com/xxnuo/MTranServer) API，提供极速、私密的翻译服务。
- **主要技术**: JavaScript (CommonJS), Bob Plugin API ($http, $option, $log 等)。

## 目录结构

- `docs/`: 存放相关文档和接口定义（如 MTranServer API 的 Swagger/OpenAPI 描述文件 `swagger.json` / `swagger.yaml`）。
- `src/`: 插件源代码目录（这是 Bob 插件的核心，打包时需包含此目录下的所有内容）。
  - `info.json`: 插件清单文件，定义版本、标识符、配置项（API 地址、Token）等元数据。
  - `main.js`: 插件逻辑入口，实现 `translate`、`supportLanguages` 和 `pluginValidate` 等接口。
  - `lang.js`: 语言映射逻辑，将 Bob 的语言代码转换为 MTranServer 识别的代码。
  - `icon.png`: 插件在 Bob 界面中显示的图标。
- `appcast.json`: 插件的自动更新配置文件，包含各版本的下载链接与更新日志。
- `create_release.sh`: 自动化打包与发布脚本，可一键压缩插件并使用 GitHub CLI 创建 Release。
- `RELEASE_NOTES.md`: 项目版本发布说明记录。
- `README.md`: 项目使用说明及安装指南。

## 开发与调试规范

### 1. 核心接口
- **`supportLanguages()`**: 返回支持的语言列表。
- **`translate(query, completion)`**: 核心翻译逻辑。
  - `query.text`: 待翻译文本。
  - `query.detectFrom` / `query.detectTo`: 源语言和目标语言。
  - `completion`: 回调函数，返回结果或错误。
- **`pluginValidate(completion)`**: 在 Bob 偏好设置中点击“验证”时触发，用于检查 API 可用性。

### 2. 网络请求
- 使用 Bob 提供的全局对象 `$http` 进行网络请求。
- 默认超时建议设置为 60 秒。

### 3. 配置项
- 插件通过 `$option` 访问 `info.json` 中定义的配置。
- `apiUrl`: MTranServer 的服务地址。
- `token`: 鉴权令牌。

## 构建与发布

- **打包与发布**: 运行 `./create_release.sh` 脚本可自动化完成 `src` 目录的压缩打包（生成 `.bobplugin` 文件），并借助 GitHub CLI (gh) 自动在 GitHub 上创建 Release。
- **自动更新**: 发布新版本前，需确保同步更新 `appcast.json` 文件以支持 Bob 客户端内的插件自动更新 (OTA) 机制。
- **安装**: 双击生成的 `.bobplugin` 文件，Bob 客户端会自动完成安装或更新。

## 未来任务与建议

- **功能增强**:
  - 考虑增加对 MTranServer 更多高级参数的支持。
  - 增强翻译结果的后处理逻辑（如去除冗余空格）。
- **健壮性**:
  - 在 `main.js` 中增加更详尽的错误捕获和日志记录（使用 `$log`）。
  - 验证不同网络环境下的连接表现。

## 指令建议

- 如果需要修改支持的语言，请修改 `src/lang.js`。
- 如果需要调整 API 请求逻辑或错误处理，请修改 `src/main.js`。
- 如果需要更改插件在 Bob 中的显示名称或配置项，请修改 `src/info.json`。
