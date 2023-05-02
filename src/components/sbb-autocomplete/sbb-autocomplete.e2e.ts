/* eslint-disable jest/no-commented-out-tests */
import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
// import events from './sbb-autocomplete.events';
// import { waitForCondition } from '../../global/helpers/testing/wait-for-condition';

describe('sbb-autocomplete', () => {
  // let element: E2EElement, formField: E2EElement, input: E2EElement, page: E2EPage;
  let formField: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-form-field>
        <input/>
        <sbb-autocomplete id="myAutocomplete">
          <sbb-option id="option-1" value="1">1</sbb-option>
          <sbb-option id="option-2" value="2">2</sbb-option>
          <sbb-option id="option-3" value="3">3</sbb-option>
        </sbb-autocomplete>
      </sbb-form-field>
      <button>Use this for backdrop click</button>
    `);

    formField = await page.find('sbb-form-field');
    // input = await page.find('input');
    // element = await page.find('sbb-autocomplete');
  });

  it('renders and sets the correct attributes', () => {
    expect(formField).toHaveClass('hydrated');
    // expect(element).toHaveClass('hydrated');

    // expect(element).not.toHaveAttribute('autocomplete-origin-borderless');

    // expect(input).toEqualAttribute('autocomplete', 'off');
    // expect(input).toEqualAttribute('role', 'combobox');
    // expect(input).toEqualAttribute('aria-autocomplete', 'list');
    // expect(input).toEqualAttribute('aria-haspopup', 'listbox');
    // expect(input).toEqualAttribute('aria-controls', 'myAutocomplete');
    // expect(input).toEqualAttribute('aria-owns', 'myAutocomplete');
    // expect(input).toEqualAttribute('aria-expanded', 'false');
  });

  // it('opens and closes with mouse and keyboard', async () => {
  //   const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
  //   const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
  //   const willCloseEventSpy = await page.spyOnEvent(events.willClose);
  //   const didCloseEventSpy = await page.spyOnEvent(events.didClose);

  //   await input.focus();
  //   await page.waitForChanges();
  //   await waitForCondition(() => willOpenEventSpy.events.length === 1);
  //   expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
  //   await page.waitForChanges();
  //   await waitForCondition(() => didOpenEventSpy.events.length === 1);
  //   expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
  //   expect(input.getAttribute('aria-expanded')).toEqual('true');

  //   await element.press('Escape');
  //   await page.waitForChanges();
  //   await waitForCondition(() => willCloseEventSpy.events.length === 1);
  //   expect(willCloseEventSpy).toHaveReceivedEventTimes(1);
  //   await page.waitForChanges();
  //   await waitForCondition(() => didCloseEventSpy.events.length === 1);
  //   expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
  //   expect(input.getAttribute('aria-expanded')).toEqual('false');

  //   await element.press('ArrowDown');
  //   await page.waitForChanges();
  //   await waitForCondition(() => willOpenEventSpy.events.length === 2);
  //   expect(willOpenEventSpy).toHaveReceivedEventTimes(2);
  //   await page.waitForChanges();
  //   await waitForCondition(() => didOpenEventSpy.events.length === 2);
  //   expect(didOpenEventSpy).toHaveReceivedEventTimes(2);
  //   expect(input.getAttribute('aria-expanded')).toEqual('true');

  //   await element.press('Tab');
  //   await page.waitForChanges();
  //   await waitForCondition(() => willCloseEventSpy.events.length === 2);
  //   expect(willCloseEventSpy).toHaveReceivedEventTimes(2);
  //   await page.waitForChanges();
  //   await waitForCondition(() => didCloseEventSpy.events.length === 2);
  //   expect(didCloseEventSpy).toHaveReceivedEventTimes(2);
  //   expect(input.getAttribute('aria-expanded')).toEqual('false');

  //   await input.click();
  //   await page.waitForChanges();
  //   await waitForCondition(() => willOpenEventSpy.events.length === 3);
  //   expect(willOpenEventSpy).toHaveReceivedEventTimes(3);
  //   await page.waitForChanges();
  //   await waitForCondition(() => didOpenEventSpy.events.length === 3);
  //   expect(didOpenEventSpy).toHaveReceivedEventTimes(3);
  //   expect(input.getAttribute('aria-expanded')).toEqual('true');

  //   const button = await page.find('button');
  //   await button.click();
  //   await waitForCondition(() => willCloseEventSpy.events.length === 3);
  //   expect(willCloseEventSpy).toHaveReceivedEventTimes(3);
  //   await page.waitForChanges();
  //   await waitForCondition(() => didCloseEventSpy.events.length === 3);
  //   expect(didCloseEventSpy).toHaveReceivedEventTimes(3);
  //   expect(input.getAttribute('aria-expanded')).toEqual('false');
  // });

  // it('opens and select with keyboard', async () => {
  //   const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
  //   const didCloseEventSpy = await page.spyOnEvent(events.didClose);
  //   await input.focus();
  //   await page.waitForChanges();
  //   await waitForCondition(() => didOpenEventSpy.events.length === 1);
  //   expect(didOpenEventSpy).toHaveReceivedEventTimes(1);

  //   await element.press('ArrowDown');
  //   await page.waitForChanges();
  //   await element.press('ArrowDown');
  //   await page.waitForChanges();
  //   const optOne = await page.find('sbb-autocomplete > sbb-option#option-1');
  //   expect(await optOne.getProperty('active')).toEqual(false);
  //   expect(await optOne.getProperty('selected')).toEqual(false);
  //   const optTwo = await page.find('sbb-autocomplete > sbb-option#option-2');
  //   expect(await optTwo.getProperty('active')).toEqual(true);
  //   expect(await optTwo.getProperty('selected')).toEqual(false);
  //   expect(input.getAttribute('aria-activedescendant')).toEqual('option-2');

  //   await element.press('Enter');
  //   await page.waitForChanges();
  //   await waitForCondition(() => didCloseEventSpy.events.length === 1);
  //   expect(await optTwo.getProperty('active')).toEqual(false);
  //   expect(await optTwo.getProperty('selected')).toEqual(true);
  //   expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
  //   expect(input.getAttribute('aria-expanded')).toEqual('false');
  //   expect(input).not.toHaveAttribute('aria-activedescendant');
  // });
});
