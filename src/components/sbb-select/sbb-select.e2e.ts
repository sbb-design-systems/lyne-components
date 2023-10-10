import { SbbOption, events as optionEvents } from '../sbb-option';
import { waitForCondition } from '../../global/testing';
import { aTimeout, assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { sendKeys } from '@web/test-runner-commands';
import { EventSpy } from '../../global/testing/event-spy';
import { events, SbbSelect } from './sbb-select';

describe('sbb-select', () => {
  let element: SbbSelect,
    focusableElement: HTMLElement,
    firstOption: SbbOption,
    secondOption: SbbOption,
    thirdOption: SbbOption,
    displayValue: HTMLElement,
    comboBoxElement: HTMLElement;

  beforeEach(async () => {
    await fixture(html`
      <div id="parent">
        <sbb-select placeholder="Placeholder" disable-animation>
          <sbb-option id="option-1" value="1">First</sbb-option>
          <sbb-option id="option-2" value="2">Second</sbb-option>
          <sbb-option id="option-3" value="3">Third</sbb-option>
        </sbb-select>
      </div>
    `);

    element = document.querySelector('sbb-select');
    comboBoxElement = document.querySelector('[role="combobox"]');
    focusableElement = comboBoxElement;
    firstOption = element.querySelector('#option-1');
    secondOption = element.querySelector('#option-2');
    thirdOption = element.querySelector('#option-3');
    displayValue = element.shadowRoot.querySelector('.sbb-select__trigger');
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSelect);
    assert.instanceOf(firstOption, SbbOption);
  });

  it('opens and closes the dialog', async () => {
    const willOpen = new EventSpy(events.willOpen);
    const didOpen = new EventSpy(events.didOpen);
    const willClose = new EventSpy(events.willClose);
    const didClose = new EventSpy(events.didClose);
    element.dispatchEvent(new CustomEvent('click'));
    await element.updateComplete;
    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await waitForCondition(() => didOpen.events.length === 1);

    expect(didOpen.count).to.be.equal(1);
    await element.updateComplete;

    expect(comboBoxElement).to.have.attribute('aria-expanded', 'true');

    element.dispatchEvent(new CustomEvent('click'));
    await element.updateComplete;
    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await waitForCondition(() => didClose.events.length === 1);

    expect(didClose.count).to.be.equal(1);
    await element.updateComplete;

    expect(comboBoxElement).to.have.attribute('aria-expanded', 'false');
  });

  it('displays placeholder if no value is set and there is no selected element', async () => {
    expect(element.value).to.be.undefined;
    const placeholder = element.shadowRoot.querySelector('.sbb-select__trigger--placeholder');
    expect(placeholder).not.to.be.null;
    expect(placeholder).to.have.trimmed.text('Placeholder');
  });

  it("displays value if it's set, or placeholder if value doesn't match available options", async () => {
    expect(displayValue).to.have.trimmed.text('Placeholder');

    element.value = '1';
    await element.updateComplete;
    expect(displayValue).to.have.trimmed.text('First');
    expect(firstOption).to.have.attribute('selected');
    expect(secondOption).not.to.have.attribute('selected');
    expect(thirdOption).not.to.have.attribute('selected');

    element.value = '000000000';
    await element.updateComplete;
    expect(displayValue).to.have.trimmed.text('Placeholder');
    expect(firstOption).not.to.have.attribute('selected');
    expect(secondOption).not.to.have.attribute('selected');
    expect(thirdOption).not.to.have.attribute('selected');
  });

  it("displays joined string if both multiple and value props are set, or placeholder if value doesn't match available options", async () => {
    expect(displayValue).to.have.trimmed.text('Placeholder');
    element.setAttribute('multiple', '');

    element.value = ['1', '3'];
    await element.updateComplete;
    expect(displayValue).to.have.trimmed.text('First, Third');
    expect(firstOption).to.have.attribute('selected');
    expect(secondOption).not.to.have.attribute('selected');
    expect(thirdOption).to.have.attribute('selected');

    element.value = '000000000';
    await element.updateComplete;
    expect(displayValue).to.have.trimmed.text('Placeholder');
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
    element = root.querySelector('sbb-select');

    const displayValue = element.shadowRoot.querySelector('.sbb-select__trigger');
    const firstOption = element.querySelector('#option-1');
    const secondOption = element.querySelector('#option-2');
    const thirdOption = element.querySelector('#option-3');

    expect(element.value).to.be.equal('2');
    expect(displayValue).to.have.trimmed.text('Second');
    expect(firstOption).not.to.have.attribute('selected');
    expect(secondOption).to.have.attribute('selected');
    expect(thirdOption).not.to.have.attribute('selected');
  });

  it('display selected sbb-option if no value is set, then handles selection', async () => {
    const root = await fixture(html`
      <div id="parent">
        <sbb-select>
          <sbb-option id="option-1" value="1" selected>First</sbb-option>
          <sbb-option id="option-2" value="2">Second</sbb-option>
          <sbb-option id="option-3" value="3">Third</sbb-option>
        </sbb-select>
      </div>
    `);
    element = root.querySelector('sbb-select');
    comboBoxElement = root.querySelector('[role="combobox"]');
    focusableElement = comboBoxElement;
    await element.updateComplete;

    const displayValue = element.shadowRoot.querySelector('.sbb-select__trigger');
    expect(displayValue).to.have.trimmed.text('First');
    expect(element.value).to.be.equal('1');

    const willOpen = new EventSpy(events.willOpen);
    const didOpen = new EventSpy(events.didOpen);
    element.click();

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await waitForCondition(() => didOpen.events.length === 1);

    expect(didOpen.count).to.be.equal(1);
    await element.updateComplete;

    firstOption = element.querySelector('#option-1');
    expect(firstOption).not.to.have.attribute('active');
    expect(firstOption).to.have.attribute('selected');
    secondOption = element.querySelector('#option-2');
    expect(secondOption).not.to.have.attribute('active');
    expect(secondOption).not.to.have.attribute('selected');

    const selectionChange = new EventSpy(optionEvents.selectionChange);
    const optionSelected = new EventSpy(optionEvents.optionSelected);
    const willClose = new EventSpy(events.willClose);
    const didClose = new EventSpy(events.didClose);

    secondOption.click();
    await element.updateComplete;

    // Event received, panel is closed
    expect(selectionChange.count).to.be.equal(1);
    expect(optionSelected.count).to.be.equal(1);

    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose.count).to.be.equal(1);
    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);
    await element.updateComplete;

    expect(element.value).to.be.equal('2');
    expect(comboBoxElement).to.have.attribute('aria-expanded', 'false');
  });

  it('handles selection in multiple', async () => {
    element.setAttribute('multiple', '');
    await element.updateComplete;

    const willOpen = new EventSpy(events.willOpen);
    const didOpen = new EventSpy(events.didOpen);
    element.dispatchEvent(new CustomEvent('click'));

    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen.count).to.be.equal(1);
    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    await element.updateComplete;
    expect(firstOption).not.to.have.attribute('active');
    expect(firstOption).not.to.have.attribute('selected');
    expect(secondOption).not.to.have.attribute('active');
    expect(secondOption).not.to.have.attribute('selected');

    const selectionChange = new EventSpy(optionEvents.selectionChange);
    firstOption.dispatchEvent(new CustomEvent('click'));
    await element.updateComplete;
    expect(selectionChange.count).to.be.equal(1);
    expect(element.value).to.be.eql(['1']);
    expect(displayValue).to.have.trimmed.text('First');

    secondOption.dispatchEvent(new CustomEvent('click'));
    await element.updateComplete;
    expect(selectionChange.count).to.be.equal(2);
    expect(element.value).to.be.eql(['1', '2']);
    expect(displayValue).to.have.trimmed.text('First, Second');

    firstOption.dispatchEvent(new CustomEvent('click'));
    await element.updateComplete;
    expect(element.value).to.be.eql(['2']);
    secondOption.dispatchEvent(new CustomEvent('click'));
    await element.updateComplete;
    expect(element.value).to.be.eql([]);
    expect(displayValue).to.have.trimmed.text('Placeholder');
    // Panel is still open
    expect(comboBoxElement).to.have.attribute('aria-expanded', 'true');
  });

  it('handles keypress on host', async () => {
    const didOpen = new EventSpy(events.didOpen);
    const didClose = new EventSpy(events.didClose);

    focusableElement.focus();
    await sendKeys({ press: 'Enter' });
    await element.updateComplete;
    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);

    focusableElement.focus();
    await sendKeys({ press: 'Escape' });
    await element.updateComplete;
    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);

    focusableElement.focus();
    await sendKeys({ press: 'ArrowDown' });
    await waitForCondition(() => didOpen.events.length === 2);
    expect(didOpen.count).to.be.equal(2);

    focusableElement.focus();
    await sendKeys({ press: 'Tab' });
    await waitForCondition(() => didClose.events.length === 2);
    expect(didClose.count).to.be.equal(2);

    focusableElement.focus();
    await sendKeys({ press: 'F' });
    await element.updateComplete;
    expect(didOpen.count).to.be.equal(2);
    expect(didClose.count).to.be.equal(2);
    expect(displayValue).to.have.trimmed.text('First');

    await aTimeout(1100); // wait for the reset of _searchString timeout

    focusableElement.focus();
    await sendKeys({ press: 'S' });
    await element.updateComplete;
    expect(didOpen.count).to.be.equal(2);
    expect(didClose.count).to.be.equal(2);
    expect(displayValue).to.have.trimmed.text('Second');
  });

  it('handles keyboard selection', async () => {
    const didOpen = new EventSpy(events.didOpen);
    focusableElement.focus();
    await sendKeys({ press: ' ' });
    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);
    expect(firstOption).not.to.have.attribute('active');
    expect(firstOption).not.to.have.attribute('selected');

    focusableElement.focus();
    await sendKeys({ press: 'ArrowDown' });
    expect(firstOption).to.have.attribute('active');
    expect(firstOption).to.have.attribute('selected');
    expect(element.value).to.be.equal('1');
    expect(displayValue).to.have.trimmed.text('First');
    expect(comboBoxElement).to.have.attribute('aria-expanded', 'true');

    focusableElement.focus();
    await sendKeys({ press: 'T' });
    await element.updateComplete;
    expect(didOpen.count).to.be.equal(1);
    expect(displayValue).to.have.trimmed.text('Third');
    expect(thirdOption).to.have.attribute('active');
    expect(thirdOption).to.have.attribute('selected');
    expect(element.value).to.be.equal('3');

    await aTimeout(1100); // wait for the reset of _searchString timeout

    focusableElement.focus();
    await sendKeys({ press: 'S' });
    await element.updateComplete;
    expect(didOpen.count).to.be.equal(1);
    expect(displayValue).to.have.trimmed.text('Second');
    expect(secondOption).to.have.attribute('active');
    expect(secondOption).to.have.attribute('selected');
    expect(element.value).to.be.equal('2');
  });

  it('handles keyboard selection in multiple', async () => {
    element.setAttribute('multiple', '');
    await element.updateComplete;

    const didOpen = new EventSpy(events.didOpen);
    const didClose = new EventSpy(events.didClose);
    focusableElement.focus();
    await sendKeys({ press: 'ArrowUp' });
    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen.count).to.be.equal(1);

    expect(secondOption).not.to.have.attribute('active');
    expect(secondOption).not.to.have.attribute('selected');
    focusableElement.focus();
    await sendKeys({ press: 'ArrowDown' });
    await sendKeys({ press: 'ArrowDown' });
    await sendKeys({ press: 'Enter' });
    expect(secondOption).to.have.attribute('active');
    expect(secondOption).to.have.attribute('selected');
    expect(element.value).to.be.eql(['2']);
    expect(displayValue).to.have.trimmed.text('Second');

    await sendKeys({ press: 'Escape' });
    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose.count).to.be.equal(1);

    element.focus();
    await sendKeys({ press: 'ArrowDown' });
    await element.updateComplete;
    await waitForCondition(() => didOpen.events.length === 2);
    expect(didOpen.count).to.be.equal(2);
    expect(secondOption).not.to.have.attribute('active');
    expect(secondOption).to.have.attribute('selected');
    expect(comboBoxElement).to.have.attribute('aria-expanded', 'true');
  });
});
