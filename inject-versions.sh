#!/bin/sh
# inject-versions.sh

# 1. Paths configuration
ORIGINAL_HTML="/usr/share/nginx/html/index.html"
TMP_HTML="/tmp/index.html"

# 2. Process and inject the string if the original file exists
if [ -f "$ORIGINAL_HTML" ]; then
  # Copy to writable /tmp directory to bypass write-protection on root layer
  cp "$ORIGINAL_HTML" "$TMP_HTML"

  # Inject variables into the temporary file
  sed -i "s#<head>#<head><meta name=\"legacy-versions\" content=\"$LEGACY_VERSIONS\" />#g" "$TMP_HTML"

  # Bind-mount or overwrite via move back to source location
  cat "$TMP_HTML" > "$ORIGINAL_HTML"

  echo "LEGACY_VERSIONS injected successfully: '$LEGACY_VERSIONS'"
else
  echo "Error: $ORIGINAL_HTML not found"
fi
