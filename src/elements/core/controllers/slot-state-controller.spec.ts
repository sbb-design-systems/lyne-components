import { aTimeout, expect } from '@open-wc/testing';
import { html, LitElement, type TemplateResult } from 'lit';

import { slotState } from '../decorators.js';
import { fixture } from '../testing/private/fixture.js';
import { waitForCondition } from '../testing.js';

import { SbbSlotStateController } from './slot-state-controller.js';

@slotState()
class SlotStateControllerElement extends LitElement {
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
    expect(element).not.to.have.attribute('data-slot-names');

    const icon = document.createElement('img');
    icon.slot = 'icon';
    element.appendChild(icon);
    await waitForCondition(() => element.hasAttribute('data-slot-names'));
    expect(element).to.have.attribute('data-slot-names', 'icon');

    const paragraph = document.createElement('p');
    element.appendChild(paragraph);
    await waitForCondition(
      () => element.getAttribute('data-slot-names')?.includes('unnamed') ?? false,
    );
    expect(element).to.have.attribute('data-slot-names', 'icon unnamed');

    icon.slot = '';
    await waitForCondition(() => !element.getAttribute('data-slot-names')?.includes('icon'));
    expect(element).to.have.attribute('data-slot-names', 'unnamed');

    element.innerHTML = '';
    await waitForCondition(() => !element.hasAttribute('data-slot-names'));
    expect(element).not.to.have.attribute('data-slot-names');
  });

  it('should detect text when textNode was empty first', async () => {
    const node = document.createTextNode('');
    element.appendChild(node);
    await waitForCondition(() => !element.hasAttribute('data-slot-names'));
    expect(element).not.to.have.attribute('data-slot-names');

    node.textContent = 'Text Label';
    await waitForCondition(() => element.hasAttribute('data-slot-names'));
    expect(element).to.have.attribute('data-slot-names', 'unnamed');
  });

  it('should detect empty text', async () => {
    const node = document.createTextNode('filled');
    element.appendChild(node);
    await waitForCondition(() => element.hasAttribute('data-slot-names'));
    expect(element).to.have.attribute('data-slot-names');

    node.textContent = '';
    await waitForCondition(() => !element.hasAttribute('data-slot-names'));
    expect(element).not.to.have.attribute('data-slot-names', 'unnamed');
  });

  it('should detect text when textNode was empty first with multiple nodes', async () => {
    const node = document.createTextNode('');
    element.appendChild(node);
    const node2 = document.createTextNode('');
    element.appendChild(node2);
    await waitForCondition(() => !element.hasAttribute('data-slot-names'));
    expect(element).not.to.have.attribute('data-slot-names');

    node2.textContent = 'Text Label';
    await waitForCondition(() => element.hasAttribute('data-slot-names'));
    expect(element).to.have.attribute('data-slot-names', 'unnamed');
  });

  it('should detect empty text with multiple nodes', async () => {
    const node = document.createTextNode('filled');
    element.appendChild(node);
    const node2 = document.createTextNode('filled');
    element.appendChild(node2);
    await waitForCondition(() => element.hasAttribute('data-slot-names'));
    expect(element).to.have.attribute('data-slot-names');

    node.textContent = '';
    await aTimeout(30);
    expect(element).to.have.attribute('data-slot-names', 'unnamed');

    node2.textContent = '';
    await waitForCondition(() => !element.hasAttribute('data-slot-names'));
    expect(element).not.to.have.attribute('data-slot-names', 'unnamed');
  });

  it('should disconnect observer on hostDisconnected and connect on hostConnected', async () => {
    const node = document.createTextNode('filled');
    element.appendChild(node);
    await waitForCondition(() => element.hasAttribute('data-slot-names'));

    element.remove();

    node.textContent = '';
    await aTimeout(30);
    expect(element).to.have.attribute('data-slot-names', 'unnamed');

    document.body.appendChild(element);
    await waitForCondition(() => !element.hasAttribute('data-slot-names'));
    expect(element).not.to.have.attribute('data-slot-names', 'unnamed');

    // Clean up
    element.remove();
  });

  it('should call callback', async () => {
    let callbackCalled = false;
    element.addController(new SbbSlotStateController(element, () => (callbackCalled = true)));

    element.appendChild(document.createTextNode('Text'));
    await waitForCondition(() => callbackCalled);
    expect(callbackCalled).to.be.true;
  });
});

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-slot-state-controller-test': SlotStateControllerElement;
  }
}
