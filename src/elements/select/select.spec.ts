import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { repeat } from 'lit/directives/repeat.js';
import { html } from 'lit/static-html.js';
import type { Context } from 'mocha';

import { fixture, tabKey } from '../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../core/testing.ts';
import type { SbbFormFieldElement } from '../form-field.ts';
import { SbbOptionElement } from '../option.ts';

import { SbbSelectElement } from './select.component.ts';

import '../form-field.ts';

describe(`sbb-select`, () => {
  let element: SbbSelectElement, root: HTMLDivElement;

  const displayValue = (): string => {
    const displayValueElement = element.shadowRoot!.querySelector('.sbb-select__trigger')!;
    return displayValueElement.textContent?.trim();
  };

  describe('common behavior', () => {
    let focusableElement: HTMLElement,
      firstOption: SbbOptionElement,
      secondOption: SbbOptionElement,
      thirdOption: SbbOptionElement,
      comboBoxElement: HTMLElement;

    beforeEach(async () => {
      root = await fixture(html`
        <div id="parent">
          <sbb-select placeholder="Placeholder">
            <sbb-option id="option-1" value="1">First</sbb-option>
            <sbb-option id="option-2" value="2">Second</sbb-option>
            <sbb-option id="option-3" value="3">Third</sbb-option>
          </sbb-select>
          <button>Other button to focus</button>
        </div>
      `);
      element = root.querySelector<SbbSelectElement>('sbb-select')!;

      comboBoxElement = root.querySelector('[role="combobox"]')!;
      focusableElement = comboBoxElement;
      firstOption = element.querySelector<SbbOptionElement>('#option-1')!;
      secondOption = element.querySelector<SbbOptionElement>('#option-2')!;
      thirdOption = element.querySelector<SbbOptionElement>('#option-3')!;
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbSelectElement);
      assert.instanceOf(firstOption, SbbOptionElement);
    });

    it('opens and closes the select', async () => {
      const beforeOpenSpy = new EventSpy(SbbSelectElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbSelectElement.events.open, element);
      const beforeCloseSpy = new EventSpy(SbbSelectElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbSelectElement.events.close, element);
      const overlayContainerElement = element.shadowRoot!.querySelector('.sbb-select__container')!;

      element.dispatchEvent(new PointerEvent('click'));
      await waitForLitRender(element);
      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);
      await openSpy.calledOnce();

      expect(openSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(comboBoxElement).to.have.attribute('aria-expanded', 'true');
      expect(element).to.match(':state(expanded)');
      expect(overlayContainerElement).to.match(':popover-open');

      element.dispatchEvent(new PointerEvent('click'));
      await waitForLitRender(element);
      await beforeCloseSpy.calledOnce();
      expect(beforeCloseSpy.count).to.be.equal(1);
      await closeSpy.calledOnce();

      expect(closeSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(comboBoxElement).to.have.attribute('aria-expanded', 'false');
      expect(element).not.to.match(':state(expanded)');
      expect(overlayContainerElement).not.to.match(':popover-open');
    });

    it('opens and closes the select with non-zero animation duration', async function (this: Context) {
      // Flaky on WebKit
      this.retries(3);
      (globalThis as { disableAnimation?: boolean }).disableAnimation = false;

      element.style.setProperty('--sbb-options-panel-animation-duration', '1ms');

      const open = new EventSpy(SbbSelectElement.events.open, element);
      const closeSpy = new EventSpy(SbbSelectElement.events.close, element);

      element.dispatchEvent(new PointerEvent('click'));
      await waitForLitRender(element);
      await open.calledOnce();

      expect(comboBoxElement).to.have.attribute('aria-expanded', 'true');

      element.dispatchEvent(new PointerEvent('click'));
      await waitForLitRender(element);
      await closeSpy.calledOnce();

      expect(comboBoxElement).to.have.attribute('aria-expanded', 'false');
    });

    it('closes the select by option click', async function (this: Context) {
      // Flaky on WebKit
      this.retries(3);
      const open = new EventSpy(SbbSelectElement.events.open, element);
      const closeSpy = new EventSpy(SbbSelectElement.events.close, element);

      element.dispatchEvent(new PointerEvent('click'));
      await waitForLitRender(element);
      await open.calledOnce();

      expect(comboBoxElement).to.have.attribute('aria-expanded', 'true');

      firstOption.click();
      await waitForLitRender(element);
      await closeSpy.calledOnce();

      expect(comboBoxElement).to.have.attribute('aria-expanded', 'false');
      expect(element.value).to.be.equal('1');
    });

    it('closes the select by option click with non-zero animation duration', async function (this: Context) {
      (globalThis as { disableAnimation?: boolean }).disableAnimation = false;

      element.style.setProperty('--sbb-options-panel-animation-duration', '1ms');

      const open = new EventSpy(SbbSelectElement.events.open, element);
      const closeSpy = new EventSpy(SbbSelectElement.events.close, element);

      element.dispatchEvent(new PointerEvent('click'));
      await waitForLitRender(element);
      await open.calledOnce();

      expect(comboBoxElement).to.have.attribute('aria-expanded', 'true');

      firstOption.click();
      await waitForLitRender(element);
      await closeSpy.calledOnce();

      expect(comboBoxElement).to.have.attribute('aria-expanded', 'false');
      expect(element.value).to.be.equal('1');
    });

    it('displays placeholder if no value is set and there is no selected element', async () => {
      expect(element.value).to.be.null;
      const placeholder = element.shadowRoot!.querySelector('.sbb-select__trigger--placeholder');
      expect(placeholder).not.to.be.null;
      expect(placeholder).to.have.trimmed.text('Placeholder');
    });

    it("displays value if it's set, or placeholder if value doesn't match available options", async () => {
      expect(displayValue()).to.be.equal('Placeholder');

      element.value = '1';
      await waitForLitRender(element);
      await waitForLitRender(element);
      expect(element.getDisplayValue()).to.be.equal('First');
      expect(firstOption).to.have.attribute('selected');
      expect(secondOption).not.to.have.attribute('selected');
      expect(thirdOption).not.to.have.attribute('selected');

      element.value = '000000000';
      await waitForLitRender(element);
      await waitForLitRender(element);
      expect(displayValue()).to.be.equal('Placeholder');
      expect(firstOption).not.to.have.attribute('selected');
      expect(secondOption).not.to.have.attribute('selected');
      expect(thirdOption).not.to.have.attribute('selected');
    });

    it("displays joined string if both multiple and value props are set, or placeholder if value doesn't match available options", async () => {
      expect(displayValue()).to.be.equal('Placeholder');
      element.toggleAttribute('multiple', true);
      element.value = ['1', '3'];
      await waitForLitRender(element);
      expect(element.getDisplayValue()).to.be.equal('First, Third');
      expect(firstOption).to.have.attribute('selected');
      expect(secondOption).not.to.have.attribute('selected');
      expect(thirdOption).to.have.attribute('selected');

      /**
       * Custom implementation
       * If an invalid value is set, we keep it and show the empty placeholder.
       * Meanwhile, the native select ignores it and set an empty value.
       */
      element.value = '000000000';
      await waitForLitRender(element);
      expect(element.value).to.be.equal('000000000');
      expect(displayValue()).to.be.equal('Placeholder');
      expect(firstOption).not.to.have.attribute('selected');
      expect(secondOption).not.to.have.attribute('selected');
      expect(thirdOption).not.to.have.attribute('selected');
    });

    it("displays value if it's set with 'wrong' selected attributes on sbb-options", async () => {
      const root = await fixture(html`
        <div id="parent">
          <sbb-select value="2">
            <sbb-option id="option-1" value="1" selected>First</sbb-option>
            <sbb-option id="option-2" value="2">Second</sbb-option>
            <sbb-option id="option-3" value="3" selected>Third</sbb-option>
          </sbb-select>
        </div>
      `);
      element = root.querySelector<SbbSelectElement>('sbb-select')!;

      const firstOption = element.querySelector('#option-1');
      const secondOption = element.querySelector('#option-2');
      const thirdOption = element.querySelector('#option-3');

      expect(element.value).to.be.equal('2');
      expect(element.getDisplayValue()).to.be.equal('Second');
      expect(firstOption).not.to.have.attribute('selected');
      expect(secondOption).to.have.attribute('selected');
      expect(thirdOption).not.to.have.attribute('selected');
    });

    it('displays selected sbb-option if no value is set, then handles selection', async () => {
      const root = await fixture(html`
        <div id="parent2">
          <sbb-select>
            <sbb-option id="option-1" value="1" selected>First</sbb-option>
            <sbb-option id="option-2" value="2">Second</sbb-option>
            <sbb-option id="option-3" value="3">Third</sbb-option>
          </sbb-select>
        </div>
      `);
      element = root.querySelector<SbbSelectElement>('sbb-select')!;
      comboBoxElement = root.querySelector('[role="combobox"]')!;
      focusableElement = comboBoxElement;

      expect(element.getDisplayValue()).to.be.equal('First');
      expect(element.value).to.be.equal('1');

      const beforeOpenSpy = new EventSpy(SbbSelectElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbSelectElement.events.open, element);
      element.click();

      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);
      await openSpy.calledOnce();

      expect(openSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      firstOption = element.querySelector<SbbOptionElement>('#option-1')!;
      expect(firstOption).not.to.match(':state(active)');
      expect(firstOption).to.have.attribute('selected');
      secondOption = element.querySelector<SbbOptionElement>('#option-2')!;
      expect(secondOption).not.to.match(':state(active)');
      expect(secondOption).not.to.have.attribute('selected');

      const selectionChange = new EventSpy(SbbOptionElement.events.optionselectionchange);
      const optionSelected = new EventSpy(SbbOptionElement.events.optionselected);
      const beforeClose = new EventSpy(SbbSelectElement.events.beforeclose, element);
      const closeSpy = new EventSpy(SbbSelectElement.events.close, element);

      secondOption.click();
      await waitForLitRender(element);

      // Event received, panel is closed
      expect(selectionChange.count).to.be.equal(1);
      expect(optionSelected.count).to.be.equal(1);

      await beforeClose.calledOnce();
      expect(beforeClose.count).to.be.equal(1);
      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element.value).to.be.equal('2');
      expect(comboBoxElement).to.have.attribute('aria-expanded', 'false');
    });

    it('displays initially selected option', async () => {
      const root = await fixture(html`
        <div id="parent3">
          <sbb-select value=${'3'}> </sbb-select>
        </div>
      `);
      element = root.querySelector<SbbSelectElement>('sbb-select')!;

      const opt3 = document.createElement('sbb-option');
      opt3.textContent = 'Third';
      opt3.value = '3';
      element.appendChild(opt3);

      await waitForLitRender(root);
      await waitForLitRender(root);

      expect(element.value).to.be.equal('3');
      expect(element.getDisplayValue()).to.be.equal('Third');
    });

    it('handles selection in multiple', async () => {
      element.toggleAttribute('multiple', true);
      await waitForLitRender(element);

      const beforeOpenSpy = new EventSpy(SbbSelectElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbSelectElement.events.open, element);
      element.dispatchEvent(new PointerEvent('click'));

      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);
      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);
      await waitForLitRender(element);
      expect(firstOption).not.to.match(':state(active)');
      expect(firstOption).not.to.have.attribute('selected');
      expect(secondOption).not.to.match(':state(active)');
      expect(secondOption).not.to.have.attribute('selected');

      const selectionChange = new EventSpy(SbbOptionElement.events.optionselectionchange);
      firstOption.dispatchEvent(new PointerEvent('click'));
      await waitForLitRender(element);
      expect(selectionChange.count).to.be.equal(1);
      expect(element.value).to.be.eql(['1']);
      expect(element.getDisplayValue()).to.be.equal('First');

      secondOption.dispatchEvent(new PointerEvent('click'));
      await waitForLitRender(element);
      expect(selectionChange.count).to.be.equal(2);
      expect(element.value).to.be.eql(['1', '2']);
      expect(element.getDisplayValue()).to.be.equal('First, Second');

      firstOption.dispatchEvent(new PointerEvent('click'));
      await waitForLitRender(element);
      expect(element.value).to.be.eql(['2']);
      secondOption.dispatchEvent(new PointerEvent('click'));
      await waitForLitRender(element);
      expect(element.value).to.be.eql([]);
      expect(displayValue()).to.be.equal('Placeholder');
      // Panel is still open
      expect(comboBoxElement).to.have.attribute('aria-expanded', 'true');
    });

    it('update multiple attribute', async () => {
      const open = new EventSpy(SbbSelectElement.events.open, element);
      element.dispatchEvent(new PointerEvent('click'));
      await open.calledOnce();
      expect(open.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element.value).to.be.equal(null);
      element.toggleAttribute('multiple', true);
      await waitForLitRender(element);
      expect(element.value).to.be.eql([]);
      element.toggleAttribute('multiple', false);
      await waitForLitRender(element);
      expect(element.value).to.be.equal(null);

      firstOption.dispatchEvent(new PointerEvent('click'));
      await waitForLitRender(element);
      expect(element.value).to.be.eql('1');
      element.toggleAttribute('multiple', true);
      await waitForLitRender(element);
      expect(element.value).to.be.eql(['1']);

      firstOption.dispatchEvent(new PointerEvent('click'));
      thirdOption.dispatchEvent(new PointerEvent('click'));
      secondOption.dispatchEvent(new PointerEvent('click'));
      await waitForLitRender(element);

      expect(element.value).to.be.eql(['3', '2']);
      element.toggleAttribute('multiple', false);
      await waitForLitRender(element);
      expect(element.value).to.be.eql('3');
    });

    it('close the panel if disabled', async () => {
      const open = new EventSpy(SbbSelectElement.events.open, element);
      const closeSpy = new EventSpy(SbbSelectElement.events.close, element);
      element.dispatchEvent(new PointerEvent('click'));
      await open.calledOnce();
      expect(open.count).to.be.equal(1);
      await waitForLitRender(element);

      element.toggleAttribute('disabled', true);
      await waitForLitRender(element);

      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);
    });

    it('close the panel if readonly', async () => {
      const openSpy = new EventSpy(SbbSelectElement.events.open, element);
      const closeSpy = new EventSpy(SbbSelectElement.events.close, element);
      element.dispatchEvent(new PointerEvent('click'));
      await openSpy.calledOnce();

      element.toggleAttribute('readonly', true);
      await waitForLitRender(element);

      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);
    });

    it('avoid opening the panel if readonly', async () => {
      element.toggleAttribute('readonly', true);
      await waitForLitRender(element);

      element.dispatchEvent(new PointerEvent('click'));
      expect(element.isOpen).to.be.equal(false);
    });

    it('handles keypress on host', async () => {
      const openSpy = new EventSpy(SbbSelectElement.events.open, element);
      const closeSpy = new EventSpy(SbbSelectElement.events.close, element);

      focusableElement.focus();
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(element);
      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);

      await sendKeys({ press: 'Escape' });
      await waitForLitRender(element);
      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);

      await sendKeys({ press: 'ArrowDown' });
      await openSpy.calledTimes(2);
      expect(openSpy.count).to.be.equal(2);

      await sendKeys({ press: tabKey });
      await closeSpy.calledTimes(2);
      expect(closeSpy.count).to.be.equal(2);

      focusableElement.focus();
      await sendKeys({ press: 'F' });
      await waitForLitRender(element);
      expect(openSpy.count).to.be.equal(2);
      expect(closeSpy.count).to.be.equal(2);
      expect(element.getDisplayValue()).to.be.equal('First');

      await aTimeout(1100); // wait for the reset of _searchString timeout

      await sendKeys({ press: 'S' });
      await waitForLitRender(element);
      expect(openSpy.count).to.be.equal(2);
      expect(closeSpy.count).to.be.equal(2);
      expect(element.getDisplayValue()).to.be.equal('Second');
    });

    it('handles keyboard selection', async () => {
      const openSpy = new EventSpy(SbbSelectElement.events.open, element);
      focusableElement.focus();
      await sendKeys({ press: ' ' });
      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);
      expect(firstOption).not.to.match(':state(active)');
      expect(firstOption).not.to.have.attribute('selected');

      await sendKeys({ press: 'ArrowDown' });
      expect(firstOption).to.match(':state(active)');
      expect(firstOption).to.have.attribute('selected');
      expect(element.value).to.be.equal('1');
      expect(element.getDisplayValue()).to.be.equal('First');
      expect(comboBoxElement).to.have.attribute('aria-expanded', 'true');

      await sendKeys({ press: 'T' });
      await waitForLitRender(element);
      expect(openSpy.count).to.be.equal(1);
      expect(element.getDisplayValue()).to.be.equal('Third');
      expect(thirdOption).to.match(':state(active)');
      expect(thirdOption).to.have.attribute('selected');
      expect(element.value).to.be.equal('3');

      await aTimeout(1100); // wait for the reset of _searchString timeout

      await sendKeys({ press: 'S' });
      await waitForLitRender(element);
      expect(openSpy.count).to.be.equal(1);
      expect(element.getDisplayValue()).to.be.equal('Second');
      expect(secondOption).to.match(':state(active)');
      expect(secondOption).to.have.attribute('selected');
      expect(element.value).to.be.equal('2');
    });

    it('handles keyboard Enter selection', async () => {
      const openSpy = new EventSpy(SbbSelectElement.events.open, element);
      const closeSpy = new EventSpy(SbbSelectElement.events.close, element);
      focusableElement.focus();
      await sendKeys({ press: ' ' });
      await openSpy.calledOnce();

      // Select second entry and confirm with Enter
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'Enter' });

      await closeSpy.calledOnce();

      expect(element).to.match(':state(state-closed)');
      expect(comboBoxElement).to.have.attribute('aria-expanded', 'false');
      expect(element.value).to.be.equal('2');
    });

    it('handles keyboard selection in multiple', async () => {
      element.toggleAttribute('multiple', true);
      await waitForLitRender(element);

      const openSpy = new EventSpy(SbbSelectElement.events.open, element);
      const closeSpy = new EventSpy(SbbSelectElement.events.close, element);
      focusableElement.focus();

      // Pressing 'Space' twice should not break nor selecting anything.
      await sendKeys({ press: 'Space' });
      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);
      await sendKeys({ press: 'Space' });
      expect(element.value).to.be.eql([]);
      expect(displayValue()).to.be.equal('Placeholder');
      await sendKeys({ press: 'Escape' });
      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);
    });

    it('handles keyboard selection in multiple', async () => {
      element.toggleAttribute('multiple', true);
      await waitForLitRender(element);

      const openSpy = new EventSpy(SbbSelectElement.events.open, element);
      const closeSpy = new EventSpy(SbbSelectElement.events.close, element);
      focusableElement.focus();
      await sendKeys({ press: 'ArrowUp' });
      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);

      expect(secondOption).not.to.match(':state(active)');
      expect(secondOption).not.to.have.attribute('selected');
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'Enter' });
      expect(secondOption).to.match(':state(active)');
      expect(secondOption).to.have.attribute('selected');
      expect(element.value).to.be.eql(['2']);
      expect(element.getDisplayValue()).to.be.equal('Second');

      await sendKeys({ press: 'Escape' });
      await closeSpy.calledOnce();
      expect(closeSpy.count).to.be.equal(1);

      element.focus();
      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);
      await openSpy.calledTimes(2);
      expect(openSpy.count).to.be.equal(2);
      expect(secondOption).not.to.match(':state(active)');
      expect(secondOption).to.have.attribute('selected');
      expect(comboBoxElement).to.have.attribute('aria-expanded', 'true');
    });

    it('correctly forward focus and blur', async () => {
      element.focus();
      await waitForLitRender(element);
      expect(document.activeElement).to.have.attribute('role', 'combobox');

      element.blur();
      await waitForLitRender(element);
      expect(document.activeElement).not.to.have.attribute('role', 'combobox');
    });

    it('does not open if prevented', async () => {
      const beforeOpenSpy = new EventSpy(SbbSelectElement.events.beforeopen, element);

      element.addEventListener(SbbSelectElement.events.beforeopen, (ev) => ev.preventDefault());
      element.open();

      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element).to.match(':state(state-closed)');
    });

    it('does not close if prevented', async () => {
      const openSpy = new EventSpy(SbbSelectElement.events.open, element);
      const beforeCloseSpy = new EventSpy(SbbSelectElement.events.beforeclose, element);

      element.open();
      await openSpy.calledOnce();
      await waitForLitRender(element);

      element.addEventListener(SbbSelectElement.events.beforeclose, (ev) => ev.preventDefault());
      element.close();

      await beforeCloseSpy.calledOnce();
      await waitForLitRender(element);

      expect(element).to.match(':state(state-opened)');
    });

    it('updates displayed value on option value change', async () => {
      expect(displayValue()).to.be.equal('Placeholder');
      firstOption.click();
      await waitForLitRender(element);

      expect(element.getDisplayValue()).to.be.equal('First');

      firstOption.textContent = 'First modified';
      await waitForLitRender(element);

      expect(element.getDisplayValue()).to.be.equal('First modified');

      // To test the updated value, we need to create a modifiable textNode
      const textNode = document.createTextNode('Initial value');
      firstOption.innerHTML = '';
      firstOption.appendChild(textNode);
      await waitForLitRender(element);

      textNode.data = 'First modified again';

      await waitForLitRender(element);

      expect(element.getDisplayValue()).to.be.equal('First modified again');

      // Deselection
      element.value = '';
      await waitForLitRender(element);
      expect(displayValue()).to.be.equal('Placeholder');
    });

    it('updates displayed value on option value change if multiple', async () => {
      element.multiple = true;
      await waitForLitRender(element);

      expect(displayValue()).to.be.equal('Placeholder');

      firstOption.click();
      secondOption.click();
      await waitForLitRender(element);
      expect(displayValue()).to.be.equal('First, Second');

      firstOption.textContent = 'First modified';
      await waitForLitRender(element);

      expect(displayValue()).to.be.equal('First modified, Second');

      // Deselection
      firstOption.click();
      secondOption.click();
      await waitForLitRender(element);

      expect(displayValue()).to.be.equal('Placeholder');
    });

    it('detects options when shadowRoot is not yet rendered', async () => {
      element.remove();

      element = document.createElement('sbb-select');
      element.value = '2';

      const option1 = document.createElement('sbb-option');
      option1.value = '1';
      option1.textContent = 'First';

      const option2 = document.createElement('sbb-option');
      option2.value = '2';
      option2.textContent = 'Second';

      element.append(option1, option2);
      root.appendChild(element);

      // We need to wait one tick as rendering happens after one Promise resolution.
      await Promise.resolve();

      expect(option2.selected, 'option 2 to be selected').to.be.true;
      expect(element.value).to.be.equal('2');
      expect(element.getDisplayValue()).to.be.equal('Second');
    });

    describe('interrupting opening and closing with non-zero animation duration', () => {
      beforeEach(() => {
        (globalThis as { disableAnimation?: boolean }).disableAnimation = false;
        element.style.setProperty('--sbb-options-panel-animation-duration', '100ms');
      });

      it('should close when closing during opening', async function (this: Context) {
        // Flaky on WebKit
        this.retries(3);

        const closeSpy = new EventSpy(SbbSelectElement.events.close, element);

        element.open();
        await waitForLitRender(element);
        expect(element).to.match(':state(state-opening)');
        element.close();

        await closeSpy.calledOnce();
        expect(element.isOpen).to.be.false;
      });

      it('should close when closing during opening with Escape key', async function (this: Context) {
        // Flaky on WebKit
        this.retries(3);

        const closeSpy = new EventSpy(SbbSelectElement.events.close, element);

        element.open();
        await waitForLitRender(element);
        expect(element).to.match(':state(state-opening)');
        await sendKeys({ press: 'Escape' });

        await closeSpy.calledOnce();
        expect(element.isOpen).to.be.false;
      });

      it('should close when closing during opening with Tab key', async function (this: Context) {
        // Flaky on WebKit
        this.retries(3);

        const closeSpy = new EventSpy(SbbSelectElement.events.close, element);

        element.focus();
        await sendKeys({ press: 'Space' });
        await waitForLitRender(element);
        expect(element).to.match(':state(state-opening)');
        await sendKeys({ press: tabKey });

        await closeSpy.calledOnce();
        expect(element.isOpen).to.be.false;
      });

      it('should open again when opening during closing', async function (this: Context) {
        // Flaky on WebKit
        this.retries(3);

        const openSpy = new EventSpy(SbbSelectElement.events.open, element);

        element.open();
        await openSpy.calledOnce();

        element.close();
        await waitForLitRender(element);
        expect(element).to.match(':state(state-closing)');
        element.open();

        await openSpy.calledTimes(2);
        expect(element.isOpen).to.be.true;
      });

      it('should open again when opening during closing by arrow press', async function (this: Context) {
        // Flaky on WebKit
        this.retries(3);

        const openSpy = new EventSpy(SbbSelectElement.events.open, element);

        element.focus();
        await sendKeys({ press: 'Space' });
        await openSpy.calledOnce();

        element.close();
        await waitForLitRender(element);
        expect(element).to.match(':state(state-closing)');
        await sendKeys({ press: 'ArrowDown' });

        await openSpy.calledTimes(2);
        expect(element.isOpen).to.be.true;
      });
    });

    it('should work correctly after removing from DOM and re-adding', async () => {
      // Set initial value
      element.value = '2';
      await waitForLitRender(element);

      // Check initial state
      expect(element.value).to.be.equal('2');
      expect(secondOption.selected).to.be.true;
      expect(root.querySelector<SbbSelectElement>('.sbb-select-trigger')!).to.exist;

      // Remove from DOM
      element.remove();
      await waitForLitRender(root);

      expect(root.querySelector<SbbSelectElement>('.sbb-select-trigger')!).not.to.exist;

      // Re-add to DOM
      root.insertBefore(element, root.firstElementChild);
      await waitForLitRender(root);

      // Verify element is back
      const reAddedElement = root.querySelector<SbbSelectElement>('sbb-select')!;
      expect(reAddedElement).to.exist;
      expect(reAddedElement).to.equal(element);
      expect(root.querySelector<SbbSelectElement>('.sbb-select-trigger')!).to.exist;

      // Check that value is preserved
      expect(reAddedElement.value).to.be.equal('2');
      expect(secondOption.selected).to.be.true;

      // Check that select can be opened
      const openSpy = new EventSpy(SbbSelectElement.events.open, reAddedElement);
      reAddedElement.open();
      await waitForLitRender(reAddedElement);

      await openSpy.calledOnce();
      expect(reAddedElement.isOpen).to.be.true;
    });
  });

  describe('form association', () => {
    let form: HTMLFormElement;
    let comboBoxElement: HTMLElement;
    let nativeSelect: HTMLSelectElement;
    let fieldSet: HTMLFieldSetElement;
    let elemChangeEvent: EventSpy<Event>,
      elemInputEvent: EventSpy<Event>,
      nativeChangeEvent: EventSpy<Event>,
      nativeInputEvent: EventSpy<Event>;

    beforeEach(async () => {
      document.documentElement.removeAttribute('lang');
      form = await fixture(html`
        <form>
          <fieldset>
            <sbb-select placeholder="Placeholder" name="sbb-select" value="2">
              <sbb-option id="option-1" value="1">First</sbb-option>
              <sbb-option id="option-2" value="2">Second</sbb-option>
              <sbb-option id="option-3" value="3">Third</sbb-option>
            </sbb-select>

            <select name="native-select">
              <option value="1">First</option>
              <option value="2" selected>Second</option>
              <option value="3">Third</option>
            </select>
          </fieldset>
        </form>
      `);
      element = form.querySelector('sbb-select')!;
      comboBoxElement = form.querySelector('[role="combobox"]')!;
      nativeSelect = form.querySelector('select')!;
      fieldSet = form.querySelector('fieldset')!;

      // event spies
      elemChangeEvent = new EventSpy('change', element);
      elemInputEvent = new EventSpy('input', element);
      nativeChangeEvent = new EventSpy('change', nativeSelect);
      nativeInputEvent = new EventSpy('input', nativeSelect);

      await waitForLitRender(form);
    });

    function compareToNative(skipValue?: boolean): void {
      const formData = new FormData(form);

      if (!skipValue) {
        expect(element.value, 'compare to native - value').to.be.equal(nativeSelect.value);
      }
      expect(formData.get('sbb-select'), 'compare to native - form value').to.be.equal(
        formData.get('native-select'),
      );
      expect(elemChangeEvent.count, 'compare to native - change counts').to.be.equal(
        nativeChangeEvent.count,
      );
      expect(elemInputEvent.count, 'compare to native - input counts').to.be.equal(
        nativeInputEvent.count,
      );
      expect(element.type, 'compare to native - type').to.be.equal(nativeSelect.type);
    }

    it('should set default value', async () => {
      expect(element.value).to.be.equal('2');
      compareToNative();
    });

    it('should handle invalid values', async () => {
      element.value = nativeSelect.value = '4';
      await waitForLitRender(form);

      /**
       * Custom implementation
       * If an invalid value is set, we keep it and show the empty placeholder.
       * Meanwhile, the native select ignores it and set and empty value.
       */
      expect(element.value).to.be.equal('4');
    });

    it('should handle multiple values', async () => {
      element.multiple = nativeSelect.multiple = true;

      element.value = ['1', '3'];
      nativeSelect.options[0].selected = nativeSelect.options[2].selected = true;
      await waitForLitRender(form);

      expect(element.value).to.be.eql(['1', '3']);

      // The native select does not handle multiple values, so we expect the value to differ
      compareToNative(true);
    });

    it('should result :disabled', async () => {
      element.disabled = true;
      nativeSelect.disabled = true;

      await waitForLitRender(form);

      expect(element).to.match(':disabled');
      expect(comboBoxElement.tabIndex).to.be.equal(-1);
      compareToNative();

      element.disabled = false;
      await waitForLitRender(element);

      expect(element).not.to.match(':disabled');
      expect(comboBoxElement.tabIndex).to.be.equal(0);
    });

    it('should result :disabled if a fieldSet is', async () => {
      fieldSet.disabled = true;

      await waitForLitRender(form);

      expect(element).to.match(':disabled');
      expect(comboBoxElement.tabIndex).to.be.equal(-1);
      compareToNative();

      fieldSet.disabled = false;
      await waitForLitRender(element);

      expect(element).not.to.match(':disabled');
      expect(comboBoxElement.tabIndex).to.be.equal(0);
    });

    it('should restore form state on formStateRestoreCallback()', async () => {
      // Mimic tab restoration. Does not test the full cycle as we can not set the browser in the required state.
      element.formStateRestoreCallback(element['formState'](), 'restore');
      await waitForLitRender(element);

      expect(element.value).to.be.equal('2');

      element.multiple = true;
      element.value = ['1', '2'];
      await waitForLitRender(element);

      element.formStateRestoreCallback(element['formState'](), 'restore');
      await waitForLitRender(element);

      expect(element.value).to.be.eql(['1', '2']);
    });

    it('should reset on form reset', async () => {
      element.value = nativeSelect.value = '3';

      form.reset();
      await waitForLitRender(form);

      expect(element.value).to.be.equal('2');
      compareToNative();
    });

    it('should update validity with required true', async () => {
      element.value = '';
      expect(element.validationMessage).to.equal('');
      expect(element.validity.valueMissing).to.be.false;

      element.toggleAttribute('required', true);
      await waitForLitRender(element);

      expect(element.validationMessage.length).to.be.greaterThan(0);
      expect(element.validity.valueMissing).to.be.true;
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
      element.value = '';
      await waitForLitRender(element);

      const original = element.validationMessage;
      expect(element.validationMessage.length).to.be.greaterThan(0);
      expect(element.validity.valueMissing).to.be.true;

      document.documentElement.setAttribute('lang', 'de');
      await waitForLitRender(element);

      expect(element.validationMessage.length).to.be.greaterThan(0);
      expect(element.validationMessage).not.to.equal(original);
    });

    it('should keep custom validity', async () => {
      element.value = '';
      element.setCustomValidity('my error');
      expect(element.validationMessage).to.equal('my error');
      expect(element.validity.customError).to.be.true;

      element.toggleAttribute('required', true);
      await waitForLitRender(element);

      expect(element.validationMessage).to.equal('my error');
      expect(element.validity.customError, 'customError').to.be.true;
      expect(element.validity.valueMissing, 'valueMissing').to.be.true;
    });

    it('should not unset required validity', async () => {
      element.value = '';
      element.toggleAttribute('required', true);
      await waitForLitRender(element);

      const checkedMessage = element.validationMessage;
      expect(checkedMessage.length).to.be.greaterThan(
        0,
        'required validation message must not be empty',
      );

      element.setCustomValidity('my error');
      expect(element.validationMessage).to.equal('my error', 'With custom error');
      expect(element.validity.customError, 'customError').to.be.true;
      expect(element.validity.valueMissing, 'valueMissing').to.be.true;

      element.setCustomValidity('');

      expect(element.validationMessage).to.equal(checkedMessage, 'Without custom error');
      expect(element.validity.customError, 'customError').to.be.false;
      expect(element.validity.valueMissing, 'valueMissing').to.be.true;
    });

    it('should set validity correctly on initialization', async () => {
      element = await fixture(
        html`<sbb-select name="testvalidation" required><sbb-option>Test</sbb-option></sbb-select>`,
      );
      await waitForLitRender(element);

      expect(element.validationMessage.length).to.be.greaterThan(0);
      expect(element.validity.valueMissing).to.be.true;
    });

    it('should match :invalid with required true', async () => {
      element.value = '';
      expect(element).to.match(':valid');
      expect(element).not.to.match(':invalid');

      element.toggleAttribute('required', true);
      await waitForLitRender(element);

      expect(element).not.to.match(':valid');
      expect(element).to.match(':invalid');
    });
  });

  describe('label handling', () => {
    it('should sync aria-label initially', async () => {
      const element = await fixture(html`
        <sbb-select aria-label="Test">
          <sbb-option id="option-1" value="1">First</sbb-option>
        </sbb-select>
      `);

      const comboBoxElement = element.parentElement!.querySelector('[role="combobox"]')!;

      expect(comboBoxElement).to.have.attribute('aria-label', 'Test');
    });

    it('should sync aria-label on change', async () => {
      const element = await fixture(html`
        <sbb-select>
          <sbb-option id="option-1" value="1">First</sbb-option>
        </sbb-select>
      `);
      const comboBoxElement = element.parentElement!.querySelector('[role="combobox"]')!;
      expect(comboBoxElement).not.to.have.attribute('aria-label');

      element.setAttribute('aria-label', 'Test');
      await waitForLitRender(element);

      expect(comboBoxElement).to.have.attribute('aria-label', 'Test');
    });

    it('should prefer aria-label over label element', async () => {
      const element = await fixture(html`
        <label for="select">Ignored</label>
        <sbb-select aria-label="Test" id="select">
          <sbb-option id="option-1" value="1">First</sbb-option>
        </sbb-select>
      `);

      const comboBoxElement = element.parentElement!.querySelector('[role="combobox"]')!;

      expect(comboBoxElement).to.have.attribute('aria-label', 'Test');
    });

    it('should sync aria-labelledby initially', async () => {
      const element = await fixture(html`
        <sbb-select aria-labelledby="Test">
          <sbb-option id="option-1" value="1">First</sbb-option>
        </sbb-select>
      `);

      const comboBoxElement = element.parentElement!.querySelector('[role="combobox"]')!;

      expect(comboBoxElement).to.have.attribute('aria-labelledby', 'Test');
    });

    it('should sync aria-labelledby on change', async () => {
      const element = await fixture(html`
        <sbb-select>
          <sbb-option id="option-1" value="1">First</sbb-option>
        </sbb-select>
      `);
      const comboBoxElement = element.parentElement!.querySelector('[role="combobox"]')!;
      expect(comboBoxElement).not.to.have.attribute('aria-labelledby');

      element.setAttribute('aria-labelledby', 'Test');
      await waitForLitRender(element);

      expect(comboBoxElement).to.have.attribute('aria-labelledby', 'Test');
    });

    it('should prefer aria-labelledby over label element', async () => {
      const element = await fixture(html`
        <label for="select">Ignored</label>
        <sbb-select aria-labelledby="Test" id="select">
          <sbb-option id="option-1" value="1">First</sbb-option>
        </sbb-select>
      `);

      const comboBoxElement = element.parentElement!.querySelector('[role="combobox"]')!;

      expect(comboBoxElement).to.have.attribute('aria-labelledby', 'Test');
    });

    it('should combine aria-describedby with label element', async () => {
      const element = await fixture(html`
        <label for="select">Label</label>
        <sbb-select aria-describedby="Test" id="select">
          <sbb-option id="option-1" value="1">First</sbb-option>
        </sbb-select>
      `);

      const comboBoxElement = element.parentElement!.querySelector('[role="combobox"]')!;

      expect(comboBoxElement).to.have.attribute('aria-describedby', 'Test');
      expect(comboBoxElement).to.have.attribute('aria-label', 'Label');
    });

    it('should take label elements as aria-label', async () => {
      const element = await fixture(html`
        <label for="select">Label</label>
        <label for="select">Label 2</label>
        <sbb-select id="select">
          <sbb-option id="option-1" value="1">First</sbb-option>
        </sbb-select>
      `);

      const comboBoxElement = element.parentElement!.querySelector('[role="combobox"]')!;

      expect(comboBoxElement).to.have.attribute('aria-label', 'Label, Label 2');
    });

    it('should remove label when disappearing', async () => {
      const root = await fixture(
        html`<div>
          <label for="select">Label</label>
          <sbb-select id="select">
            <sbb-option id="option-1" value="1">First</sbb-option>
          </sbb-select>
        </div> `,
      );

      const element = root.querySelector('sbb-select')!;
      const comboBoxElement = root.querySelector('[role="combobox"]')!;
      expect(comboBoxElement).to.have.attribute('aria-label', 'Label');

      root.querySelector('label')!.remove();

      // Trigger sync by triggering connectedCallback()
      element.connectedCallback();

      expect(comboBoxElement).not.to.have.attribute('aria-label');
    });
  });

  describe('with sbb-form-field', () => {
    let firstOption: SbbOptionElement, comboBoxElement: HTMLElement, formField: SbbFormFieldElement;

    beforeEach(async () => {
      formField = await fixture(html`
        <sbb-form-field>
          <label>Testlabel</label>
          <sbb-select placeholder="Placeholder">
            <sbb-option id="option-1" value="1">First</sbb-option>
            <sbb-option id="option-2" value="2">Second</sbb-option>
            <sbb-option id="option-3" value="3">Third</sbb-option>
          </sbb-select>
        </sbb-form-field>
      `);
      element = formField.querySelector<SbbSelectElement>('sbb-select')!;

      comboBoxElement = formField.querySelector('[role="combobox"]')!;
      firstOption = element.querySelector<SbbOptionElement>('#option-1')!;
    });

    it('closes the select by option click', async function (this: Context) {
      // Flaky on WebKit
      this.retries(3);
      const openSpy = new EventSpy(SbbSelectElement.events.open, element);
      const closeSpy = new EventSpy(SbbSelectElement.events.close, element);

      const positionRect = element.getBoundingClientRect();
      await sendMouse({
        type: 'click',
        position: [
          Math.round(positionRect.x + window.scrollX + positionRect.width / 2),
          Math.round(positionRect.y + window.scrollY + positionRect.height / 2),
        ],
      });

      await waitForLitRender(element);
      await openSpy.calledOnce();

      expect(comboBoxElement).to.have.attribute('aria-expanded', 'true');

      firstOption.click();
      await waitForLitRender(element);
      await closeSpy.calledOnce();

      expect(openSpy.count).to.be.equal(1);
      expect(comboBoxElement).to.have.attribute('aria-expanded', 'false');
      expect(element.value).to.be.equal('1');
    });

    it('closes the select by option click with non-zero animation duration', async function (this: Context) {
      (globalThis as { disableAnimation?: boolean }).disableAnimation = false;

      element.style.setProperty('--sbb-options-panel-animation-duration', '1ms');

      const openSpy = new EventSpy(SbbSelectElement.events.open, element);
      const closeSpy = new EventSpy(SbbSelectElement.events.close, element);

      element.dispatchEvent(new PointerEvent('click'));
      await waitForLitRender(element);
      await openSpy.calledOnce();

      expect(comboBoxElement).to.have.attribute('aria-expanded', 'true');

      firstOption.click();
      await waitForLitRender(element);
      await closeSpy.calledOnce();

      expect(comboBoxElement).to.have.attribute('aria-expanded', 'false');
      expect(element.value).to.be.equal('1');
    });

    it('prevent keyboard navigation if all the options are disabled', async () => {
      element.querySelectorAll<SbbOptionElement>('sbb-option')!.forEach((e) => (e.disabled = true));
      await waitForLitRender(element);

      const beforeOpenSpy = new EventSpy(SbbSelectElement.events.beforeopen, element);
      const openSpy = new EventSpy(SbbSelectElement.events.open, element);
      const overlayContainerElement = element.shadowRoot!.querySelector('.sbb-select__container')!;

      element.dispatchEvent(new PointerEvent('click'));
      await waitForLitRender(element);
      await beforeOpenSpy.calledOnce();
      expect(beforeOpenSpy.count).to.be.equal(1);
      await openSpy.calledOnce();
      expect(openSpy.count).to.be.equal(1);
      await waitForLitRender(element);
      expect(comboBoxElement).to.have.attribute('aria-expanded', 'true');
      expect(element).to.match(':state(expanded)');
      expect(overlayContainerElement).to.match(':popover-open');

      await sendKeys({ press: 'ArrowDown' });
      element.querySelectorAll<SbbOptionElement>('sbb-option')!.forEach((e: SbbOptionElement) => {
        expect(e).not.to.match(':state(active)');
        expect(e).not.to.have.attribute('selected');
      });
      expect(element.value).to.be.null;
    });

    it('should sync form-field size change', async () => {
      const openSpy = new EventSpy(SbbSelectElement.events.open, element);

      element.open();
      await waitForLitRender(element);
      await openSpy.calledOnce();

      formField.size = 's';
      await waitForLitRender(element);

      expect(element.size).to.be.equal('s');
    });

    it('should react to origin size change', async function (this: Context) {
      // Test is flaky on WebKit
      this.retries(3);

      const openSpy = new EventSpy(SbbSelectElement.events.open, element);

      element.open();
      await waitForLitRender(element);
      await openSpy.calledOnce();

      const selectPanel = element.shadowRoot!.querySelector('.sbb-select__panel')!;
      const oldPanelSize = selectPanel.clientWidth;

      formField.style.width = '200px';

      // Wait for resizeObserver to apply the new size
      await aTimeout(30);

      expect(selectPanel.clientWidth).to.be.lessThan(oldPanelSize);
    });
  });

  describe('with boolean value', () => {
    let element: SbbSelectElement<boolean>;

    beforeEach(async () => {
      const root = await fixture(
        html`<form>
          <sbb-form-field>
            <label>Label</label>
            <sbb-select placeholder="Placeholder" name="select1" .value=${false}>
              <sbb-option id="option-1" .value=${true}>Yes</sbb-option>
              <sbb-option id="option-2" .value=${false}>No</sbb-option>
            </sbb-select>
          </sbb-form-field>
        </form> `,
      );
      element = root.querySelector<SbbSelectElement<boolean>>('sbb-select')!;
    });

    it('should have the correct displayValue and the second option selected', () => {
      const secondOption = element.querySelector<SbbOptionElement<boolean>>('#option-2')!;
      expect(element.getDisplayValue()).to.be.equal('No');
      expect(secondOption).to.have.attribute('selected');
    });

    it('should set value on option click', async () => {
      const firstOption = element.querySelector<SbbOptionElement<boolean>>('#option-1')!;
      const openSpy = new EventSpy(SbbSelectElement.events.open, element);
      const closeSpy = new EventSpy(SbbSelectElement.events.close, element);

      element.click();
      await openSpy.calledOnce();

      firstOption.click();
      await closeSpy.calledOnce();
      await waitForLitRender(element);

      expect(element.getDisplayValue()).to.be.equal('Yes');
      expect(firstOption).to.have.attribute('selected');
      expect(element.value).to.be.equal(true);
    });
  });

  describe('with number value', () => {
    let element: SbbSelectElement<number>;

    beforeEach(async () => {
      const root = await fixture(
        html`<form>
          <sbb-form-field>
            <label>Label</label>
            <sbb-select placeholder="Placeholder" name="select1" .value=${0}>
              <sbb-option id="option-1" .value=${0}>No</sbb-option>
              <sbb-option id="option-2" .value=${1}>Yes</sbb-option>
            </sbb-select>
          </sbb-form-field>
        </form>`,
      );
      element = root.querySelector<SbbSelectElement<number>>('sbb-select')!;
    });

    it('should have the correct displayValue and the first option selected', () => {
      const firstOption = element.querySelector<SbbOptionElement<boolean>>('#option-1')!;
      expect(element.getDisplayValue()).to.be.equal('No');
      expect(firstOption).to.have.attribute('selected');
    });

    it('should set value on option click', async () => {
      const secondOption = element.querySelector<SbbOptionElement<boolean>>('#option-2')!;
      const openSpy = new EventSpy(SbbSelectElement.events.open, element);
      const closeSpy = new EventSpy(SbbSelectElement.events.close, element);

      element.click();
      await openSpy.calledOnce();

      secondOption.click();
      await closeSpy.calledOnce();
      await waitForLitRender(element);

      expect(element.getDisplayValue()).to.be.equal('Yes');
      expect(secondOption).to.have.attribute('selected');
      expect(element.value).to.be.equal(1);
    });
  });

  describe('with null value', () => {
    let element: SbbSelectElement<null | 0>;

    beforeEach(async () => {
      const root = await fixture(
        html`<form>
          <sbb-form-field>
            <label>Label</label>
            <sbb-select placeholder="Placeholder" name="select1" .value=${null}>
              <sbb-option id="option-1" .value=${0}>other</sbb-option>
              <sbb-option id="option-2" .value=${null}>null</sbb-option>
            </sbb-select>
          </sbb-form-field>
        </form>`,
      );
      element = root.querySelector<SbbSelectElement<null | 0>>('sbb-select')!;
    });

    it('should have the correct displayValue and the first option selected', () => {
      const secondOption = element.querySelector<SbbOptionElement<boolean>>('#option-2')!;
      expect(element.getDisplayValue()).to.be.equal('null');
      expect(secondOption).to.have.attribute('selected');
    });

    it('should set value on option click', async () => {
      element.value = 0;
      await waitForLitRender(element);

      const firstOption = element.querySelector<SbbOptionElement<boolean>>('#option-1')!;
      expect(element.getDisplayValue()).to.be.equal('other');
      expect(firstOption).to.have.attribute('selected');

      const secondOption = element.querySelector<SbbOptionElement<boolean>>('#option-2')!;
      const openSpy = new EventSpy(SbbSelectElement.events.open, element);
      const closeSpy = new EventSpy(SbbSelectElement.events.close, element);

      element.click();
      await openSpy.calledOnce();

      secondOption.click();
      await closeSpy.calledOnce();
      await waitForLitRender(element);

      expect(element.getDisplayValue()).to.be.equal('null');
      expect(secondOption).to.have.attribute('selected');
      expect(element.value).to.be.equal(null);
    });
  });

  describe('with complex value', () => {
    type PropertyType = { property: string; otherProperty: string };
    let element: SbbSelectElement<PropertyType>, firstOption: SbbOptionElement<PropertyType>;

    const value1 = { property: 'Option 1', otherProperty: 'test 1' };
    const value2 = { property: 'Option 2', otherProperty: 'test 2' };

    beforeEach(async () => {
      const root = await fixture(
        html`<form>
          <sbb-form-field>
            <label>Testlabel</label>
            <sbb-select placeholder="Placeholder" name="select1">
              <sbb-option id="option-1" .value=${value1}>First</sbb-option>
              <sbb-option id="option-2" .value=${value2}>Second</sbb-option>
              <sbb-option id="option-3" .value=${{ property: 'Option 3', otherProperty: 'test 3' }}>
                Third
              </sbb-option>
            </sbb-select>
          </sbb-form-field>
        </form> `,
      );
      element = root.querySelector<SbbSelectElement<PropertyType>>('sbb-select')!;

      firstOption = element.querySelector<SbbOptionElement<PropertyType>>('#option-1')!;
    });

    it('should assign complex value on option click', async () => {
      expect(element.getDisplayValue()).to.be.equal('');

      const openSpy = new EventSpy(SbbSelectElement.events.open, element);
      const closeSpy = new EventSpy(SbbSelectElement.events.close, element);

      element.click();
      await openSpy.calledOnce();

      firstOption.click();
      await closeSpy.calledOnce();
      await waitForLitRender(element);

      expect(element.value).to.be.deep.equal(value1);
      expect(element.getDisplayValue()).to.be.equal('First');
    });

    it('should handle complex value assignment', async () => {
      expect(element.getDisplayValue()).to.be.equal('');

      element.value = value1;
      await waitForLitRender(element);

      expect(firstOption).to.have.attribute('selected');
      expect(element.getDisplayValue()).to.be.equal('First');
    });

    it('should serialize and deserialize complex value', async () => {
      element.value = value1;
      await waitForLitRender(element);

      expect(element.value).to.be.equal(value1);

      const formState = element['formState']();
      element.value = value2;

      // Simulate navigating to other page and then back to form
      element.formStateRestoreCallback(formState, 'restore');

      // Wait for the formStateRestoreCallback to finish
      await aTimeout(30);
      await waitForLitRender(element);

      // Object equality is currently lost, but deep equality is preserved
      expect(element.value).not.to.be.deep.equal(value1); // TODO: With a comparison function, this should be equal
      expect(element.value).not.to.be.equal(value1); // TODO: With a comparison function, this should be equal
      expect(element.getDisplayValue()).to.be.equal('Second'); // TODO: With a comparison function, this should be 'First'
      expect(firstOption.selected).to.be.false; // TODO: With a comparison function, this should be true
    });

    it('should serialize and deserialize complex value with multiple', async () => {
      element.multiple = true;
      await waitForLitRender(element);

      element.value = [value1, value2];
      await waitForLitRender(element);

      const formState = element['formState']();

      expect(element.value[0]).to.be.equal(value1);
      expect(element.value[1]).to.be.equal(value2);

      element.value = [];

      // Simulate navigating to other page and then back to form
      element.formStateRestoreCallback(formState, 'restore');

      // Wait for the formStateRestoreCallback to finish
      await aTimeout(30);
      await waitForLitRender(element);

      // Object equality is currently lost, but deep equality is preserved
      expect(element.value).to.be.deep.equal([]); // TODO: With a comparison function, this should be equal the deserialized value
      expect(element.value[0]).not.to.be.equal(value1); // TODO: With a comparison function, this should be equal
      expect(element.value[1]).not.to.be.equal(value2); // TODO: With a comparison function, this should be equal
      expect(element.getDisplayValue()).to.be.equal(''); // TODO: With a comparison function, this should be 'First, Second'
      expect(firstOption.selected).to.be.false; // TODO: With a comparison function, this should be true
    });
  });

  describe('with optgroup', () => {
    beforeEach(async () => {
      const root = await fixture(html`
        <div id="parent">
          <sbb-select placeholder="Placeholder">
            <sbb-optgroup label="Group 1">
              <sbb-option id="option-1" value="1">First</sbb-option>
              <sbb-option id="option-2" value="2">Second</sbb-option>
            </sbb-optgroup>
            <sbb-optgroup label="Group 2">
              <sbb-option id="option-3" value="3">Third</sbb-option>
              <sbb-option id="option-4" value="4" selected>Fourth</sbb-option>
            </sbb-optgroup>
          </sbb-select>
        </div>
      `);
      element = root.querySelector<SbbSelectElement>('sbb-select')!;
    });

    it('should have the correct initial value and displayValue', () => {
      expect(element.value).to.be.equal('4');
      expect(element.getDisplayValue()).to.be.equal('Fourth');
    });

    it('should open and select options within the optgroup', async () => {
      const openSpy = new EventSpy(SbbSelectElement.events.open, element);
      const closeSpy = new EventSpy(SbbSelectElement.events.close, element);

      element.click();
      await openSpy.calledOnce();

      element.options[2].click();
      await waitForLitRender(element);
      await closeSpy.calledOnce();

      expect(element.value).to.be.equal('3');
      expect(element.getDisplayValue()).to.be.equal('Third');

      await closeSpy.calledOnce();
    });

    it('should respect later added option which is selected', async () => {
      const newOption = document.createElement('sbb-option');
      newOption.value = '5';
      newOption.textContent = 'Fifth';
      newOption.selected = true;
      newOption.id = 'option-5';

      const optGroup2 = element.querySelectorAll('sbb-optgroup')[1];
      optGroup2.insertBefore(newOption, element.options[3]);
      await waitForLitRender(element);

      expect(element.value).to.be.equal('5');
      expect(element.getDisplayValue()).to.be.equal('Fifth');
    });

    it('ignores selected attributes on options when value was defined programmatically', async () => {
      element.value = '2';
      await waitForLitRender(element);

      expect(element.value).to.be.equal('2');
      expect(element.getDisplayValue()).to.be.equal('Second');

      const newOption = document.createElement('sbb-option');
      newOption.value = '5';
      newOption.textContent = 'Fifth';
      newOption.selected = true;
      newOption.id = 'option-5';

      const optGroup2 = element.querySelectorAll('sbb-optgroup')[1];
      optGroup2.insertBefore(newOption, element.options[3]);
      await waitForLitRender(element);

      expect(element.value).to.be.equal('2');
      expect(element.getDisplayValue()).to.be.equal('Second');
    });
  });

  it('should handle focus when options are in a scroll area', async () => {
    const formField = await fixture(html`
      <sbb-form-field>
        <sbb-select placeholder="Placeholder">
          ${repeat(
            new Array(30),
            (_, index) => html`<sbb-option value="option-${index}">Option ${index}</sbb-option>`,
          )}
        </sbb-select>
      </sbb-form-field>
      <input id="after-select" />
    `);
    element = formField.querySelector<SbbSelectElement>('sbb-select')!;

    element.focus();
    element.open();
    expect(document.activeElement).to.be.equal(element.inputElement);
    expect(element.isOpen, 'isOpen').to.be.true;

    // In real browser, the focus would land in the scroll area of the options panel.
    // In Headless mode, this doesn't seem to happen.
    // Due to this fact, this test would also be green without the fix (tabindex=0).
    // We keep the test for consistency.
    await sendKeys({ press: tabKey });
    expect(document.activeElement).to.be.equal(
      formField.parentElement!.querySelector<HTMLInputElement>('input#after-select'),
    );
  });
});
