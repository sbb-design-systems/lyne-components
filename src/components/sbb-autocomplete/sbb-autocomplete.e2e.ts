import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import events from './sbb-autocomplete.events';

describe('sbb-autocomplete', () => {
  let element: E2EElement, formField: E2EElement, input: E2EElement, page: E2EPage;

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
    input = await page.find('input');
    element = await page.find('sbb-autocomplete');
  });

  it('renders and sets the correct attributes', () => {
    expect(formField).toHaveClass('hydrated');
    expect(element).toHaveClass('hydrated');

    expect(element).not.toHaveAttribute('autocomplete-origin-borderless');

    expect(formField).toHaveAttribute('data-autocomplete-origin');
    expect(formField).not.toHaveAttribute('data-autocomplete-open');
    expect(formField).not.toHaveAttribute('data-autocomplete-disable-animation');

    expect(input).toEqualAttribute('autocomplete', 'off');
    expect(input).toEqualAttribute('role', 'combobox');
    expect(input).toEqualAttribute('aria-autocomplete', 'list');
    expect(input).toEqualAttribute('aria-haspopup', 'listbox');
    expect(input).toEqualAttribute('aria-controls', 'myAutocomplete');
    expect(input).toEqualAttribute('aria-owns', 'myAutocomplete');
    expect(input).toEqualAttribute('aria-expanded', 'false');
  });

  it('opens and closes with mouse and keyboard', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);

    await input.focus();
    await page.waitForChanges();
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    expect(input.getAttribute('aria-expanded')).toEqual('true');

    await element.press('Escape');
    await page.waitForChanges();
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    expect(input.getAttribute('aria-expanded')).toEqual('false');

    await element.press('ArrowDown');
    await page.waitForChanges();
    expect(didOpenEventSpy).toHaveReceivedEventTimes(2);
    expect(input.getAttribute('aria-expanded')).toEqual('true');

    await element.press('Tab');
    await page.waitForChanges();
    expect(didCloseEventSpy).toHaveReceivedEventTimes(2);
    expect(input.getAttribute('aria-expanded')).toEqual('false');

    await input.click();
    await page.waitForChanges();
    expect(didOpenEventSpy).toHaveReceivedEventTimes(3);
    expect(input.getAttribute('aria-expanded')).toEqual('true');

    const button = await page.find('button');
    await button.click();
    expect(didCloseEventSpy).toHaveReceivedEventTimes(3);
    expect(input.getAttribute('aria-expanded')).toEqual('false');
  });

  it('opens and select with keyboard', async () => {
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);
    await input.focus();
    await page.waitForChanges();
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);

    await element.press('ArrowDown');
    await element.press('ArrowDown');
    const optOne = await page.find('sbb-autocomplete > sbb-option#option-1');
    expect(await optOne.getProperty('active')).toEqual(false);
    expect(await optOne.getProperty('selected')).toEqual(false);
    const optTwo = await page.find('sbb-autocomplete > sbb-option#option-2');
    expect(await optTwo.getProperty('active')).toEqual(true);
    expect(await optTwo.getProperty('selected')).toEqual(false);
    expect(input.getAttribute('aria-activedescendant')).toEqual('option-2');

    await element.press('Enter');
    expect(await optTwo.getProperty('active')).toEqual(false);
    expect(await optTwo.getProperty('selected')).toEqual(true);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
    expect(input.getAttribute('aria-expanded')).toEqual('false');
    expect(input).not.toHaveAttribute('aria-activedescendant');
  });
});
