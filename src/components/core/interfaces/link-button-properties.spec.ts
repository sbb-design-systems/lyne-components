import {
  ButtonProperties,
  LinkButtonProperties,
  LinkProperties,
  resolveLinkOrStaticRenderVariables,
  resolveRenderVariables,
} from './link-button-properties';

describe('getLinkAttributeList', () => {
  it('should return attributes for link', () => {
    const linkProperties: LinkProperties = {
      href: 'link',
    };
    const expectedObj: Record<string, string> = {
      href: 'link',
      role: 'presentation',
      tabIndex: '-1',
    };
    expect(resolveRenderVariables(linkProperties as LinkButtonProperties).attributes).toEqual(
      expectedObj,
    );
  });

  it('should return attributes for link with target _blank', () => {
    const linkProperties: LinkProperties = {
      href: 'link',
      target: '_blank',
    };
    const expectedObj: Record<string, string> = {
      href: 'link',
      target: '_blank',
      rel: 'external noopener nofollow',
      role: 'presentation',
      tabIndex: '-1',
    };
    expect(resolveRenderVariables(linkProperties as LinkButtonProperties).attributes).toEqual(
      expectedObj,
    );
  });

  it('should return attributes for link with label, target _blank and custom rel', () => {
    const linkProperties: LinkProperties = {
      href: 'link',
      target: '_blank',
      rel: 'custom',
    };
    const expectedObj: Record<string, string> = {
      href: 'link',
      target: '_blank',
      rel: 'custom',
      role: 'presentation',
      tabIndex: '-1',
    };
    expect(resolveRenderVariables(linkProperties as LinkButtonProperties).attributes).toEqual(
      expectedObj,
    );
  });

  it('should return attributes for link with a custom target', () => {
    const linkProperties: LinkProperties = {
      href: 'link',
      target: 'custom',
    };
    const expectedObj: Record<string, string> = {
      href: 'link',
      target: 'custom',
      role: 'presentation',
      tabIndex: '-1',
    };

    expect(resolveRenderVariables(linkProperties as LinkButtonProperties).attributes).toEqual(
      expectedObj,
    );
  });

  it('should return attributes for disabled link', () => {
    const linkProperties: LinkButtonProperties = {
      href: 'link',
      disabled: true,
      name: undefined,
      type: undefined,
    };
    const expectedObj: Record<string, string> = {
      href: 'link',
      tabIndex: '-1',
      role: 'presentation',
    };

    expect(resolveRenderVariables(linkProperties).attributes).toEqual(expectedObj);
  });
});

describe('getLinkRenderVariables', () => {
  const linkButtonProperties: LinkButtonProperties = {
    href: 'link',
    target: '_blank',
    disabled: true,
    name: undefined,
    type: undefined,
  };

  it('should return the correct variables', () => {
    const expectedObj = {
      tagName: 'a',
      attributes: {
        role: 'presentation',
        tabIndex: '-1',
        href: 'link',
        target: '_blank',
        rel: 'external noopener nofollow',
      },
      hostAttributes: {
        'aria-disabled': 'true',
        role: 'link',
        dir: 'ltr',
      },
    };
    expect(resolveRenderVariables(linkButtonProperties)).toEqual(expectedObj);
  });
});

describe('getButtonRenderVariables', () => {
  const buttonProperties: ButtonProperties = {
    type: 'submit',
    name: 'name',
  };

  it('should return the correct variables', () => {
    const expectedObj = {
      tagName: 'span',
      attributes: {},
      hostAttributes: {
        role: 'button',
        tabIndex: '0',
        dir: 'ltr',
      },
    };

    expect(resolveRenderVariables(buttonProperties as LinkButtonProperties)).toEqual(expectedObj);
  });
});

// FIXME how to spy on imported function without workaround? https://github.com/jasmine/jasmine/issues/1414
describe('resolveRenderVariables', () => {
  const linkButtonProperties: LinkButtonProperties = {
    href: 'link',
    name: undefined,
    type: undefined,
  };

  it('should return variables for the static case', () => {
    const retObj = resolveRenderVariables({ ...linkButtonProperties, isStatic: true });
    expect(retObj.tagName).toEqual('span');
  });

  it('should return variables for the link case', () => {
    const retObj = resolveRenderVariables(linkButtonProperties);
    expect(retObj.tagName).toEqual('a');
  });

  it('should return variables for the button case', () => {
    const retObj = resolveRenderVariables({ ...linkButtonProperties, href: undefined });
    expect(retObj.tagName).toEqual('span');
  });

  it('should return the correct variables', () => {
    const expectedObj = {
      tagName: 'span',
      attributes: {},
      hostAttributes: {
        dir: 'ltr',
      },
    };

    expect(resolveRenderVariables({ isStatic: true, href: null, name: null, type: null })).toEqual(
      expectedObj,
    );
  });
});

describe('resolveLinkRenderVariables', () => {
  const linkProperties: LinkProperties = {
    href: 'link',
  };

  it('should return variables for the static case', () => {
    const retObj = resolveLinkOrStaticRenderVariables({ ...linkProperties, href: undefined });
    expect(retObj.tagName).toEqual('span');
  });

  it('should return variables for the link case', () => {
    const retObj = resolveLinkOrStaticRenderVariables(linkProperties);
    expect(retObj.tagName).toEqual('a');
  });
});
