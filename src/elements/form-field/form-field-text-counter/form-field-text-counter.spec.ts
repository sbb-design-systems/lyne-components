import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import { type SinonStub, stub } from 'sinon';

import { sbbLiveAnnouncer } from '../../core/a11y.ts';
import { elementInternalsSpy, fixture } from '../../core/testing/private.ts';
import { waitForCondition, waitForLitRender } from '../../core/testing.ts';

import { SbbFormFieldTextCounterElement } from './form-field-text-counter.component.ts';

import '../../form-field.ts';

describe(`sbb-form-field-text-counter`, () => {
  let element: SbbFormFieldTextCounterElement;
  let formField: HTMLElement;
  const elementInternals = elementInternalsSpy();

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
          <sbb-form-field-text-counter></sbb-form-field-text-counter>
        </sbb-form-field>
      `);
      element = formField.querySelector('sbb-form-field-text-counter')!;
      textarea = formField.querySelector('textarea')!;
    });

    it('renders', () => {
      assert.instanceOf(element, SbbFormFieldTextCounterElement);
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
          <sbb-form-field-text-counter></sbb-form-field-text-counter>
        </sbb-form-field>
      `);
      element = formField.querySelector('sbb-form-field-text-counter')!;
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

  describe('live announcer', () => {
    let textarea: HTMLTextAreaElement;
    let announceStub: SinonStub;

    beforeEach(async () => {
      announceStub = stub(sbbLiveAnnouncer, 'announce').returns(Promise.resolve());
      formField = await fixture(html`
        <sbb-form-field>
          <label>Description</label>
          <textarea maxlength="100"></textarea>
          <sbb-form-field-text-counter></sbb-form-field-text-counter>
        </sbb-form-field>
      `);
      element = formField.querySelector('sbb-form-field-text-counter')!;
      textarea = formField.querySelector('textarea')!;
    });

    afterEach(() => {
      announceStub.restore();
    });

    it('should set the remaining characters on focus as aria-label', async () => {
      textarea.focus();

      expect(elementInternals.get(element)!.ariaLabel).to.be.equal('100 characters remaining');

      await sendKeys({ type: 'v' });
      expect(elementInternals.get(element)!.ariaLabel).to.be.equal('100 characters remaining');

      textarea.blur();
      textarea.focus();
      expect(elementInternals.get(element)!.ariaLabel).to.be.equal('99 characters remaining');
    });

    it('should announce when 100% of characters remain (initial load)', async () => {
      // maxlength=100, 100 chars remaining = 100% threshold
      await waitForCondition(() => announceStub.called);
      expect(announceStub.calledOnce).to.be.true;
      expect(announceStub.firstCall.args[0]).to.include('100');
    });

    it('should announce when 50% of characters remain', async () => {
      // Wait for the initial 100% announcement first
      await waitForCondition(() => announceStub.called);
      announceStub.resetHistory();

      // Type 50 chars to reach 50% threshold (50 remaining out of 100)
      textarea.focus();
      await sendKeys({ type: 'a'.repeat(50) });
      await waitForCondition(() => announceStub.called);

      expect(announceStub.lastCall.args[0]).to.include('50');
    });

    it('should announce when 25% of characters remain', async () => {
      // Wait for the initial 100% announcement first
      await waitForCondition(() => announceStub.called);
      announceStub.resetHistory();

      // Set value directly to 75 chars so only the 25% threshold is crossed
      textarea.focus();
      await sendKeys({ type: 'a'.repeat(75) });
      await waitForCondition(() => announceStub.called);

      expect(announceStub.lastCall.args[0]).to.include('25');
    });

    it('should announce when 10% of characters remain', async () => {
      // Wait for the initial 100% announcement first
      await waitForCondition(() => announceStub.called);
      announceStub.resetHistory();

      // Set value directly to 90 chars so only the 10% threshold is crossed
      textarea.focus();
      await sendKeys({ type: 'a'.repeat(90) });
      await waitForCondition(() => announceStub.called);

      expect(announceStub.lastCall.args[0]).to.include('10');
    });

    it('should announce when 0% of characters remain', async () => {
      // Wait for the initial 100% announcement first
      await waitForCondition(() => announceStub.called);
      announceStub.resetHistory();

      // Set value directly to 100 chars so only the 0% threshold is crossed
      textarea.focus();
      await sendKeys({ type: 'a'.repeat(100) });
      await waitForCondition(() => announceStub.called);
      expect(announceStub.lastCall.args[0]).to.match(/^0 /);
    });

    it('should NOT announce when character count is not at a threshold', async () => {
      announceStub.reset();
      textarea.focus();
      await sendKeys({ type: 'a'.repeat(30) });
      await aTimeout(30);

      expect(announceStub.called).to.be.false;
    });

    it('should announce with current language', async () => {
      const originalLang = document.documentElement.lang;
      document.documentElement.lang = 'en';
      await waitForLitRender(element);

      await waitForCondition(() => announceStub.called);
      announceStub.resetHistory();

      textarea.focus();
      await sendKeys({ type: 'a'.repeat(50) });
      await waitForCondition(() => announceStub.called);

      expect(announceStub.firstCall.args[0]).to.equal('50 characters remaining');

      document.documentElement.lang = originalLang;
    });

    it('should announce with german language', async () => {
      const originalLang = document.documentElement.lang;
      document.documentElement.lang = 'de';
      await waitForLitRender(element);

      await waitForCondition(() => announceStub.called);
      announceStub.resetHistory();

      textarea.focus();
      await sendKeys({ type: 'a'.repeat(50) });
      await waitForCondition(() => announceStub.called);

      expect(announceStub.firstCall.args[0]).to.equal('50 Zeichen übrig');

      document.documentElement.lang = originalLang;
    });
  });
});
