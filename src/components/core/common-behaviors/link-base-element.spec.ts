import { expect } from '@open-wc/testing';

import {
  type LinkRenderVariables,
  type LinkProperties,
  resolveLinkRenderVariables,
} from './link-base-element';

describe('resolveLinkRenderVariables', () => {
  const linkProperties: LinkProperties = {
    href: 'link',
  };

  it('should return variables for the basic link case', () => {
    const retObj: LinkRenderVariables = resolveLinkRenderVariables(linkProperties);
    const attr: Record<string, string> = {
      href: 'link',
      role: 'presentation',
      tabIndex: '-1',
    };
    const hostAttr: Record<string, string | undefined> = {
      'aria-disabled': undefined,
      dir: 'ltr',
      role: 'link',
      tabIndex: '0',
    };
    expect(retObj.attributes).to.be.deep.equal(attr);
    expect(retObj.hostAttributes).to.be.deep.equal(hostAttr);
  });

  it('should return variables for the full link case', () => {
    const linkProp: LinkProperties = {
      ...linkProperties,
      download: true,
      target: '_blank',
    };
    const retObj: LinkRenderVariables = resolveLinkRenderVariables(linkProp);
    const attr: Record<string, string> = {
      href: 'link',
      target: '_blank',
      download: '',
      rel: 'external noopener nofollow',
      role: 'presentation',
      tabIndex: '-1',
    };
    const hostAttr: Record<string, string | undefined> = {
      'aria-disabled': undefined,
      dir: 'ltr',
      role: 'link',
      tabIndex: '0',
    };
    expect(retObj.attributes).to.be.deep.equal(attr);
    expect(retObj.hostAttributes).to.be.deep.equal(hostAttr);
  });

  it('should return variables for the disabled link case', () => {
    const linkProp: LinkProperties = {
      ...linkProperties,
      disabled: true,
    };
    const retObj: LinkRenderVariables = resolveLinkRenderVariables(linkProp);
    const attr: Record<string, string> = {
      href: 'link',
      role: 'presentation',
      tabIndex: '-1',
    };
    const hostAttr: Record<string, string | undefined> = {
      'aria-disabled': 'true',
      dir: 'ltr',
      role: 'link',
      tabIndex: undefined,
    };
    expect(retObj.attributes).to.be.deep.equal(attr);
    expect(retObj.hostAttributes).to.be.deep.equal(hostAttr);
  });
});
