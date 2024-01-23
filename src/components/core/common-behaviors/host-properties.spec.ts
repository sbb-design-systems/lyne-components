import { expect } from '@open-wc/testing';

import { hostProperties } from './host-properties';

describe('hostProperties', () => {
  it('disabled', () => {
    const retObj: Record<string, string | undefined> = {
      role: 'myRole',
      dir: 'ltr',
      'aria-disabled': 'true',
      tabIndex: undefined,
    };
    expect(hostProperties('myRole', true)).to.be.deep.equal(retObj);
  });

  it('not disabled', () => {
    const retObj: Record<string, string | undefined> = {
      role: 'myRole',
      dir: 'ltr',
      'aria-disabled': undefined,
      tabIndex: '0',
    };
    expect(hostProperties('myRole', false)).to.be.deep.equal(retObj);
  });
});
