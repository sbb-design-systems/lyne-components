import { expect } from '@open-wc/testing';

import { SbbChipElement } from '../../chip/chip/chip.component.ts';
import { SbbChipGroupElement } from '../../chip/chip-group/chip-group.component.ts';
import { SbbHeaderButtonElement } from '../../header/header-button/header-button.component.ts';
import { SbbIconElement } from '../../icon/icon.component.ts';
import { SbbTooltipElement } from '../../tooltip/tooltip.component.ts';
import {
  createElementInRegistryOf,
  customElementRegistryOf,
  getDefaultCustomElementRegistry,
  setDefaultCustomElementRegistry,
} from '../dom/custom-element-registry.ts';
import { waitForCondition, waitForLitRender } from '../testing.ts';

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

  it('creates chips in the registry of the chip group', async () => {
    SbbChipGroupElement.define(registry);
    root.innerHTML = `<sbb-chip-group></sbb-chip-group>`;
    const chipGroup = root.querySelector<SbbChipGroupElement>('sbb-chip-group')!;
    await waitForLitRender(chipGroup);

    chipGroup.value = ['chip'];
    await waitForLitRender(chipGroup);

    const chip = chipGroup.querySelector('sbb-chip')!;
    expect(chip).to.be.instanceOf(SbbChipElement);
    expect(customElementRegistryOf(chip)).to.equal(registry);
  });

  it('creates tooltips in the registry the tooltip was defined in', async () => {
    SbbTooltipElement.define(registry);
    const trigger = document.createElement('button');
    trigger.setAttribute('sbb-tooltip', 'Tooltip message');
    host.appendChild(trigger);
    await waitForCondition(() => !!document.querySelector('.sbb-overlay-outlet sbb-tooltip'));

    const tooltip = document.querySelector<SbbTooltipElement>('.sbb-overlay-outlet sbb-tooltip')!;
    expect(tooltip).to.be.instanceOf(SbbTooltipElement);
    expect(customElementRegistryOf(tooltip)).to.equal(registry);
    expect(tooltip.trigger).to.equal(trigger);
    tooltip.remove();
  });
});
