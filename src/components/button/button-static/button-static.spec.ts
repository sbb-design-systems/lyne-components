import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';

import '../../form-field';
import './button-static';

describe('sbb-button-static', () => {
  it('renders a button-static without icon', async () => {
    const root = await fixture(
      html` <sbb-button-static negative size="m" disabled> Label Text </sbb-button-static>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-button-static
        negative
        size="m"
        disabled
        dir="ltr"
        data-slot-names="unnamed"
      >

        Label Text
      </sbb-button-static>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-action-base sbb-button-static">
        <span class="sbb-button__icon">
          <slot name="icon">
          </slot>
        </span>
        <span class="sbb-button__label"><slot></slot></span>
      </span>
    `);
  });

  it('renders a primary button-static with slotted icon', async () => {
    const root = await fixture(
      html`<sbb-button-static>
        <sbb-icon slot="icon" name="chevron-small-left-small"></sbb-icon>
        Label Text
      </sbb-button-static> `,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-button-static size="l" dir="ltr" data-slot-names="icon unnamed">
        <sbb-icon slot="icon" name="chevron-small-left-small" role="img" aria-hidden="true" data-namespace="default"></sbb-icon>
        Label Text
      </sbb-button-static>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-action-base sbb-button-static">
        <span class="sbb-button__icon">
          <slot name="icon"></slot>
        </span>
        <span class="sbb-button__label"><slot></slot></span>
      </span>
    `);
  });

  it('should detect icon button', async () => {
    const root = await fixture(
      html`<sbb-button-static
        ><sbb-icon slot="icon" name="app-icon-medium"></sbb-icon
      ></sbb-button-static>`,
    );

    await waitForLitRender(root);

    const dataSlots = root.getAttribute('data-slot-names');
    expect(dataSlots).to.contain('icon');
    expect(dataSlots).not.to.contain('unnamed');
  });

  it('should detect icon button when there is space around icon', async () => {
    const root = await fixture(
      html`<sbb-button-static>
        <sbb-icon slot="icon" name="app-icon-medium"></sbb-icon>
      </sbb-button-static>`,
    );

    const dataSlots = root.getAttribute('data-slot-names');
    expect(dataSlots).to.contain('icon');
    expect(dataSlots).not.to.contain('unnamed');
  });

  it('should render form field button variant when inside of a form field', async () => {
    const root = await fixture(
      html` <sbb-form-field>
        <input />
        <sbb-button-static slot="suffix" icon-name="cross-small"></sbb-button-static>
      </sbb-form-field>`,
    );
    const button = root.querySelector('sbb-button-static');
    expect(button).to.have.attribute('data-icon-small');
  });
});
