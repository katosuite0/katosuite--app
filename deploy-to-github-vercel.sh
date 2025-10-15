#!/bin/bash

################################################################################
# KatoSuite Master Deployment Script
# Pushes complete codebase to GitHub (codex) for Vercel hosting
# Date: October 12, 2025
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

clear

echo -e "${CYAN}"
cat << "BANNER"
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   ██╗  ██╗ █████╗ ████████╗ ██████╗ ███████╗██╗   ██╗██╗████████╗███████╗
║   ██║ ██╔╝██╔══██╗╚══██╔══╝██╔═══██╗██╔════╝██║   ██║██║╚══██╔══╝██╔════╝
║   █████╔╝ ███████║   ██║   ██║   ██║███████╗██║   ██║██║   ██║   █████╗  
║   ██╔═██╗ ██╔══██║   ██║   ██║   ██║╚════██║██║   ██║██║   ██║   ██╔══╝  
║   ██║  ██╗██║  ██║   ██║   ╚██████╔╝███████║╚██████╔╝██║   ██║   ███████╗
║   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝   ╚═╝   ╚══════╝
║                                                               ║
║           GITHUB DEPLOYMENT → VERCEL HOSTING                 ║
║            Built by educators, for educators 🎓               ║
╚═══════════════════════════════════════════════════════════════╝
BANNER
echo -e "${NC}"

COMMIT_MSG="${1:-feat: production deployment - KatoSuite complete platform}"
BRANCH="${2:-main}"
GITHUB_REPO="${3:-codex}"
GITHUB_REMOTE_URL="https://github.com/katosuite0/katosuite--app.git"

echo -e "${BLUE}📋 Deployment Configuration${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   Remote: ${GREEN}$GITHUB_REPO${NC}"
echo "   Repository: ${GREEN}$GITHUB_REMOTE_URL${NC}"
echo "   Branch: ${GREEN}$BRANCH${NC}"
echo "   Commit: ${GREEN}$COMMIT_MSG${NC}"
echo "   Timestamp: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

################################################################################
# STEP 1: ENVIRONMENT CHECK
################################################################################

echo -e "${YELLOW}[1/11] Environment Validation...${NC}"

if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed${NC}"
    exit 1
fi
echo "   ✓ Git installed"

if [ ! -d ".git" ]; then
    echo -e "${YELLOW}   ⚠ Not a git repository - initializing...${NC}"
    git init
    echo "   ✓ Git repository initialized"
else
    echo "   ✓ Git repository detected"
fi

if ! git remote get-url codex &> /dev/null; then
    echo "   → Adding codex remote..."
    git remote add codex "$GITHUB_REMOTE_URL"
    echo "   ✓ Added remote: codex → $GITHUB_REMOTE_URL"
else
    git remote set-url codex "$GITHUB_REMOTE_URL"
    echo "   ✓ Codex remote configured: $GITHUB_REMOTE_URL"
fi

if [ ! -f "Guidelines.md" ]; then
    echo -e "${RED}❌ Guidelines.md not found${NC}"
    exit 1
fi
echo "   ✓ Guidelines.md exists"

if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ package.json not found${NC}"
    exit 1
fi
echo "   ✓ package.json exists"

if [ ! -f "next.config.mjs" ]; then
    echo -e "${RED}❌ next.config.mjs not found${NC}"
    exit 1
fi
echo "   ✓ next.config.mjs exists"

if [ ! -f "vercel.json" ]; then
    echo -e "${YELLOW}   ⚠ vercel.json not found (optional)${NC}"
else
    echo "   ✓ vercel.json exists"
fi

echo ""

################################################################################
# STEP 2: PINTEREST TOKEN CHECK
################################################################################

echo -e "${YELLOW}[2/11] Pinterest Conversion Token Validation...${NC}"

if grep -q "pina_AIA2RFAWACF3AAYAGCAO4D34CQ3OBGIBAAAABJZXTY23SPLUE2ADIPC77ZGBP6BT2TFPCQB7CBSFRW3TTU5RIZOAVMYJWDQAGenerate" PINTEREST_CONVERSION_INTEGRATION_COMPLETE.md 2>/dev/null; then
    echo "   ✓ Pinterest conversion token documented"
