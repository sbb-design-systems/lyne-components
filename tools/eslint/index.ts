import * as customElementClassName from './custom-element-class-name-rule.js';
import * as customElementDecoratorPosition from './custom-element-decorator-position-rule.js';
import * as importExtensionRule from './import-extension-rule.js';
import * as missingComponentDocumentation from './missing-component-documentation-rule.js';

const plugin = {
  meta: {
    name: 'lyne',
  },
  configs: {},
  rules: {
    [missingComponentDocumentation.name]: missingComponentDocumentation.rule,
    [customElementClassName.name]: customElementClassName.rule,
    [importExtensionRule.name]: importExtensionRule.rule,
    [customElementDecoratorPosition.name]: customElementDecoratorPosition.rule,
  },
};

// assign configs here so we can reference `plugin`
Object.assign(plugin.configs, {
  recommended: {
    plugins: {
      lyne: plugin,
    },
    rules: {
      [`lyne/${customElementClassName.name}`]: 'error',
      [`lyne/${customElementDecoratorPosition.name}`]: 'error',
      [`lyne/${importExtensionRule.name}`]: 'error',
      [`lyne/${missingComponentDocumentation.name}`]: 'error',
    },
  },
});

// for ESM
export default plugin;
