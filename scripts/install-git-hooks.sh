#!/usr/bin/env bash
set -euo pipefail

git_dir="$(git rev-parse --git-dir 2>/dev/null)" || {
  echo "This command must run inside an initialized Git repository."
  exit 1
}

mkdir -p "$git_dir/hooks"
for hook in pre-commit commit-msg pre-push; do
  install -m 0755 ".githooks/$hook" "$git_dir/hooks/$hook"
done

echo "Git hooks installed. Use SKIP_HOOKS=true only for exceptional maintenance."
