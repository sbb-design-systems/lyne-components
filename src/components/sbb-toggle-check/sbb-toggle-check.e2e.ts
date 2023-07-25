import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/testing';

describe('sbb-toggle-check', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-toggle-check id="focus-id"></sbb-toggle-check>');
    element = await page.find('sbb-toggle-check');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  describe('events', () => {
    it('emit event on click', async () => {
      await page.waitForChanges();
      const changeSpy = await page.spyOnEvent('change');

      await element.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should emit click on Space', async () => {
      const changeSpy = await element.spyOnEvent('click');

      await element.press(' ');
      await page.waitForChanges();

      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should receive focus', async () => {
      const changeSpy = await element.spyOnEvent('focus');

      await element.focus();
      await page.waitForChanges();

      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy).toHaveReceivedEventTimes(1);

      expect(await page.evaluate(() => document.activeElement.id)).toBe('focus-id');
    });
  });

  it('should prevent scrolling on space bar press', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<div style="height: 100px; overflow: scroll" id="scroll-context">
              <div style="height: 500px">
                <sbb-toggle-check></sbb-toggle-check>
              </div>
            </div>`,
    );
    element = await page.find('sbb-toggle-check');
    expect(element).not.toHaveAttribute('checked');
    expect(await page.evaluate(() => document.querySelector('#scroll-context').scrollTop)).toBe(0);

    await element.press(' ');
    await page.waitForChanges();

    expect(element).toHaveAttribute('checked');
    expect(await page.evaluate(() => document.querySelector('#scroll-context').scrollTop)).toBe(0);
  });
});
