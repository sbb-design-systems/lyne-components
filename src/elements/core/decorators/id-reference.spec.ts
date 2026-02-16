import { expect } from '@open-wc/testing';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { fixture } from '../testing/private.ts';
import { waitForLitRender } from '../testing.ts';

import { idReference } from './id-reference.ts';

/**
 * Test element for the idReference decorator.
 */
@customElement('sbb-id-decorator-test')
class SbbIdDecoratorTestElement extends LitElement {
  @idReference()
  @property()
  public accessor element: HTMLElement | null = null;
}

customElements.define(
  'custom-shadow-root-element',
  class extends HTMLElement {
    public constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = `<div><sbb-id-decorator-test element="test"></sbb-id-decorator-test><span></span></div>`;
    }
  },
);

// TODO Test von Jeri kopieren, test für attribut vs property Zuweisung

describe('idReference', () => {
  it('should automatically resolve ids', async () => {
    const root = await fixture(
      html`<div>
        <sbb-id-decorator-test element="test"></sbb-id-decorator-test><span id="test"></span>
      </div>`,
    );

    const idControllerTest = root.querySelector('sbb-id-decorator-test')!;
    const idElement = root.querySelector('span')!;

    expect(idControllerTest.element).to.be.equal(idElement);
  });

  it('should update element with id added and removed', async () => {
    const root = await fixture(
      html`<div><sbb-id-decorator-test element="test"></sbb-id-decorator-test><span></span></div>`,
    );

    const idControllerTest = root.querySelector('sbb-id-decorator-test')!;
    const idElement = root.querySelector('span')!;

    idElement.id = 'test';
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.equal(idElement);

    idElement.id = '';
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.equal(null);
  });

  it('should handle renamed id', async () => {
    const root = await fixture(
      html`<div><sbb-id-decorator-test element="test"></sbb-id-decorator-test><span></span></div>`,
    );

    const idControllerTest = root.querySelector('sbb-id-decorator-test')!;
    const idElement = root.querySelector('span')!;

    idElement.id = 'test';
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.equal(idElement);

    idElement.id = 'test2';
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.equal(null);

    idElement.id = 'test';
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.equal(idElement);
  });

  it('should update element with id added and removed with multiple controllers', async () => {
    const root = await fixture(
      html`<div>
        <sbb-id-decorator-test element="test"></sbb-id-decorator-test>
        <span></span>
        <sbb-id-decorator-test element="test"></sbb-id-decorator-test>
      </div>`,
    );

    const idControllerTest1 = root.querySelector('sbb-id-decorator-test')!;
    const idControllerTest2 = root.querySelectorAll('sbb-id-decorator-test')[1]!;
    const idElement = root.querySelector('span')!;

    idElement.id = 'test';
    await waitForLitRender(root);

    expect(idControllerTest1.element, 'controller 1').to.be.equal(idElement);
    expect(idControllerTest2.element, 'controller 2').to.be.equal(idElement);

    idElement.id = '';
    await waitForLitRender(root);
    expect(idControllerTest1.element, 'controller 1').to.be.equal(null);
    expect(idControllerTest2.element, 'controller 2').to.be.equal(null);

    // Remove one controller and expect observer is still running
    idControllerTest2.remove();
    await waitForLitRender(root);
    expect(idControllerTest1.element, 'controller 1').to.be.equal(null);

    idElement.id = 'test';
    await waitForLitRender(root);
    expect(idControllerTest1.element, 'controller 1').to.be.equal(idElement);
  });

  it('should find element with id on node with nested elements', async () => {
    const root = await fixture(
      html`<div><sbb-id-decorator-test element="test"></sbb-id-decorator-test></div>`,
    );

    const idControllerTest = root.querySelector('sbb-id-decorator-test')!;

    const idElement = document.createElement('span');
    idElement.id = 'test';
    const el = document.createElement('span');
    idElement.appendChild(el);
    root.appendChild(idElement);
    await waitForLitRender(root);

    expect(idControllerTest.element).to.be.equal(idElement);
  });

  it('should find element with id inside nested elements', async () => {
    const root = await fixture(
      html`<div><sbb-id-decorator-test element="test"></sbb-id-decorator-test></div>`,
    );

    const idControllerTest = root.querySelector('sbb-id-decorator-test')!;

    const el = document.createElement('span');
    const idElement = document.createElement('span');
    idElement.id = 'test';
    el.appendChild(idElement);
    root.appendChild(el);
    await waitForLitRender(root);

    expect(idControllerTest.element).to.be.equal(idElement);
  });

  it('should find element with id after removal and re-adding of component', async () => {
    const root = await fixture(
      html`<div><sbb-id-decorator-test element="test"></sbb-id-decorator-test><span></span></div>`,
    );

    const idControllerTest = root.querySelector('sbb-id-decorator-test')!;
    const idElement = root.querySelector('span')!;

    idElement.id = 'test';
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.equal(idElement);

    idElement.id = '';
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.equal(null);

    idControllerTest.remove();
    await waitForLitRender(root);
    expect(idControllerTest.element, 'rootNode needs to be reset').to.be.null;

    root.appendChild(idControllerTest);
    idElement.id = 'test';
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.equal(idElement);
  });

  it('should handle correct rootNode in Shadow DOM context', async () => {
    const root = await fixture(
      html`<div><custom-shadow-root-element></custom-shadow-root-element><span></span></div>`,
    );

    const shadowRoot = root.querySelector('custom-shadow-root-element')!.shadowRoot!;
    const idControllerTest = shadowRoot.querySelector('sbb-id-decorator-test')!;
    const idElement = root.querySelector('span')!;
    const idElementShadowRoot = shadowRoot.querySelector('span')!;

    idElement.id = 'test';
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.equal(null);

    idElementShadowRoot.id = 'test';
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.equal(idElementShadowRoot);
  });

  it('should automatically resolve ids with setter', async () => {
    const root = await fixture(
      html`<div><sbb-id-decorator-test></sbb-id-decorator-test><span id="test"></span></div>`,
    );

    const idControllerTest = root.querySelector('sbb-id-decorator-test')!;
    const idElement = root.querySelector('span')!;

    idControllerTest.element = 'test' as any;
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.equal(idElement);
  });

  it('should automatically resolve ids with setter and missing id', async () => {
    const root = await fixture(
      html`<div><sbb-id-decorator-test></sbb-id-decorator-test><span></span></div>`,
    );

    const idControllerTest = root.querySelector('sbb-id-decorator-test')!;
    const idElement = root.querySelector('span')!;

    idControllerTest.element = 'test' as any;
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.null;

    idElement.id = 'test';
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.equal(idElement);
  });

  it('should precede attribute before manually passed id string', async () => {
    const root = await fixture(
      html`<div>
        <sbb-id-decorator-test element="id1"></sbb-id-decorator-test>
        <span id="id1"></span>
        <span id="id2"></span>
      </div>`,
    );

    const idControllerTest = root.querySelector('sbb-id-decorator-test')!;
    const spanElement = root.querySelector('#id1')!;

    idControllerTest.element = 'id2' as any;
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.equal(spanElement);
  });

  it('should find utf8 id strings', async () => {
    const root = await fixture(
      html`<div><sbb-id-decorator-test></sbb-id-decorator-test><span></span></div>`,
    );

    const idControllerTest = root.querySelector('sbb-id-decorator-test')!;
    const idElement = root.querySelector('span')!;

    idControllerTest.setAttribute('element', '12$äöü-1234');

    idElement.id = '12$äöü-1234';
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.equal(idElement);
  });
});

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-id-decorator-test': SbbIdDecoratorTestElement;
  }
}
