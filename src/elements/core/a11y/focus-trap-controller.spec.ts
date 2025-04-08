import { expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';

import { SbbOpenCloseBaseElement } from '../base-elements.js';
import { fixture, tabKey } from '../testing/private.js';

import { SbbFocusTrapController } from './focus-trap-controller.js';

describe('focusTrapController', () => {
  let element: SbbOpenCloseBaseElement;

  customElements.define(
    'my-container-element',
    class extends SbbOpenCloseBaseElement {
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

      public override open(): void {
        throw new Error('Method not implemented.');
      }
      public override close(): void {
        throw new Error('Method not implemented.');
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

    focusTrapController.trap();

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
    const focusTrapController = new SbbFocusTrapController(element, {
      filter: (el) => ['div', 'input'].includes(el.localName),
    });

    focusTrapController.trap();

    element.shadowRoot!.querySelector('input')!.focus();
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('input');

    await sendKeys({ press: tabKey });
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('input');
  });

  it('should focus next element with post filter', async () => {
    const focusTrapController = new SbbFocusTrapController(element, {
      postFilter: (el) => ['custom-button', 'custom-link'].includes(el.id),
    });
    focusTrapController.trap();

    element.shadowRoot!.querySelector<HTMLElement>('#custom-button')!.focus();
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('custom-button');

    await sendKeys({ press: tabKey });
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('custom-link');

    await sendKeys({ press: tabKey });
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('custom-button');
  });
});
