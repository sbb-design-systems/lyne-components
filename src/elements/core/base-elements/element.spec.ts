import { aTimeout, expect } from '@open-wc/testing';
import { type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { fixture } from '../testing/private.ts';
import { EventSpy } from '../testing.ts';

import { SbbElement, ɵstateController } from './element.ts';

/** Dummy docs */
@customElement('sbb-element-internals-test')
class SbbElementInternalsTestElement extends SbbElement {
  public static override readonly role = 'text';

  protected override render(): TemplateResult {
    return html`Button`;
  }
}

@customElement('sbb-slot-state-controller-test')
class SlotStateControllerElement extends SbbElement {
  protected override render(): TemplateResult {
    return html`<div><slot></slot><slot name="icon"></slot></div>`;
  }
}

describe(`SbbElement`, () => {
  describe('state', () => {
    let element: SbbElementInternalsTestElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-element-internals-test></sbb-element-internals-test>`);
    });

    it('should have the defined role', async () => {
      expect(element['internals'].role).to.equal(SbbElementInternalsTestElement.role);
    });

    it('should allow setting state', async () => {
      ɵstateController(element).toggle('test');
      expect(element).to.match(':state(test)');
    });

    it('should allow unsetting state', async () => {
      ɵstateController(element).toggle('test');
      ɵstateController(element).toggle('test');
      expect(element).to.not.match(':state(test)');
    });

    it('should allow force setting state', async () => {
      ɵstateController(element).toggle('test', true);
      expect(element).to.match(':state(test)');
    });

    it('should allow force setting state when already set', async () => {
      ɵstateController(element).toggle('test');
      ɵstateController(element).toggle('test', true);
      expect(element).to.match(':state(test)');
    });

    it('should allow force unsetting state', async () => {
      ɵstateController(element).toggle('test');
      ɵstateController(element).toggle('test', false);
      expect(element).to.not.match(':state(test)');
    });

    it('should allow force unsetting state when already unset', async () => {
      ɵstateController(element).toggle('test', false);
      expect(element).to.not.match(':state(test)');
    });
  });

  describe('slot state', () => {
    let element: SlotStateControllerElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-slot-state-controller-test></sbb-slot-state-controller-test>`,
      );
    });

    it('should sync slots', async function (this: Mocha.Context) {
      // Flaky on Webkit
      this.retries(3);

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

    it('should not disconnect observer on DOM removal', async function (this: Mocha.Context) {
      // Flaky on Webkit
      this.retries(3);

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
});

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-element-internals-test': SbbElementInternalsTestElement;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-slot-state-controller-test': SlotStateControllerElement;
  }
}
