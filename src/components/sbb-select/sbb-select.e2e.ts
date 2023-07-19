import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import events from './sbb-select.events';
import optionEvents from '../sbb-option/sbb-option.events';
import { waitForCondition } from '../../global/testing';

describe('sbb-select', () => {
  let element: E2EElement,
    focusableElement: E2EElement,
    firstOption: E2EElement,
    secondOption: E2EElement,
    thirdOption: E2EElement,
    displayValue: E2EElement,
    comboBoxElement: E2EElement,
    page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <div id="parent">
        <sbb-select placeholder='Placeholder'>
          <sbb-option id="option-1" value="1">First</sbb-option>
          <sbb-option id="option-2" value="2">Second</sbb-option>
          <sbb-option id="option-3" value="3">Third</sbb-option>
        </sbb-select>
      </div>
    `);

    element = await page.find('sbb-select');
    comboBoxElement = await page.find('[role="combobox"]');
    focusableElement = comboBoxElement;
    firstOption = await page.find('sbb-select > sbb-option#option-1');
    secondOption = await page.find('sbb-select > sbb-option#option-2');
    thirdOption = await page.find('sbb-select > sbb-option#option-3');
    displayValue = await page.find('sbb-select >>> .sbb-select__trigger');
    await page.waitForChanges();
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('opens and closes the dialog', async () => {
    const willOpen = await page.spyOnEvent(events.willOpen);
    const didOpen = await page.spyOnEvent(events.didOpen);
    const willClose = await page.spyOnEvent(events.willClose);
    const didClose = await page.spyOnEvent(events.didClose);
    await element.triggerEvent('click');
    await page.waitForChanges();
    await waitForCondition(() => willOpen.events.length === 1);

    expect(willOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();
    await waitForCondition(() => didOpen.events.length === 1);

    expect(didOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(comboBoxElement).toEqualAttribute('aria-expanded', 'true');

    await element.triggerEvent('click');
    await page.waitForChanges();
    await waitForCondition(() => willClose.events.length === 1);

    expect(willClose).toHaveReceivedEventTimes(1);
    await page.waitForChanges();
    await waitForCondition(() => didClose.events.length === 1);

    expect(didClose).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    expect(comboBoxElement).toEqualAttribute('aria-expanded', 'false');
  });

  it('displays placeholder if no value is set and there is no selected element', async () => {
    expect(await element.getProperty('value')).toBeUndefined();
    const placeholder = await page.find('sbb-select >>> .sbb-select__trigger--placeholder');
    expect(placeholder).not.toBeNull();
    expect(placeholder.textContent).toEqualText('Placeholder');
  });

  it("displays value if it's set, or placeholder if value doesn't match available options", async () => {
    expect(displayValue.textContent).toEqualText('Placeholder');

    element.setProperty('value', '1');
    await page.waitForChanges();
    expect(displayValue).toEqualText('First');
    expect(firstOption).toHaveAttribute('selected');
    expect(secondOption).not.toHaveAttribute('selected');
    expect(thirdOption).not.toHaveAttribute('selected');

    element.setProperty('value', '000000000');
    await page.waitForChanges();
    expect(displayValue).toEqualText('Placeholder');
    expect(firstOption).not.toHaveAttribute('selected');
    expect(secondOption).not.toHaveAttribute('selected');
    expect(thirdOption).not.toHaveAttribute('selected');
  });

  it("displays joined string if both multiple and value props are set, or placeholder if value doesn't match available options", async () => {
    expect(displayValue.textContent).toEqualText('Placeholder');
    element.setAttribute('multiple', true);

    element.setProperty('value', ['1', '3']);
    await page.waitForChanges();
    expect(displayValue).toEqualText('First, Third');
    expect(firstOption).toHaveAttribute('selected');
    expect(secondOption).not.toHaveAttribute('selected');
    expect(thirdOption).toHaveAttribute('selected');

    element.setProperty('value', '000000000');
    await page.waitForChanges();
    expect(displayValue).toEqualText('Placeholder');
    expect(firstOption).not.toHaveAttribute('selected');
    expect(secondOption).not.toHaveAttribute('selected');
    expect(thirdOption).not.toHaveAttribute('selected');
  });

  it("displays value if it's set with 'wrong' selected attributes on sbb-options", async () => {
    page = await newE2EPage();
    await page.setContent(`
      <div id="parent">
        <sbb-select value='2'>
          <sbb-option id="option-1" value="1" selected>First</sbb-option>
          <sbb-option id="option-2" value="2">Second</sbb-option>
          <sbb-option id="option-3" value="3" selected>Third</sbb-option>
        </sbb-select>
      </div>
    `);
    element = await page.find('sbb-select');
    await page.waitForChanges();

    const displayValue = await page.find('sbb-select >>> .sbb-select__trigger');
    const firstOption = await page.find('sbb-select > sbb-option#option-1');
    const secondOption = await page.find('sbb-select > sbb-option#option-2');
    const thirdOption = await page.find('sbb-select > sbb-option#option-3');

    expect(await element.getProperty('value')).toEqual('2');
    expect(displayValue).toEqualText('Second');
    expect(firstOption).not.toHaveAttribute('selected');
    expect(secondOption).toHaveAttribute('selected');
    expect(thirdOption).not.toHaveAttribute('selected');
  });

  it('display selected sbb-option if no value is set, then handles selection', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <div id="parent">
        <sbb-select>
          <sbb-option id="option-1" value="1" selected>First</sbb-option>
          <sbb-option id="option-2" value="2">Second</sbb-option>
          <sbb-option id="option-3" value="3">Third</sbb-option>
        </sbb-select>
      </div>
    `);
    element = await page.find('sbb-select');
    comboBoxElement = await page.find('[role="combobox"]');
    focusableElement = comboBoxElement;
    await page.waitForChanges();

    const displayValue = await page.find('sbb-select >>> .sbb-select__trigger');
    expect(displayValue).toEqualText('First');
    expect(await element.getProperty('value')).toEqual('1');

    const willOpen = await page.spyOnEvent(events.willOpen);
    const didOpen = await page.spyOnEvent(events.didOpen);
    await element.triggerEvent('click');
    await page.waitForChanges();
    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();
    await waitForCondition(() => didOpen.events.length === 1);

    expect(didOpen).toHaveReceivedEventTimes(1);
    const firstOption = await page.find('sbb-select > sbb-option#option-1');
    expect(firstOption).not.toHaveAttribute('active');
    expect(firstOption).toHaveAttribute('selected');
    const secondOption = await page.find('sbb-select > sbb-option#option-2');
    expect(secondOption).not.toHaveAttribute('active');
    expect(secondOption).not.toHaveAttribute('selected');

    const selectionChange = await page.spyOnEvent(optionEvents.selectionChange);
    const optionSelected = await page.spyOnEvent(optionEvents.optionSelected);
    const willClose = await page.spyOnEvent(events.willClose);
    const didClose = await page.spyOnEvent(events.didClose);
    await secondOption.triggerEvent('click');
    await page.waitForChanges();

    // Event received, panel is closed
    expect(selectionChange).toHaveReceivedEventTimes(1);
    expect(optionSelected).toHaveReceivedEventTimes(1);

    await page.waitForChanges();
    await waitForCondition(() => willClose.events.length === 1);
    expect(willClose).toHaveReceivedEventTimes(1);
    await page.waitForChanges();
    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose).toHaveReceivedEventTimes(1);
    expect(await element.getProperty('value')).toEqual('2');
    expect(comboBoxElement).toEqualAttribute('aria-expanded', 'false');
  });

  it('handles selection in multiple', async () => {
    element.setAttribute('multiple', 'true');
    await page.waitForChanges();

    const willOpen = await page.spyOnEvent(events.willOpen);
    const didOpen = await page.spyOnEvent(events.didOpen);
    await element.triggerEvent('click');
    await page.waitForChanges();
    await waitForCondition(() => willOpen.events.length === 1);
    expect(willOpen).toHaveReceivedEventTimes(1);
    await page.waitForChanges();
    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen).toHaveReceivedEventTimes(1);

    const firstOption = await page.find('sbb-select > sbb-option#option-1');
    expect(firstOption).not.toHaveAttribute('active');
    expect(firstOption).not.toHaveAttribute('selected');
    const secondOption = await page.find('sbb-select > sbb-option#option-2');
    expect(secondOption).not.toHaveAttribute('active');
    expect(secondOption).not.toHaveAttribute('selected');

    const selectionChange = await page.spyOnEvent(optionEvents.selectionChange);
    await firstOption.triggerEvent('click');
    await page.waitForChanges();
    expect(selectionChange).toHaveReceivedEventTimes(1);
    expect(await element.getProperty('value')).toEqual(['1']);
    expect(displayValue).toEqualText('First');

    await secondOption.triggerEvent('click');
    await page.waitForChanges();
    expect(selectionChange).toHaveReceivedEventTimes(2);
    expect(await element.getProperty('value')).toEqual(['1', '2']);
    expect(displayValue).toEqualText('First, Second');

    await firstOption.triggerEvent('click');
    await page.waitForChanges();
    expect(await element.getProperty('value')).toEqual(['2']);
    await secondOption.triggerEvent('click');
    await page.waitForChanges();
    expect(await element.getProperty('value')).toEqual([]);
    expect(displayValue).toEqualText('Placeholder');
    // Panel is still open
    expect(comboBoxElement).toEqualAttribute('aria-expanded', 'true');
  });

  it('handles keypress on host', async () => {
    const didOpen = await page.spyOnEvent(events.didOpen);
    const didClose = await page.spyOnEvent(events.didClose);

    await focusableElement.press('Enter');
    await page.waitForChanges();
    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen).toHaveReceivedEventTimes(1);

    await focusableElement.press('Escape');
    await page.waitForChanges();
    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose).toHaveReceivedEventTimes(1);

    await focusableElement.press('ArrowDown');
    await page.waitForChanges();
    await waitForCondition(() => didOpen.events.length === 2);
    expect(didOpen).toHaveReceivedEventTimes(2);

    await focusableElement.press('Tab');
    await page.waitForChanges();
    await waitForCondition(() => didClose.events.length === 2);
    expect(didClose).toHaveReceivedEventTimes(2);

    await focusableElement.press('F', { delay: 2000 });
    await page.waitForChanges();
    expect(didOpen).toHaveReceivedEventTimes(2);
    expect(didClose).toHaveReceivedEventTimes(2);
    expect(await page.find('sbb-select >>> .sbb-select__trigger')).toEqualText('First');

    await focusableElement.press('S', { delay: 2000 });
    await page.waitForChanges();
    expect(didOpen).toHaveReceivedEventTimes(2);
    expect(didClose).toHaveReceivedEventTimes(2);
    expect(await page.find('sbb-select >>> .sbb-select__trigger')).toEqualText('Second');
  });

  it('handles keyboard selection', async () => {
    const didOpen = await page.spyOnEvent(events.didOpen);
    await focusableElement.press(' ');
    await page.waitForChanges();
    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen).toHaveReceivedEventTimes(1);

    const firstOption = await page.find('sbb-select > sbb-option#option-1');
    expect(firstOption).not.toHaveAttribute('active');
    expect(firstOption).not.toHaveAttribute('selected');
    await focusableElement.press('ArrowDown');
    expect(firstOption).toHaveAttribute('active');
    expect(firstOption).toHaveAttribute('selected');
    expect(await element.getProperty('value')).toEqual('1');
    expect(displayValue).toEqualText('First');
    expect(comboBoxElement).toEqualAttribute('aria-expanded', 'true');

    const thirdOption = await page.find('sbb-select > sbb-option#option-3');
    await focusableElement.press('T', { delay: 2000 });
    await page.waitForChanges();
    expect(didOpen).toHaveReceivedEventTimes(1);
    expect(displayValue).toEqualText('Third');
    expect(thirdOption).toHaveAttribute('active');
    expect(thirdOption).toHaveAttribute('selected');
    expect(await element.getProperty('value')).toEqual('3');

    const secondOption = await page.find('sbb-select > sbb-option#option-2');
    await focusableElement.press('S', { delay: 2000 });
    await page.waitForChanges();
    expect(didOpen).toHaveReceivedEventTimes(1);
    expect(displayValue).toEqualText('Second');
    expect(secondOption).toHaveAttribute('active');
    expect(secondOption).toHaveAttribute('selected');
    expect(await element.getProperty('value')).toEqual('2');
  });

  it('handles keyboard selection in multiple', async () => {
    element.setAttribute('multiple', 'true');
    await page.waitForChanges();

    const didOpen = await page.spyOnEvent(events.didOpen);
    const didClose = await page.spyOnEvent(events.didClose);
    await focusableElement.press('ArrowUp');
    await page.waitForChanges();
    await waitForCondition(() => didOpen.events.length === 1);
    expect(didOpen).toHaveReceivedEventTimes(1);

    const secondOption = await page.find('sbb-select > sbb-option#option-2');
    expect(secondOption).not.toHaveAttribute('active');
    expect(secondOption).not.toHaveAttribute('selected');
    await focusableElement.press('ArrowDown');
    await focusableElement.press('ArrowDown');
    await focusableElement.press('Enter');
    expect(secondOption).toHaveAttribute('active');
    expect(secondOption).toHaveAttribute('selected');
    expect(await element.getProperty('value')).toEqual(['2']);
    expect(displayValue).toEqualText('Second');
    await focusableElement.press('Escape');
    await page.waitForChanges();
    await waitForCondition(() => didClose.events.length === 1);
    expect(didClose).toHaveReceivedEventTimes(1);

    await element.press('ArrowDown');
    await page.waitForChanges();
    expect(didOpen).toHaveReceivedEventTimes(2);
    expect(secondOption).not.toHaveAttribute('active');
    expect(secondOption).toHaveAttribute('selected');
    expect(comboBoxElement).toEqualAttribute('aria-expanded', 'true');
  });
});