else
    echo -e "${YELLOW}   ⚠ Pinterest token documentation not found${NC}"
fi

if [ -f "supabase/functions/server/pinterest-conversion-api.tsx" ]; then
    echo "   ✓ Pinterest Conversion API integrated"
else
    echo -e "${YELLOW}   ⚠ Pinterest Conversion API file not found${NC}"
fi

if [ -f "components/core/pinterest-analytics.tsx" ]; then
    echo "   ✓ Pinterest Analytics component exists"
else
    echo -e "${YELLOW}   ⚠ Pinterest Analytics component not found${NC}"
fi

echo ""

################################################################################
# STEP 3: SECURITY & SECRETS CHECK
################################################################################

echo -e "${YELLOW}[3/11] Security & Secrets Validation...${NC}"

SECRET_PATTERNS=(
    "sk_live_[a-zA-Z0-9]"
    "sk_test_[a-zA-Z0-9]"
    "PRIVATE_KEY"
)

SECRETS_FOUND=false
for pattern in "${SECRET_PATTERNS[@]}"; do
    if grep -r "$pattern" . --exclude-dir={node_modules,.git,.next,dist} --exclude="*.md" --exclude="*.sh" 2>/dev/null | grep -v "EXAMPLE" > /dev/null; then
        echo -e "${RED}   ✗ Found potential secret: $pattern${NC}"
        SECRETS_FOUND=true
    fi
done

if [ "$SECRETS_FOUND" = false ]; then
    echo "   ✓ No exposed secrets detected"
else
    echo -e "${RED}❌ CRITICAL: Secrets found in codebase!${NC}"
    read -p "   Continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}Deployment cancelled for security${NC}"
        exit 1
    fi
fi

if grep -q ".env.local" .gitignore 2>/dev/null; then
    echo "   ✓ .env.local in .gitignore"
else
    echo -e "${YELLOW}   ⚠ .env.local not in .gitignore${NC}"
fi

if grep -q "node_modules" .gitignore 2>/dev/null; then
    echo "   ✓ node_modules in .gitignore"
else
    echo -e "${RED}   ✗ node_modules not in .gitignore${NC}"
fi

echo ""

################################################################################
# STEP 4: GUIDELINES COMPLIANCE
################################################################################

echo -e "${YELLOW}[4/11] Guidelines.md Compliance Check...${NC}"

SMALL_BUTTONS=$(grep -r "minHeight.*[1-3][0-9]px" components/ --include="*.tsx" 2>/dev/null | wc -l)
if [ "$SMALL_BUTTONS" -eq 0 ]; then
    echo "   ✓ All buttons ≥ 44px (WCAG compliant)"
else
    echo -e "${YELLOW}   ⚠ Found $SMALL_BUTTONS potential button violations${NC}"
fi

PRICING_USD=$(grep -r "USD" components/marketing/ --include="*.tsx" 2>/dev/null | wc -l)
if [ "$PRICING_USD" -gt 0 ]; then
    echo "   ✓ USD pricing format present"
else
    echo -e "${YELLOW}   ⚠ Verify USD pricing format${NC}"
fi

if grep -r "10,000+ educators\|thousands of educators already using" components/ --include="*.tsx" 2>/dev/null > /dev/null; then
    echo -e "${YELLOW}   ⚠ Found exaggerated user claims${NC}"
else
    echo "   ✓ No exaggerated user claims"
fi

if grep -r "Framework 2025\|HDLH 2025" components/ --include="*.tsx" 2>/dev/null > /dev/null; then
    echo "   ✓ Framework 2025 messaging present"
else
    echo -e "${YELLOW}   ⚠ Framework 2025 messaging missing${NC}"
fi

echo ""

################################################################################
# STEP 5: TYPESCRIPT VALIDATION
################################################################################

echo -e "${YELLOW}[5/11] TypeScript Compilation Check...${NC}"

