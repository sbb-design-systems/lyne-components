import { expect } from '@open-wc/testing';

import { resolveButtonRenderVariables } from './button-base-element';

describe('resolveButtonRenderVariables', () => {
  it('disabled', () => {
    const retObj: Record<string, string | undefined> = {
      role: 'button',
      dir: 'ltr',
      'aria-disabled': 'true',
      tabIndex: undefined,
    };
    expect(resolveButtonRenderVariables({ disabled: true })).to.be.deep.equal(retObj);
  });

  it('not disabled', () => {
    const retObj: Record<string, string | undefined> = {
      role: 'button',
      dir: 'ltr',
      'aria-disabled': undefined,
      tabIndex: '0',
    };
    expect(resolveButtonRenderVariables({ disabled: false })).to.be.deep.equal(retObj);
  });
});
