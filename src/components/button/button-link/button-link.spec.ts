import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';

import '../../form-field';
import './button-link';
import '../common/button-common';

describe('sbb-button-link', () => {
  it('renders a primary sbb-button-link without icon', async () => {
    const root = await fixture(html`
      <sbb-button-link variant="primary" size="m" href="#" target="_blank" rel="noopener" download>
        Label Text
      </sbb-button-link>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-button-link variant="primary" size="m" href='#' target='_blank' rel='noopener' download dir='ltr' role='link' tabindex='0' data-slot-names="unnamed">
        Label Text
      </sbb-button-link>
    `);
    expect(root).shadowDom.to.be.equal(`
      <a class="sbb-action-base sbb-button-link" href="#" rel="noopener" role="presentation" tabindex="-1" target="_blank" download>
        <span class="sbb-button__icon">
          <slot name="icon">
          </slot>
        </span>
        <span class="sbb-button__label">
          <slot></slot>
        </span>
        <sbb-screenreader-only>
          . Link target opens in a new window.
        </sbb-screenreader-only>
      </a>
    `);
  });

  it('renders a disabled primary sbb-button-link with slotted icon', async () => {
    const root = await fixture(html`
      <sbb-button-link variant="primary" href="#" disabled>
        <sbb-icon slot="icon" name="chevron-small-left-small"></sbb-icon>
        Label Text
      </sbb-button-link>
    `);

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-button-link variant="primary" href="#" disabled size="l" role="link" dir="ltr" aria-disabled='true' data-slot-names="icon unnamed">
        <sbb-icon slot="icon" name="chevron-small-left-small" role="img" aria-hidden="true" data-namespace="default"></sbb-icon>
        Label Text
      </sbb-button-link>
    `);
    expect(root).shadowDom.to.be.equal(`
      <a class="sbb-action-base sbb-button-link" href="#" role='presentation' tabindex='-1'>
        <span class="sbb-button__icon">
          <slot name="icon"></slot>
        </span>
        <span class="sbb-button__label"><slot></slot></span>
      </a>
    `);
  });

  it('should render form field button variant when inside of a form field', async () => {
    const root = await fixture(
      html` <sbb-form-field>
        <input />
        <sbb-button-link slot="suffix" icon-name="cross-small"></sbb-button-link>
      </sbb-form-field>`,
    );
    const button = root.querySelector('sbb-button-link');
    expect(button).to.have.attribute('data-icon-small');
  });
});
