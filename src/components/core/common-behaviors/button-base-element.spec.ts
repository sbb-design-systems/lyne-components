import { expect } from '@open-wc/testing';

import {
  resolveButtonOrStaticRenderVariables,
  resolveButtonRenderVariables,
} from './button-base-element';

describe('resolveButtonRenderVariables', () => {
  it('disabled', () => {
    const retObj: Record<string, string> = {
      role: 'button',
      dir: 'ltr',
      'aria-disabled': 'true',
      tabIndex: null,
    };
    expect(resolveButtonRenderVariables(true)).to.be.deep.equal(retObj);
  });

  it('not disabled', () => {
    const retObj: Record<string, string> = {
      role: 'button',
      dir: 'ltr',
      'aria-disabled': null,
      tabIndex: '0',
    };
    expect(resolveButtonRenderVariables(false)).to.be.deep.equal(retObj);
  });
});

describe('resolveButtonOrStaticRenderVariables', () => {
  it('static', () => {
    const retObj: Record<string, string> = {
      dir: 'ltr',
    };
    expect(resolveButtonOrStaticRenderVariables(true, false)).to.be.deep.equal(retObj);
  });
});
