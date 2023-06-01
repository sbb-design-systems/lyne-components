import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/helpers/testing/wait-for-condition';

describe('sbb-breadcrumb', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-breadcrumb id="focus-id" href="/">Test</sbb-breadcrumb>');

    element = await page.find('sbb-breadcrumb');
  });

  it('renders', async () => {
    await page.waitForChanges();
    expect(element).toHaveClass('hydrated');
  });

  it('dispatches event on click', async () => {
    await page.waitForChanges();
    const changeSpy = await page.spyOnEvent('click');

    await element.click();
    await waitForCondition(() => changeSpy.events.length === 1);
    expect(changeSpy).toHaveReceivedEventTimes(1);
  });

  it('should receive focus', async () => {
    await element.focus();
    await page.waitForChanges();

    expect(await page.evaluate(() => document.activeElement.id)).toBe('focus-id');
  });
});
