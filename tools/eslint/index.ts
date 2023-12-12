import * as customElementClassName from './custom-element-class-name-rule';
import * as missingComponentDocumentation from './missing-component-documentation-rule';

export default {
  rules: {
    [missingComponentDocumentation.name]: missingComponentDocumentation.rule,
    [customElementClassName.name]: customElementClassName.rule,
  },
  configs: {
    all: {
      plugins: ['lyne'],
      rules: {
        [`lyne/${missingComponentDocumentation.name}`]: 'error',
        [`lyne/${customElementClassName.name}`]: 'error',
      },
    },
  },
};
