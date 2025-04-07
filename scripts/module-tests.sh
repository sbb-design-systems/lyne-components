#!/usr/bin/env bash
files=$1;
shift; result=$(for i in "$@"; do echo -n "$i "; done)
yarn -s wtr --group default $(find $files -name '*.spec.ts' ! -name '*.visual.spec.ts' -type f -print0 | xargs -0r stat -f '--file %N' | xargs echo) $result
