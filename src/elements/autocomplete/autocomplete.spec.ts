import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import { type SinonSpy, spy } from 'sinon';

import { isSafari } from '../core/dom.js';
import { fixture, tabKey } from '../core/testing/private.js';
import { describeIf, EventSpy, waitForLitRender } from '../core/testing.js';
import { SbbFormFieldElement } from '../form-field.js';
import { SbbOptionElement } from '../option.js';

import { SbbAutocompleteElement } from './autocomplete.component.js';

describe(`sbb-autocomplete`, () => {
  let element: SbbAutocompleteElement, formField: SbbFormFieldElement, input: HTMLInputElement;

  beforeEach(async () => {
    formField = await fixture(html`
      <sbb-form-field>
        <input />
        <sbb-autocomplete id="myAutocomplete">
          <sbb-option id="option-1" value="1">1</sbb-option>
          <sbb-option id="option-2" value="2">2</sbb-option>
          <sbb-option id="option-3" value="3">3</sbb-option>
        </sbb-autocomplete>
      </sbb-form-field>
      <button>Use this for backdrop click</button>
    `);
    input = formField.querySelector<HTMLInputElement>('input')!;
    element = formField.querySelector<SbbAutocompleteElement>('sbb-autocomplete')!;
  });

  describeIf(isSafari, 'Safari', async () => {
    it('renders and sets the correct attributes', () => {
      assert.instanceOf(formField, SbbFormFieldElement);
      assert.instanceOf(element, SbbAutocompleteElement);

      expect(element).not.to.have.attribute('autocomplete-origin-borderless');

      expect(input).to.have.attribute('autocomplete', 'off');
      expect(input).to.have.attribute('role', 'combobox');
      expect(input).to.have.attribute('aria-autocomplete', 'list');
      expect(input).to.have.attribute('aria-haspopup', 'listbox');
      expect(input).to.have.attribute('aria-controls', element.id);
      expect(input).to.have.attribute('aria-owns', element.id);
      expect(input).to.have.attribute('aria-expanded', 'false');
    });
  });

  describeIf(!isSafari, 'Chrome-Firefox', async () => {
    it('renders and sets the correct attributes', () => {
      assert.instanceOf(formField, SbbFormFieldElement);
      assert.instanceOf(element, SbbAutocompleteElement);

      expect(element).not.to.have.attribute('autocomplete-origin-borderless');

      const id = element.shadowRoot!.querySelector('.sbb-autocomplete__options')!.id;

      expect(input).to.have.attribute('autocomplete', 'off');
      expect(input).to.have.attribute('role', 'combobox');
      expect(input).to.have.attribute('aria-autocomplete', 'list');
      expect(input).to.have.attribute('aria-haspopup', 'listbox');
      expect(input).to.have.attribute('aria-controls', id);
      expect(input).to.have.attribute('aria-owns', id);
      expect(input).to.have.attribute('aria-expanded', 'false');
    });
  });

  it('should have form-field as origin when not defined otherwise', async () => {
    expect(element.originElement).to.be.equal(
      formField.shadowRoot?.querySelector?.('#overlay-anchor'),
    );
  });

  it('opens and closes with mouse and keyboard', async () => {
    const beforeOpenSpy = new EventSpy(SbbAutocompleteElement.events.beforeopen, element);
    const openSpy = new EventSpy(SbbAutocompleteElement.events.open, element);
    const beforeCloseSpy = new EventSpy(SbbAutocompleteElement.events.beforeclose, element);
    const closeSpy = new EventSpy(SbbAutocompleteElement.events.close, element);

    input.focus();

    await beforeOpenSpy.calledOnce();
    expect(beforeOpenSpy.count).to.be.equal(1);

    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);
    expect(input).to.have.attribute('aria-expanded', 'true');
    expect(input).to.have.attribute('data-expanded');
    expect(element).to.match(':popover-open');

    await sendKeys({ press: 'Escape' });
    await beforeCloseSpy.calledOnce();
    expect(beforeCloseSpy.count).to.be.equal(1);
    await closeSpy.calledOnce();
    expect(closeSpy.count).to.be.equal(1);
    expect(input).to.have.attribute('aria-expanded', 'false');
    expect(input).not.to.have.attribute('data-expanded');
    expect(element).not.to.match(':popover-open');

    await sendKeys({ press: 'ArrowDown' });
    await beforeOpenSpy.calledTimes(2);
    expect(beforeOpenSpy.count).to.be.equal(2);
    await openSpy.calledTimes(2);
    expect(openSpy.count).to.be.equal(2);
    expect(input).to.have.attribute('aria-expanded', 'true');
    expect(input).to.have.attribute('data-expanded');

    await sendKeys({ press: tabKey });
    await beforeCloseSpy.calledTimes(2);
    expect(beforeCloseSpy.count).to.be.equal(2);
    await closeSpy.calledTimes(2);
    expect(closeSpy.count).to.be.equal(2);
    expect(input).to.have.attribute('aria-expanded', 'false');
    expect(input).not.to.have.attribute('data-expanded');

    input.click();
    await beforeOpenSpy.calledTimes(3);
    expect(beforeOpenSpy.count).to.be.equal(3);
    await openSpy.calledTimes(3);
    expect(openSpy.count).to.be.equal(3);
    expect(input).to.have.attribute('aria-expanded', 'true');
    expect(input).to.have.attribute('data-expanded');

    // Simulate backdrop click
    await sendMouse({ type: 'click', position: [formField.offsetWidth + 25, 25] });

    await beforeCloseSpy.calledTimes(3);
    expect(beforeCloseSpy.count).to.be.equal(3);
    await closeSpy.calledTimes(3);
    expect(closeSpy.count).to.be.equal(3);
    expect(input).to.have.attribute('aria-expanded', 'false');
    expect(element).not.to.have.attribute('data-expanded');
  });

  it('deactivates later disabled options when already active', async () => {
    const openSpy = new EventSpy(SbbAutocompleteElement.events.open, element);

    input.focus();
    await openSpy.calledOnce();

    await sendKeys({ press: 'ArrowDown' });
    const optOne = element.querySelector<SbbOptionElement>('#option-1')!;

    expect(optOne).to.have.attribute('data-active');
    optOne.disabled = true;
    await waitForLitRender(element);

    expect(optOne).not.to.have.attribute('data-active');
  });

  it('ignores later removed option', async () => {
    const openSpy = new EventSpy(SbbAutocompleteElement.events.open, element);
    const optOne = element.querySelector<SbbOptionElement>('#option-1')!;
    const optTwo = element.querySelector<SbbOptionElement>('#option-2')!;
    const optThree = element.querySelector<SbbOptionElement>('#option-3')!;

    input.focus();
    await openSpy.calledOnce();
    await sendKeys({ press: 'ArrowDown' });

    expect(optOne).to.have.attribute('data-active');

    optOne.remove();
    optTwo.remove();
    await waitForLitRender(element);

    await sendKeys({ press: 'ArrowDown' });
    expect(optThree).to.have.attribute('data-active');
  });

  it('opens and closes with non-zero animation duration', async () => {
    element.style.setProperty('--sbb-options-panel-animation-duration', '1ms');
    const openSpy = new EventSpy(SbbAutocompleteElement.events.open, element);
    const closeSpy = new EventSpy(SbbAutocompleteElement.events.close, element);

    input.focus();

    await openSpy.calledOnce();
    expect(input).to.have.attribute('aria-expanded', 'true');

    await sendKeys({ press: 'Escape' });
    await closeSpy.calledOnce();

    expect(input).to.have.attribute('aria-expanded', 'false');
  });

  it('select by mouse', async () => {
    const openSpy = new EventSpy(SbbAutocompleteElement.events.open, element);
    const optionSelectedSpy = new EventSpy(SbbOptionElement.events.optionselected);
    const inputEventSpy = new EventSpy('input', input);
    const changeEventSpy = new EventSpy('change', input);
    const inputAutocompleteSpy = new EventSpy('inputAutocomplete', input);
    const optTwo = element.querySelector<SbbOptionElement>('#option-2')!;

    input.focus();
    await openSpy.calledOnce();

    const positionRect = optTwo.getBoundingClientRect();

    await sendMouse({
      type: 'click',
      position: [
        Math.round(positionRect.x + window.scrollX + positionRect.width / 2),
        Math.round(positionRect.y + window.scrollY + positionRect.height / 2),
      ],
    });
    await waitForLitRender(element);

    expect(inputEventSpy.count).to.be.equal(1);
    expect(changeEventSpy.count).to.be.equal(1);
    expect(inputAutocompleteSpy.count).to.be.equal(1);
    expect(optionSelectedSpy.count).to.be.equal(1);
    expect(optionSelectedSpy.firstEvent!.target).to.have.property('id', 'option-2');
    expect(document.activeElement).to.be.equal(input);
  });

  it('opens and select with keyboard', async () => {
    const openSpy = new EventSpy(SbbAutocompleteElement.events.open, element);
    const closeSpy = new EventSpy(SbbAutocompleteElement.events.close, element);
    const optionSelectedSpy = new EventSpy(SbbOptionElement.events.optionselected);
    const inputEventSpy = new EventSpy('input', input);
    const changeEventSpy = new EventSpy('change', input);
    const inputAutocompleteSpy = new EventSpy('inputAutocomplete', input);
    const optOne = element.querySelector<SbbOptionElement>('#option-1');
    const optTwo = element.querySelector<SbbOptionElement>('#option-2');
    const keydownSpy = new EventSpy('keydown', input);

    input.focus();
    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);

    await sendKeys({ press: 'ArrowDown' });
    await sendKeys({ press: 'ArrowDown' });
    await waitForLitRender(element);
    expect(optOne).not.to.have.attribute('data-active');
    expect(optOne).not.to.have.attribute('selected');
    expect(optTwo).to.have.attribute('data-active');
    expect(optTwo).not.to.have.attribute('selected');
    expect(input).to.have.attribute('aria-activedescendant', 'option-2');

    await sendKeys({ press: 'Enter' });
    await closeSpy.calledOnce();
    expect(closeSpy.count).to.be.equal(1);
    expect(keydownSpy.lastEvent?.defaultPrevented).to.be.true;

    expect(optTwo).not.to.have.attribute('data-active');
    expect(optTwo).to.have.attribute('selected');
    expect(inputEventSpy.count).to.be.equal(1);
    expect(changeEventSpy.count).to.be.equal(1);
    expect(inputAutocompleteSpy.count).to.be.equal(1);
    expect(optionSelectedSpy.count).to.be.equal(1);
    expect(input).to.have.attribute('aria-expanded', 'false');
    expect(input).not.to.have.attribute('aria-activedescendant');
  });

  describe('autoActiveFirstOption', () => {
    function assertActiveOption(option: SbbOptionElement): void {
      expect(option).to.have.attribute('data-active');
      expect(option).not.to.have.attribute('selected');
      expect(input).to.have.attribute('aria-activedescendant', option.id);
    }

    function assertInactiveOption(option: SbbOptionElement): void {
      expect(option).not.to.have.attribute('data-active');
      expect(option).not.to.have.attribute('selected');
      expect(input).not.to.have.attribute('aria-activedescendant', option.id);
    }

    beforeEach(async () => {
      element.autoActiveFirstOption = true;
      await waitForLitRender(element);
    });

    it('updates on open', async () => {
      const openSpy = new EventSpy(SbbAutocompleteElement.events.open, element);
      const optOne = element.querySelector<SbbOptionElement>('#option-1')!;

      input.focus();
      await openSpy.calledOnce();

      assertActiveOption(optOne);
    });

    it('updates on new option', async () => {
      const openSpy = new EventSpy(SbbAutocompleteElement.events.open, element);

      input.focus();
      await openSpy.calledOnce();

      const newOption = document.createElement('sbb-option');
      newOption.id = 'option-4';
      newOption.value = '4';
      newOption.textContent = 'Option 4';
      element.prepend(newOption);
      await waitForLitRender(element);

      assertActiveOption(newOption);
    });

    it('updates on newly disabled option', async () => {
      const openSpy = new EventSpy(SbbAutocompleteElement.events.open, element);
      const optOne = element.querySelector<SbbOptionElement>('#option-1')!;
      const optTwo = element.querySelector<SbbOptionElement>('#option-2')!;

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

      const openSpy = new EventSpy(SbbAutocompleteElement.events.open, element);
      const optOne = element.querySelector<SbbOptionElement>('#option-1')!;

      input.focus();
      await openSpy.calledOnce();

      assertInactiveOption(optOne);

      element.autoActiveFirstOption = true;
      await waitForLitRender(element);

      assertActiveOption(optOne);
    });
  });

  describe('autoSelectActiveOption', () => {
    beforeEach(async () => {
      element.autoSelectActiveOption = true;
      await waitForLitRender(element);
    });

    it('should open and select with arrow keys only', async () => {
      const openSpy = new EventSpy(SbbAutocompleteElement.events.open, element);
      const changeEventSpy = new EventSpy('change', input);
      const inputAutocompleteSpy = new EventSpy('inputAutocomplete', input);
      const optOne = element.querySelector<SbbOptionElement>('#option-1');
      const optTwo = element.querySelector<SbbOptionElement>('#option-2');

      input.focus();
      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);

      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);
      expect(optOne).to.have.attribute('data-active');
      expect(optOne).to.have.attribute('selected');
      expect(input).to.have.attribute('aria-activedescendant', 'option-1');
      expect(input).to.have.attribute('aria-expanded', 'true');
      expect(input.value).to.be.equal('1');
      expect(changeEventSpy.count).to.be.equal(1);
      expect(inputAutocompleteSpy.count).to.be.equal(1);

      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);
      expect(optOne).not.to.have.attribute('data-active');
      expect(optOne).not.to.have.attribute('selected');
      expect(optTwo).to.have.attribute('data-active');
      expect(optTwo).to.have.attribute('selected');
      expect(input).to.have.attribute('aria-activedescendant', 'option-2');
      expect(input).to.have.attribute('aria-expanded', 'true');
      expect(input.value).to.be.equal('2');
      expect(changeEventSpy.count).to.be.equal(2);
      expect(inputAutocompleteSpy.count).to.be.equal(2);
    });
  });

  it('should not close on disabled option click', async () => {
    const openSpy = new EventSpy(SbbAutocompleteElement.events.open, element);
    const optOne = element.querySelector<SbbOptionElement>('#option-1')!;
    optOne.disabled = true;

    input.focus();
    await openSpy.calledOnce();

    optOne.click();

    await aTimeout(0);
    expect(element).to.have.attribute('data-state', 'opened');
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
    const beforeOpenSpy = new EventSpy(SbbAutocompleteElement.events.beforeopen, element);
    const openSpy = new EventSpy(SbbAutocompleteElement.events.open, element);
    const beforeCloseSpy = new EventSpy(SbbAutocompleteElement.events.beforeclose, element);
    const closeSpy = new EventSpy(SbbAutocompleteElement.events.close, element);

    input.focus();

    await beforeOpenSpy.calledOnce();
    expect(beforeOpenSpy.count).to.be.equal(1);
    await openSpy.calledOnce();
    expect(openSpy.count).to.be.equal(1);
    expect(input).to.have.attribute('aria-expanded', 'true');
    expect(input).to.have.attribute('data-expanded');
    expect(element).to.match(':popover-open');

    input.toggleAttribute('disabled', true);

    await beforeCloseSpy.calledOnce();
    expect(beforeCloseSpy.count).to.be.equal(1);
    await closeSpy.calledOnce();
    expect(closeSpy.count).to.be.equal(1);
    expect(input).to.have.attribute('aria-expanded', 'false');
    expect(input).not.to.have.attribute('data-expanded');
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
    const beforeOpenSpy = new EventSpy(SbbAutocompleteElement.events.beforeopen, element);

    element.addEventListener(SbbAutocompleteElement.events.beforeopen, (ev) => ev.preventDefault());
    element.open();

    await beforeOpenSpy.calledOnce();
    expect(beforeOpenSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('does not close if prevented', async () => {
    const openSpy = new EventSpy(SbbAutocompleteElement.events.open, element);
    const beforeCloseSpy = new EventSpy(SbbAutocompleteElement.events.beforeclose, element);

    element.open();
    await openSpy.calledOnce();
    await waitForLitRender(element);

    element.addEventListener(SbbAutocompleteElement.events.beforeclose, (ev) =>
      ev.preventDefault(),
    );
    element.close();

    await beforeCloseSpy.calledOnce();
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
  });

  it('opens when new options are slotted', async () => {
    const openSpy = new EventSpy(SbbAutocompleteElement.events.open, element);
    const closeSpy = new EventSpy(SbbAutocompleteElement.events.close, element);

    input.focus();

    await openSpy.calledOnce();
    expect(input).to.have.attribute('aria-expanded', 'true');

    // Remove all the options
    element.querySelectorAll('sbb-option').forEach((option) => option.remove());

    // Should close automatically
    await closeSpy.calledOnce();
    expect(input).to.have.attribute('aria-expanded', 'false');

    // Add a new option
    const newOption = document.createElement('sbb-option');
    newOption.setAttribute('value', 'value');
    element.append(newOption);

    // Should open automatically
    await openSpy.calledTimes(2);
    expect(input).to.have.attribute('aria-expanded', 'true');
  });

  it('stays closed when option count increases', async () => {
    const openSpy = new EventSpy(SbbAutocompleteElement.events.open, element);
    const closeSpy = new EventSpy(SbbAutocompleteElement.events.close, element);

    input.focus();
    await openSpy.calledOnce();
    expect(input).to.have.attribute('aria-expanded', 'true');

    element.close();
    await closeSpy.calledOnce();

    // Add a new option
    const newOption = document.createElement('sbb-option');
    newOption.setAttribute('value', 'value');
    element.append(newOption);
    await waitForLitRender(element);

    // Should stay close
    await openSpy.calledOnce();
    expect(input).to.have.attribute('aria-expanded', 'false');
  });

  it('recalculate position when option list changes', async () => {
    // Set up the autocomplete to the bottom of the page and add a listener on it which removes every option except the first one.
    formField.parentElement?.style.setProperty('inset-block-end', '2rem');
    formField.parentElement?.style.setProperty('inset-inline-start', '2rem');
    formField.parentElement?.style.setProperty('position', 'absolute');
    formField.parentElement?.style.setProperty('max-width', 'calc(100% - 4rem)');
    const optFn = (): void => {
      element
        .querySelectorAll('sbb-option')
        .forEach((option, index) => index !== 0 && option.remove());
    };

    const openSpy = new EventSpy(SbbAutocompleteElement.events.open, element);
    input.addEventListener('input', optFn);
    input.focus();
    await openSpy.calledOnce();
    expect(input).to.have.attribute('aria-expanded', 'true');
    expect(
      getComputedStyle(element).getPropertyValue('--sbb-options-panel-position-y'),
    ).to.be.equal('344px');

    // Simulate the options' removal and check again position
    await sendKeys({ press: 'a' });
    expect(
      getComputedStyle(element).getPropertyValue('--sbb-options-panel-position-y'),
    ).to.be.equal('540px');

    // Clean up env
    element.close();
    input.removeEventListener('input', optFn);
    formField.parentElement?.style.setProperty('inset-block-end', '');
    formField.parentElement?.style.setProperty('inset-inline-start', '');
    formField.parentElement?.style.setProperty('position', '');
    formField.parentElement?.style.setProperty('max-width', '');
  });

  it('should sync form-field size change', async () => {
    const openSpy = new EventSpy(SbbAutocompleteElement.events.open, element);

    element.open();
    await waitForLitRender(element);
    await openSpy.calledOnce();

    formField.size = 's';
    await waitForLitRender(element);

    expect(element.size).to.be.equal('s');
  });

  describe('trigger connection', () => {
    beforeEach(async () => {
      const root = await fixture(
        html`<div>
          <sbb-autocomplete trigger="autocomplete-trigger">
            <sbb-option id="option-1" value="1">1</sbb-option>
          </sbb-autocomplete>
          <input id="autocomplete-trigger" />
        </div>`,
      );
      formField = root.querySelector('sbb-form-field')!;
      input = root.querySelector('input')!;
      element = root.querySelector('sbb-autocomplete')!;
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
          <sbb-autocomplete trigger="autocomplete-trigger" origin="autocomplete-origin">
            <sbb-option id="option-1" value="1">1</sbb-option>
          </sbb-autocomplete>
          <div id="autocomplete-origin">Origin 1</div>
          <div id="autocomplete-origin-2">Origin 2</div>
          <input id="autocomplete-trigger" />
          <input id="autocomplete-trigger-2" />
        </div>`,
      );
      element = root.querySelector('sbb-autocomplete')!;
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
      expect(element.trigger).to.be.equal(input);

      element.trigger = root.querySelector<HTMLInputElement>('#autocomplete-trigger-2')!;
      await waitForLitRender(element);
      expect(element.trigger!.id).to.be.equal(element.originElement!.id);

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
          <sbb-autocomplete
            @optionselected=${(e: Event) => optionSelectedSpy(e)}
            .displayWith=${(o: { property: string; otherProperty: string }) => o.property}
          >
            <sbb-option .value=${{ property: 'Option 1', otherProperty: 'hello' }}>
              Option 1
            </sbb-option>
            <sbb-option .value=${{ property: 'Option 2', otherProperty: 'hello' }}>
              Option 2
            </sbb-option>
            <sbb-option .value=${{ property: 'Option 3', otherProperty: 'hello' }}>
              Option 3
            </sbb-option>
          </sbb-autocomplete>
        </sbb-form-field>`,
      );
      element = formField.querySelector('sbb-autocomplete')!;
      input = formField.querySelector('input')!;
    });

    it('should select value', async () => {
      // Open autocomplete
      input.click();
      expect(element.isOpen).to.be.true;

      const option1 = element.querySelector('sbb-option')!;
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
});
