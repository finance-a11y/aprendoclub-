#!/usr/bin/env bash
# Guardrail: block risky changes under aprendoclub/public before they reach Vercel.
set -euo pipefail
PUBLIC_DIR="${1:-aprendoclub/public}"
MAX_KB="${MAX_FILE_KB:-5120}"
fail=0

# 1. No nested vercel.json (overrides project settings for the whole deploy)
while IFS= read -r f; do
  echo "::error file=$f::vercel.json inside public/ is not allowed. Configure Vercel in the dashboard."
  fail=1
done < <(find "$PUBLIC_DIR" -name vercel.json)

# 2. No new extensionless files (they collide with directories of the same name).
#    Existing ones are allowlisted.
ALLOW_EXTENSIONLESS=("$PUBLIC_DIR/evento-online")
while IFS= read -r f; do
  for a in "${ALLOW_EXTENSIONLESS[@]}"; do [[ "$f" == "$a" ]] && continue 2; done
  echo "::error file=$f::Extensionless file in public/. Give it an extension or remove it."
  fail=1
done < <(find "$PUBLIC_DIR" -type f ! -name '*.*' ! -name '.*')

# 3. No oversized files
while IFS= read -r f; do
  echo "::error file=$f::File larger than ${MAX_KB} KB. Upload it to Vercel Blob instead."
  fail=1
done < <(find "$PUBLIC_DIR" -type f -size +"${MAX_KB}"k)

# 4. No secrets committed
if git ls-files | grep -E '(^|/)\.env(\.[^/]+)?$' | grep -vE '\.(example|sample|template|dist)$'; then
  echo "::error::.env file tracked by git."
  fail=1
fi

exit $fail
