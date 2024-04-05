import * as customElementClassName from './custom-element-class-name-rule';
import * as customElementDecoratorPosition from './custom-element-decorator-position-rule';
import * as importExtensionRule from './import-extension-rule';
import * as missingComponentDocumentation from './missing-component-documentation-rule';

export default {
  rules: {
    [missingComponentDocumentation.name]: missingComponentDocumentation.rule,
    [customElementClassName.name]: customElementClassName.rule,
    [importExtensionRule.name]: importExtensionRule.rule,
    [customElementDecoratorPosition.name]: customElementDecoratorPosition.rule,
  },
  configs: {
    all: {
      plugins: ['lyne'],
      rules: {
        [`lyne/${customElementClassName.name}`]: 'error',
        [`lyne/${customElementDecoratorPosition.name}`]: 'error',
        [`lyne/${importExtensionRule.name}`]: 'error',
        [`lyne/${missingComponentDocumentation.name}`]: 'error',
      },
    },
  },
};
