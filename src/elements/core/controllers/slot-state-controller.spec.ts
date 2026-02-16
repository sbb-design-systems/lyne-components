import { aTimeout, expect } from '@open-wc/testing';
import { html, LitElement, type TemplateResult } from 'lit';

import { fixture } from '../testing/private/fixture.ts';
import { EventSpy } from '../testing.ts';

import { SbbSlotStateController } from './slot-state-controller.ts';

class SlotStateControllerElement extends LitElement {
  public constructor() {
    super();
    this.addController(new SbbSlotStateController(this, this.attachInternals()));
  }
  protected override render(): TemplateResult {
    return html`<div><slot></slot><slot name="icon"></slot></div>`;
  }
}

customElements.define('sbb-slot-state-controller-test', SlotStateControllerElement);

describe('SbbSlotStateController', () => {
  let element: SlotStateControllerElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-slot-state-controller-test></sbb-slot-state-controller-test>`,
    );
  });

  it('should sync slots', async () => {
    expect(element).not.to.match(':state(slotted)');
    expect(element).not.to.match(':state(slotted-icon)');

    const icon = document.createElement('img');
    icon.slot = 'icon';
    element.appendChild(icon);
    await aTimeout(1);
    expect(element).to.match(':state(slotted-icon)');
    expect(element).not.to.match(':state(slotted)');

    const paragraph = document.createElement('p');
    element.appendChild(paragraph);
    await aTimeout(1);
    expect(element).to.match(':state(slotted-icon)');
    expect(element).to.match(':state(slotted)');

    icon.slot = '';
    await aTimeout(1);
    expect(element).not.to.match(':state(slotted-icon)');
    expect(element).to.match(':state(slotted)');

    element.innerHTML = '';
    await aTimeout(1);
    expect(element).not.to.match(':state(slotted)');
    expect(element).not.to.match(':state(slotted-icon)');
  });

  it('should detect text when textNode was empty first', async () => {
    const node = document.createTextNode('');
    element.appendChild(node);
    expect(element).not.to.match(':state(slotted)');

    node.textContent = 'Text Label';
    await aTimeout(1);
    expect(element).to.match(':state(slotted)');
  });

  it('should detect empty text', async () => {
    const node = document.createTextNode('filled');
    element.appendChild(node);
    await aTimeout(1);
    expect(element).to.match(':state(slotted)');

    node.textContent = '';
    await aTimeout(1);
    expect(element).not.to.match(':state(slotted)');
  });

  it('should detect text when textNode was empty first with multiple nodes', async () => {
    const node = document.createTextNode('');
    element.appendChild(node);
    const node2 = document.createTextNode('');
    element.appendChild(node2);
    expect(element).not.to.match(':state(slotted)');

    node2.textContent = 'Text Label';
    await aTimeout(1);
    expect(element).to.match(':state(slotted)');
  });

  it('should detect empty text with multiple nodes', async () => {
    const node = document.createTextNode('filled');
    element.appendChild(node);
    const node2 = document.createTextNode('filled');
    element.appendChild(node2);
    await aTimeout(1);
    expect(element).to.match(':state(slotted)');

    node.textContent = '';
    await aTimeout(1);
    expect(element).to.match(':state(slotted)');

    node2.textContent = '';
    await aTimeout(1);
    expect(element).not.to.match(':state(slotted)');
  });

  it('should not disconnect observer on DOM removal', async () => {
    const node = document.createTextNode('filled');
    element.appendChild(node);
    await aTimeout(1);
    expect(element).to.match(':state(slotted)');

    element.remove();

    node.textContent = '';
    await aTimeout(1);
    expect(element).not.to.match(':state(slotted)');
  });

  it('should dispatch event', async () => {
    const spy = new EventSpy('slottedchange', element);

    element.appendChild(document.createTextNode('Text'));
    await aTimeout(1);
    expect(spy.count).to.equal(1);
  });
});

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-slot-state-controller-test': SlotStateControllerElement;
  }
}
