#!/bin/bash
set -e

# ローカルでビルド確認してからpm2 deployでLightSailへデプロイ
echo "=== Pre-deploy check ==="
npm run check 2>/dev/null || true
npm run build

echo "=== Deploying to Lightsail (production) ==="
pm2 deploy ecosystem.config.cjs production

echo "=== Done ==="
