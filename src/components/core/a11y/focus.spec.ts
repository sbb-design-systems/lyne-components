import { expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import { FocusHandler, getFirstFocusableElement, getFocusableElements } from './focus';

describe('getFocusables', () => {
  let lightDOM: HTMLElement, shadowDOM: HTMLElement;

  customElements.define(
    'my-custom-element',
    class extends HTMLElement {
      public constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `<div><button id="shadow-button">Button</button><slot></slot></div>`;
      }
    },
  );

  beforeEach(async () => {
    lightDOM = await fixture(`
    <div>
      <sbb-button tabindex="0" id="sbb-button">Button</sbb-button>
      <a href="#" id="a">Link</a>
      <div>
        <input id="input" />
        <button style="visibility: hidden" id="hidden-button">Button</button>
      </div>
    </div>
    `);

    shadowDOM = await fixture(`
    <my-custom-element></my-custom-element>
    `);
  });

  it('should retrieve focusable elements', () => {
    const elements = getFocusableElements([lightDOM, shadowDOM]);

    expect(elements.map((el) => el.id)).to.deep.equal([
      'sbb-button',
      'a',
      'input',
      'shadow-button',
    ]);
  });

  it('should retrieve focusable elements including invisible ones', () => {
    const elements = getFocusableElements([lightDOM, shadowDOM], {
      includeInvisibleElements: true,
    });

    expect(elements.map((el) => el.id)).to.deep.equal([
      'sbb-button',
      'a',
      'input',
      'hidden-button',
      'shadow-button',
    ]);
  });

  it('should retrieve filtered focusable elements', () => {
    const elements = getFocusableElements([lightDOM, shadowDOM], {
      filter: (el) => el.tagName === 'DIV' || el.tagName === 'A',
    });

    expect(elements.map((el) => el.id)).to.deep.equal(['a']);
  });

  it('should prefer slotted over shadow DOM', () => {
    shadowDOM.innerHTML = '<button id="slotted-button">Button</button>';

    const elements = getFocusableElements([shadowDOM]);

    expect(elements.map((el) => el.id)).to.deep.equal(['slotted-button']);
  });

  it('should retrieve first focusable element', () => {
    const element = getFirstFocusableElement([lightDOM, shadowDOM]);

    expect(element!.id).to.equal('sbb-button');
  });
});

describe('focus trap', () => {
  let element: HTMLElement;

  customElements.define(
    'my-container-element',
    class extends HTMLElement {
      public constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
          <sbb-button tabindex="0" id="sbb-button">Button</sbb-button>
          <a href="#" id="a">Link</a>
          <div>
            <input id="input" />
            <button style="visibility: hidden" id="hidden-button">Button</button>
          </div>
          <slot></slot>
      `;
      }
    },
  );

  beforeEach(async () => {
    element = await fixture(`
    <my-container-element><button id="slotted-button">Button</button></my-container-element>
    `);
  });

  it('should focus next element', async () => {
    const focusHandler = new FocusHandler();
    focusHandler.trap(element);

    element.shadowRoot!.querySelector('sbb-button')!.focus();
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('sbb-button');

    await sendKeys({ down: 'Tab' });
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('a');

    await sendKeys({ down: 'Tab' });
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('input');

    await sendKeys({ down: 'Tab' });
    expect(document.activeElement!.id).to.equal('slotted-button');

    // Wrap around
    await sendKeys({ down: 'Tab' });
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('sbb-button');
  });

  it('should focus next element with filter', async () => {
    const focusHandler = new FocusHandler();
    focusHandler.trap(element, {
      filter: (el) => ['DIV', 'INPUT'].includes(el.tagName),
    });

    element.shadowRoot!.querySelector('input')!.focus();
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('input');

    await sendKeys({ down: 'Tab' });
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('input');
  });

  it('should focus next element with post filter', async () => {
    const focusHandler = new FocusHandler();
    focusHandler.trap(element, {
      postFilter: (el) => ['SBB-BUTTON', 'A'].includes(el.tagName),
    });

    element.shadowRoot!.querySelector('sbb-button')!.focus();
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('sbb-button');

    await sendKeys({ down: 'Tab' });
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('a');

    await sendKeys({ down: 'Tab' });
    expect(document.activeElement!.shadowRoot!.activeElement!.id).to.equal('sbb-button');
  });
});
