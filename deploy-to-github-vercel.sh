#!/usr/bin/env bash
set -euo pipefail

REMOTE_NAME="${REMOTE_NAME:-codex}"
REMOTE_URL="${REMOTE_URL:-https://github.com/katosuite0/katosuite--app.git}"
COMMIT_MSG="${1:-feat: KatoSuite production launch}"

BOLD="\033[1m"
GREEN="\033[32m"
BLUE="\033[34m"
RESET="\033[0m"

step() {
  local number="$1"
  local message="$2"
  printf "%b[%s/11]%b %s\n" "$BLUE" "$number" "$RESET" "$message"
}

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

step 1 "Environment validation"
if command_exists node; then
  printf "  • node %s\n" "$(node --version)"
else
  printf "  ! node not found. Install Node.js 18+ before deploying.\n"
fi
if command_exists pnpm; then
  printf "  • pnpm %s\n" "$(pnpm --version)"
else
  printf "  ! pnpm not found. Install pnpm or adjust the validator commands.\n"
fi

declare -a missing_env=()
step 2 "Pinterest conversion token"
if [[ -z "${PINTEREST_CONVERSION_TOKEN:-}" ]]; then
  missing_env+=("PINTEREST_CONVERSION_TOKEN")
  printf "  ! PINTEREST_CONVERSION_TOKEN not detected.\n"
else
  printf "  • token detected\n"
fi

step 3 "Security & secrets scan"
if command_exists pnpm && pnpm run | grep -q "security" 2>/dev/null; then
  pnpm run security
  printf "  • security script executed\n"
else
  printf "  ! No dedicated security script found. Run your preferred scanner manually.\n"
fi

step 4 "Guidelines.md compliance"
if [[ -f GUIDELINES.md ]]; then
  printf "  • Review GUIDELINES.md before continuing.\n"
else
  printf "  • No GUIDELINES.md detected.\n"
fi

step 5 "TypeScript compilation"
if command_exists pnpm && pnpm run | grep -q "typecheck" 2>/dev/null; then
  pnpm run typecheck
else
  printf "  • Skipped: no typecheck script declared.\n"
fi

step 6 "Production build"
if command_exists pnpm && pnpm run | grep -q "build" 2>/dev/null; then
  pnpm run build
else
  printf "  • Skipped: no build script declared.\n"
fi

step 7 "Repository summary"
git status -sb

step 8 "Git status review"
if [[ ${#missing_env[@]} -gt 0 ]]; then
  printf "  ! Missing environment variables: %s\n" "${missing_env[*]}"
fi

 codex/add-automated-github-deployment-script-7npuct
conflict_report="$(git grep -n -e $'\x3c\x3c\x3c\x3c\x3c\x3c ' -e $'\x3d\x3d\x3d\x3d\x3d\x3d' -e $'\x3e\x3e\x3e\x3e\x3e\x3e' -- ':!node_modules' 2>/dev/null || true)"
if [[ -n "$conflict_report" ]]; then
  printf "  ! Merge conflict markers detected:\n%s\n" "$conflict_report"
  printf "Resolve all conflict markers before committing.\n"
  exit 1
else
  printf "  • No merge conflict markers detected.\n"
fi

 main
step 9 "User confirmation"
read -rp "Proceed with commit using message '\$COMMIT_MSG'? [y/N] " confirm
if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
  printf "Aborted by user.\n"
  exit 1
fi

step 10 "Commit preparation"
if git remote get-url "$REMOTE_NAME" >/dev/null 2>&1; then
  git remote set-url "$REMOTE_NAME" "$REMOTE_URL"
else
  git remote add "$REMOTE_NAME" "$REMOTE_URL"
fi

git add -A
if git diff --cached --quiet; then
  printf "  • No staged changes detected; skipping commit.\n"
else
  git commit -m "$COMMIT_MSG"
  printf "  • Commit created.\n"
fi

step 11 "Push & Vercel instructions"
printf "${GREEN}Ready to push:${RESET} git push %s HEAD\n" "$REMOTE_NAME"
printf "Then deploy with:${RESET}\n"
printf "  vercel --prod\n"
