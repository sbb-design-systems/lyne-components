import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';
import type { SbbToggleOptionElement } from '../toggle-option.ts';

import { SbbToggleElement } from './toggle.component.ts';

import '../toggle-option.ts';

describe(`sbb-toggle`, () => {
  let element: SbbToggleElement,
    firstOption: SbbToggleOptionElement,
    secondOption: SbbToggleOptionElement;

  function assertPillLeft(): void {
    expect(
      parseInt(window.getComputedStyle(element).getPropertyValue('--sbb-toggle-option-left'), 10),
    ).to.be.equal(0);
    expect(
      parseInt(window.getComputedStyle(element).getPropertyValue('--sbb-toggle-option-right'), 10),
    ).to.be.greaterThan(0);
  }

  function assertPillRight(): void {
    expect(
      parseInt(window.getComputedStyle(element).getPropertyValue('--sbb-toggle-option-left'), 10),
    ).to.be.greaterThan(0);
    expect(
      parseInt(window.getComputedStyle(element).getPropertyValue('--sbb-toggle-option-right'), 10),
    ).to.be.equal(0);
  }

  describe('basics', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-toggle>
          <sbb-toggle-option id="sbb-toggle-option-1" value="Value one"
            >Value one</sbb-toggle-option
          >
          <sbb-toggle-option id="sbb-toggle-option-2" value="Value two"
            >Value two</sbb-toggle-option
          >
        </sbb-toggle>
      `);
      firstOption = element.querySelector<SbbToggleOptionElement>('#sbb-toggle-option-1')!;
      secondOption = element.querySelector<SbbToggleOptionElement>('#sbb-toggle-option-2')!;
    });

    it('renders', () => {
      assert.instanceOf(element, SbbToggleElement);
    });

    describe('value', () => {
      it('should select the correct option by setting value via attribute', async () => {
        element = await fixture(html`
          <sbb-toggle value="Value two">
            <sbb-toggle-option value="Value one">Value one</sbb-toggle-option>
            <sbb-toggle-option value="Value two">Value two</sbb-toggle-option>
          </sbb-toggle>
        `);
        secondOption = element.querySelectorAll('sbb-toggle-option')[1];
        expect(secondOption).to.have.attribute('checked');

        assertPillRight();
      });

      it('should select the correct option by setting value programmatically', async () => {
        element.value = 'Value two';
        await waitForLitRender(element);

        expect(firstOption).not.to.have.attribute('checked');
        expect(secondOption).to.have.attribute('checked');
        assertPillRight();
      });

      it('should update the value of the sbb-toggle when the value of a checked option changes', async () => {
        firstOption.value = 'Changed';
        await waitForLitRender(element);

        expect(element.value).to.be.equal(firstOption.value);
        assertPillLeft();
      });

      it('should not update the value of the sbb-toggle when the value of a unchecked option changes', async () => {
        secondOption.value = 'Changed';
        await waitForLitRender(element);

        expect(element.value).not.to.be.equal(secondOption.value);
      });
    });

    describe('checked', () => {
      it('should initially have the checked attributes on the first option by default', async () => {
        expect(firstOption).to.have.attribute('checked');
        assertPillLeft();
      });

      it('should initially have the checked property set to true on the first option by default', async () => {
        expect(firstOption.checked).to.be.equal(true);
        assertPillLeft();
      });

      it('should select the correct option by setting checked on the option', async () => {
        secondOption.checked = true;
        await waitForLitRender(secondOption);

        expect(secondOption).to.have.attribute('checked');
        expect(firstOption).not.to.have.attribute('checked');
        assertPillRight();
      });

      it('should select the correct option by setting the checked attribute on the option', async () => {
        element = await fixture(html`
          <sbb-toggle>
            <sbb-toggle-option value="Value one">Value one</sbb-toggle-option>
            <sbb-toggle-option value="Value two" checked>Value two</sbb-toggle-option>
          </sbb-toggle>
        `);
        secondOption = element.querySelectorAll('sbb-toggle-option')[1];

        expect(secondOption.checked).to.be.equal(true);
        assertPillRight();
      });

      it('should check first option when unchecking all options', async () => {
        firstOption.setAttribute('checked', 'false');
        await waitForLitRender(firstOption);

        expect(firstOption.checked).to.be.equal(true);
        assertPillLeft();
      });
    });

    describe('disabled', () => {
      it('should sync disabled state with options', async () => {
        element = await fixture(html`
          <sbb-toggle disabled>
            <sbb-toggle-option value="Value one">Value one</sbb-toggle-option>
            <sbb-toggle-option value="Value two">Value two</sbb-toggle-option>
          </sbb-toggle>
        `);
        const options = Array.from(element.querySelectorAll('sbb-toggle-option'));

        expect(element).to.match(':disabled');
        options.forEach((option) => expect(option).to.have.attribute('disabled'));
      });
    });
  });

  describe('events', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-toggle value="Value one">
          <sbb-toggle-option id="sbb-toggle-option-1" value="Value one">
            Value one
          </sbb-toggle-option>
          <sbb-toggle-option id="sbb-toggle-option-2" value="Value two">
            Value two
          </sbb-toggle-option>
        </sbb-toggle>
      `);
      firstOption = element.querySelector<SbbToggleOptionElement>('#sbb-toggle-option-1')!;
      secondOption = element.querySelector<SbbToggleOptionElement>('#sbb-toggle-option-2')!;
    });

    it('selects option on click', async () => {
      expect(firstOption).to.have.attribute('checked');
      assertPillLeft();

      secondOption.click();
      await waitForLitRender(secondOption);

      expect(secondOption).to.have.attribute('checked');
      expect(firstOption).not.to.have.attribute('checked');
      assertPillRight();
    });

    it('selects option on checked attribute change', async () => {
      expect(firstOption).to.have.attribute('checked');
      assertPillLeft();

      secondOption.toggleAttribute('checked', true);
      await waitForLitRender(element);

      expect(secondOption).to.have.attribute('checked');
      expect(firstOption).not.to.have.attribute('checked');
      assertPillRight();
    });

    it('selects option on checked property change', async () => {
      expect(firstOption.checked).to.equal(true);
      assertPillLeft();

      secondOption.checked = true;
      await waitForLitRender(element);

      expect(firstOption.checked).to.equal(false);
      expect(secondOption.checked).to.equal(true);
      assertPillRight();
    });

    it('dispatches event on option change', async () => {
      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      let valueInEvent;

      // Checking value in events of EventSpy is too late to check the real use case,
      // therefore we create a once-EventListener manually here.
      element.addEventListener(
        'change',
        (event) => (valueInEvent = (event.target as SbbToggleElement).value),
        { once: true },
      );

      secondOption.click();
      await waitForLitRender(firstOption);
      await changeSpy.calledOnce();
      await inputSpy.calledOnce();
      expect(valueInEvent).to.equal('Value two');

      // Checking value in events of EventSpy is too late to check the real use case,
      // therefore we create a once-EventListener manually here.
      element.addEventListener(
        'change',
        (event) => (valueInEvent = (event.target as SbbToggleElement).value),
        { once: true },
      );

      firstOption.click();
      await waitForLitRender(firstOption);
      await changeSpy.calledTimes(2);
      await inputSpy.calledTimes(2);

      expect(firstOption).to.have.attribute('checked');
      expect(valueInEvent).to.equal('Value one');
    });

    it('prevents selection with disabled state', async () => {
      element.disabled = true;
      await waitForLitRender(element);

      await secondOption.click();
      await waitForLitRender(element);
      expect(secondOption).not.to.have.attribute('checked');
      expect(firstOption).to.have.attribute('checked');

      element.disabled = false;
      await waitForLitRender(element);

      await secondOption.click();
      await waitForLitRender(element);
      expect(secondOption).to.have.attribute('checked');
      expect(firstOption).not.to.have.attribute('checked');
    });

    it('selects option on left arrow key pressed', async () => {
      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      firstOption.focus();
      await sendKeys({ press: 'ArrowLeft' });
      await waitForLitRender(element);

      expect(secondOption).to.have.attribute('checked');
      await changeSpy.calledOnce();
      await inputSpy.calledOnce();

      firstOption.click();
      await waitForLitRender(firstOption);

      expect(firstOption).to.have.attribute('checked');
    });

    it('selects option on right arrow key pressed', async () => {
      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      firstOption.focus();
      await waitForLitRender(firstOption);
      await sendKeys({ press: 'ArrowRight' });
      await waitForLitRender(element);

      expect(secondOption).to.have.attribute('checked');
      await changeSpy.calledOnce();
      await inputSpy.calledOnce();

      firstOption.click();
      await waitForLitRender(firstOption);

      expect(firstOption).to.have.attribute('checked');
    });

    it('selects option on Space key pressed', async () => {
      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      firstOption.focus();
      await waitForLitRender(firstOption);
      await sendKeys({ press: ' ' });
      await waitForLitRender(element);

      expect(secondOption).to.have.attribute('checked');
      await changeSpy.calledOnce();
      await inputSpy.calledOnce();

      await sendKeys({ press: ' ' });
      await waitForLitRender(firstOption);

      expect(firstOption).to.have.attribute('checked');
    });
  });

  describe('form association', () => {
    let form: HTMLFormElement;
    let fieldSet: HTMLFieldSetElement;

    beforeEach(async () => {
      form = await fixture(html`
        <form>
          <fieldset>
            <sbb-toggle name="sbb-toggle-1" value="Value one">
              <sbb-toggle-option id="sbb-toggle-option-1" value="Value one"
                >Value one</sbb-toggle-option
              >
              <sbb-toggle-option id="sbb-toggle-option-2" value="Value two"
                >Value two</sbb-toggle-option
              >
            </sbb-toggle>
          </fieldset>
        </form>
      `);
      element = form.querySelector('sbb-toggle')!;
      firstOption = element.querySelector<SbbToggleOptionElement>('#sbb-toggle-option-1')!;
      secondOption = element.querySelector<SbbToggleOptionElement>('#sbb-toggle-option-2')!;
      fieldSet = form.querySelector('fieldset')!;
      await waitForLitRender(element);
    });

    it('should update formValue', async () => {
      let formData = new FormData(form);
      expect(element.value).to.be.equal('Value one');
      expect(formData.get('sbb-toggle-1')).to.be.equal('Value one');

      secondOption.click();
      await waitForLitRender(element);
      formData = new FormData(form);

      expect(element.value).to.be.equal('Value two');
      expect(formData.get('sbb-toggle-1')).to.be.equal('Value two');
    });

    it('should result :disabled if a fieldSet is', async () => {
      fieldSet.disabled = true;
      await waitForLitRender(form);

      expect(element).to.match(':disabled');

      fieldSet.disabled = false;
      await waitForLitRender(element);

      expect(element).not.to.match(':disabled');
    });

    it('should reset on form reset', async () => {
      secondOption.click();
      await waitForLitRender(element);

      expect(element.value).to.be.equal('Value two');

      form.reset();
      await waitForLitRender(element);

      expect(element.value).to.be.equal('Value one');
    });

    it('should restore form state on formStateRestoreCallback()', async () => {
      // Mimic tab restoration. Does not test the full cycle as we can not set the browser in the required state.
      element.formStateRestoreCallback('Value two', 'restore');
      await waitForLitRender(element);

      expect(element.value).to.be.equal('Value two');
    });
  });

  describe('with complex value', () => {
    let form: HTMLFormElement;

    const value1 = { value: 'Value one', label: 'test 1' };
    const value2 = { value: 'Value two', label: 'test 2' };

    beforeEach(async () => {
      form = await fixture(html`
        <form>
          <sbb-toggle name="sbb-toggle-1" .value=${value2}>
            <sbb-toggle-option id="sbb-toggle-option-1" .value=${value1}
              >${value1.label}</sbb-toggle-option
            >
            <sbb-toggle-option id="sbb-toggle-option-2" .value=${value2}
              >${value2.label}</sbb-toggle-option
            >
          </sbb-toggle>
        </form>
      `);
      element = form.querySelector('sbb-toggle')!;
      firstOption = element.querySelector<SbbToggleOptionElement>('#sbb-toggle-option-1')!;
      secondOption = element.querySelector<SbbToggleOptionElement>('#sbb-toggle-option-2')!;
      await waitForLitRender(element);
    });

    it('should init with value', async () => {
      expect(firstOption).not.to.have.attribute('checked');
      expect(secondOption).to.have.attribute('checked');
      assertPillRight();

      expect(element.value).to.be.deep.equal(value2);
    });

    it('should update value on click', async () => {
      firstOption.click();
      await waitForLitRender(element);

      expect(element.value).to.be.deep.equal(value1);
      expect(firstOption).to.have.attribute('checked');
      expect(secondOption).not.to.have.attribute('checked');
      assertPillLeft();
    });

    it('should serialize and deserialize complex value', async () => {
      // TODO: Deserialization needs the compareValue function to work properly, for now we use 'numbers' as complex value.
      firstOption.value = 1 as any;
      secondOption.value = 2 as any;
      await waitForLitRender(element);

      // Get the stored formData from the form
      const formData = new FormData(form);

      form.reset();
      await waitForLitRender(element);

      // Simulate navigating to other page and then back to form
      element.formStateRestoreCallback(formData, 'restore');

      // Wait for the formStateRestoreCallback to finish
      await aTimeout(30);
      await waitForLitRender(element);

      expect(element.value).to.be.deep.equal(2); // // Should be 'expect(element.value).to.be.deep.equal(value2)'
      expect(secondOption).to.have.attribute('checked');
      assertPillRight();
    });
  });
});
