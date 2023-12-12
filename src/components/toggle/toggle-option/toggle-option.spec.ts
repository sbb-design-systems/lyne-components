import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';

import './toggle-option';
import '../../icon';

describe('sbb-toggle-option', () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-toggle-option checked value="Option 1"></sbb-toggle-option>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-toggle-option aria-checked="true" checked role="radio" tabindex="0" value="Option 1">
      </sbb-toggle-option>
    `);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders with sbb-icon', async () => {
    const root = await fixture(
      html`<sbb-toggle-option checked icon-name="arrow-right-small"></sbb-toggle-option>`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-toggle-option
        aria-checked="true"
        checked
        icon-name="arrow-right-small"
        role="radio"
        tabindex="0"
      >
      </sbb-toggle-option>
    `);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders with slotted sbb-icon', async () => {
    const root = await fixture(
      html` <sbb-toggle-option>
        <sbb-icon slot="icon" name="arrow-right-small"></sbb-icon>
      </sbb-toggle-option>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-toggle-option
        aria-checked="false"
        role="radio"
        tabindex="-1"
        data-slot-names="icon"
      >
        <sbb-icon
          aria-hidden="true"
          data-namespace="default"
          name="arrow-right-small"
          role="img"
          slot="icon"
        >
        </sbb-icon>
      </sbb-toggle-option>
    `);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });
});
