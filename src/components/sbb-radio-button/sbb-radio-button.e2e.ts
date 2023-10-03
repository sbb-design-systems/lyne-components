import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import events from './sbb-radio-button.events';
import { waitForCondition } from '../../global/testing';

describe('sbb-radio-button', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-radio-button value="Value">Value label</sbb-radio-button>');

    element = await page.find('sbb-radio-button');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('should not render accessibility label about containing state', async () => {
    element = await page.find('sbb-radio-button >>> .sbb-radio-button__expanded-label');
    expect(element).toBeFalsy();
  });

  it('selects radio on click', async () => {
    const stateChange = await page.spyOnEvent(events.stateChange);

    await element.click();
    await page.waitForChanges();

    expect(element).toHaveAttribute('checked');
    await waitForCondition(() => stateChange.events.length === 1);
    expect(stateChange).toHaveReceivedEventTimes(1);
  });

  it('does not deselect radio if already checked', async () => {
    const stateChange = await page.spyOnEvent(events.stateChange);

    await element.click();
    await page.waitForChanges();
    expect(element).toHaveAttribute('checked');
    await waitForCondition(() => stateChange.events.length === 1);
    expect(stateChange).toHaveReceivedEventTimes(1);

    await element.click();
    await page.waitForChanges();
    expect(element).toHaveAttribute('checked');
    await waitForCondition(() => stateChange.events.length === 1);
    expect(stateChange).toHaveReceivedEventTimes(1);
  });

  it('allows empty selection', async () => {
    const stateChange = await page.spyOnEvent(events.stateChange);

    await element.setProperty('allowEmptySelection', true);
    await element.click();
    await page.waitForChanges();
    expect(element).toHaveAttribute('checked');
    await waitForCondition(() => stateChange.events.length === 1);
    expect(stateChange).toHaveReceivedEventTimes(1);

    await element.click();
    await page.waitForChanges();
    expect(element).not.toHaveAttribute('checked');
    await waitForCondition(() => stateChange.events.length === 2);
    expect(stateChange).toHaveReceivedEventTimes(2);
  });
});
