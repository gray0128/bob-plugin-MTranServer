#!/bin/bash

VERSION="1.2.0"
PLUGIN_NAME="MTranServer-${VERSION}.bobplugin"

echo "🚀 开始创建 MTranServer Bob插件 v${VERSION} release..."

# 检查GitHub CLI是否安装
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) 未安装"
    echo "请安装GitHub CLI: https://cli.github.com/"
    exit 1
fi

# 检查是否已登录GitHub CLI
if ! gh auth status &> /dev/null; then
    echo "❌ 请先登录GitHub CLI:"
    echo "gh auth login"
    exit 1
fi

# 自动打包 src 目录
echo "📦 正在打包插件..."
cd src || exit 1
zip -r "../${PLUGIN_NAME}" . -x "*.DS_Store"
cd ..

# 创建release
echo "📦 创建GitHub release..."
gh release create "v${VERSION}" \
  --title "MTranServer Bob插件 v${VERSION}" \
  --notes "# MTranServer Bob插件 v${VERSION} 发布说明

## 🔧 改进与修复
- 修复了鉴权头潜在的 undefined 问题，解决了部分反代服务器连接失败的问题。
- 优化了长文本（多段落）的翻译结果解析，在 Bob 客户端中支持正确换行显示。

## 安装说明
1. 下载 \`${PLUGIN_NAME}\` 文件
2. 双击安装到 Bob
3. 在 Bob 偏好设置中配置您的 MTranServer API 地址

## 兼容性
- 需要 Bob 0.5.0 或更高版本
- 兼容 MTranServer 3.0+ 版本" \
  --draft=false \
  --prerelease=false \
  "${PLUGIN_NAME}"

echo "✅ release创建完成！"
