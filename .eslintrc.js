/*
for eslint rules:
https://eslint.org/docs/rules/

for typescript-eslint rules:
https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
*/

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'jest',
    'yaml'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended'
  ],
  parserOptions: {
    ecmaVersion: 6,
    //project: './tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    'CustomEvent': 'readonly',
    // 'console': 'on',
    // 'localStorage': 'on',
    // 'requestAnimationFrame': 'on',
    // 'fetch': 'on',
    // 'Headers': 'on',
    // 'WebSocket': 'on',
    // 'process': 'on',
    // 'getComputedStyle': 'on',
    // 'clearTimeout': 'on',
    // 'clearInterval': 'on',
    // 'AbortController': 'on'
  },
  env: {
    'jest/globals': true
  },
  rules: {

    // ####################################################
    // Possible errors
    // ####################################################
    'no-mixed-spaces-and-tabs': 'error',
    'for-direction': 'error',
    'getter-return': 'error',
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': 'error',
    'no-console': 'off',
    'no-constant-condition': 'error',
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty': 'error',
    'no-empty-character-class': 'error',
    'no-ex-assign': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-parens': 'off',
    'no-extra-semi': 'error',
    'no-func-assign': 'error',
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-misleading-character-class': 'error',
    'no-obj-calls': 'error',
    'no-prototype-builtins': 'error',
    'no-regex-spaces': 'error',
    'no-sparse-arrays': 'error',
    'no-template-curly-in-string': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': 'error',
    'require-atomic-updates': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'error',

    // ####################################################
    // Best practice
    // ####################################################
    'accessor-pairs': 'error',
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    'class-methods-use-this': 'off',
    'complexity': 'off',
    'consistent-return': 'error',
    'curly': 'error',
    'default-case': 'error',
    'dot-location': ['error', 'property'],
    'dot-notation': 'off',
    'eqeqeq': 'error',
    'guard-for-in': 'error',
    'max-classes-per-file': 'error',
    'no-alert': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-div-regex': 'error',
    'no-else-return': 'error',
    'no-empty-function': 'error',
    'no-empty-pattern': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-fallthrough': 'error',
    'no-floating-decimal': 'error',
    'no-global-assign': 'error',
    'no-implicit-coercion': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-invalid-this': 'off',
    'no-iterator': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-magic-numbers': 'off',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': 'error',
    'no-proto': 'error',
    'no-redeclare': 'error',
    'no-restricted-properties': 'error',
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unused-expressions': 'error',
    'no-unused-labels': 'error',
    'no-useless-call': 'error',
    'no-useless-catch': 'error',
    'no-useless-concat': 'error',
    'no-useless-escape': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'no-warning-comments': 'error',
    'no-with': 'error',
    'prefer-named-capture-group': 'error',
    'prefer-promise-reject-errors': 'error',
    'radix': 'error',
    'require-await': 'error',
    'require-unicode-regexp': 'error',
    'vars-on-top': 'error',
    'wrap-iife': 'error',
    'yoda': 'error',

    // ####################################################
    // Strict mode
    // ####################################################
    'strict': 'off',

    // ####################################################
    // Variables
    // ####################################################
    'init-declarations': 'off',
    'no-delete-var': 'error',
    'no-label-var': 'error',
    'no-restricted-globals': 'error',
    'no-shadow': 'error',
    'no-shadow-restricted-names': 'error',
    'no-undef': 'error',
    'no-undef-init': 'error',
    'no-undefined': 'off',

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      'vars': 'all',
      'varsIgnorePattern': 'h'
    }],

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',

    // ####################################################
    // Node.js
    // ####################################################
    'callback-return': 'error',
    'global-require': 'error',
    'handle-callback-err': 'error',
    'no-buffer-constructor': 'error',
    'no-mixed-requires': 'error',
    'no-new-require': 'error',
    'no-path-concat': 'error',
    'no-process-env': 'off',
    'no-process-exit': 'error',
    'no-restricted-modules': 'off',
    'no-sync': 'error',

    // ####################################################
    // Stylistic issues
    // ####################################################
    'array-bracket-newline': ['error', { 'multiline': true }],
    'array-bracket-spacing': ['error', 'never'],
    'array-element-newline': ['error', 'always'],
    'block-spacing': 'error',
    'brace-style': 'error',
    'capitalized-comments': 'off',
    'comma-dangle': ['error', 'never'],
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': 'error',
    'consistent-this': 'error',
    'eol-last': 'error',
    'func-call-spacing': 'error',
    'func-name-matching': 'error',
    'func-names': 'error',
    'func-style': 'error',
    'function-paren-newline': ['error', 'multiline'],
    'id-blacklist': 'off',
    'id-length': 'off',
    'id-match': 'off',
    'implicit-arrow-linebreak': ['error', 'beside'],
    'jsx-quotes': ['error', 'prefer-single'],
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'line-comment-position': 'error',
    'linebreak-style': 'error',
    'lines-around-comment': 'error',
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'max-depth': ['error', 4],
    'max-len': [
      'error',
      {
        'comments': 80,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'code': 200
      }
    ],
    'max-lines': 'off',
    'max-lines-per-function': 'off',
    'max-nested-callbacks': ['error', 3],
    'max-params': 'off',
    'max-statements': 'off',
    'max-statements-per-line': ['error', { 'max': 1 }],
    'multiline-comment-style': 'error',
    'multiline-ternary': ['error', 'always'],
    'new-cap': ['error', { 'capIsNewExceptions': ['Component', 'Prop', 'Event', 'State', 'Element', 'Watch'] }],
    'new-parens': 'error',
    'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 1 }],
    'no-bitwise': 'error',
    'no-continue': 'error',
    'no-inline-comments': 'error',
    'no-lonely-if': 'off',
    'no-mixed-operators': 'error',
    'no-multi-assign': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'no-negated-condition': 'error',
    'no-nested-ternary': 'error',
    'no-new-object': 'error',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'no-tabs': 'error',
    'no-ternary': 'off',
    'no-trailing-spaces': 'error',
    'no-underscore-dangle': 'off',
    'no-unneeded-ternary': 'error',
    'no-whitespace-before-property': 'error',
    'nonblock-statement-body-position': ['error', 'beside'],
    'object-curly-newline': ['error', {
      //'multiline': true,
      'ObjectExpression': {
        'minProperties': 1
      },
      'ObjectPattern': 'always',
      'ImportDeclaration': {
        'minProperties': 2
      },
      'ExportDeclaration': {
        'minProperties': 2
      }
    }],
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': 'error',
    'one-var': 'off',
    'one-var-declaration-per-line': 'error',
    'operator-assignment': 'error',
    'operator-linebreak': 'error',
    'padded-blocks': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*'},
      { blankLine: 'any',    prev: ['const', 'let', 'var'], next: ['const', 'let', 'var']}
    ],
    'prefer-object-spread': 'error',
    'quote-props': ['error', 'consistent-as-needed'],
    'quotes': ['error', 'single'],
    'semi-spacing': 'error',
    'semi-style': ['error', 'last'],
    'sort-keys': 'error',
    'sort-vars': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': 'off',
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': 'error',
    'switch-colon-spacing': 'error',
    'template-tag-spacing': 'error',
    'unicode-bom': 'error',
    'wrap-regex': 'error',

    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],

    'semi': 'off',
    '@typescript-eslint/semi': ['error'],

    'camelcase': 'off',
    '@typescript-eslint/camelcase': 'error',

    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': 'error',

    // ####################################################
    // ECMAScript 6
    // ####################################################
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': 'error',
    'arrow-spacing': 'error',
    'constructor-super': 'error',
    'generator-star-spacing': 'error',
    'no-class-assign': 'error',
    'no-confusing-arrow': 'error',
    'no-const-assign': 'error',
    'no-dupe-class-members': 'error',
    'no-duplicate-imports': 'error',
    'no-new-symbol': 'error',
    'no-restricted-imports': 'off',
    'no-this-before-super': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'error',
    'prefer-numeric-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'require-yield': 'error',
    'rest-spread-spacing': 'error',
    'sort-imports': ['error', {
      'ignoreCase': true,
      'ignoreDeclarationSort': false,
      'ignoreMemberSort': false,
      'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single']
    }],
    'symbol-description': 'error',
    'template-curly-spacing': 'error',
    'yield-star-spacing': 'error',

    // ####################################################
    // typescript-eslint specific
    // ####################################################
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/class-name-casing': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/interface-name-prefix': 'error',
    '@typescript-eslint/member-delimiter-style': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-parameter-properties': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error'
  }
};
