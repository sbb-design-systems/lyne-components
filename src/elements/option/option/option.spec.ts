import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbAutocompleteElement } from '../../autocomplete.ts';
import { fixture } from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';
import type { SbbFormFieldElement } from '../../form-field.ts';
import type { SbbOptGroupElement } from '../optgroup.ts';

import { SbbOptionElement } from './option.component.ts';

import '../../autocomplete.ts';
import '../../form-field.ts';
import '../optgroup.ts';

describe(`sbb-option`, () => {
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
      const selectionChangeSpy = new EventSpy(SbbOptionElement.events.optionselectionchange);
      const optionOne = element.querySelector<SbbOptionElement>('sbb-option')!;

      optionOne.dispatchEvent(new PointerEvent('click'));
      await waitForLitRender(element);

      expect(optionOne.selected).to.be.equal(true);
      expect(selectionChangeSpy.count).to.be.equal(1);
    });

    it('highlight on input', async () => {
      const input = element.querySelector<HTMLInputElement>('input')!;
      const autocomplete = element.querySelector<SbbAutocompleteElement>('sbb-autocomplete')!;
      const options = element.querySelectorAll('sbb-option');
      const optionOneLabel = options[0].shadowRoot!.querySelector('.sbb-option__label > span');
      const optionTwoLabel = options[1].shadowRoot!.querySelector('.sbb-option__label > span');
      const optionThreeLabel = options[2].shadowRoot!.querySelector('.sbb-option__label > span');

      input.focus();
      await sendKeys({ press: '1' });
      await waitForLitRender(autocomplete);

      expect(optionOneLabel).dom.to.be.equal(
        `
        <span>
          <span class="sbb-option__label--highlight">Option</span>
          <span>1</span>
          <span class="sbb-option__label--highlight"></span>
        </span>
      `,
        { ignoreAttributes: ['aria-hidden'] },
      );
      expect(optionTwoLabel).dom.to.be.equal(
        `
        <span>
          Option 2
        </span>
      `,
        { ignoreAttributes: ['aria-hidden'] },
      );
      expect(optionThreeLabel).dom.to.be.equal(
        `
        <span>
          Option 3
        </span>
      `,
        { ignoreAttributes: ['aria-hidden'] },
      );
    });

    it('highlight after option label changed', async () => {
      const input = element.querySelector<HTMLInputElement>('input')!;
      const autocomplete = element.querySelector<SbbAutocompleteElement>('sbb-autocomplete')!;
      const options = element.querySelectorAll('sbb-option');
      const optionOneLabel = options[0].shadowRoot!.querySelector('.sbb-option__label > span');

      input.focus();
      await sendKeys({ type: 'Opt' });
      await waitForLitRender(autocomplete);

      expect(optionOneLabel).dom.to.be.equal(
        `
        <span>
          <span class="sbb-option__label--highlight"></span>
          <span>Opt</span>
          <span class="sbb-option__label--highlight">ion 1</span>
        </span>
      `,
        { ignoreAttributes: ['aria-hidden'] },
      );

      options[0].textContent = 'Other content';
      await waitForLitRender(autocomplete);

      expect(optionOneLabel).dom.to.be.equal(
        `
        <span>
          Other content
        </span>
      `,
        { ignoreAttributes: ['aria-hidden'] },
      );

      options[0].textContent = 'Option';
      await waitForLitRender(autocomplete);

      expect(optionOneLabel).dom.to.be.equal(
        `
        <span>
          <span class="sbb-option__label--highlight"></span>
          <span>Opt</span>
          <span class="sbb-option__label--highlight">ion</span>
        </span>
      `,
        { ignoreAttributes: ['aria-hidden'] },
      );
    });

    it('highlight later added options', async () => {
      const input = element.querySelector<HTMLInputElement>('input')!;
      const autocomplete = element.querySelector<SbbAutocompleteElement>('sbb-autocomplete')!;
      const options = element.querySelectorAll('sbb-option');
      const optionOneLabel = options[0].shadowRoot!.querySelector('.sbb-option__label > span');

      input.focus();
      await sendKeys({ type: 'Opt' });
      await waitForLitRender(autocomplete);

      expect(optionOneLabel).dom.to.be.equal(
        `
        <span>
          <span class="sbb-option__label--highlight"></span>
          <span>Opt</span>
          <span class="sbb-option__label--highlight">ion 1</span>
        </span>
      `,
        { ignoreAttributes: ['aria-hidden'] },
      );

      const newOption = document.createElement('sbb-option');
      newOption.innerText = 'Option 4';
      autocomplete.append(newOption);
      await waitForLitRender(autocomplete);

      const newOptionLabel = newOption.shadowRoot!.querySelector('.sbb-option__label > span');

      expect(newOptionLabel).dom.to.be.equal(
        `
        <span>
          <span class="sbb-option__label--highlight"></span>
          <span>Opt</span>
          <span class="sbb-option__label--highlight">ion 4</span>
        </span>
      `,
        { ignoreAttributes: ['aria-hidden'] },
      );
    });

    it('highlight changed text node', async () => {
      const input = element.querySelector<HTMLInputElement>('input')!;
      const autocomplete = element.querySelector<SbbAutocompleteElement>('sbb-autocomplete')!;
      const options = element.querySelectorAll('sbb-option');
      const optionOneLabel = options[0].shadowRoot!.querySelector('.sbb-option__label > span');

      input.focus();
      await sendKeys({ type: 'Opt' });
      await waitForLitRender(autocomplete);

      expect(optionOneLabel).dom.to.be.equal(
        `
        <span>
          <span class="sbb-option__label--highlight"></span>
          <span>Opt</span>
          <span class="sbb-option__label--highlight">ion 1</span>
        </span>
      `,
        { ignoreAttributes: ['aria-hidden'] },
      );

      const textNode = Array.from(element.querySelector('sbb-option')!.childNodes).find(
        (e) => e.nodeType === Node.TEXT_NODE,
      )!;
      textNode.textContent = 'Changed Option';
      await waitForLitRender(autocomplete);

      expect(optionOneLabel).dom.to.be.equal(
        `
        <span>
          <span class="sbb-option__label--highlight">Changed</span>
          <span>Opt</span>
          <span class="sbb-option__label--highlight">ion</span>
        </span>
      `,
        { ignoreAttributes: ['aria-hidden'] },
      );
    });

    it('highlight changed text node (from empty)', async () => {
      const input = element.querySelector<HTMLInputElement>('input')!;
      const autocomplete = element.querySelector<SbbAutocompleteElement>('sbb-autocomplete')!;
      const textNode = document.createTextNode('');
      const option4 = document.createElement('sbb-option');
      option4.appendChild(textNode);
      option4.value = 'value 4';
      autocomplete.appendChild(option4);
      await waitForLitRender(option4);
      const option4Label = option4.shadowRoot!.querySelector('.sbb-option__label > span');

      input.focus();
      await sendKeys({ type: 'Opt' });
      await waitForLitRender(autocomplete);

      expect(option4Label).dom.to.be.equal(`<span></span>`, { ignoreAttributes: ['aria-hidden'] });

      textNode.textContent = 'Changed Option';
      await waitForLitRender(autocomplete);

      expect(option4Label).dom.to.be.equal(
        `
          <span>
            <span class="sbb-option__label--highlight">Changed</span>
            <span>Opt</span>
            <span class="sbb-option__label--highlight">ion</span>
          </span>
        `,
        { ignoreAttributes: ['aria-hidden'] },
      );

      textNode.textContent = '';
      await waitForLitRender(autocomplete);

      expect(option4Label).dom.to.be.equal(
        `<span>
      </span>`,
        { ignoreAttributes: ['aria-hidden'] },
      );
    });

    it('highlight later added options in sbb-optgroup', async () => {
      element = await fixture(html`
        <sbb-form-field>
          <input />
          <sbb-autocomplete>
            <sbb-optgroup>
              <sbb-option id="option-1" value="1">Option 1</sbb-option>
            </sbb-optgroup>
          </sbb-autocomplete>
        </sbb-form-field>
      `);

      const input = element.querySelector<HTMLInputElement>('input')!;
      const optgroup = element.querySelector<SbbOptGroupElement>('sbb-optgroup')!;
      const options = element.querySelectorAll('sbb-option');
      const optionOneLabel = options[0].shadowRoot!.querySelector('.sbb-option__label > span');

      input.focus();
      await sendKeys({ type: 'Opt' });
      await waitForLitRender(element);

      expect(optionOneLabel).dom.to.be.equal(
        `
        <span>
          <span class="sbb-option__label--highlight"></span>
          <span>Opt</span>
          <span class="sbb-option__label--highlight">ion 1</span>
        </span>
      `,
        { ignoreAttributes: ['aria-hidden'] },
      );

      const newOption = document.createElement('sbb-option');
      newOption.innerText = 'Option 2';
      optgroup.append(newOption);
      await waitForLitRender(element);

      const newOptionLabel = newOption.shadowRoot!.querySelector('.sbb-option__label > span');

      expect(newOptionLabel).dom.to.be.equal(
        `
        <span>
          <span class="sbb-option__label--highlight"></span>
          <span>Opt</span>
          <span class="sbb-option__label--highlight">ion 2</span>
        </span>
      `,
        { ignoreAttributes: ['aria-hidden'] },
      );
    });
  });
});
