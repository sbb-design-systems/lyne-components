import { expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html, LitElement, type ReactiveControllerHost } from 'lit';
import { spy } from 'sinon';

import { fixture, tabKey } from '../testing/private.ts';

import { SbbFocusTrapController } from './focus-trap-controller.ts';

describe('focusTrapController', () => {
  let element: LitElement, focusTrapController: SbbFocusTrapController;

  /** Gets the currently-focused element while accounting for the shadow DOM. */
  function getActiveElement(): HTMLElement | null {
    const activeElement = document.activeElement as HTMLElement | null;
    return (activeElement?.shadowRoot?.activeElement as HTMLElement) || activeElement;
  }

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
      <my-container-element>
        <button id="slotted-button">Button</button>
        <span id="not-focusable"></span>
      </my-container-element>
    `);
    focusTrapController = new SbbFocusTrapController(element);
  });

  it('should focus first tabbable element', () => {
    const result = focusTrapController.focusFirstTabbableElement();

    expect(getActiveElement()?.id, 'Expected first element to be focused').to.be.equal(
      'custom-button',
    );
    expect(result, 'Expected return value to be true if focus was shifted.').to.be.true;
  });

  it('should focus last tabbable element', () => {
    const result = focusTrapController.focusLastTabbableElement();

    expect(getActiveElement()?.id, `Expected last element to be focused`).to.be.equal(
      'disabled-interactive-button',
    );
    expect(result, 'Expected return value to be true if focus was shifted.').to.be.true;
  });

  it('should return false if it did not manage to find a focusable element', async () => {
    const withoutFocusableElementsFixture = await fixture(html`<div><span></span></div>`);

    focusTrapController = new SbbFocusTrapController(
      withoutFocusableElementsFixture as ReactiveControllerHost & LitElement,
    );

    const result = focusTrapController.focusFirstTabbableElement();

    expect(result).to.be.false;
  });

  it('should wrap around with tabbing', async () => {
    focusTrapController.enabled = true;
    const firstButton = element.shadowRoot!.querySelector<HTMLElement>('#custom-button')!;
    focusTrapController.focusInitialElement();

    expect(getActiveElement()).to.equal(firstButton);

    await sendKeys({ press: tabKey });
    expect(getActiveElement()?.id).to.equal('custom-link');

    await sendKeys({ press: tabKey });
    expect(getActiveElement()?.id).to.equal('input');

    await sendKeys({ press: tabKey });
    expect(getActiveElement()?.id).to.equal('slotted-button');

    await sendKeys({ press: tabKey });
    expect(getActiveElement()?.id).to.equal('disabled-interactive-button');

    // Wrap around
    await sendKeys({ press: tabKey });
    expect(getActiveElement()?.id).to.equal('custom-button');
  });

  it('should disable focus trap', async () => {
    focusTrapController.enabled = true;

    // Focus last element
    element.shadowRoot!.querySelector<HTMLElement>('#disabled-interactive-button')!.focus();
    expect(getActiveElement()?.id).to.equal('disabled-interactive-button');

    focusTrapController.enabled = false;

    await sendKeys({ press: tabKey });
    expect(getActiveElement()?.id).not.to.equal('custom-button');
  });

  it('should be able to set initial focus target', () => {
    element.querySelector('#slotted-button')!.toggleAttribute('sbb-focus-initial', true);
    focusTrapController.focusInitialElement();
    expect(getActiveElement()?.id).to.be.equal('slotted-button');
  });

  it('focusInitialElement should fallback to first tabbable element', () => {
    focusTrapController.focusInitialElement();
    expect(getActiveElement()?.id).to.be.equal('custom-button');
  });

  it('should be able to pass in focus options to focusInitialElement()', () => {
    const initialFocusedButton = element.querySelector<HTMLButtonElement>('#slotted-button')!;
    initialFocusedButton.toggleAttribute('sbb-focus-initial', true);

    const options = { preventScroll: true };
    const buttonSpy = spy(initialFocusedButton, 'focus');
    focusTrapController.focusInitialElement(options);

    expect(buttonSpy).to.have.been.calledOnceWith(options);
  });

  it('should be able to pass in focus options to focusFirstTabbableElement', () => {
    const initialFocusedButton =
      element.shadowRoot!.querySelector<HTMLButtonElement>('#custom-button')!;

    const options = { preventScroll: true };
    const buttonSpy = spy(initialFocusedButton, 'focus');
    focusTrapController.focusFirstTabbableElement(options);

    expect(buttonSpy).to.have.been.calledOnceWith(options);
  });

  it('should be able to pass in focus options to focusLastTabbableElement', () => {
    const initialFocusedButton = element.shadowRoot!.querySelector<HTMLButtonElement>(
      '#disabled-interactive-button',
    )!;

    const options = { preventScroll: true };
    const buttonSpy = spy(initialFocusedButton, 'focus');
    focusTrapController.focusLastTabbableElement(options);

    expect(buttonSpy).to.have.been.calledOnceWith(options);
  });
});
