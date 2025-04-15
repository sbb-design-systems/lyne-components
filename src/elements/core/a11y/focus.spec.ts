import { expect } from '@open-wc/testing';
import { html } from 'lit';

import { fixture } from '../testing/private.js';

import { getFirstFocusableElement, getFocusableElements } from './focus.js';

describe('focus', () => {
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
    await customElements.whenDefined('my-custom-element');
    lightDOM = await fixture(html`
      <div>
        <span tabindex="0" id="custom-button">Button</span>
        <span tabindex="0" id="custom-link">Link</span>
        <div>
          <input id="input" />
          <button style="visibility: hidden" id="hidden-button">Button</button>
        </div>
      </div>
    `);

    shadowDOM = await fixture(html`<my-custom-element></my-custom-element>`);
  });

  it('should retrieve focusable elements', () => {
    const elements = getFocusableElements([lightDOM, shadowDOM]);

    expect(elements.map((el) => el.id)).to.deep.equal([
      'custom-button',
      'custom-link',
      'input',
      'shadow-button',
    ]);
  });

  it('should retrieve focusable elements including invisible ones', () => {
    const elements = getFocusableElements([lightDOM, shadowDOM], {
      includeInvisibleElements: true,
    });

    expect(elements.map((el) => el.id)).to.deep.equal([
      'custom-button',
      'custom-link',
      'input',
      'hidden-button',
      'shadow-button',
    ]);
  });

  it('should retrieve filtered focusable elements', () => {
    const elements = getFocusableElements([lightDOM, shadowDOM], {
      filter: (el) => el.localName === 'div' || el.id === 'custom-link',
    });

    expect(elements.map((el) => el.id)).to.deep.equal(['custom-link']);
  });

  it('should prefer slotted over shadow DOM', () => {
    shadowDOM.innerHTML = '<button id="slotted-button">Button</button>';

    const elements = getFocusableElements([shadowDOM]);

    expect(elements.map((el) => el.id)).to.deep.equal(['slotted-button']);
  });

  it('should retrieve first focusable element', () => {
    const element = getFirstFocusableElement([lightDOM, shadowDOM]);

    expect(element!.id).to.equal('custom-button');
  });
});
