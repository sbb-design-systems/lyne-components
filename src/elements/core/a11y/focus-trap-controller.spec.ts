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
          <button id="first-focusable-element">Button</button>
          <slot></slot>
          <button id="last-focusable-element">Button</button>
      `;
      }
    },
  );

  beforeEach(async () => {
    await customElements.whenDefined('my-container-element');
    element = await fixture(html`
      <my-container-element>
        <button id="slotted-button">Button</button>
      </my-container-element>
    `);
    focusTrapController = new SbbFocusTrapController(element);
  });

  it('should focus first tabbable element', () => {
    const result = focusTrapController.focusFirstTabbableElement();

    expect(getActiveElement()?.id, 'Expected first element to be focused').to.be.equal(
      'first-focusable-element',
    );
    expect(result, 'Expected return value to be true if focus was shifted.').to.be.true;
  });

  it('should focus last tabbable element', () => {
    const result = focusTrapController.focusLastTabbableElement();

    expect(getActiveElement()?.id, `Expected last element to be focused`).to.be.equal(
      'last-focusable-element',
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

  it('should disable focus trap', async () => {
    focusTrapController.enabled = true;

    // Focus last element
    element.shadowRoot!.querySelector<HTMLElement>('#last-focusable-element')!.focus();
    expect(getActiveElement()?.id).to.equal('last-focusable-element');

    focusTrapController.enabled = false;

    await sendKeys({ press: tabKey });
    expect(getActiveElement()?.id).not.to.equal('first-focusable-element');
  });

  it('should be able to set initial focus target', () => {
    element.querySelector('#slotted-button')!.toggleAttribute('sbb-focus-initial', true);
    focusTrapController.focusInitialElement();
    expect(getActiveElement()?.id).to.be.equal('slotted-button');
  });

  it('focusInitialElement should fallback to first tabbable element', () => {
    focusTrapController.focusInitialElement();
    expect(getActiveElement()?.id).to.be.equal('first-focusable-element');
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
    const initialFocusedButton = element.shadowRoot!.querySelector<HTMLButtonElement>(
      '#first-focusable-element',
    )!;

    const options = { preventScroll: true };
    const buttonSpy = spy(initialFocusedButton, 'focus');
    focusTrapController.focusFirstTabbableElement(options);

    expect(buttonSpy).to.have.been.calledOnceWith(options);
  });

  it('should be able to pass in focus options to focusLastTabbableElement', () => {
    const initialFocusedButton =
      element.shadowRoot!.querySelector<HTMLButtonElement>('#last-focusable-element')!;

    const options = { preventScroll: true };
    const buttonSpy = spy(initialFocusedButton, 'focus');
    focusTrapController.focusLastTabbableElement(options);

    expect(buttonSpy).to.have.been.calledOnceWith(options);
  });

  describe('wrap around', () => {
    describe('shadow DOM', () => {
      it('should wrap around to the first element when tabbing forward from the last element', async () => {
        focusTrapController.enabled = true;
        const button = element.shadowRoot!.querySelector<HTMLElement>('#last-focusable-element')!;
        button.focus();
        expect(getActiveElement()?.id).to.equal('last-focusable-element');

        await sendKeys({ press: tabKey });
        expect(getActiveElement()?.id).to.equal('first-focusable-element');
      });

      it('should wrap around to the last element when tabbing backwards from the first element', async () => {
        focusTrapController.enabled = true;
        const button = element.shadowRoot!.querySelector<HTMLElement>('#first-focusable-element')!;
        button.focus();
        expect(getActiveElement()?.id).to.equal('first-focusable-element');

        await sendKeys({ press: `Shift+${tabKey}` });
        expect(getActiveElement()?.id).to.equal('last-focusable-element');
      });

      it('should wrap around to the first element when tabbing forwards from the last element with focusable container', async () => {
        const button = element.shadowRoot!.querySelector<HTMLElement>('#last-focusable-element')!;

        const container = document.createElement('div');
        container.tabIndex = 0;
        container.id = 'container';
        element.shadowRoot!.append(container);
        element.shadowRoot!.querySelector('#container')?.appendChild(button);

        focusTrapController.enabled = true;
        element.shadowRoot!.querySelector<HTMLElement>('#first-focusable-element')!.focus();
        expect(getActiveElement()?.id).to.equal('first-focusable-element');

        await sendKeys({ press: tabKey });
        await sendKeys({ press: tabKey });
        expect(getActiveElement()?.id).to.equal('container');

        await sendKeys({ press: tabKey });
        expect(getActiveElement()?.id).to.equal('last-focusable-element');

        await sendKeys({ press: tabKey });
        expect(getActiveElement()?.id).to.equal('first-focusable-element');
      });

      it('should wrap around to the last element when tabbing backwards from the first element with focusable container', async () => {
        const button = element.shadowRoot!.querySelector<HTMLElement>('#last-focusable-element')!;

        const container = document.createElement('div');
        container.tabIndex = 0;
        container.id = 'container';
        element.shadowRoot!.append(container);
        element.shadowRoot!.querySelector('#container')?.appendChild(button);

        focusTrapController.enabled = true;
        element.shadowRoot!.querySelector<HTMLElement>('#first-focusable-element')!.focus();
        expect(getActiveElement()?.id).to.equal('first-focusable-element');

        await sendKeys({ press: `Shift+${tabKey}` });

        expect(getActiveElement()?.id).to.equal('last-focusable-element');
      });
    });

    describe('light DOM', () => {
      beforeEach(() => {
        element.shadowRoot!.querySelector<HTMLElement>('#last-focusable-element')!.remove();
      });

      it('should wrap around to the first element when tabbing forward from the last element', async () => {
        focusTrapController.enabled = true;
        const button = element.querySelector<HTMLElement>('#slotted-button')!;
        button.focus();
        expect(getActiveElement()?.id).to.equal('slotted-button');

        await sendKeys({ press: tabKey });
        expect(getActiveElement()?.id).to.equal('first-focusable-element');
      });

      it('should wrap around to the last element when tabbing backwards from the first element', async () => {
        focusTrapController.enabled = true;
        const button = element.shadowRoot!.querySelector<HTMLElement>('#first-focusable-element')!;
        button.focus();
        expect(getActiveElement()?.id).to.equal('first-focusable-element');

        await sendKeys({ press: `Shift+${tabKey}` });
        expect(getActiveElement()?.id).to.equal('slotted-button');
      });

      it('should wrap around to the first element when tabbing forwards from the last element with focusable container', async () => {
        const button = element.querySelector<HTMLElement>('#slotted-button')!;

        const container = document.createElement('div');
        container.tabIndex = 0;
        container.id = 'container';
        element.append(container);
        element.querySelector('#container')?.appendChild(button);

        focusTrapController.enabled = true;
        element.shadowRoot!.querySelector<HTMLElement>('#first-focusable-element')!.focus();
        expect(getActiveElement()?.id).to.equal('first-focusable-element');

        await sendKeys({ press: tabKey });
        expect(getActiveElement()?.id).to.equal('container');

        await sendKeys({ press: tabKey });
        expect(getActiveElement()?.id).to.equal('slotted-button');

        await sendKeys({ press: tabKey });
        expect(getActiveElement()?.id).to.equal('first-focusable-element');
      });

      it('should wrap around to the last element when tabbing backwards from the first element with focusable container', async () => {
        const button = element.querySelector<HTMLElement>('#slotted-button')!;

        const container = document.createElement('div');
        container.tabIndex = 0;
        container.id = 'container';
        element.append(container);
        element.querySelector('#container')?.appendChild(button);

        focusTrapController.enabled = true;
        element.shadowRoot!.querySelector<HTMLElement>('#first-focusable-element')!.focus();
        expect(getActiveElement()?.id).to.equal('first-focusable-element');

        await sendKeys({ press: `Shift+${tabKey}` });

        expect(getActiveElement()?.id).to.equal('slotted-button');
      });
    });
  });
});
