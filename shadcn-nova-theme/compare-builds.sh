#!/bin/bash

set -e

OUT="/tmp/next-poc"
BACKUP="$(mktemp)"

# Keep the real next.config.ts and put it back however the script exits
cp next.config.ts "$BACKUP"
trap 'cp "$BACKUP" next.config.ts; rm -f "$BACKUP"' EXIT

if ! grep -q 'output: "standalone"' "$BACKUP"; then
  echo "next.config.ts must contain output: \"standalone\"" >&2
  exit 1
fi

rm -rf "$OUT"
mkdir -p "$OUT/normal" "$OUT/standalone"

# Normal build: same config without the standalone output line
grep -v 'output: "standalone"' "$BACKUP" > next.config.ts

rm -rf .next
ENV=production bun run build

cp -a node_modules "$OUT/normal/"
cp -a .next "$OUT/normal/"
cp -a public "$OUT/normal/"
cp -a package.json "$OUT/normal/"

# Standalone build: the real config
cp "$BACKUP" next.config.ts

rm -rf .next
ENV=production bun run build

cp -a .next/standalone/. "$OUT/standalone/"
cp -a .next/static "$OUT/standalone/.next/"
cp -a public "$OUT/standalone/"

# Results
NORMAL=$(du -sh "$OUT/normal" | cut -f1)
STANDALONE=$(du -sh "$OUT/standalone" | cut -f1)

NORMAL_NM=$(du -sh "$OUT/normal/node_modules" | cut -f1)
STANDALONE_NM=$(du -sh "$OUT/standalone/node_modules" | cut -f1)

printf '\n'
printf '%-25s %s\n' "Next.js Deployment" "Size"
printf '%-25s %s\n' "-------------------------" "--------"
printf '%-25s %s\n' "Normal" "$NORMAL"
printf '%-25s %s\n' "Standalone" "$STANDALONE"

printf '\n'
printf '%-25s %s\n' "node_modules" "Size"
printf '%-25s %s\n' "-------------------------" "--------"
printf '%-25s %s\n' "Normal" "$NORMAL_NM"
printf '%-25s %s\n' "Standalone" "$STANDALONE_NM"

printf '\n'
printf 'Artifacts:\n'
printf '  Normal:     %s\n' "$OUT/normal"
printf '  Standalone: %s\n' "$OUT/standalone"
