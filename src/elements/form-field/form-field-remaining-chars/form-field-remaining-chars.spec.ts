import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';

import { SbbFormFieldRemainingCharsElement } from './form-field-remaining-chars.component.ts';

import '../form-field/form-field.component.ts';

describe(`sbb-form-field-remaining-chars`, () => {
  let element: SbbFormFieldRemainingCharsElement;
  let formField: HTMLElement;

  const currentValue = (): string => {
    return element.shadowRoot?.textContent?.trim() ?? '';
  };

  describe('with textarea', () => {
    let textarea: HTMLTextAreaElement;

    beforeEach(async () => {
      formField = await fixture(html`
        <sbb-form-field>
          <label>Description</label>
          <textarea maxlength="100"></textarea>
          <sbb-form-field-remaining-chars></sbb-form-field-remaining-chars>
        </sbb-form-field>
      `);
      element = formField.querySelector('sbb-form-field-remaining-chars')!;
      textarea = formField.querySelector('textarea')!;
    });

    it('renders', () => {
      assert.instanceOf(element, SbbFormFieldRemainingCharsElement);
    });

    it('should display initial remaining characters', () => {
      expect(currentValue()).to.include('100');
    });

    it('should update remaining characters on input', async () => {
      textarea.focus();
      await sendKeys({ type: 'Hello' });
      await waitForLitRender(element);

      expect(currentValue()).to.include('95'); // 100 - 5
    });

    it('should not display when textarea is disabled', async () => {
      textarea.disabled = true;
      await waitForLitRender(element);

      expect(element).not.to.be.displayed;
    });

    it('should not display when textarea is readonly', async () => {
      textarea.readOnly = true;
      await waitForLitRender(element);

      expect(element).not.to.be.displayed;
    });

    it('should handle language changes', async () => {
      const originalLang = document.documentElement.lang;
      document.documentElement.lang = 'en';
      await waitForLitRender(element);

      expect(currentValue()).to.include('characters remaining');

      document.documentElement.lang = 'de';
      await waitForLitRender(element);

      expect(currentValue()).to.include('Zeichen übrig');

      document.documentElement.lang = originalLang;
    });

    it('should update when maxlength changes', async () => {
      textarea.maxLength = 50;
      await waitForLitRender(element);

      expect(currentValue()).to.include('50');
    });

    it('should handle textarea value changes programmatically', async () => {
      textarea.value = 'Test input';
      await waitForLitRender(element);

      expect(currentValue()).to.include('90'); // 100 - 10
    });
  });

  describe('with input', () => {
    let input: HTMLInputElement;

    beforeEach(async () => {
      formField = await fixture(html`
        <sbb-form-field>
          <label>Username</label>
          <input maxlength="20" />
          <sbb-form-field-remaining-chars></sbb-form-field-remaining-chars>
        </sbb-form-field>
      `);
      element = formField.querySelector('sbb-form-field-remaining-chars')!;
      input = formField.querySelector('input')!;
    });

    it('should display initial remaining characters', () => {
      expect(currentValue()).to.include('20');
    });

    it('should update remaining characters on input change', async () => {
      input.focus();
      await sendKeys({ type: 'user' });
      await waitForLitRender(element);

      expect(currentValue()).to.include('16');
    });

    it('should handle value changes programmatically', async () => {
      input.value = 'Test input';
      await waitForLitRender(element);

      expect(currentValue()).to.include('10');
    });
  });
});
