import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { elementInternalsSpy, fixture } from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';

import { SbbTagElement } from './tag.component.ts';
import '../../icon.ts';

describe(`sbb-tag`, () => {
  let element: SbbTagElement;
  const elementInternals = elementInternalsSpy();

  describe('general behavior', async () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-tag value="tag">Tag</sbb-tag>`);
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbTagElement);
    });

    it('should be checked after click', async () => {
      expect(element).not.to.have.attribute('checked');
      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      element.click();
      await waitForLitRender(element);

      expect(changeSpy.count).to.be.greaterThan(0);
      expect(inputSpy.count).to.be.greaterThan(0);
      expect(element.checked).to.be.equal(true);
      expect(elementInternals.get(element)!.ariaPressed).to.equal('true');
    });

    it('should not be checked after click when disabled', async () => {
      expect(element.checked).to.be.equal(false);
      element.toggleAttribute('disabled', true);
      await waitForLitRender(element);

      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      element.click();
      await waitForLitRender(element);

      expect(changeSpy.count).not.to.be.greaterThan(0);
      expect(inputSpy.count).not.to.be.greaterThan(0);
      expect(element?.checked).to.be.equal(false);
    });

    it('should be checked after "Space" keypress', async () => {
      expect(element.checked).to.be.equal(false);
      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      element.focus();
      await sendKeys({ press: 'Space' });

      await waitForLitRender(element);
      expect(changeSpy.count).to.be.greaterThan(0);
      expect(inputSpy.count).to.be.greaterThan(0);
      expect(element.checked).to.be.equal(true);
    });

    it('should be unchecked after "Space" keypress', async () => {
      element = await fixture(html`<sbb-tag value="tag" checked>Tag</sbb-tag>`);

      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      element.focus();
      await sendKeys({ press: 'Space' });

      await waitForLitRender(element);
      expect(changeSpy.count).to.be.greaterThan(0);
      expect(inputSpy.count).to.be.greaterThan(0);
      expect(element.checked).to.be.equal(false);
      expect(element).to.have.attribute('checked');
    });
  });

  describe('with complex value', () => {
    const value = { value: 'tag', label: 'Tag' };
    let form: HTMLFormElement;

    beforeEach(async () => {
      form = await fixture(html`
        <form>
          <sbb-tag name="tag1" .value=${value}>${value.label}</sbb-tag>
        </form>
      `);

      element = form.querySelector('sbb-tag')!;
    });

    it('should have nothing in form if unchecked', async () => {
      const formData = new FormData(form);
      expect(formData.get(element.name)).to.be.null;
    });

    it('should serialize complex value into form', async () => {
      element.click();
      await waitForLitRender(element);

      // Get the stored formData from the form
      const formData = new FormData(form);
      const data = formData.get('tag1');
      const v = data instanceof Blob ? JSON.parse(await data.text()) : data;

      expect(v).to.be.deep.equal(value);
    });

    it('should serialize and deserialize complex value', async () => {
      // Simulate navigating to other page and then back to form
      element.formStateRestoreCallback('true', 'restore');

      // Wait for the formStateRestoreCallback to finish
      await aTimeout(30);
      await waitForLitRender(form);

      expect(element.checked).to.be.true;
    });
  });
});
