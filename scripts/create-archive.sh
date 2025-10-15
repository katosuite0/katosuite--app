#!/usr/bin/env bash

# ============================================
# FIGMA MAKE AI ARCHIVE CREATION SCRIPT
# Version: 1.0.0
# Date: October 12, 2025
# ============================================

set -euo pipefail

echo "🚀 KatoSuite - Creating Figma Make AI Archive"
echo "=============================================="
echo ""

ARCHIVE_NAME="katosuite-production-v1.0.0"
ARCHIVE_DIR="archive"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

step() {
  printf "%b%s%b\n" "$BLUE" "$1" "$NC"
}

step "Step 1: Cleaning old archives..."
rm -rf "${ARCHIVE_DIR:?}/${ARCHIVE_NAME}"
rm -f "${ARCHIVE_DIR}/${ARCHIVE_NAME}.zip"
mkdir -p "${ARCHIVE_DIR}"
echo -e "  ${GREEN}✓ Cleaned${NC}"

echo ""
step "Step 2: Creating archive structure..."
mkdir -p "${ARCHIVE_DIR}/${ARCHIVE_NAME}"
echo -e "  ${GREEN}✓ Created${NC}"

echo ""
step "Step 3: Copying project files..."
rsync -av \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.git' \
  --exclude='*.log' \
  --exclude='.env' \
  --exclude='.env.local' \
  --exclude='.env.production' \
  --exclude='archive' \
  --exclude='*.zip' \
  --exclude='*.tar.gz' \
  --exclude='.DS_Store' \
  --exclude='Thumbs.db' \
  --exclude='coverage' \
  --exclude='test-results' \
  --exclude='.cache' \
  --exclude='dist' \
  --exclude='build' \
  --exclude='.vercel' \
  --exclude='.supabase' \
  --progress \
  . "${ARCHIVE_DIR}/${ARCHIVE_NAME}/"

echo -e "  ${GREEN}✓ Files copied${NC}"

echo ""
step "Step 4: Verifying essential files..."
REQUIRED_FILES=(
  "package.json"
  "tsconfig.json"
  "next.config.mjs"
  "vercel.json"
  ".env.example"
  ".gitignore"
  ".eslintrc.json"
  "LICENSE"
  "README.md"
  "guidelines/Guidelines.md"
  "config/plans.json"
  "lib/watermark-policy.ts"
  "lib/entitlements.ts"
  "FIGMA_MAKE_ARCHIVE_GUIDE.md"
  "PRODUCTION_READY_FINAL.md"
)

missing=0
for file in "${REQUIRED_FILES[@]}"; do
  if [[ -f "${ARCHIVE_DIR}/${ARCHIVE_NAME}/${file}" ]]; then
    echo -e "  ${GREEN}✓${NC} ${file}"
  else
    echo -e "  ${RED}✗${NC} ${file} ${RED}MISSING!${NC}"
    missing=$((missing + 1))
  fi
done

if [[ $missing -gt 0 ]]; then
  echo -e "${RED}Error: ${missing} required files missing!${NC}"
  exit 1
fi

echo -e "  ${GREEN}✓ All required files present${NC}"

echo ""
step "Step 5: Creating ZIP archive..."
(
  cd "${ARCHIVE_DIR}" &&
    zip -r "${ARCHIVE_NAME}.zip" "${ARCHIVE_NAME}" -q
)

echo -e "  ${GREEN}✓ Archive created${NC}"

echo ""
step "Step 6: Generating checksums..."
if command -v shasum >/dev/null 2>&1; then
  shasum -a 256 "${ARCHIVE_DIR}/${ARCHIVE_NAME}.zip" > "${ARCHIVE_DIR}/${ARCHIVE_NAME}.sha256"
  echo -e "  ${GREEN}✓ SHA256 checksum generated${NC}"
else
  echo -e "  ${YELLOW}⚠ shasum not available, skipping checksum${NC}"
fi

echo ""
step "Step 7: Archive information"
ARCHIVE_SIZE=$(du -h "${ARCHIVE_DIR}/${ARCHIVE_NAME}.zip" | cut -f1)
ARCHIVE_PATH=$(realpath "${ARCHIVE_DIR}/${ARCHIVE_NAME}.zip")
FILE_COUNT=$(unzip -l "${ARCHIVE_DIR}/${ARCHIVE_NAME}.zip" | tail -1 | awk '{print $2}')

echo -e "  📦 ${GREEN}${ARCHIVE_NAME}.zip${NC}"
echo -e "  📊 ${GREEN}${ARCHIVE_SIZE}${NC}"
echo -e "  📁 ${GREEN}${FILE_COUNT}${NC}"
echo -e "  📍 ${GREEN}${ARCHIVE_PATH}${NC}"

echo ""
step "Step 8: Testing archive integrity..."
if unzip -t "${ARCHIVE_DIR}/${ARCHIVE_NAME}.zip" >/dev/null 2>&1; then
  echo -e "  ${GREEN}✓ Archive integrity verified${NC}"
else
  echo -e "  ${RED}✗ Archive integrity check failed${NC}"
  exit 1
fi

echo ""
step "Step 9: Creating manifest..."
cat > "${ARCHIVE_DIR}/${ARCHIVE_NAME}-manifest.txt" <<MANIFEST
KATOSUITE PRODUCTION ARCHIVE MANIFEST
======================================
Version: 1.0.0
Date: $(date)
Archive: ${ARCHIVE_NAME}.zip
Size: ${ARCHIVE_SIZE}
Files: ${FILE_COUNT}
SHA256: $(cat "${ARCHIVE_DIR}/${ARCHIVE_NAME}.sha256" 2>/dev/null || echo "N/A")

ESSENTIAL FILES INCLUDED:
✓ package.json
✓ tsconfig.json
✓ next.config.mjs
✓ vercel.json
✓ .env.example
✓ .gitignore
✓ .eslintrc.json
✓ LICENSE
✓ README.md
✓ FIGMA_MAKE_ARCHIVE_GUIDE.md
✓ guidelines/Guidelines.md
✓ config/plans.json
✓ lib/watermark-policy.ts
✓ lib/entitlements.ts
✓ All components and API routes

GETTING STARTED:
1. Extract: unzip ${ARCHIVE_NAME}.zip
2. Read: FIGMA_MAKE_ARCHIVE_GUIDE.md
3. Setup: cp .env.example .env.local
4. Install: pnpm install
5. Run: pnpm dev

Support: figma-make-support@katosuite.com
MANIFEST

echo -e "  ${GREEN}✓ Manifest created${NC}"

echo ""
step "Archive creation complete!"
echo -e "  📦 Archive ready for delivery"
echo -e "  📍 ${ARCHIVE_PATH}"
echo -e "  📤 Upload to GitHub Releases, Google Drive, or secure email"
echo ""
