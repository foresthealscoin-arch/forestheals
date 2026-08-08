#!/usr/bin/env bash
set -euo pipefail

echo "================================"
echo " FORESTHEALS BUILD RUNNER"
echo "================================"

if [ ! -f package.json ]; then
  echo "ERROR: Run this from /workspaces/forestheals"
  exit 1
fi

echo ""
echo "1. Checking environment..."

if [ -f .env.local ] && grep -q '^DATABASE_URL=' .env.local; then
  echo "DATABASE_URL: OK"
else
  echo "DATABASE_URL: MISSING"
  exit 1
fi

echo ""
echo "2. Checking project..."

for file in \
  "src/db/schema.ts" \
  "src/db/index.ts" \
  "src/lib/commerce/products.ts" \
  "src/app/(store)/shop/page.tsx" \
  "src/app/(store)/shop/[slug]/page.tsx"
do
  if [ -f "$file" ]; then
    echo "OK: $file"
  else
    echo "MISSING: $file"
  fi
done

echo ""
echo "3. Checking product image..."

if [ -f "public/images/products/collagen-coffee.jpg" ]; then
  echo "OK: collagen-coffee.jpg"
else
  echo "WARNING: product image missing"
fi

echo ""
echo "4. Building Forestheals..."

npm run build

echo ""
echo "5. Git status..."

git status --short

echo ""
echo "================================"
echo " FORESTHEALS CHECK COMPLETE"
echo "================================"

echo ""
echo "If the build passed, save with:"
echo ""
echo 'git add . && git commit -m "chore: forestheals checkpoint" && git push'
