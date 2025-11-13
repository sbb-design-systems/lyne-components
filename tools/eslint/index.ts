import type { ESLintUtils, TSESLint } from '@typescript-eslint/utils';
import type { Linter } from 'eslint';

export const rules = (
  await Promise.all(
    [
      'class-decorator-position-rule',
      'custom-element-class-name-rule',
      'custom-element-decorator-position-rule',
      'decorator-order-rule',
      'import-extension-rule',
      'local-name-rule',
      'missing-component-documentation-rule',
      'no-new-expression-without-assignment-rule',
      'needs-super-call-rule',
      'property-decorator-accessor-rule',
      'property-decorator-setter-initializer-rule',
      'property-type-rule',
      'relative-imports-rule',
      'test-describe-title-rule',
      'test-tabkey-rule',
    ].map((name) =>
      import(`./${name}.ts`).then((m) => ({ [name]: m.default as ESLintUtils.RuleModule<any> })),
    ),
  )
).reduce((current, next) => Object.assign(current, next));

const plugin: TSESLint.FlatConfig.Plugin = {
  meta: {
    name: 'lyne',
  },
  configs: {},
  rules,
};

plugin.configs!.recommended = {
  plugins: {
    lyne: plugin,
  },
  rules: Object.keys(rules).reduce(
    (current, next) => Object.assign(current, { [`lyne/${next}`]: 'error' }),
    {} as TSESLint.FlatConfig.Rules,
  ),
};

export const configs = plugin.configs as {
  recommended: Linter.Config;
};

export default plugin;
