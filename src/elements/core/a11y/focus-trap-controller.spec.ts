import { expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html, LitElement } from 'lit';

import { fixture, tabKey } from '../testing/private.js';

import { SbbFocusTrapController } from './focus-trap-controller.js';

describe('focusTrapController', () => {
  let element: LitElement;

  customElements.define(
    'my-container-element',
    class extends LitElement {
      public constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
          <span tabindex="0" id="custom-button">Button</span>
          <span tabindex="0" id="custom-link">Link</span>
          <div>
            <input id="input" />
            <button style="visibility: hidden" id="hidden-button">Button</button>
          </div>
          <slot></slot>
          <button id="disabled-button" disabled>Disabled button</button>
          <span id="disabled-interactive-button" disabled-interactive tabindex="0">Disabled interactive button</span>
          <span id="inert-button" tabindex="0" inert>Inert button</span>
      `;
      }
    },
  );

  beforeEach(async () => {
    await customElements.whenDefined('my-container-element');
    element = await fixture(html`
      <my-container-element><button id="slotted-button">Button</button></my-container-element>
    `);
  });

  it('should focus next element', async () => {
    const focusTrapController = new SbbFocusTrapController(element);

    focusTrapController.enabled = true;

    element.shadowRoot!.querySelector<HTMLElement>('#custom-button')!.focus();
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('custom-button');

    await sendKeys({ press: tabKey });
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('custom-link');

    await sendKeys({ press: tabKey });
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('input');

    await sendKeys({ press: tabKey });
    expect(document.activeElement!.id).to.equal('slotted-button');

    await sendKeys({ press: tabKey });
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal(
      'disabled-interactive-button',
    );

    // Wrap around
    await sendKeys({ press: tabKey });
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('custom-button');
  });

  it('should focus next element with filter', async () => {
    const focusTrapController = new SbbFocusTrapController(element);

    focusTrapController.enabled = true;

    element.shadowRoot!.querySelector('input')!.focus();
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('input');

    await sendKeys({ press: tabKey });
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('input');
  });

  it('should focus next element with post filter', async () => {
    const focusTrapController = new SbbFocusTrapController(element);
    focusTrapController.enabled = true;

    element.shadowRoot!.querySelector<HTMLElement>('#custom-button')!.focus();
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('custom-button');

    await sendKeys({ press: tabKey });
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('custom-link');

    await sendKeys({ press: tabKey });
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('custom-button');
  });
});
