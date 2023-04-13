import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import events from './sbb-radio-button.events';
import { waitForCondition } from '../../global/helpers/testing/wait-for-condition';

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

  it('selects radio on click', async () => {
    const didSelect = await page.spyOnEvent(events.didSelect);

    await element.click();
    await page.waitForChanges();

    expect(element).toHaveAttribute('checked');
    await waitForCondition(() => didSelect.events.length === 1);
    expect(didSelect).toHaveReceivedEventTimes(1);
  });

  it('does not deselect radio if already checked', async () => {
    const didSelect = await page.spyOnEvent(events.didSelect);

    await element.click();
    await page.waitForChanges();
    expect(element).toHaveAttribute('checked');
    await waitForCondition(() => didSelect.events.length === 1);
    expect(didSelect).toHaveReceivedEventTimes(1);

    await element.click();
    await page.waitForChanges();
    expect(element).toHaveAttribute('checked');
    await waitForCondition(() => didSelect.events.length === 1);
    expect(didSelect).toHaveReceivedEventTimes(1);
  });

  it('allows empty selection', async () => {
    const didSelect = await page.spyOnEvent(events.didSelect);

    await element.setProperty('allowEmptySelection', true);
    await element.click();
    await page.waitForChanges();
    expect(element).toHaveAttribute('checked');
    await waitForCondition(() => didSelect.events.length === 1);
    expect(didSelect).toHaveReceivedEventTimes(1);

    await element.click();
    await page.waitForChanges();
    expect(element).not.toHaveAttribute('checked');
    await waitForCondition(() => didSelect.events.length === 2);
    expect(didSelect).toHaveReceivedEventTimes(2);
  });
});
