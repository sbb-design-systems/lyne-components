import { expect } from '@open-wc/testing';
import { html, LitElement, type PropertyDeclaration } from 'lit';
import { customElement } from 'lit/decorators.js';

import { fixture } from '../testing/private.ts';
import { waitForLitRender } from '../testing.ts';

import { SbbIdReferenceController } from './id-reference-controller.ts';

const observers = new WeakMap<
  Node,
  { observer: MutationObserver; controllers: Set<SbbIdReferenceController<any>> }
>();

/**
 * Test component containing SbbIdReferenceController
 */
@customElement('sbb-id-controller-test')
class SbbIdControllerTestElement extends LitElement {
  public observedId = 'test';
  public element: HTMLElement | null = null;
  public idReferenceController = new SbbIdReferenceController(this, 'observedId', observers);

  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
  ): void {
    super.requestUpdate(name, oldValue, options);

    if (this.idReferenceController && !name) {
      this.element = this.idReferenceController.find();
    }
  }
}

customElements.define(
  'custom-shadow-root-element',
  class extends HTMLElement {
    public constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = `<div><sbb-id-controller-test></sbb-id-controller-test><span></span></div>`;
    }
  },
);

describe('SbbIdReferenceController', () => {
  it('should update element with id added and removed', async () => {
    const root = await fixture(
      html`<div><sbb-id-controller-test></sbb-id-controller-test><span></span></div>`,
    );

    const idControllerTest = root.querySelector('sbb-id-controller-test')!;
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
      html`<div><sbb-id-controller-test></sbb-id-controller-test><span></span></div>`,
    );

    const idControllerTest = root.querySelector('sbb-id-controller-test')!;
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
        <sbb-id-controller-test></sbb-id-controller-test>
        <span></span>
        <sbb-id-controller-test></sbb-id-controller-test>
      </div>`,
    );

    const idControllerTest1 = root.querySelector('sbb-id-controller-test')!;
    const idControllerTest2 = root.querySelectorAll('sbb-id-controller-test')[1]!;
    const idElement = root.querySelector('span')!;

    idElement.id = 'test';
    await waitForLitRender(root);

    expect(observers.get(document)?.controllers.size).to.be.equal(2);
    expect(idControllerTest1.element, 'controller 1').to.be.equal(idElement);
    expect(idControllerTest2.element, 'controller 2').to.be.equal(idElement);

    idElement.id = '';
    await waitForLitRender(root);
    expect(idControllerTest1.element, 'controller 1').to.be.equal(null);
    expect(idControllerTest2.element, 'controller 2').to.be.equal(null);

    // Remove one controller and expect observer is still running
    idControllerTest2.remove();
    await waitForLitRender(root);
    expect(observers.get(document)?.controllers.size).to.be.equal(1);
    expect(idControllerTest1.element, 'controller 1').to.be.equal(null);

    idElement.id = 'test';
    await waitForLitRender(root);
    expect(idControllerTest1.element, 'controller 1').to.be.equal(idElement);
  });

  it('should find element with id on node with nested elements', async () => {
    const root = await fixture(html`<div><sbb-id-controller-test></sbb-id-controller-test></div>`);

    const idControllerTest = root.querySelector('sbb-id-controller-test')!;

    const idElement = document.createElement('span');
    idElement.id = 'test';
    const el = document.createElement('span');
    idElement.appendChild(el);
    root.appendChild(idElement);
    await waitForLitRender(root);

    expect(idControllerTest.element).to.be.equal(idElement);
  });

  it('should find element with id inside nested elements', async () => {
    const root = await fixture(html`<div><sbb-id-controller-test></sbb-id-controller-test></div>`);

    const idControllerTest = root.querySelector('sbb-id-controller-test')!;

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
      html`<div><sbb-id-controller-test></sbb-id-controller-test><span></span></div>`,
    );

    const idControllerTest = root.querySelector('sbb-id-controller-test')!;
    const idElement = root.querySelector('span')!;

    idElement.id = 'test';
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.equal(idElement);
    expect(observers.get(document)?.controllers.size).to.be.equal(1);

    idElement.id = '';
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.equal(null);

    idControllerTest.remove();
    await waitForLitRender(root);
    expect(observers.has(document)).to.be.false;
    expect(idControllerTest.idReferenceController.find(), 'rootNode needs to be reset').to.be.null;

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
    const idControllerTest = shadowRoot.querySelector('sbb-id-controller-test')!;
    const idElement = root.querySelector('span')!;
    const idElementShadowRoot = shadowRoot.querySelector('span')!;

    idElement.id = 'test';
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.equal(null);

    idElementShadowRoot.id = 'test';
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.equal(idElementShadowRoot);
    expect(observers.has(shadowRoot)).to.be.true;
  });

  it('should find utf8 id strings', async () => {
    const root = await fixture(
      html`<div><sbb-id-controller-test></sbb-id-controller-test><span></span></div>`,
    );

    const idControllerTest = root.querySelector('sbb-id-controller-test')!;
    const idElement = root.querySelector('span')!;

    idControllerTest.observedId = '12$äöü-1234';

    idElement.id = '12$äöü-1234';
    await waitForLitRender(root);
    expect(idControllerTest.element).to.be.equal(idElement);
  });
});

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-id-controller-test': SbbIdControllerTestElement;
  }
}
