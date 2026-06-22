/* eslint-disable import-x/no-named-as-default-member */
import { basename, dirname } from 'node:path';

import ts from 'typescript';

export function parseCompilerOptions(tsconfigPath: string): ts.CompilerOptions {
  const { config, error } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (error) {
    throw error;
  }

  const parsed = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    dirname(tsconfigPath),
    undefined,
    basename(tsconfigPath),
  );
  if (parsed.errors.length > 0) {
    throw parsed.errors;
  }

  return parsed.options;
}
