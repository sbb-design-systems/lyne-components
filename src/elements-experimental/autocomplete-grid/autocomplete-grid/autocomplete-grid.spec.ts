import { assert, aTimeout, expect } from '@open-wc/testing';
import { isSafari } from '@sbb-esta/lyne-elements/core/dom.js';
import { fixture, tabKey } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { describeIf, EventSpy, waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';
import { SbbFormFieldElement } from '@sbb-esta/lyne-elements/form-field.js';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { repeat } from 'lit/directives/repeat.js';
import { html } from 'lit/static-html.js';
import type { Context } from 'mocha';
import { type SinonSpy, spy } from 'sinon';

import type { SbbAutocompleteGridButtonElement } from '../autocomplete-grid-button.ts';
import { SbbAutocompleteGridOptionElement } from '../autocomplete-grid-option.ts';

import { SbbAutocompleteGridElement } from './autocomplete-grid.component.ts';
import '../autocomplete-grid-row.ts';
import '../autocomplete-grid-cell.ts';
import '../autocomplete-grid-button.ts';

describe(`sbb-autocomplete-grid`, () => {
  let element: SbbAutocompleteGridElement, formField: SbbFormFieldElement, input: HTMLInputElement;

  describe('basic', () => {
    beforeEach(async () => {
      formField = await fixture(html`
        <sbb-form-field>
          <input />
          <sbb-autocomplete-grid id="myAutocomplete">
            <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-option value="1" id="option-1">
                Option 1
              </sbb-autocomplete-grid-option>
              <sbb-autocomplete-grid-cell>
                <sbb-autocomplete-grid-button
                  id="button-1"
                  icon-name="pen-small"
                ></sbb-autocomplete-grid-button>
              </sbb-autocomplete-grid-cell>
            </sbb-autocomplete-grid-row>
            <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-option value="2" id="option-2">
                Option 2
              </sbb-autocomplete-grid-option>
              <sbb-autocomplete-grid-cell>
                <sbb-autocomplete-grid-button
                  id="button-2"
                  icon-name="pen-small"
                ></sbb-autocomplete-grid-button>
              </sbb-autocomplete-grid-cell>
              <sbb-autocomplete-grid-cell>
                <sbb-autocomplete-grid-button
                  id="button-3"
                  icon-name="trash-small"
                ></sbb-autocomplete-grid-button>
              </sbb-autocomplete-grid-cell>
            </sbb-autocomplete-grid-row>
          </sbb-autocomplete-grid>
        </sbb-form-field>
        <button>Button to focus</button>
      `);
      input = formField.querySelector<HTMLInputElement>('input')!;
      element = formField.querySelector<SbbAutocompleteGridElement>('sbb-autocomplete-grid')!;
    });

    describeIf(isSafari, 'Safari', async () => {
      it('renders and sets the correct attributes', () => {
        assert.instanceOf(formField, SbbFormFieldElement);
        assert.instanceOf(element, SbbAutocompleteGridElement);

        expect(element).not.to.have.attribute('autocomplete-origin-borderless');

        expect(input).to.have.attribute('autocomplete', 'off');
        expect(input).to.have.attribute('role', 'combobox');
        expect(input).to.have.attribute('aria-autocomplete', 'list');
        expect(input).to.have.attribute('aria-haspopup', 'grid');
        expect(input).to.have.attribute('aria-controls', element.id);
        expect(input).to.have.attribute('aria-owns', element.id);
        expect(input).to.have.attribute('aria-expanded', 'false');
      });
    });

    describeIf(!isSafari, 'Chrome-Firefox', async () => {
      it('renders and sets the correct attributes', () => {
        assert.instanceOf(formField, SbbFormFieldElement);
        assert.instanceOf(element, SbbAutocompleteGridElement);

        expect(element).not.to.have.attribute('autocomplete-origin-borderless');

        const id = element.shadowRoot!.querySelector('.sbb-autocomplete__options')!.id;

        expect(input).to.have.attribute('autocomplete', 'off');
        expect(input).to.have.attribute('role', 'combobox');
        expect(input).to.have.attribute('aria-autocomplete', 'list');
        expect(input).to.have.attribute('aria-haspopup', 'grid');
        expect(input).to.have.attribute('aria-controls', id);
        expect(input).to.have.attribute('aria-owns', id);
        expect(input).to.have.attribute('aria-expanded', 'false');
      });
    });

    it('removes attributes on trigger disconnection', async () => {
      const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);

      // We have to move the input out of the form field as the default trigger fallback is the input inside a form field.
      input.remove();
      formField.parentElement?.appendChild(input);
      element.trigger = input;

      // In order to test the removal of data-expanded, we need to open the autocomplete first
      element.open();
      await openSpy.calledOnce();

      // Remove trigger to update configuration after removal
      element.trigger = null;
      await waitForLitRender(element);

      expect(input).not.to.have.attribute('autocomplete');
      expect(input).not.to.have.attribute('role');
      expect(input).not.to.have.attribute('aria-autocomplete');
      expect(input).not.to.have.attribute('aria-haspopup');
      expect(input).not.to.have.attribute('aria-controls');
      expect(input).not.to.have.attribute('aria-owns');
      expect(input).not.to.have.attribute('aria-expanded');
      expect(input).not.to.have.attribute('data-expanded');
    });

    it('should have form-field as origin when not defined otherwise', async () => {
      expect(element.originElement).to.be.equal(
        formField.shadowRoot?.querySelector?.('#overlay-anchor'),
      );
    });

    it('opens and closes with mouse and keyboard', async function (this: Context) {
      // Flaky on WebKit
      this.retries(3);
      const beforeOpenSpy = new EventSpy(SbbAutocompleteGridElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);
      const beforeCloseSpy = new EventSpy(SbbAutocompleteGridElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbAutocompleteGridElement.events.close, element);

      input.focus();

      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);

      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);
      expect(input).to.have.attribute('aria-expanded', 'true');
      expect(element).to.match(':popover-open');

      await sendKeys({ press: 'Escape' });
      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);
      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);
      expect(input).to.have.attribute('aria-expanded', 'false');
      expect(element).not.to.match(':popover-open');

      await sendKeys({ press: 'ArrowDown' });
      await beforeOpenSpy.calledTimes(2);
      expect(beforeOpenSpy.count, 'before open spy after arrow down').to.be.equal(2);
      await openSpy.calledTimes(2);
      expect(openSpy.count, 'open spy after arrow down').to.be.equal(2);
      expect(input).to.have.attribute('aria-expanded', 'true');

      await sendKeys({ press: tabKey });
      await beforeCloseSpy.calledTimes(2);
      expect(beforeCloseSpy.count).to.be.equal(2);
      await closeSpy.calledTimes(2);
      expect(closeSpy.count).to.be.equal(2);
      expect(input).to.have.attribute('aria-expanded', 'false');

      input.click();
      await beforeOpenSpy.calledTimes(3);
      expect(beforeOpenSpy.count).to.be.equal(3);
      await openSpy.calledTimes(3);
      expect(openSpy.count).to.be.equal(3);
      expect(input).to.have.attribute('aria-expanded', 'true');

      // Simulate backdrop click
      await sendMouse({ type: 'click', position: [formField.offsetWidth + 25, 25] });

      await beforeCloseSpy.calledTimes(3);
      expect(beforeCloseSpy.count).to.be.equal(3);
      await closeSpy.calledTimes(3);
      expect(closeSpy.count).to.be.equal(3);
      expect(input).to.have.attribute('aria-expanded', 'false');
    });

    it('deactivates later disabled options when already active', async () => {
      const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);

      input.focus();
      await openSpy.calledOnce();

      await sendKeys({ press: 'ArrowDown' });
      const optOne = element.querySelector<SbbAutocompleteGridOptionElement>('#option-1')!;

      expect(optOne).to.match(':state(active)');
      optOne.disabled = true;
      await waitForLitRender(element);

      expect(optOne).not.to.match(':state(active)');
    });

    it('ignores later removed option', async () => {
      const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);
      const optOne = element.querySelector<SbbAutocompleteGridOptionElement>('#option-1')!;
      const optTwo = element.querySelector<SbbAutocompleteGridOptionElement>('#option-2')!;

      input.focus();
      await openSpy.calledOnce();
      await sendKeys({ press: 'ArrowDown' });

      expect(optOne).to.match(':state(active)');

      optOne.remove();
      await waitForLitRender(element);

      await sendKeys({ press: 'ArrowDown' });
      expect(optTwo).to.match(':state(active)');
    });

    it('opens and closes with non-zero animation duration', async function (this: Context) {
      (globalThis as { disableAnimation?: boolean }).disableAnimation = false;

      element.style.setProperty('--sbb-options-panel-animation-duration', '1ms');
      const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);
      const closeSpy = new EventSpy(SbbAutocompleteGridElement.events.close, element);

      input.focus();

      await openSpy.calledOnce();
      expect(input).to.have.attribute('aria-expanded', 'true');

      await sendKeys({ press: 'Escape' });
      await closeSpy.calledOnce();

      expect(input).to.have.attribute('aria-expanded', 'false');
    });

    it('select by mouse', async () => {
      const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);
      const optionSelectedEventSpy = new EventSpy(
        SbbAutocompleteGridOptionElement.events.optionselected,
      );
      const inputEventSpy = new EventSpy('input', input);
      const changeEventSpy = new EventSpy('change', input);
      const optTwo = element.querySelector<SbbAutocompleteGridOptionElement>('#option-2')!;

      input.focus();
      await openSpy.calledOnce();

      const optTwoPositionRect = optTwo.getBoundingClientRect();

      await sendMouse({
        type: 'click',
        position: [
          Math.round(optTwoPositionRect.x + window.scrollX + optTwoPositionRect.width / 2),
          Math.round(optTwoPositionRect.y + window.scrollY + optTwoPositionRect.height / 2),
        ],
      });
      await waitForLitRender(element);

      expect(inputEventSpy.count, 'input events').to.be.equal(1);
      expect(changeEventSpy.count, 'change events').to.be.equal(1);
      expect(optionSelectedEventSpy.count, 'option selected events').to.be.equal(1);
      expect(optionSelectedEventSpy.firstEvent!.target).to.have.property('id', 'option-2');
      expect(document.activeElement).to.be.equal(input);
    });

    it('select button and get related option', async () => {
      const beforeOpenSpy = new EventSpy(SbbAutocompleteGridElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);
      const clickSpy = new EventSpy('click');

      input.focus();
      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);
      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);

      const buttonOne = element.querySelector('#button-1') as SbbAutocompleteGridButtonElement;
      buttonOne.click();
      await waitForLitRender(element);

      await clickSpy.calledOnce();
      expect(clickSpy.count).to.be.equal(1);
      expect(
        (
          clickSpy.firstEvent!.target as SbbAutocompleteGridButtonElement
        ).option!.textContent!.trim(),
      ).to.be.equal('Option 1');
      expect(
        (clickSpy.firstEvent!.target as SbbAutocompleteGridButtonElement).option!.value,
      ).to.be.equal('1');
    });

    it('keyboard navigation', async () => {
      const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);
      const optOne = element.querySelector('#option-1');
      const buttonOne = element.querySelector('#button-1');
      const optTwo = element.querySelector('#option-2');
      const buttonTwo = element.querySelector('#button-2');
      const buttonThree = element.querySelector('#button-3');
      input.focus();

      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);

      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);
      expect(optTwo).to.match(':state(active)');
      expect(buttonTwo).not.to.match(':state(focus-visible)');
      expect(buttonThree).not.to.match(':state(focus-visible)');
      expect(input).to.have.attribute('aria-activedescendant', 'option-2');

      await sendKeys({ press: 'ArrowRight' });
      await waitForLitRender(element);
      expect(optTwo).not.to.match(':state(active)');
      expect(buttonTwo).to.match(':state(focus-visible)');
      expect(buttonThree).not.to.match(':state(focus-visible)');
      expect(input).to.have.attribute('aria-activedescendant', 'button-2');

      await sendKeys({ press: 'ArrowRight' });
      await waitForLitRender(element);
      expect(optTwo).not.to.match(':state(active)');
      expect(buttonTwo).not.to.match(':state(focus-visible)');
      expect(buttonThree).to.match(':state(focus-visible)');
      expect(input).to.have.attribute('aria-activedescendant', 'button-3');

      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);
      expect(optOne).to.match(':state(active)');
      expect(buttonOne).not.to.match(':state(focus-visible)');
      expect(optTwo).not.to.match(':state(active)');
      expect(buttonTwo).not.to.match(':state(focus-visible)');
      expect(buttonThree).not.to.match(':state(focus-visible)');
      expect(input).to.have.attribute('aria-activedescendant', 'option-1');
    });

    it('opens and select with keyboard', async () => {
      const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);
      const closeSpy = new EventSpy(SbbAutocompleteGridElement.events.close, element);
      const optionSelectedEventSpy = new EventSpy(
        SbbAutocompleteGridOptionElement.events.optionselected,
      );
      const inputEventSpy = new EventSpy('input', input);
      const changeEventSpy = new EventSpy('change', input);
      const optOne = element.querySelector<SbbAutocompleteGridOptionElement>('#option-1');
      const optTwo = element.querySelector<SbbAutocompleteGridOptionElement>('#option-2');
      const keydownSpy = new EventSpy('keydown', input);

      input.focus();
      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);

      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);
      expect(optOne).not.to.match(':state(active)');
      expect(optOne).not.to.have.attribute('selected');
      expect(optTwo).to.match(':state(active)');
      expect(optTwo).not.to.have.attribute('selected');
      expect(input).to.have.attribute('aria-activedescendant', 'option-2');

      await sendKeys({ press: 'Enter' });
      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);
      expect(keydownSpy.lastEvent?.defaultPrevented).to.be.true;

      expect(optTwo).not.to.match(':state(active)');
      expect(optTwo).to.have.attribute('selected');
      expect(inputEventSpy.count).to.be.equal(1);
      expect(changeEventSpy.count).to.be.equal(1);
      expect(optionSelectedEventSpy.count).to.be.equal(1);
      expect(input).to.have.attribute('aria-expanded', 'false');
      expect(input).not.to.have.attribute('aria-activedescendant');
    });

    describe('autoActiveFirstOption', () => {
      function assertActiveOption(option: SbbAutocompleteGridOptionElement): void {
        expect(option).to.match(':state(active)');
        expect(option).not.to.have.attribute('selected');
        expect(input).to.have.attribute('aria-activedescendant', option.id);
      }

      function assertInactiveOption(option: SbbAutocompleteGridOptionElement): void {
        expect(option).not.to.match(':state(active)');
        expect(option).not.to.have.attribute('selected');
        expect(input).not.to.have.attribute('aria-activedescendant', option.id);
      }

      beforeEach(async () => {
        element.autoActiveFirstOption = true;
        await waitForLitRender(element);
      });

      it('updates on open', async () => {
        const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);
        const optOne = element.querySelector<SbbAutocompleteGridOptionElement>('#option-1')!;

        input.focus();
        await openSpy.calledOnce();

        assertActiveOption(optOne);
      });

      it('updates on new option', async () => {
        const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);

        input.focus();
        await openSpy.calledOnce();

        const newOption = document.createElement('sbb-autocomplete-grid-option');
        newOption.id = 'option-4';
        newOption.value = '4';
        newOption.textContent = 'Option 4';
        element.prepend(newOption);
        await waitForLitRender(element);

        assertActiveOption(newOption);
      });

      it('updates on newly disabled option', async () => {
        const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);
        const optOne = element.querySelector<SbbAutocompleteGridOptionElement>('#option-1')!;
        const optTwo = element.querySelector<SbbAutocompleteGridOptionElement>('#option-2')!;

        input.focus();
        await openSpy.calledOnce();

        assertActiveOption(optOne);
        assertInactiveOption(optTwo);

        optOne.disabled = true;
        await waitForLitRender(element);

        assertInactiveOption(optOne);
        assertActiveOption(optTwo);

        optOne.disabled = false;
        await waitForLitRender(element);

        assertActiveOption(optOne);
        assertInactiveOption(optTwo);
      });

      it('updates on activating autoActiveFirstOption at any time', async () => {
        element.autoActiveFirstOption = false;

        const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);
        const optOne = element.querySelector<SbbAutocompleteGridOptionElement>('#option-1')!;

        input.focus();
        await openSpy.calledOnce();

        assertInactiveOption(optOne);

        element.autoActiveFirstOption = true;
        await waitForLitRender(element);

        assertActiveOption(optOne);
      });
    });

    describe('autoSelectActiveOption', () => {
      let openSpy: EventSpy<Event>,
        changeEventSpy: EventSpy<Event>,
        inputEventSpy: EventSpy<Event>,
        inputAutocompleteSpy: EventSpy<Event>;
      let optOne: SbbAutocompleteGridOptionElement, optTwo: SbbAutocompleteGridOptionElement;

      beforeEach(async () => {
        openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);
        changeEventSpy = new EventSpy('change', input);
        inputEventSpy = new EventSpy('input', input);
        inputAutocompleteSpy = new EventSpy('inputAutocomplete', input);
        optOne = element.querySelector<SbbAutocompleteGridOptionElement>('#option-1')!;
        optTwo = element.querySelector<SbbAutocompleteGridOptionElement>('#option-2')!;

        element.autoSelectActiveOption = true;
        await waitForLitRender(element);
      });

      it('should open and select with arrow keys only', async () => {
        input.focus();
        await openSpy.calledOnce();
        expect(openSpy.count).to.be.equal(1);

        await sendKeys({ press: 'ArrowDown' });
        await waitForLitRender(element);

        // Set the pending selection
        expect(optOne).to.match(':state(active)');
        expect(input).to.have.attribute('aria-activedescendant', 'option-1');
        expect(input).to.have.attribute('aria-expanded', 'true');
        expect(optOne).not.to.have.attribute('selected');
        expect(input.value).to.be.equal('1');
        expect(changeEventSpy.count).to.be.equal(0);
        expect(inputEventSpy.count).to.be.equal(0);
        expect(inputAutocompleteSpy.count).to.be.equal(0);

        await sendKeys({ press: 'ArrowDown' });
        await waitForLitRender(element);
        expect(optOne).not.to.match(':state(active)');
        expect(optTwo).to.match(':state(active)');
        expect(input).to.have.attribute('aria-activedescendant', 'option-2');
        expect(input).to.have.attribute('aria-expanded', 'true');
        expect(optTwo).not.to.have.attribute('selected');
        expect(input.value).to.be.equal('2');
        expect(changeEventSpy.count).to.be.equal(0);
        expect(inputEventSpy.count).to.be.equal(0);
        expect(inputAutocompleteSpy.count).to.be.equal(0);

        await sendKeys({ press: tabKey });
        await waitForLitRender(element);
        expect(input.value).to.be.equal('2');
        expect(optTwo).to.have.attribute('selected');
        expect(changeEventSpy.count).to.be.equal(1);
        expect(inputEventSpy.count).to.be.equal(1);
        expect(inputAutocompleteSpy.count).to.be.equal(1);
        expect(openSpy.count).to.be.equal(1);
        expect(document.activeElement?.localName).not.to.be.equal('input'); // Ensure the focus is not trapped
      });

      it('should reset pending selection on user input', async () => {
        input.focus();
        await openSpy.calledOnce();
        expect(openSpy.count).to.be.equal(1);

        await sendKeys({ press: 'ArrowDown' });
        await waitForLitRender(element);

        // Set the pending selection
        expect(optOne).to.match(':state(active)');
        expect(input.value).to.be.equal('1');
        expect(changeEventSpy.count).to.be.equal(0);
        expect(inputAutocompleteSpy.count).to.be.equal(0);

        await sendKeys({ press: 'a' });
        await waitForLitRender(element);
        expect(input.value).to.be.equal('1a');
        expect(changeEventSpy.count).to.be.equal(0);
        expect(inputAutocompleteSpy.count).to.be.equal(0);
        expect(inputEventSpy.count).to.be.equal(1);

        await sendKeys({ press: tabKey });
        await waitForLitRender(element);
        expect(input.value).to.be.equal('1a');
        expect(optOne).not.to.have.attribute('selected');
        expect(changeEventSpy.count).to.be.equal(1);
        expect(inputEventSpy.count).to.be.equal(1);
        expect(inputAutocompleteSpy.count).to.be.equal(0);
      });

      it('should ignore pending selection when an option is clicked', async () => {
        input.focus();
        await openSpy.calledOnce();

        await sendKeys({ press: 'ArrowDown' });
        await waitForLitRender(element);

        // Set the pending selection
        expect(optOne).to.match(':state(active)');
        expect(optOne).not.to.have.attribute('selected');
        expect(input.value).to.be.equal('1');
        expect(changeEventSpy.count).to.be.equal(0);
        expect(inputEventSpy.count).to.be.equal(0);
        expect(inputAutocompleteSpy.count).to.be.equal(0);

        optTwo.click();
        await waitForLitRender(element);
        expect(optTwo).to.have.attribute('selected');
        expect(input.value).to.be.equal('2');
        expect(changeEventSpy.count).to.be.equal(1);
        expect(inputEventSpy.count).to.be.equal(1);
        expect(inputAutocompleteSpy.count).to.be.equal(1);
      });

      it('should not select if "autoActiveFirstOption"', async () => {
        element.autoActiveFirstOption = true;
        await waitForLitRender(element);

        input.focus();
        await openSpy.calledOnce();
        expect(openSpy.count).to.be.equal(1);

        // Should not select if the option is active because of the 'autoActiveFirstOption'
        expect(optOne).to.match(':state(active)');
        expect(optOne).not.to.have.attribute('selected');
        expect(input.value).to.be.equal('');

        // Instead, user interactions should pend select
        await sendKeys({ press: 'ArrowDown' });
        await waitForLitRender(element);
        expect(optOne).not.to.match(':state(active)');
        expect(optOne).not.to.have.attribute('selected');
        expect(optTwo).to.match(':state(active)');
        expect(optTwo).not.to.have.attribute('selected');
        expect(input.value).to.be.equal('2');
      });
    });

    describe('autoSelectActiveOptionOnBlur', () => {
      let openSpy: EventSpy<Event>,
        changeEventSpy: EventSpy<Event>,
        inputEventSpy: EventSpy<Event>,
        inputAutocompleteSpy: EventSpy<Event>;
      let optOne: SbbAutocompleteGridOptionElement, optTwo: SbbAutocompleteGridOptionElement;

      beforeEach(async () => {
        openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);
        changeEventSpy = new EventSpy('change', input);
        inputEventSpy = new EventSpy('input', input);
        inputAutocompleteSpy = new EventSpy('inputAutocomplete', input);
        optOne = element.querySelector<SbbAutocompleteGridOptionElement>('#option-1')!;
        optTwo = element.querySelector<SbbAutocompleteGridOptionElement>('#option-2')!;

        element.autoSelectActiveOptionOnBlur = true;
        element.autoActiveFirstOption = true;
        await waitForLitRender(element);
      });

      it('should select active option on blur', async () => {
        input.focus();
        await sendKeys({ type: 'a' });
        await openSpy.calledOnce();
        expect(openSpy.count).to.be.equal(1);
        expect(inputEventSpy.count).to.be.equal(1);
        await waitForLitRender(element);

        expect(optOne).to.match(':state(active)');
        expect(input).to.have.attribute('aria-activedescendant', 'option-1');
        expect(input).to.have.attribute('aria-expanded', 'true');
        expect(optOne).not.to.have.attribute('selected');
        expect(input.value).to.be.equal('a');
        expect(changeEventSpy.count).to.be.equal(0);
        expect(inputEventSpy.count).to.be.equal(1);
        expect(inputAutocompleteSpy.count).to.be.equal(0);

        await sendKeys({ press: tabKey });
        await waitForLitRender(element);
        expect(input.value).to.be.equal('1');
        expect(optOne).to.have.attribute('selected');
        expect(changeEventSpy.count).to.be.equal(2);
        expect(inputEventSpy.count).to.be.equal(2);
        expect(inputAutocompleteSpy.count).to.be.equal(1);
        expect(openSpy.count).to.be.equal(1);
        expect(document.activeElement?.localName).not.to.be.equal('input'); // Ensure the focus is not trapped
      });

      it('should do nothing if input is empty', async () => {
        input.focus();
        await openSpy.calledOnce();
        expect(openSpy.count).to.be.equal(1);
        await waitForLitRender(element);

        expect(optOne).to.match(':state(active)');
        expect(changeEventSpy.count).to.be.equal(0);
        expect(inputAutocompleteSpy.count).to.be.equal(0);

        await sendKeys({ press: tabKey });
        await waitForLitRender(element);
        expect(input.value).to.be.equal('');
        expect(optOne).not.to.have.attribute('selected');
        expect(changeEventSpy.count).to.be.equal(0);
        expect(inputEventSpy.count).to.be.equal(0);
        expect(inputAutocompleteSpy.count).to.be.equal(0);
      });

      it('should ignore auto-selection when an option is clicked', async () => {
        input.focus();
        input.value = 'a';
        await openSpy.calledOnce();
        await waitForLitRender(element);

        expect(optOne).to.match(':state(active)');
        expect(optOne).not.to.have.attribute('selected');
        expect(changeEventSpy.count).to.be.equal(0);
        expect(inputEventSpy.count).to.be.equal(0);
        expect(inputAutocompleteSpy.count).to.be.equal(0);

        optTwo.click();
        await waitForLitRender(element);
        expect(optTwo).to.have.attribute('selected');
        expect(input.value).to.be.equal('2');
        expect(changeEventSpy.count).to.be.equal(1);
        expect(inputEventSpy.count).to.be.equal(1);
        expect(inputAutocompleteSpy.count).to.be.equal(1);

        await sendKeys({ press: tabKey });
        await waitForLitRender(element);
        expect(input.value).to.be.equal('2');
        expect(changeEventSpy.count).to.be.equal(1);
        expect(inputEventSpy.count).to.be.equal(1);
        expect(inputAutocompleteSpy.count).to.be.equal(1);

        input.focus();
        await openSpy.calledTimes(2);
        await waitForLitRender(element);
        expect(optOne).to.match(':state(active)');

        // Ensure that the active option is not auto-selected without any previous user interaction
        await sendKeys({ press: tabKey });
        await waitForLitRender(element);
        expect(input.value).to.be.equal('2');
        expect(changeEventSpy.count).to.be.equal(1);
        expect(inputEventSpy.count).to.be.equal(1);
        expect(inputAutocompleteSpy.count).to.be.equal(1);
      });
    });

    it('should not close on disabled option click', async () => {
      const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);
      const optOne = element.querySelector<SbbAutocompleteGridOptionElement>('#option-1')!;
      optOne.disabled = true;

      input.focus();
      await openSpy.calledOnce();

      optOne.click();

      await aTimeout(0);
      expect(element).to.match(':state(state-opened)');
    });

    it('opens and select button with keyboard', async () => {
      const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);
      const clickSpy = new EventSpy('click');
      const optOne = element.querySelector('#option-1');
      const buttonOne = element.querySelector('#button-1');
      const buttonTwo = element.querySelector('#button-2');
      input.focus();

      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);

      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);
      expect(optOne).to.match(':state(active)');
      expect(buttonOne).not.to.match(':state(focus-visible)');
      await sendKeys({ press: 'ArrowRight' });
      expect(optOne).not.to.match(':state(active)');
      expect(buttonOne).to.match(':state(focus-visible)');
      expect(input).to.have.attribute('aria-activedescendant', 'button-1');
      await sendKeys({ press: 'Enter' });
      await clickSpy.calledOnce();
      expect(clickSpy.count).to.be.equal(1);

      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'ArrowRight' });
      await waitForLitRender(element);
      expect(optOne).not.to.match(':state(active)');
      expect(buttonOne).not.to.match(':state(focus-visible)');
      expect(buttonTwo).to.match(':state(focus-visible)');
      expect(input).to.have.attribute('aria-activedescendant', 'button-2');
      await sendKeys({ press: 'Enter' });
      await clickSpy.calledTimes(2);
      expect(clickSpy.count).to.be.equal(2);
      expect(element).to.match(':state(state-opened)');
    });

    it('should stay closed when disabled', async () => {
      input.toggleAttribute('disabled', true);

      input.focus();
      await waitForLitRender(element);
      expect(input).to.have.attribute('aria-expanded', 'false');

      input.click();
      await waitForLitRender(element);
      expect(input).to.have.attribute('aria-expanded', 'false');

      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);
      expect(input).to.have.attribute('aria-expanded', 'false');
    });

    it('close panel when input is disabled', async () => {
      const beforeOpenSpy = new EventSpy(SbbAutocompleteGridElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);
      const beforeCloseSpy = new EventSpy(SbbAutocompleteGridElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbAutocompleteGridElement.events.close, element);

      input.focus();

      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);
      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);
      expect(input).to.have.attribute('aria-expanded', 'true');
      expect(input).to.match('[data-expanded]');
      expect(element).to.match(':popover-open');

      input.toggleAttribute('disabled', true);

      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);
      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);
      expect(input).to.have.attribute('aria-expanded', 'false');
      expect(input).not.to.match('[data-expanded]');
      expect(element).not.to.match(':popover-open');
    });

    it('should stay closed when readonly', async () => {
      input.toggleAttribute('readonly', true);

      input.focus();
      await waitForLitRender(element);
      expect(input).to.have.attribute('aria-expanded', 'false');

      input.click();
      await waitForLitRender(element);
      expect(input).to.have.attribute('aria-expanded', 'false');

      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);
      expect(input).to.have.attribute('aria-expanded', 'false');
    });

    it('does not open if prevented', async () => {
      const beforeOpenSpy = new EventSpy(SbbAutocompleteGridElement.events.beforeopen, element);

      element.addEventListener(SbbAutocompleteGridElement.events.beforeopen, (ev) =>
        ev.preventDefault(),
      );
      element.open();

      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element).to.match(':state(state-closed)');
    });

    it('does not close if prevented', async () => {
      const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);
      const beforeCloseSpy = new EventSpy(SbbAutocompleteGridElement.events.beforeclose, element);

      element.open();
      await openSpy.calledOnce();
      await waitForLitRender(element);

      element.addEventListener(SbbAutocompleteGridElement.events.beforeclose, (ev) =>
        ev.preventDefault(),
      );
      element.close();

      await beforeCloseSpy.calledOnce();
      await waitForLitRender(element);

      expect(element).to.match(':state(state-opened)');
    });

    it('opens when new options are slotted', async () => {
      const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);
      const closeSpy = new EventSpy(SbbAutocompleteGridElement.events.close, element);

      input.focus();

      await openSpy.calledOnce();
      expect(input).to.have.attribute('aria-expanded', 'true');

      // Remove all the rows
      const rows = element.querySelectorAll('sbb-autocomplete-grid-row');
      rows.forEach((option) => option.remove());

      // Should close automatically
      await closeSpy.calledOnce();
      expect(input).to.have.attribute('aria-expanded', 'false');

      // Add a new option
      element.append(rows[0]);

      // Should open automatically
      await openSpy.calledTimes(2);
      expect(input).to.have.attribute('aria-expanded', 'true');
    });

    it('stays closed when option count increases', async () => {
      const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);
      const closeSpy = new EventSpy(SbbAutocompleteGridElement.events.close, element);

      input.focus();
      await openSpy.calledOnce();
      expect(input).to.have.attribute('aria-expanded', 'true');

      element.close();
      await closeSpy.calledOnce();

      // Add a new option
      const newOption = document.createElement('sbb-autocomplete-grid-option');
      newOption.setAttribute('value', 'value');
      const newRow = document.createElement('sbb-autocomplete-grid-row');
      newRow.append(newOption);
      element.append(newRow);
      await waitForLitRender(element);

      // Should stay close
      await openSpy.calledOnce();
      expect(input).to.have.attribute('aria-expanded', 'false');
    });

    it('should sync form-field size change', async () => {
      const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);

      element.open();
      await waitForLitRender(element);
      await openSpy.calledOnce();

      formField.size = 's';
      await waitForLitRender(element);

      expect(element.size).to.be.equal('s');
    });

    it('should open above if forced to', async () => {
      const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);
      element.position = 'above';
      await waitForLitRender(element);

      element.open();
      await waitForLitRender(element);
      await openSpy.calledOnce();

      expect(element).to.match(':state(options-panel-position-above)');
    });

    it('should open below if forced to', async () => {
      const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);

      // Move the form field to the bottom of the page
      formField.style = 'position: static; inset-block-end: 2rem';
      element.position = 'below';
      await waitForLitRender(element);

      element.open();
      await waitForLitRender(element);
      await openSpy.calledOnce();

      expect(element).to.match(':state(options-panel-position-below)');
    });

    describe('interrupting opening and closing with non-zero animation duration', () => {
      beforeEach(() => {
        (globalThis as { disableAnimation?: boolean }).disableAnimation = false;
        element.style.setProperty('--sbb-options-panel-animation-duration', '100ms');
      });

      it('should close autocomplete when closing during opening', async function (this: Context) {
        // Flaky on WebKit
        this.retries(3);

        const closeSpy = new EventSpy(SbbAutocompleteGridElement.events.close, element);

        element.open();
        await waitForLitRender(element);
        expect(element).to.match(':state(state-opening)');
        element.close();

        await closeSpy.calledOnce();
        expect(element.isOpen).to.be.false;
      });

      it('should close autocomplete when closing during opening with Escape key', async function (this: Context) {
        // Flaky on WebKit
        this.retries(3);

        const closeSpy = new EventSpy(SbbAutocompleteGridElement.events.close, element);

        input.focus();
        await waitForLitRender(element);
        expect(element).to.match(':state(state-opening)');
        await sendKeys({ press: 'Escape' });

        await closeSpy.calledOnce();
        expect(element.isOpen).to.be.false;
      });

      it('should close autocomplete when closing during opening with Tab key', async function (this: Context) {
        // Flaky on WebKit
        this.retries(3);

        const closeSpy = new EventSpy(SbbAutocompleteGridElement.events.close, element);

        input.focus();
        await waitForLitRender(element);
        expect(element).to.match(':state(state-opening)');
        await sendKeys({ press: tabKey });

        await closeSpy.calledOnce();
        expect(element.isOpen).to.be.false;
      });

      it('should open autocomplete again when opening during closing', async function (this: Context) {
        // Flaky on WebKit
        this.retries(3);

        const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);

        input.focus();
        await openSpy.calledOnce();

        element.close();
        await waitForLitRender(element);
        expect(element).to.match(':state(state-closing)');
        element.open();

        await openSpy.calledTimes(2);
        expect(element.isOpen).to.be.true;
      });

      it('should open autocomplete again when opening during closing by arrow press on input', async function (this: Context) {
        // Flaky on WebKit
        this.retries(3);

        const openSpy = new EventSpy(SbbAutocompleteGridElement.events.open, element);

        input.focus();
        await openSpy.calledOnce();

        element.close();
        await waitForLitRender(element);
        expect(element).to.match(':state(state-closing)');
        await sendKeys({ press: 'ArrowDown' });

        await openSpy.calledTimes(2);
        expect(element.isOpen).to.be.true;
      });
    });
  });

  describe('trigger connection', () => {
    beforeEach(async () => {
      const root = await fixture(
        html`<div>
          <sbb-autocomplete-grid trigger="autocomplete-trigger">
            <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-option value="1" id="option-1">
                Option 1
              </sbb-autocomplete-grid-option>
            </sbb-autocomplete-grid-row>
          </sbb-autocomplete-grid>
          <input id="autocomplete-trigger" />
        </div>`,
      );
      formField = root.querySelector('sbb-form-field')!;
      input = root.querySelector('input')!;
      element = root.querySelector('sbb-autocomplete-grid')!;
    });

    it('should return trigger', async () => {
      expect(element.trigger).to.be.equal(input);
    });

    it('should have trigger as origin when not defined', async () => {
      expect(element.originElement).to.be.equal(input);
    });

    it('updates trigger connected by id', async () => {
      input.id = '';
      await waitForLitRender(element);
      expect(input.ariaHasPopup).to.be.null;
      expect(element.trigger).to.be.null;

      input.id = 'autocomplete-trigger';
      await waitForLitRender(element);
      expect(input.ariaHasPopup).not.to.be.null;
      expect(element.trigger).to.be.equal(input);
    });

    it('accepts trigger as HTML Element', async () => {
      input.id = '';
      await waitForLitRender(element);
      expect(input.ariaHasPopup).to.be.null;
      expect(element.trigger).to.be.null;

      element.trigger = input;
      await waitForLitRender(element);
      expect(input.ariaHasPopup).not.to.be.null;
      expect(element.trigger).to.be.equal(input);
    });

    it('allows removing the trigger', async () => {
      expect(input.ariaHasPopup).not.to.be.null;
      expect(element.trigger).to.be.equal(input);

      element.trigger = null;
      await waitForLitRender(element);
      expect(input.ariaHasPopup).to.be.null;
      expect(element.trigger).to.be.null;
    });
  });

  describe('origin connection', () => {
    let origin: HTMLElement, root: HTMLElement;
    beforeEach(async () => {
      root = await fixture(
        html`<div>
          <sbb-autocomplete-grid trigger="autocomplete-trigger" origin="autocomplete-origin">
            <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-option value="1" id="option-1">
                Option 1
              </sbb-autocomplete-grid-option>
            </sbb-autocomplete-grid-row>
          </sbb-autocomplete-grid>
          <div id="autocomplete-origin">Origin 1</div>
          <div id="autocomplete-origin-2">Origin 2</div>
          <input id="autocomplete-trigger" />
          <input id="autocomplete-trigger-2" />
        </div>`,
      );
      element = root.querySelector('sbb-autocomplete-grid')!;
      input = root.querySelector('input#autocomplete-trigger')!;
      origin = root.querySelector('div#autocomplete-origin')!;
    });

    it('updates origin connected by id', async () => {
      origin.id = '';
      await waitForLitRender(element);
      expect(element.originElement).to.be.equal(input);

      origin.id = 'autocomplete-origin';
      await waitForLitRender(element);
      expect(element.originElement).to.be.equal(origin);
    });

    it('accepts origin as HTML Element', async () => {
      origin.id = '';
      await waitForLitRender(element);
      expect(element.originElement).to.be.equal(input);

      element.origin = origin;
      await waitForLitRender(element);
      expect(element.originElement).to.be.equal(origin);
    });

    it('allows resetting the origin', async () => {
      expect(element.originElement).to.be.equal(origin);

      element.origin = null;
      await waitForLitRender(element);
      expect(element.originElement).to.be.equal(input);
    });

    it('supports moving the origin when opened', async () => {
      const origin2 = root.querySelector<HTMLDivElement>('#autocomplete-origin-2')!;

      // Open autocomplete
      input.click();
      expect(element.isOpen).to.be.true;
      const offsetTopOrigin1 = element.shadowRoot!.querySelector<HTMLDivElement>(
        '.sbb-autocomplete__panel',
      )!.offsetTop;

      element.origin = origin2;
      await waitForLitRender(element);

      expect(
        element.shadowRoot!.querySelector<HTMLDivElement>('.sbb-autocomplete__panel')!.offsetTop,
      ).to.be.greaterThan(offsetTopOrigin1);
    });

    it('supports moving the trigger which acts as origin when opened', async () => {
      // Open autocomplete
      input.click();
      expect(element.isOpen).to.be.true;
      const offsetTopOrigin1 = element.shadowRoot!.querySelector<HTMLDivElement>(
        '.sbb-autocomplete__panel',
      )!.offsetTop;

      // Set origin to null and swap trigger
      element.origin = null;
      await waitForLitRender(element);
      expect(element.triggerElement).to.be.equal(input);

      element.trigger = root.querySelector<HTMLInputElement>('#autocomplete-trigger-2')!;
      await waitForLitRender(element);
      expect(element.triggerElement!.id).to.be.equal(element.originElement!.id);

      expect(
        element.shadowRoot!.querySelector<HTMLDivElement>('.sbb-autocomplete__panel')!.offsetTop,
      ).to.be.greaterThan(offsetTopOrigin1);
    });
  });

  describe('with complex value', () => {
    let optionSelectedSpy: SinonSpy;

    beforeEach(async () => {
      optionSelectedSpy = spy();
      formField = await fixture(
        html`<sbb-form-field>
          <label>Autocomplete</label>
          <input />
          <sbb-autocomplete-grid
            @optionselected=${(e: Event) => optionSelectedSpy(e)}
            .displayWith=${(o: { property: string; otherProperty: string }) => o.property}
          >
            <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-option
                .value=${{ property: 'Option 1', otherProperty: 'hello' }}
              >
                Option 1
              </sbb-autocomplete-grid-option>
              <sbb-autocomplete-grid-option
                .value=${{ property: 'Option 2', otherProperty: 'hello' }}
              >
                Option 2
              </sbb-autocomplete-grid-option>
              <sbb-autocomplete-grid-option
                .value=${{ property: 'Option 3', otherProperty: 'hello' }}
              >
                Option 3
              </sbb-autocomplete-grid-option>
            </sbb-autocomplete-grid-row>
          </sbb-autocomplete-grid>
        </sbb-form-field>`,
      );
      element = formField.querySelector('sbb-autocomplete-grid')!;
      input = formField.querySelector('input')!;
    });

    it('should select value', async () => {
      // Open autocomplete
      input.click();
      expect(element.isOpen).to.be.true;

      const option1 = element.querySelector('sbb-autocomplete-grid-option')!;
      expect(option1.value).to.deep.equal({
        property: 'Option 1',
        otherProperty: 'hello',
      });
      option1.click();

      expect(input.value).to.be.equal('Option 1');
      expect(optionSelectedSpy).to.have.been.calledOnce;
      expect(optionSelectedSpy.firstCall.args[0].target.value).to.deep.equal({
        property: 'Option 1',
        otherProperty: 'hello',
      });
    });
  });

  it('should handle focus when options are in a scroll area', async () => {
    formField = await fixture(html`
      <sbb-form-field>
        <input />
        <sbb-autocomplete-grid>
          ${repeat(
            new Array(30),
            (_, index) => html`
              <sbb-autocomplete-grid-row>
                <sbb-autocomplete-grid-option value=${index}>
                  Option ${index}
                </sbb-autocomplete-grid-option>
                <sbb-autocomplete-grid-cell>
                  <sbb-autocomplete-grid-button
                    icon-name="pen-small"
                  ></sbb-autocomplete-grid-button>
                </sbb-autocomplete-grid-cell>
              </sbb-autocomplete-grid-row>
            `,
          )}
        </sbb-autocomplete-grid>
      </sbb-form-field>
      <input id="after-autocomplete" />
    `);
    input = formField.querySelector<HTMLInputElement>('input')!;
    element = formField.querySelector<SbbAutocompleteGridElement>('sbb-autocomplete-grid')!;

    await sendKeys({ press: tabKey });
    expect(document.activeElement).to.be.equal(input);
    expect(element.isOpen).to.be.true;

    // In real browser, the focus would land in the scroll area of the options panel.
    // In Headless mode, this doesn't seem to happen.
    // Due to this fact, this test would also be green without the fix (tabindex=0).
    // We keep the test for consistency.
    await sendKeys({ press: tabKey });
    expect(document.activeElement).to.be.equal(
      formField.parentElement!.querySelector<HTMLInputElement>('input#after-autocomplete'),
    );
  });

  describe('form submission', () => {
    let form: HTMLFormElement, submitSpy: EventSpy<SubmitEvent>;

    beforeEach(async () => {
      form = await fixture(html`
        <form @submit=${(e: SubmitEvent) => e.preventDefault()}>
          <sbb-form-field>
            <input name="test-input" />
            <sbb-autocomplete-grid>
              <sbb-autocomplete-grid-row>
                <sbb-autocomplete-grid-option value="o1"> Option 1 </sbb-autocomplete-grid-option>
                <sbb-autocomplete-grid-cell>
                  <sbb-autocomplete-grid-button
                    icon-name="pen-small"
                  ></sbb-autocomplete-grid-button>
                </sbb-autocomplete-grid-cell>
              </sbb-autocomplete-grid-row>
            </sbb-autocomplete-grid>
          </sbb-form-field>
        </form>
      `);
      formField = form.querySelector<SbbFormFieldElement>('sbb-form-field')!;
      input = form.querySelector<HTMLInputElement>('input')!;
      element = form.querySelector<SbbAutocompleteGridElement>('sbb-autocomplete-grid')!;

      submitSpy = new EventSpy('submit', form);
    });

    it('should submit form on Enter press when not interacting with autocomplete', async () => {
      // Focus input and open autocomplete
      input.focus();
      expect(element.isOpen).to.be.true;
      expect(document.activeElement).to.be.equal(input);

      // Press Enter to submit form
      await sendKeys({ press: 'Enter' });
      await submitSpy.calledOnce();

      expect(submitSpy.count).to.be.equal(1);
    });

    it('should avoid submitting form on Enter press when autocomplete is opened', async () => {
      // Focus input and open autocomplete
      input.focus();
      expect(element.isOpen).to.be.true;
      expect(document.activeElement).to.be.equal(input);

      // Interact with autocomplete
      await sendKeys({ press: 'ArrowDown' });

      // Press Enter to submit form
      await sendKeys({ press: 'Enter' });
      await aTimeout(10);

      expect(submitSpy.count).to.be.equal(0);
    });
  });
});