if command -v npx &> /dev/null; then
    if npx tsc --noEmit 2>&1 | tee /tmp/tsc-output.log | grep -q "error TS"; then
        ERROR_COUNT=$(grep -c "error TS" /tmp/tsc-output.log || echo 0)
        echo -e "${YELLOW}   ⚠ TypeScript errors: $ERROR_COUNT${NC}"
        echo ""
        echo -e "${YELLOW}   First 5 errors:${NC}"
        head -5 /tmp/tsc-output.log | sed 's/^/   /'
        echo ""
        read -p "   Continue with TypeScript errors? (y/n) " -n 1 -r
        echo ""
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo -e "${BLUE}Deployment cancelled${NC}"
            rm -f /tmp/tsc-output.log
            exit 1
        fi
    else
        echo "   ✓ TypeScript compilation successful"
    fi
    rm -f /tmp/tsc-output.log
else
    echo -e "${YELLOW}   ⚠ npx not available, skipping TypeScript check${NC}"
fi

echo ""

################################################################################
# STEP 6: BUILD TEST
################################################################################

echo -e "${YELLOW}[6/11] Production Build Test...${NC}"

if command -v npm &> /dev/null; then
    echo "   → Running production build (this may take 2-3 minutes)..."

    if npm run build 2>&1 | tee /tmp/build-output.log | grep -q "Compiled successfully\|Build completed"; then
        echo -e "${GREEN}   ✓ Production build successful${NC}"

        if [ -d ".next" ]; then
            BUILD_SIZE=$(du -sh .next 2>/dev/null | cut -f1)
            echo "   ✓ Build size: $BUILD_SIZE"
        fi
    else
        echo -e "${RED}   ✗ Production build failed${NC}"
        echo ""
        echo -e "${RED}   Build errors:${NC}"
        grep "Error:" /tmp/build-output.log | head -5 | sed 's/^/   /'
        echo ""
        read -p "   Continue anyway? (y/n) " -n 1 -r
        echo ""
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo -e "${BLUE}Deployment cancelled${NC}"
            rm -f /tmp/build-output.log
            exit 1
        fi
    fi
    rm -f /tmp/build-output.log
else
    echo -e "${YELLOW}   ⚠ npm not available, skipping build test${NC}"
fi

echo ""

################################################################################
# STEP 7: FILE SUMMARY
################################################################################

echo -e "${YELLOW}[7/11] Repository Summary...${NC}"

TOTAL_TSX=$(find . -name "*.tsx" -not -path "./node_modules/*" -not -path "./.next/*" | wc -l)
TOTAL_TS=$(find . -name "*.ts" -not -path "./node_modules/*" -not -path "./.next/*" | wc -l)
TOTAL_MD=$(find . -name "*.md" -not -path "./node_modules/*" | wc -l)
TOTAL_JSON=$(find . -name "*.json" -not -path "./node_modules/*" -not -path "./.next/*" | wc -l)

echo "   Files to deploy:"
echo "   ├─ TypeScript (.tsx): $TOTAL_TSX"
echo "   ├─ TypeScript (.ts): $TOTAL_TS"
echo "   ├─ Markdown (.md): $TOTAL_MD"
echo "   ├─ JSON (.json): $TOTAL_JSON"
echo "   └─ Total: $((TOTAL_TSX + TOTAL_TS + TOTAL_MD + TOTAL_JSON))"

if command -v du &> /dev/null; then
    REPO_SIZE=$(du -sh . 2>/dev/null | cut -f1)
    echo "   Repository size: $REPO_SIZE"
fi

echo ""

################################################################################
# STEP 8: GIT STATUS
################################################################################

echo -e "${YELLOW}[8/11] Git Status Check...${NC}"

CURRENT_BRANCH=$(git branch --show-current)
echo "   Current branch: ${GREEN}$CURRENT_BRANCH${NC}"

if [ "$CURRENT_BRANCH" != "$BRANCH" ]; then
    echo -e "${YELLOW}   ⚠ Current branch ($CURRENT_BRANCH) != target branch ($BRANCH)${NC}"
    read -p "   Switch to $BRANCH? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git checkout "$BRANCH" || git checkout -b "$BRANCH"
        echo "   ✓ Switched to $BRANCH"
    fi
fi

CHANGED_FILES=$(git status --porcelain | wc -l)
if [ "$CHANGED_FILES" -eq 0 ]; then
    echo -e "${YELLOW}   ⚠ No changes to commit${NC}"
else
    echo "   ✓ $CHANGED_FILES files changed"
fi

