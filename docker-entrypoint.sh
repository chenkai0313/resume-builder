#!/bin/sh
set -e

# 启动 nginx（前台日志模式）
nginx -g 'daemon off;' &

# 等待 nginx 就绪
sleep 1

# 启动 Next.js
echo "Starting Next.js on port 8080..."
exec npm run start
