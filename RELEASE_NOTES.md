# MTranServer Bob插件 v1.2.0 发布说明

## 更新内容

### 🔧 改进与修复
- 修复了鉴权头潜在的 `undefined` 问题，解决了通过某些反代服务器连接时提示 API 连接失败 (401) 的问题。
- 优化了长文本（多段落）的翻译结果显示，现在支持在 Bob 客户端中正确换行显示多段落文本。

### 📋 技术变更
- 动态构建 HTTP Header 请求头。
- 提升版本号至 1.2.0。

## 安装说明
1. 下载 `MTranServer-1.2.0.bobplugin` 文件
2. 双击安装到 Bob
3. 在 Bob 偏好设置中配置您的 MTranServer API 地址

---

# MTranServer Bob插件 v1.1.0 发布说明

## 更新内容

### 🚀 新功能
- **适配 MTranServer 3.0 版本** - 完全兼容最新的MTranServer 3.0 API
- **支持中文繁体翻译** - 现在可以正确区分简体中文(zh-Hans)和繁体中文(zh-Hant)

### 🔧 改进
- 优化语言代码映射，提升翻译准确性
- 改进繁体中文支持，提供更精确的翻译结果

### 📋 技术变更
- 更新 `src/lang.js` 中的语言映射配置
- 版本号从 1.0.0 升级到 1.1.0

## 安装说明
1. 下载 `MTranServer-1.1.0.bobplugin` 文件
2. 双击安装到 Bob
3. 在 Bob 偏好设置中配置您的 MTranServer API 地址

## 兼容性
- 需要 Bob 0.5.0 或更高版本
- 兼容 MTranServer 3.0+ 版本

## 文件校验
- 文件名: `MTranServer-1.1.0.bobplugin`
- 包含文件: `icon.png`, `info.json`, `lang.js`, `main.js`