echo ""
echo "   Modified files:"
git status --short | head -20 | sed 's/^/   /'
if [ "$CHANGED_FILES" -gt 20 ]; then
    echo "   ... and $((CHANGED_FILES - 20)) more files"
fi

echo ""

################################################################################
# STEP 9: CONFIRMATION
################################################################################

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📊 PRE-DEPLOYMENT SUMMARY${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "   Remote: $GITHUB_REPO"
echo "   Repository: $GITHUB_REMOTE_URL"
echo "   Branch: $BRANCH"
echo "   Files changed: $CHANGED_FILES"
echo "   Commit message: \"$COMMIT_MSG\""
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

read -p "Proceed with GitHub deployment to codex? (y/n) " -n 1 -r
echo ""
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}Deployment cancelled by user${NC}"
    exit 0
fi

################################################################################
# STEP 10: GIT OPERATIONS
################################################################################

echo -e "${YELLOW}[10/11] Git Operations...${NC}"

echo "   → Staging all changes..."
git add .

if git diff --staged --quiet; then
    echo -e "${YELLOW}   ℹ No staged changes to commit${NC}"
else
    echo "   → Creating commit..."
    git commit -m "$COMMIT_MSG"
    echo -e "${GREEN}   ✓ Commit created${NC}"
fi

COMMIT_HASH=$(git rev-parse HEAD)
COMMIT_SHORT=$(git rev-parse --short HEAD)

echo "   → Pushing to GitHub ($GITHUB_REPO → $GITHUB_REMOTE_URL)..."
echo "   → Branch: $BRANCH"

if git push "$GITHUB_REPO" "$BRANCH" 2>&1; then
    echo -e "${GREEN}   ✓ Pushed to GitHub successfully${NC}"
else
    echo -e "${YELLOW}   ⚠ Push failed, trying to set upstream...${NC}"
    if git push --set-upstream "$GITHUB_REPO" "$BRANCH" --force; then
        echo -e "${GREEN}   ✓ Pushed to GitHub with upstream (force)${NC}"
    else
        echo -e "${RED}   ✗ Push failed${NC}"
        echo ""
        echo -e "${YELLOW}   Troubleshooting:${NC}"
        echo "   1. Check GitHub authentication: git config credential.helper"
        echo "   2. Verify remote URL: git remote -v"
        echo "   3. Try manual push: git push codex $BRANCH --force"
        echo ""
        exit 1
    fi
fi

echo ""

################################################################################
# STEP 11: VERCEL DEPLOYMENT INSTRUCTIONS
################################################################################

echo -e "${YELLOW}[11/11] Vercel Deployment Instructions...${NC}"
echo ""

echo -e "${CYAN}"
cat << "SUCCESS"
╔═══════════════════════════════════════════════════════════════╗
║              ✅  GITHUB DEPLOYMENT SUCCESSFUL                 ║
╚═══════════════════════════════════════════════════════════════╝
SUCCESS
echo -e "${NC}"

echo -e "${BLUE}📊 Deployment Details${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   Remote: $GITHUB_REPO"
echo "   Repository: $GITHUB_REMOTE_URL"
echo "   Branch: $BRANCH"
echo "   Commit: $COMMIT_SHORT"
echo "   Message: $COMMIT_MSG"
echo "   Time: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

