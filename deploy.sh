#!/bin/bash
set -e

echo "===== Resume Builder - Build & Start ====="

# 1. 构建 Docker 镜像
echo "[1/3] Building Docker image..."
docker build -t resume-builder .

# 2. 停止并删除旧容器（如果存在）
echo "[2/3] Stopping old container..."
docker stop resume-builder 2>/dev/null || true
docker rm resume-builder 2>/dev/null || true

# 3. 启动新容器
echo "[3/3] Starting container..."
docker run -d \
  --name resume-builder \
  -p 8080:8080 \
  --restart unless-stopped \
  resume-builder

echo "✅ Done! App is running at http://localhost:8080"
echo "   Nginx should proxy http://127.0.0.1:8080 on port 80"
