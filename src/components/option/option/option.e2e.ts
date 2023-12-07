import { assert, expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import '../../autocomplete';
import { waitForLitRender, EventSpy } from '../../core/testing';
import type { SbbFormFieldElement } from '../../form-field';
import '../../form-field';

import { SbbOptionElement } from './option';

describe('sbb-option', () => {
  describe('autocomplete', () => {
    let element: SbbFormFieldElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-form-field>
          <input />
          <sbb-autocomplete>
            <sbb-option id="option-1" value="1">Option 1</sbb-option>
            <sbb-option id="option-2" value="2">Option 2</sbb-option>
            <sbb-option id="option-3" value="3">Option 3</sbb-option>
          </sbb-autocomplete>
        </sbb-form-field>
      `);
    });

    it('renders', async () => {
      const option = element.querySelector('sbb-option');
      assert.instanceOf(option, SbbOptionElement);
    });

    it('set selected and emits on click', async () => {
      const selectionChangeSpy = new EventSpy(SbbOptionElement.events.selectionChange);
      const optionOne = element.querySelector('sbb-option');

      optionOne.dispatchEvent(new CustomEvent('click'));
      await waitForLitRender(element);

      expect(optionOne.selected).to.be.equal(true);
      expect(selectionChangeSpy.count).to.be.equal(1);
    });

    it('highlight on input', async () => {
      const input = element.querySelector('input');
      const autocomplete = element.querySelector('sbb-autocomplete');
      const options = element.querySelectorAll('sbb-option');
      const optionOneLabel = options[0].shadowRoot.querySelector('.sbb-option__label');
      const optionTwoLabel = options[1].shadowRoot.querySelector('.sbb-option__label');
      const optionThreeLabel = options[2].shadowRoot.querySelector('.sbb-option__label');

      input.focus();
      await sendKeys({ press: '1' });
      await waitForLitRender(autocomplete);

      expect(optionOneLabel).dom.to.be.equal(`
        <span class="sbb-option__label">
          <slot></slot>
          <span class="sbb-option__label--highlight">Option</span>
          <span>1</span>
          <span class="sbb-option__label--highlight"></span>
        </span>
      `);
      expect(optionTwoLabel).dom.to.be.equal(`
        <span class="sbb-option__label">
          <slot></slot>
          Option 2
        </span>
      `);
      expect(optionThreeLabel).dom.to.be.equal(`
        <span class="sbb-option__label">
          <slot></slot>
          Option 3
        </span>
      `);
    });
  });
});