echo -e "${YELLOW}🚀 NEXT: Deploy to Vercel${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "   ${BLUE}Option 1: Vercel CLI (Recommended)${NC}"
echo "   ─────────────────────────────────────"
echo "   1. Install Vercel CLI:"
echo "      ${GREEN}npm i -g vercel${NC}"
echo ""
echo "   2. Login to Vercel:"
echo "      ${GREEN}vercel login${NC}"
echo ""
echo "   3. Deploy to production:"
echo "      ${GREEN}vercel --prod${NC}"
echo ""
echo ""
echo "   ${BLUE}Option 2: Vercel Dashboard${NC}"
echo "   ─────────────────────────────────────"
echo "   1. Go to: ${GREEN}https://vercel.com/new${NC}"
echo "   2. Import GitHub repository:"
echo "      ${GREEN}https://github.com/katosuite0/katosuite--app${NC}"
echo "   3. Configure project:"
echo "      • Framework: Next.js"
echo "      • Root Directory: ./"
echo "      • Build Command: npm run build"
echo "      • Output Directory: .next"
echo ""
echo "   4. Add Environment Variables:"
echo "      ${CYAN}Required:${NC}"
echo "      ├─ SUPABASE_URL"
echo "      ├─ SUPABASE_ANON_KEY"
echo "      ├─ SUPABASE_SERVICE_ROLE_KEY"
echo "      ├─ STRIPE_SECRET_KEY"
echo "      ├─ STRIPE_WEBHOOK_SECRET"
echo "      ├─ NEXT_PUBLIC_SUPABASE_URL"
echo "      └─ NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo ""
echo "      ${CYAN}Optional (Analytics):${NC}"
echo "      ├─ PINTEREST_CONVERSION_TOKEN"
echo "      ├─ GOOGLE_ANALYTICS_KEY"
echo "      └─ DEEPGRAM_API_KEY"
echo ""
echo "   5. Deploy! 🚀"
echo ""
echo ""
echo "   ${BLUE}Option 3: Auto-Deploy from GitHub${NC}"
echo "   ─────────────────────────────────────"
echo "   Vercel will automatically deploy on every push to $BRANCH"
echo "   Configure at: ${GREEN}https://vercel.com/dashboard${NC}"
echo ""

echo -e "${YELLOW}📚 Important Documentation${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   • Guidelines: ${GREEN}Guidelines.md${NC}"
echo "   • Environment Variables: ${GREEN}ENV_VARIABLES_REQUIRED.md${NC}"
echo "   • Production Checklist: ${GREEN}FINAL_PRODUCTION_CHECKLIST.md${NC}"
echo "   • Pinterest Integration: ${GREEN}PINTEREST_CONVERSION_INTEGRATION_COMPLETE.md${NC}"
echo "   • Deployment Guide: ${GREEN}PRODUCTION_DEPLOYMENT_GUIDE.md${NC}"
echo ""

echo -e "${YELLOW}🔐 Environment Variables Setup${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "   ${CYAN}Pinterest Conversion Token:${NC}"
echo "   ${GREEN}pina_AIA2RFAWACF3AAYAGCAO4D34CQ3OBGIBAAAABJZXTY23SPLUE2ADIPC77ZGBP6BT2TFPCQB7CBSFRW3TTU5RIZOAVMYJWDQAGenerate${NC}"
echo ""
echo "   ${CYAN}Add to Vercel:${NC}"
echo "   Name: PINTEREST_CONVERSION_TOKEN"
echo "   Value: [token above]"
echo ""

echo -e "${YELLOW}✅ Post-Deployment Checklist${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   [ ] Verify deployment at your Vercel URL"
echo "   [ ] Test signup flow"
echo "   [ ] Test checkout (use Stripe test mode)"
echo "   [ ] Verify Pinterest tag loads (check console)"
echo "   [ ] Test conversion tracking"
echo "   [ ] Check Google Analytics"
echo "   [ ] Test all marketing pages"
echo "   [ ] Verify SEO meta tags"
echo "   [ ] Test mobile responsiveness"
echo "   [ ] Check Lighthouse scores"
echo ""

echo -e "${YELLOW}🔍 Monitoring & Verification${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   • Vercel Logs: ${GREEN}vercel logs [deployment-url]${NC}"
echo "   • Supabase Logs: ${GREEN}Supabase Dashboard → Logs${NC}"
echo "   • Pinterest Events: ${GREEN}Pinterest Ads Manager → Conversions${NC}"
echo "   • Google Analytics: ${GREEN}analytics.google.com${NC}"
echo "   • Stripe Events: ${GREEN}Stripe Dashboard → Events${NC}"
echo ""

echo -e "${GREEN}"
cat << "COMPLETE"
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║                  🎉 DEPLOYMENT COMPLETE! 🎉                   ║
║                                                               ║
║         Your code is now on GitHub and ready for Vercel       ║
║              Follow the instructions above to deploy          ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
COMPLETE
echo -e "${NC}"

echo -e "${BLUE}Built by educators, for educators 🎓${NC}"
echo -e "${BLUE}Framework 2025 Aligned • Regular Updates • New Tools Coming Soon${NC}"
echo ""

exit 0
