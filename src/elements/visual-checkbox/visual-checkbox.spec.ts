import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.ts';

import { SbbVisualCheckboxElement } from './visual-checkbox.component.ts';

describe(`sbb-visual-checkbox`, (): void => {
  it('renders', async (): Promise<void> => {
    const element: SbbVisualCheckboxElement = await fixture(
      html`<sbb-visual-checkbox></sbb-visual-checkbox>`,
    );
    assert.instanceOf(element, SbbVisualCheckboxElement);
    const svg = element.shadowRoot?.querySelector('svg');
    expect(svg).not.to.exist;
  });

  it('renders checked', async (): Promise<void> => {
    const element: SbbVisualCheckboxElement = await fixture(
      html`<sbb-visual-checkbox checked></sbb-visual-checkbox>`,
    );
    assert.instanceOf(element, SbbVisualCheckboxElement);

    const svg = element.shadowRoot?.querySelector('svg');
    expect(svg).to.exist;
    expect(svg!.querySelector('path')).to.have.attribute('d', 'M8 12.3304L10.4615 15L16 9');
  });

  it('renders indeterminate', async (): Promise<void> => {
    const element: SbbVisualCheckboxElement = await fixture(
      html`<sbb-visual-checkbox indeterminate></sbb-visual-checkbox>`,
    );
    assert.instanceOf(element, SbbVisualCheckboxElement);

    const svg = element.shadowRoot?.querySelector('svg');
    expect(svg).to.exist;
    expect(svg!.querySelector('path')).to.have.attribute('d', 'M9 12H15');
  });
});
