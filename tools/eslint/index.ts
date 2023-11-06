import * as missingComponentDocumentation from './missing-component-documentation-rule';

export default {
  rules: {
    [missingComponentDocumentation.name]: missingComponentDocumentation.rule,
  },
  configs: {
    all: {
      plugins: ['lyne'],
      rules: {
        [`lyne/${missingComponentDocumentation.name}`]: 'error',
      },
    },
  },
};
