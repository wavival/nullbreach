#!/usr/bin/env bash
set -euo pipefail

if ! git_dir="$(git rev-parse --git-dir 2>/dev/null)"; then
  echo "Skipping Git hooks: no initialized Git repository."
  exit 0
fi

mkdir -p "$git_dir/hooks"
for hook in pre-commit commit-msg pre-push; do
  install -m 0755 ".githooks/$hook" "$git_dir/hooks/$hook"
done

echo "Git hooks installed. Use SKIP_HOOKS=true only for exceptional maintenance."
