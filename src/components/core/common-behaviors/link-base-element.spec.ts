import { expect } from '@open-wc/testing';

import type { IsStaticProperty } from '../interfaces';

import { resolveLinkOrStaticRenderVariables } from './link-base-element';
import type { LinkRenderVariables, LinkProperties } from './link-base-element';

describe('resolveLinkRenderVariables', () => {
  const linkProperties: LinkProperties & Partial<IsStaticProperty> = {
    isStatic: false,
    href: 'link',
  };

  it('should return variables for the basic link case', () => {
    const retObj: LinkRenderVariables = resolveLinkOrStaticRenderVariables(linkProperties);
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
    expect(retObj.tagName).to.be.equal('a');
    expect(retObj.attributes).to.be.deep.equal(attr);
    expect(retObj.hostAttributes).to.be.deep.equal(hostAttr);
  });

  it('should return variables for the full link case', () => {
    const linkProp: LinkProperties & Partial<IsStaticProperty> = {
      ...linkProperties,
      download: true,
      target: '_blank',
    };
    const retObj: LinkRenderVariables = resolveLinkOrStaticRenderVariables(linkProp);
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
    expect(retObj.tagName).to.be.equal('a');
    expect(retObj.attributes).to.be.deep.equal(attr);
    expect(retObj.hostAttributes).to.be.deep.equal(hostAttr);
  });

  it('should return variables for the disabled link case', () => {
    const linkProp: LinkProperties & Partial<IsStaticProperty> = {
      ...linkProperties,
      disabled: true,
    };
    const retObj: LinkRenderVariables = resolveLinkOrStaticRenderVariables(linkProp);
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
    expect(retObj.tagName).to.be.equal('a');
    expect(retObj.attributes).to.be.deep.equal(attr);
    expect(retObj.hostAttributes).to.be.deep.equal(hostAttr);
  });

  it('should return variables for the static case', () => {
    const retObj: LinkRenderVariables = resolveLinkOrStaticRenderVariables({
      ...linkProperties,
      isStatic: true,
    });
    expect(retObj.tagName).to.be.equal('span');
    expect(retObj.attributes).to.be.deep.equal({});
    expect(retObj.hostAttributes).to.be.deep.equal({ dir: 'ltr' });
  });

  it('should return variables for the missing href case', () => {
    const retObj: LinkRenderVariables = resolveLinkOrStaticRenderVariables({
      ...linkProperties,
      href: undefined,
    });
    expect(retObj.tagName).to.be.equal('span');
    expect(retObj.attributes).to.be.deep.equal({});
    expect(retObj.hostAttributes).to.be.deep.equal({ dir: 'ltr' });
  });
});
