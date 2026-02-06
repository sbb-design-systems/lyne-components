/**
 * Extracts all component tags and global attributes for esta-metrics grouped by modules.
 * This script was created with help of AI.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptPath = `${fileURLToPath(new URL('.', import.meta.url))}`;

interface ModuleComponents {
  [moduleName: string]: string[];
}

interface ComponentFile {
  filePath: string;
  tagName: string;
}

function extractTagName(filePath: string): string | null {
  const content = readFileSync(filePath, 'utf-8');
  const match = content.match(/@customElement\(['"]([^'"]+)['"]\)/);
  return match?.[1] || null;
}

function scanDirectory(dir: string, fileList: ComponentFile[]): void {
  readdirSync(dir).forEach((file) => {
    const filePath = join(dir, file);

    if (statSync(filePath).isDirectory()) {
      scanDirectory(filePath, fileList);
    } else if (file.endsWith('.ts') && !file.match(/\.(spec|test|visual\.spec|e2e)\.ts$/)) {
      const tagName = extractTagName(filePath);
      if (tagName) {
        fileList.push({ filePath, tagName });
      }
    }
  });
}

function findComponentFiles(srcPath: string): ComponentFile[] {
  const fileList: ComponentFile[] = [];

  ['elements', 'elements-experimental'].forEach((dirName) => {
    const dirPath = join(srcPath, dirName);
    if (readdirSync(srcPath).includes(dirName)) {
      scanDirectory(dirPath, fileList);
    }
  });

  return fileList;
}

function getModuleName(filePath: string, srcPath: string): string {
  const parts = relative(srcPath, filePath).split('/');
  return parts[1] || parts[0] || 'unknown';
}

function getGlobalAttributes(projectRoot: string): string[] {
  const content = readFileSync(join(projectRoot, 'tsconfig.json'), 'utf-8');
  const match = content.match(/"globalAttributes"\s*:\s*\[([\s\S]*?)]/);

  if (!match) return [];

  return Array.from(match[1].matchAll(/"([^"]+)"/g), (m) => m[1])
    .filter((attr) => attr.startsWith('sbb-'))
    .map((attr) => `[${attr}]`);
}

function getModuleNameFromAttribute(attribute: string): string {
  return (
    attribute
      .replace(/^\[sbb-/, '')
      .replace(/]$/, '')
      .split('-')[0] || ''
  );
}

function extractComponentTags(): void {
  const projectRoot = join(scriptPath, '..');
  const srcPath = join(projectRoot, 'src');
  const moduleComponents: ModuleComponents = {};

  // Extract component tags
  findComponentFiles(srcPath).forEach(({ filePath, tagName }) => {
    const moduleName = getModuleName(filePath, srcPath);
    (moduleComponents[moduleName] ||= []).push(tagName);
  });

  // Add global attributes to matching modules
  const unmatchedAttributes: string[] = [];
  getGlobalAttributes(projectRoot).forEach((attr) => {
    const moduleName = getModuleNameFromAttribute(attr);
    if (moduleName && moduleComponents[moduleName]) {
      moduleComponents[moduleName].push(attr);
    } else {
      unmatchedAttributes.push(attr);
    }
  });

  if (unmatchedAttributes.length > 0) {
    moduleComponents['global-attributes'] = unmatchedAttributes.sort();
  }

  // Sort all entries
  Object.keys(moduleComponents).forEach((module) => {
    moduleComponents[module].sort();
  });

  console.log(JSON.stringify(moduleComponents, null, 2));
}

extractComponentTags();
