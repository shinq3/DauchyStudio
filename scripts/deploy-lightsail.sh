#!/bin/bash
# ローカルでビルドして dist/ だけサーバーへ転送する方式（1GB RAM対応）
set -e

SERVER="admin@52.196.136.76"
KEY="/Users/shin/.ssh/id_rsa"
APP_DIR="/var/www/d-auchy/current"
APP_NAME="dauchy-studio"

echo "=== ローカルでビルド ==="
npm run build

echo "=== dist/ をサーバーへ転送 ==="
rsync -avz -e "ssh -i $KEY" --delete dist/ "$SERVER:$APP_DIR/dist/"

echo "=== pm2 再起動 ==="
ssh -i "$KEY" "$SERVER" "cd $APP_DIR && node - <<'NODE'
const { readFileSync } = require('node:fs');
const { spawnSync } = require('node:child_process');

for (const line of readFileSync('.env', 'utf8').split(/\\r?\\n/)) {
  if (!line || line.trimStart().startsWith('#')) continue;
  const index = line.indexOf('=');
  if (index === -1) continue;
  const key = line.slice(0, index).trim();
  const value = line.slice(index + 1);
  if (key) process.env[key] = value;
}

process.env.NODE_ENV = 'production';
process.env.PORT = '5010';

const result = spawnSync('pm2', ['restart', '$APP_NAME', '--update-env'], {
  stdio: 'inherit',
  env: process.env,
});
process.exit(result.status ?? 1);
NODE"

echo "=== Deploy done ==="
