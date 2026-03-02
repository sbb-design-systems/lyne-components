import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbAutocompleteElement } from '../../autocomplete/autocomplete.component.ts';
import { fixture, tabKey } from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';
import type { SbbFormFieldElement } from '../../form-field.ts';
import type { SbbOptionElement } from '../../option.ts';
import type { SbbChipElement } from '../chip.ts';

import {
  SbbChipGroupElement,
  type SbbChipInputTokenEndEventDetails,
} from './chip-group.component.ts';

import '../chip.ts';
import '../../autocomplete.ts';
import '../../form-field.ts';
import '../../option.ts';

describe('sbb-chip-group', () => {
  let element: SbbChipGroupElement;
  let chips: SbbChipElement[];
  let formField: SbbFormFieldElement;
  let input: HTMLInputElement;
  let focusStep: HTMLInputElement;

  describe('basic interactions', () => {
    beforeEach(async () => {
      const root = await fixture(
        html`<div>
          <a href="#" id="focusable">Focus step</a>
          <sbb-form-field>
            <label>Label</label>
            <sbb-chip-group name="chip-group-1">
              <sbb-chip value="chip 1"></sbb-chip>
              <sbb-chip value="chip 2"></sbb-chip>
              <sbb-chip value="chip 3"></sbb-chip>
              <input placeholder="Placeholder" />
            </sbb-chip-group>
          </sbb-form-field>
        </div>`,
      );
      element = root.querySelector('sbb-chip-group')!;
      chips = Array.from(element.querySelectorAll('sbb-chip'));
      formField = root.querySelector('sbb-form-field')!;
      input = root.querySelector('input')!;
      focusStep = root.querySelector('#focusable')!;
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbChipGroupElement);
      expect(input).to.have.attribute('aria-description', 'Selected elements: 3');
    });

    it('should add chip on enter', async () => {
      input.focus();
      await sendKeys({ type: 'chip 4' });
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(element);

      const addedChip = Array.from(element.querySelectorAll('sbb-chip')).at(-1)!;
      expect(addedChip.value).to.be.equal('chip 4');
      expect(element.value).to.include('chip 4');
      expect(input.value).to.be.empty; // The input should be emptied

      // If the input is empty, it does not create a chip
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(element);

      expect(element.querySelectorAll('sbb-chip').length).to.be.equal(4);
    });

    it('should customize new chip value and label', async () => {
      element.addEventListener(SbbChipGroupElement.events.chipinputtokenend, (ev: Event) => {
        const detail = (ev as CustomEvent<SbbChipInputTokenEndEventDetails>).detail;

        expect(detail.origin).to.be.equal('input');
        expect(detail.value).to.be.equal('chip 4');

        detail.setValue('chip 5');
        detail.setLabel('chip Custom');
      });

      input.focus();
      await sendKeys({ type: 'chip 4' });
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(element);

      const addedChip = Array.from(element.querySelectorAll('sbb-chip')).at(-1)!;
      expect(addedChip.value).to.be.equal('chip 5');
      expect(addedChip.innerText).to.be.equal('chip Custom');
      expect(element.value).to.include('chip 5');
      expect(input.value).to.be.empty; // The input should be emptied
    });

    it('should prevent chip creation', async () => {
      element.addEventListener(SbbChipGroupElement.events.chipinputtokenend, (ev: Event) =>
        ev.preventDefault(),
      );

      input.focus();
      await sendKeys({ type: 'chip 4' });
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(element);

      expect(element.value).not.to.include('chip 4');
    });

    it('should delete chip on delete button click', async () => {
      const toDelete = chips[0];
      const toDeleteValue = toDelete.value;
      const inputEventSpy = new EventSpy(SbbChipGroupElement.events.input, element);
      const changeEventSpy = new EventSpy(SbbChipGroupElement.events.change, element);

      // Click the delete button
      (toDelete.shadowRoot!.querySelector('.sbb-chip__delete') as HTMLElement).click();
      await waitForLitRender(element);

      // Expect the chip label to be removed
      expect(element.value).not.to.include(toDeleteValue);
      expect(
        Array.from(element.querySelectorAll(`sbb-chip`)).every((c) => c.value !== toDeleteValue),
      ).to.be.true;
      expect(inputEventSpy.count).to.be.equal(1);
      expect(changeEventSpy.count).to.be.equal(1);

      // Except the new last chip to be focused
      expect((document.activeElement as SbbChipElement).value).to.be.equal(chips[1]!.value);
    });

    it('should react when input is disabled', async () => {
      input.disabled = true;
      await waitForLitRender(formField);

      expect(element.disabled).to.be.true;
      expect(chips.every((c) => c.disabled)).to.be.true;

      input.disabled = false;
      await waitForLitRender(formField);

      expect(element.disabled).to.be.false;
      expect(chips.every((c) => c.disabled)).to.be.false;
    });

    it('should react when input is readonly', async () => {
      input.toggleAttribute('readonly', true);
      await waitForLitRender(formField);

      expect(chips.every((c) => c.readOnly)).to.be.true;

      input.toggleAttribute('readonly', false);
      await waitForLitRender(formField);

      expect(chips.every((c) => c.readOnly)).to.be.false;
    });

    it('should handle different separator keys', async () => {
      const tokenEndEventSpy = new EventSpy(SbbChipGroupElement.events.chipinputtokenend, element);
      element.separatorKeys = [',', '.'];

      input.focus();
      await sendKeys({ type: 'chip 4, chip 5.' });
      await waitForLitRender(element);

      expect(element.value).to.include('chip 4');
      expect(element.value).to.include('chip 5');
      expect(tokenEndEventSpy.count).to.be.equal(2);
      expect(input.value).to.be.empty; // The input should be emptied

      await sendKeys({ type: 'chip 6' });
      await sendKeys({ press: 'Enter' }); // Does nothing on 'Enter'
      await waitForLitRender(element);

      expect(element.value).not.to.include('chip 6');
      expect(tokenEndEventSpy.count).to.be.equal(2);
      expect(input.value).not.to.be.empty; // The input should be emptied
    });

    it('should add chip on blur when addOnBlur is true', async () => {
      element.addOnBlur = true;
      const changeEventSpy = new EventSpy(SbbChipGroupElement.events.change, element);

      input.focus();
      await sendKeys({ type: 'chip 4' });
      await waitForLitRender(element);

      // Blur the input
      input.blur();
      await waitForLitRender(element);

      const addedChip = Array.from(element.querySelectorAll('sbb-chip')).at(-1)!;
      expect(addedChip.value).to.be.equal('chip 4');
      expect(element.value).to.include('chip 4');
      expect(input.value).to.be.empty; // The input should be emptied

      // We expect 2 change events: one of the input, and one of the chip group when the chips are added
      expect(changeEventSpy.count).to.be.equal(2);
    });

    it('should not add chip on blur when addOnBlur is false', async () => {
      element.addOnBlur = false;
      const changeEventSpy = new EventSpy(SbbChipGroupElement.events.change, element);

      input.focus();
      await sendKeys({ type: 'chip 4' });
      await waitForLitRender(element);

      // Blur the input
      input.blur();
      await waitForLitRender(element);

      expect(element.value).not.to.include('chip 4');
      expect(input.value).to.be.equal('chip 4'); // Input should retain value

      // We expect only 1 change event from typing in the input, and none from blurring (since addOnBlur is false)
      expect(changeEventSpy.count).to.be.equal(1);
    });

    it('should not add empty chip on blur when addOnBlur is true', async () => {
      element.addOnBlur = true;
      const inputEventSpy = new EventSpy(SbbChipGroupElement.events.input, element);
      const changeEventSpy = new EventSpy(SbbChipGroupElement.events.change, element);

      input.focus();
      await waitForLitRender(element);

      // Blur the input without typing
      input.blur();
      await waitForLitRender(element);

      expect(element.querySelectorAll('sbb-chip').length).to.be.equal(3); // No new chip added
      expect(inputEventSpy.count).to.be.equal(0);
      expect(changeEventSpy.count).to.be.equal(0);
    });

    it('should inherit size from form-field', async () => {
      expect(element).to.match(':state(size-m)');

      formField.size = 's';
      await waitForLitRender(formField);

      expect(element).to.match(':state(size-s)');
    });

    /** Verify whether the sync between slotted chip and the value works properly **/
    describe('slotted chips sync', () => {
      it('should sync slotted chips when setting value', async () => {
        // Add a chip ('chip 4')
        let newValue = ['chip 1', 'chip 2', 'chip 3', 'chip 4'];
        element.value = newValue;
        await waitForLitRender(element);

        let slottedChipsValue = Array.from(element.querySelectorAll('sbb-chip')).map(
          (c) => c.value,
        );
        expect(slottedChipsValue).to.be.eql(newValue);

        // Remove a chip ('chip 3')
        newValue = ['chip 1', 'chip 2', 'chip 4'];
        element.value = newValue;
        await waitForLitRender(element);

        slottedChipsValue = Array.from(element.querySelectorAll('sbb-chip')).map((c) => c.value);
        expect(slottedChipsValue).to.be.eql(newValue);

        // Add and remove chips
        newValue = ['chip 1', 'chip 2', 'chip 5'];
        element.value = newValue;
        await waitForLitRender(element);

        slottedChipsValue = Array.from(element.querySelectorAll('sbb-chip')).map((c) => c.value);
        expect(slottedChipsValue).to.be.eql(newValue);

        // Empty value
        element.value = null;
        await waitForLitRender(element);
        expect(element.querySelectorAll('sbb-chip').length).to.be.equal(0);
      });

      it('should sync value when slotting chips', async () => {
        // Create and slot a new chip
        const newChip = document.createElement('sbb-chip');
        newChip.setAttribute('value', 'chip 4');
        element.insertBefore(newChip, input);

        await waitForLitRender(element);

        expect(element.value).to.be.eql(['chip 1', 'chip 2', 'chip 3', 'chip 4']);
      });
    });

    describe('keyboard interactions', () => {
      it('should handle tab-order', async () => {
        focusStep.focus();

        await sendKeys({ press: tabKey });

        // Should skip the chips and focus the input
        expect(document.activeElement!.localName).to.be.equal('input');

        await sendKeys({ down: 'Shift' });
        await sendKeys({ press: tabKey });
        await sendKeys({ up: 'Shift' });

        // Should skip the chips and focus the previous element
        expect(document.activeElement!.localName).to.be.equal(focusStep.localName);
      });

      it('should remove chip on delete key', async () => {
        input.focus();
        await sendKeys({ type: 'a' });
        await sendKeys({ press: 'Backspace' });

        // If the input is not empty, it should not move the focus to the chip
        expect(document.activeElement!.localName).to.be.equal('input');

        await sendKeys({ press: 'Backspace' });

        // Should focus the last enabled chip
        expect(document.activeElement!.localName).to.be.equal('sbb-chip');
        expect((document.activeElement as SbbChipElement).value).to.be.equal(chips.at(-1)!.value);

        input.focus();
        await sendKeys({ press: 'ArrowLeft' });

        // Should focus the last enabled chip
        expect(document.activeElement!.localName).to.be.equal('sbb-chip');
        expect((document.activeElement as SbbChipElement).value).to.be.equal(chips.at(-1)!.value);

        const focusedChipValue = (document.activeElement as SbbChipElement).value;
        await sendKeys({ press: 'Backspace' });
        await waitForLitRender(element);

        // Should remove the focused chip and focus the last one
        expect(element.value).not.to.contain(focusedChipValue);
        expect(document.activeElement!.localName).to.be.equal('sbb-chip');
        expect((document.activeElement as SbbChipElement).value).to.be.equal(chips.at(-2)!.value);

        // Deletes the two remaining chips
        await sendKeys({ press: 'Backspace' });
        await sendKeys({ press: 'Delete' });
        await waitForLitRender(element);

        // Expect the input to be focused
        expect(document.activeElement!.localName).to.be.equal('input');
      });

      it('should prevent delete on readonly chip', async () => {
        chips.at(-1)!.readOnly = true;
        input.focus();

        await sendKeys({ press: 'Backspace' });

        // Should focus the last enabled chip (even if readonly)
        expect(document.activeElement!.localName).to.be.equal('sbb-chip');
        expect((document.activeElement as SbbChipElement).value).to.be.equal(chips.at(-1)!.value);
        const focusedChipValue = (document.activeElement as SbbChipElement).value;

        // Should remove the focused chip
        await sendKeys({ press: 'Backspace' });
        await waitForLitRender(element);

        expect(element.value).to.contain(focusedChipValue);
      });

      it('should handle arrow navigation', async () => {
        chips[1].disabled = true;
        chips[2].readOnly = true;
        await waitForLitRender(element);

        chips[0].focus();

        await sendKeys({ press: 'ArrowRight' });

        // Should skip the disabled chip and focus the last one
        expect((document.activeElement as SbbChipElement).value).to.be.equal(chips[2].value);

        await sendKeys({ press: 'ArrowDown' });

        // Should wrap and go back to the first chip
        expect((document.activeElement as SbbChipElement).value).to.be.equal(chips[0].value);

        await sendKeys({ press: 'ArrowLeft' });
        expect((document.activeElement as SbbChipElement).value).to.be.equal(chips[2].value);

        await sendKeys({ press: 'ArrowUp' });
        expect((document.activeElement as SbbChipElement).value).to.be.equal(chips[0].value);
      });
    });
  });

  describe('within form', () => {
    let form: HTMLFormElement;
    let fieldset: HTMLFieldSetElement;

    beforeEach(async () => {
      form = await fixture(html`
        <form>
          <fieldset>
            <sbb-form-field>
              <label>Label</label>
              <sbb-chip-group name="chip-group-1">
                <sbb-chip value="chip 1"></sbb-chip>
                <sbb-chip value="chip 2"></sbb-chip>
                <sbb-chip value="chip 3"></sbb-chip>
                <input placeholder="Placeholder" />
              </sbb-chip-group>
            </sbb-form-field>
          </fieldset>
        </form>
      `);
      element = form.querySelector('sbb-chip-group')!;
      chips = Array.from(element.querySelectorAll('sbb-chip'));
      formField = form.querySelector('sbb-form-field')!;
      input = form.querySelector('input')!;
      fieldset = form.querySelector('fieldset')!;
    });

    it('should update form value', async () => {
      let formData = new FormData(form);

      expect(formData.getAll('chip-group-1')).to.be.eql(element.value);
      input.focus();
      await sendKeys({ type: 'chip-4' });
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(formField);

      formData = new FormData(form);
      expect(formData.getAll('chip-group-1')).to.be.eql(element.value);

      chips[0].remove();
      await waitForLitRender(formField);

      formData = new FormData(form);
      expect(formData.getAll('chip-group-1')).to.be.eql(element.value);
    });

    it('should react when fieldset is disabled', async () => {
      fieldset.disabled = true;
      await waitForLitRender(formField);

      const formData = new FormData(form);

      expect(element).to.match(':disabled');
      expect(formData.getAll('chip-group-1')).to.be.eql([]);
    });

    describe('required behavior', () => {
      it('should update validity with required true', async () => {
        element.value = null;
        expect(element.validationMessage).to.equal('');
        expect(element.validity.valueMissing).to.be.false;
        expect(element).to.match(':valid');
        expect(element).not.to.match(':invalid');

        element.toggleAttribute('required', true);
        await waitForLitRender(element);

        expect(element.validationMessage.length).to.be.greaterThan(0);
        expect(element.validity.valueMissing).to.be.true;
        expect(element).not.to.match(':valid');
        expect(element).to.match(':invalid');
      });

      it('should update validity with required true with selection', async () => {
        expect(element.value).to.not.be.empty;
        element.toggleAttribute('required', true);
        await waitForLitRender(element);

        expect(element.validationMessage).to.equal('');
        expect(element.validity.valueMissing).to.be.false;
      });

      it('should update validity message language', async () => {
        element.toggleAttribute('required', true);
        element.value = null;
        await waitForLitRender(element);

        const original = element.validationMessage;
        expect(element.validationMessage.length).to.be.greaterThan(0);
        expect(element.validity.valueMissing).to.be.true;

        document.documentElement.setAttribute('lang', 'de');
        await waitForLitRender(element);

        expect(element.validationMessage.length).to.be.greaterThan(0);
        expect(element.validationMessage).not.to.equal(original);
      });
    });
  });

  describe('with autocomplete', () => {
    let autocomplete: SbbAutocompleteElement;
    let options: SbbOptionElement[];

    beforeEach(async () => {
      formField = await fixture(html`
        <sbb-form-field>
          <label>Label</label>
          <sbb-chip-group name="chip-group-1">
            <sbb-chip value="chip 1"></sbb-chip>
            <input placeholder="Placeholder" />
          </sbb-chip-group>
          <sbb-autocomplete>
            <sbb-option value="Option A">Option A</sbb-option>
            <sbb-option value="Option B">Option B</sbb-option>
          </sbb-autocomplete>
        </sbb-form-field>
      `);
      element = formField.querySelector('sbb-chip-group')!;
      chips = Array.from(element.querySelectorAll('sbb-chip'));
      options = Array.from(formField.querySelectorAll('sbb-option'));
      input = formField.querySelector('input')!;
      autocomplete = formField.querySelector('sbb-autocomplete')!;
    });

    it('should create chip when option is selected', async () => {
      const inputAutocompleteEventSpy = new EventSpy('inputAutocomplete', input);
      const tokenEndEventSpy = new EventSpy<CustomEvent<SbbChipInputTokenEndEventDetails>>(
        SbbChipGroupElement.events.chipinputtokenend,
        element,
      );

      input.focus();
      await waitForLitRender(formField);

      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(formField);

      expect(inputAutocompleteEventSpy.count).to.be.equal(1);
      expect(tokenEndEventSpy.count).to.be.equal(1);
      expect(tokenEndEventSpy.lastEvent!.detail.origin).to.be.equal('autocomplete');
      expect(element.value).to.contain(options[0].value);

      autocomplete.open();
      options[1].click();
      await waitForLitRender(formField);

      expect(inputAutocompleteEventSpy.count).to.be.equal(2);
      expect(tokenEndEventSpy.count).to.be.equal(2);
      expect(tokenEndEventSpy.lastEvent!.detail.origin).to.be.equal('autocomplete');
      expect(element.value).to.contain(options[1].value);
    });

    /**
     * This test cover the case where the input has a value and an option is selected.
     * What should happen is that
     * - autocomplete overwrites the input value with the clicked option
     * - the chip-group creates the chip with the new input value
     */
    it('should ignore the input value when an option is selected', async () => {
      const inputAutocompleteEventSpy = new EventSpy('inputAutocomplete', input);

      input.focus();
      await sendKeys({ type: 'aa' });
      await waitForLitRender(formField);

      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(formField);

      expect(inputAutocompleteEventSpy.count).to.be.equal(1);
      expect(element.value).to.contain(options[0].value);
      expect(element.value).not.to.contain('aa');
    });

    it('should allow creating chips from input', async () => {
      const inputAutocompleteEventSpy = new EventSpy('inputAutocomplete', input);
      const tokenEndEventSpy = new EventSpy<CustomEvent<SbbChipInputTokenEndEventDetails>>(
        SbbChipGroupElement.events.chipinputtokenend,
        element,
      );

      input.focus();
      await sendKeys({ type: 'new chip' });
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(formField);

      expect(inputAutocompleteEventSpy.count).to.be.equal(0);
      expect(tokenEndEventSpy.count).to.be.equal(1);
      expect(tokenEndEventSpy.lastEvent!.detail.origin).to.be.equal('input');
      expect(element.value).to.contain('new chip');
    });

    it('should add chip on blur with addOnBlur and autocomplete', async () => {
      element.addOnBlur = true;

      input.focus();
      await sendKeys({ type: 'new chip' });
      await waitForLitRender(formField);

      // Blur the input
      input.blur();
      await waitForLitRender(formField);

      expect(element.value).to.contain('new chip');
      expect(input.value).to.be.empty;
    });
  });

  describe('with complex value', () => {
    type ComplexValue = { property: string; otherProp: string };
    let options: SbbOptionElement<ComplexValue>[];
    const values: ComplexValue[] = [
      { property: 'Value 1', otherProp: 'test1' },
      { property: 'Value 2', otherProp: 'test2' },
    ];
    const autocompleteValues: ComplexValue[] = [
      { property: 'Option 3', otherProp: 'test3' },
      { property: 'Option 4', otherProp: 'test4' },
    ];

    beforeEach(async () => {
      const root = await fixture(html`
        <form>
          <sbb-form-field>
            <label>Label</label>
            <sbb-chip-group
              name="chip-group-1"
              .displayWith=${(value: ComplexValue) => value.property}
              .value=${values}
            >
              <input placeholder="Placeholder" />
            </sbb-chip-group>
            <sbb-autocomplete>
              <sbb-option .value=${autocompleteValues[0]}>Option 3</sbb-option>
              <sbb-option .value=${autocompleteValues[1]}>Option 4</sbb-option>
            </sbb-autocomplete>
          </sbb-form-field>
        </form>
      `);
      element = root.querySelector('sbb-chip-group')!;
      chips = Array.from(root.querySelectorAll('sbb-chip'));
      formField = root.querySelector('sbb-form-field')!;
      input = root.querySelector('input')!;
      options = Array.from(root.querySelectorAll<SbbOptionElement<ComplexValue>>('sbb-option'));
    });

    it('should create chip when option is selected', async () => {
      const tokenEndEventSpy = new EventSpy<CustomEvent<SbbChipInputTokenEndEventDetails>>(
        SbbChipGroupElement.events.chipinputtokenend,
        element,
      );

      input.focus();
      await waitForLitRender(formField);

      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(formField);

      expect(tokenEndEventSpy.count).to.be.equal(1);
      expect(tokenEndEventSpy.lastEvent!.detail.origin).to.be.equal('autocomplete');
      expect(tokenEndEventSpy.lastEvent!.detail.label).to.be.equal('Option 3');
      expect(element.value).to.contain(options[0].value);

      const addedChip = element.querySelectorAll<SbbChipElement<ComplexValue>>('sbb-chip')[2]!;
      expect(addedChip.value).to.be.equal(autocompleteValues[0]);
      expect(addedChip.textContent).to.be.equal(autocompleteValues[0].property);
      expect(element.value).to.contain(options[0].value);
    });

    it('should allow creating chips from input', async () => {
      element.addEventListener(
        SbbChipGroupElement.events.chipinputtokenend,
        (e: CustomEvent<SbbChipInputTokenEndEventDetails<ComplexValue>>) => {
          // Transform input value into object
          const detail = e.detail;
          detail.setValue({ property: detail.value as string, otherProp: 'new' });
        },
      );
      const tokenEndEventSpy = new EventSpy<
        CustomEvent<SbbChipInputTokenEndEventDetails<ComplexValue>>
      >(SbbChipGroupElement.events.chipinputtokenend, element);

      input.focus();

      await sendKeys({ type: 'new chip' });
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(formField);

      expect(tokenEndEventSpy.count).to.be.equal(1);
      expect(tokenEndEventSpy.lastEvent!.detail.origin).to.be.equal('input');
      expect(tokenEndEventSpy.lastEvent!.detail.value).to.be.deep.equal({
        property: 'new chip',
        otherProp: 'new',
      });
      expect(element.value[2]).to.be.deep.equal({ property: 'new chip', otherProp: 'new' });
    });

    it('should update sbb-chip-group value when setting complex value on sbb-chip', async () => {
      const chip: SbbChipElement<ComplexValue> = document.createElement(
        'sbb-chip',
      ) as unknown as SbbChipElement<ComplexValue>;
      chip.value = { property: 'Value 3', otherProp: 'test3' };

      element.insertBefore(chip, input);
      await waitForLitRender(formField);

      expect(element.value.length).to.be.equal(3);
    });

    it('should serialize and deserialize complex value', async () => {
      expect(element.value[0]).to.be.equal(values[0]);
      expect(element.value[1]).to.be.equal(values[1]);

      // Get the stored formData from the form
      const formData = new FormData(element.closest('form')!);

      // Simulate navigating to other page and then back to form
      element.formStateRestoreCallback(formData, 'restore');

      // Wait for the formStateRestoreCallback to finish
      await aTimeout(30);
      await waitForLitRender(element);

      // Object equality is currently lost, but deep equality is preserved
      expect(element.value).not.to.be.equal(values); // TODO: With a comparison function, this should be equal
      expect(element.value).to.be.deep.equal(values);
    });
  });

  describe('non-standard initialization cases', () => {
    it('init without input', async () => {
      formField = await fixture(html`
        <sbb-form-field>
          <label>Label</label>
          <sbb-chip-group name="chip-group-1">
            <sbb-chip value="chip 1"></sbb-chip>
          </sbb-chip-group>
        </sbb-form-field>
      `);
      element = formField.querySelector('sbb-chip-group')!;

      input = document.createElement('input');
      element.append(input);
      await waitForLitRender(element);

      input.focus();
      await sendKeys({ type: 'new chip' });
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(element);

      const addedChip = Array.from(element.querySelectorAll('sbb-chip')).at(-1)!;
      expect(addedChip.value).to.be.equal('new chip');
      expect(element.value).to.include('new chip');
      expect(input.value).to.be.empty; // The input should be emptied
    });

    it('init without formfield', async () => {
      const root = await fixture(html`
        <div>
          <sbb-form-field size="l">
            <label>Label</label>
          </sbb-form-field>
          <sbb-chip-group name="chip-group-1">
            <sbb-chip value="chip 1"></sbb-chip>
            <input />
          </sbb-chip-group>
        </div>
      `);

      formField = root.querySelector('sbb-form-field')!;
      element = root.querySelector('sbb-chip-group')!;
      input = root.querySelector('input')!;

      expect(element).to.match(':state(size-m)');

      formField.append(element);
      await waitForLitRender(root);

      expect(formField).to.have.match(':state(input-type-input)');
      expect(element).to.match(':state(size-l)');

      input.focus();
      await sendKeys({ type: 'new chip' });
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(element);

      const addedChip = Array.from(element.querySelectorAll('sbb-chip')).at(-1)!;
      expect(addedChip.value).to.be.equal('new chip');
      expect(element.value).to.include('new chip');
      expect(input.value).to.be.empty; // The input should be emptied
    });

    it('init with value', async () => {
      formField = await fixture(html`
        <sbb-form-field>
          <label>Label</label>
          <sbb-chip-group name="chip-group-1" .value=${['chip 1', 'chip 2']}>
            <input />
          </sbb-chip-group>
        </sbb-form-field>
      `);
      element = formField.querySelector('sbb-chip-group')!;
      chips = Array.from(formField.querySelectorAll('sbb-chip'))!;

      expect(element.value).to.be.eql(['chip 1', 'chip 2']);
      expect(chips.length).to.be.equal(2);
      expect(chips[0].value).to.be.equal('chip 1');
      expect(chips[1].value).to.be.equal('chip 2');
    });
  });
});
