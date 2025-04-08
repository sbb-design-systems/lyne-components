// @ts-check
import './tools/node-esm-hook/register-hooks.js';

import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImportX from 'eslint-plugin-import-x';
import * as eslintPluginLit from 'eslint-plugin-lit';
import eslintPluginYml from 'eslint-plugin-yml';
import eslint from '@eslint/js';

const eslintPluginLyne = await import('./tools/eslint/index.ts');

const ignores = [
  'dist/**/*',
  'coverage/**/*',
  'tools/generate-component/**/*',
  '**/__snapshots__/**/*',
];

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
  {
    settings: {
      'import-x/resolver': {
        typescript: true,
      },
    },
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    ignores,
  },
  {
    rules: eslint.configs.recommended.rules,
    ignores,
  },
  ...tseslint.configs.recommended,
  ...eslintPluginYml.configs['flat/standard'],
  ...eslintPluginYml.configs['flat/prettier'],
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  eslintPluginLit.configs['flat/recommended'],
  eslintPluginLyne.configs.recommended,
  {
    files: ['src/visual-regression-app/**/*.ts'],
    rules: {
      'lyne/custom-element-class-name-rule': 'off',
      'import-x/namespace': 'off',
    },
  },
  {
    files: ['src/storybook/**/*.ts', 'src/**/core/**/*.ts'],
    rules: {
      'lyne/test-describe-title-rule': 'off',
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          format: ['PascalCase'],
          selector: 'interface',
        },
        {
          format: ['camelCase'],
          selector: 'default',
        },
        {
          format: ['camelCase', 'UPPER_CASE'],
          selector: 'variable',
        },
        {
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          selector: 'parameter',
        },
        {
          format: ['camelCase'],
          leadingUnderscore: 'require',
          modifiers: ['private'],
          selector: 'memberLike',
        },
        {
          format: ['PascalCase'],
          selector: 'typeLike',
        },
        {
          format: null,
          selector: 'objectLiteralProperty',
        },
      ],
      // TODO: Remove this after fixing issues
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-use-before-define': 'error',
      // TODO: Evaluate this rule
      '@typescript-eslint/semi': 'error',

      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-absolute-path': 'error',
      'import-x/no-cycle': 'error',
      'import-x/no-self-import': 'error',
      'import-x/no-unresolved': [
        'error',
        {
          ignore: [
            '\\.md\\?raw$',
            '\\.svg\\?raw$',
            '\\.scss\\?lit\\&inline',
            // Broken. Maybe due to commonjs?
            '@storybook/addon-actions/decorator',
          ],
        },
      ],
      'import-x/no-useless-path-segments': 'error',
      'import-x/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
      // TODO: Discuss this with the team
      'lit/no-invalid-html': 'off',
      camelcase: 'off',
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: {
            memberTypes: [
              // Index signature
              'signature',
              'call-signature',

              'static-field',

              // Static initialization
              'static-initialization',

              ['set', 'get', 'field', 'accessor'],

              'constructor',

              'static-method',
              ['method', 'decorated-method'],
            ],
          },
        },
      ],
    },
  },
  {
    files: ['**/*.stories.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
        },
      ],
      'import-x/namespace': 'off',
      'import-x/default': 'off',
      'import-x/no-named-as-default': 'off',
      'import-x/no-named-as-default-member': 'off',
    },
  },
  eslintConfigPrettier,
];
