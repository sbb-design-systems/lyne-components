import { expect } from '@open-wc/testing';

import { SbbHeaderButtonElement } from '../../header/header-button/header-button.component.ts';
import { SbbIconElement } from '../../icon/icon.component.ts';
import {
  createElementInRegistryOf,
  customElementRegistryOf,
  getDefaultCustomElementRegistry,
  setDefaultCustomElementRegistry,
} from '../dom/custom-element-registry.ts';
import { waitForLitRender } from '../testing.ts';

const supportsScopedRegistries = (() => {
  try {
    const registry = new CustomElementRegistry();
    return (
      document.createElement('div', { customElementRegistry: registry }).customElementRegistry ===
      registry
    );
  } catch {
    return false;
  }
})();

(supportsScopedRegistries ? describe : describe.skip)('SbbElement with scoped registry', () => {
  let registry: CustomElementRegistry;
  let host: HTMLDivElement;
  let root: ShadowRoot;

  beforeEach(() => {
    registry = new CustomElementRegistry();
    host = document.createElement('div');
    document.body.appendChild(host);
    root = host.attachShadow({ mode: 'open', customElementRegistry: registry });
  });

  afterEach(() => {
    host.remove();
    setDefaultCustomElementRegistry(undefined);
  });

  it('defines the element and its dependencies only in the given registry', () => {
    SbbHeaderButtonElement.define(registry);

    expect(registry.get('sbb-header-button')).to.equal(SbbHeaderButtonElement);
    expect(registry.get('sbb-icon')).to.equal(SbbIconElement);
    expect(customElements.get('sbb-header-button')).to.be.undefined;
    expect(customElements.get('sbb-icon')).to.be.undefined;
  });

  it('uses the configured default registry', () => {
    expect(getDefaultCustomElementRegistry()).to.equal(customElements);
    setDefaultCustomElementRegistry(registry);
    expect(getDefaultCustomElementRegistry()).to.equal(registry);

    SbbHeaderButtonElement.define();

    expect(registry.get('sbb-header-button')).to.equal(SbbHeaderButtonElement);
    expect(customElements.get('sbb-header-button')).to.be.undefined;
  });

  it('renders the shadow DOM with the scoped registry', async () => {
    SbbHeaderButtonElement.define(registry);
    root.innerHTML = `<sbb-header-button icon-name="user-small">Label</sbb-header-button>`;
    const element = root.querySelector('sbb-header-button')!;
    await waitForLitRender(element);

    expect(element).to.be.instanceOf(SbbHeaderButtonElement);
    expect(element.shadowRoot).not.to.be.null;
    expect(customElementRegistryOf(element.shadowRoot)).to.equal(registry);

    const icon = element.shadowRoot!.querySelector('sbb-icon')!;
    expect(icon).not.to.be.null;
    expect(icon).to.be.instanceOf(SbbIconElement);
    expect(customElementRegistryOf(icon)).to.equal(registry);
  });

  it('upgrades elements created via createElementInRegistryOf', async () => {
    SbbIconElement.define(registry);
    const element = createElementInRegistryOf(root, 'sbb-icon');
    root.appendChild(element);
    await waitForLitRender(element);

    expect(element).to.be.instanceOf(SbbIconElement);
    expect(customElementRegistryOf(element)).to.equal(registry);
  });
});
