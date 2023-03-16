import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-train', () => {
  let element: E2EElement, page: E2EPage;

  it('should render', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-train></sbb-train>');

    element = await page.find('sbb-train');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit trainSlotChange', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-train>
        <sbb-train-wagon></sbb-train-wagon>
        <sbb-train-wagon></sbb-train-wagon>
        <sbb-train-wagon></sbb-train-wagon>
      </sbb-train>
    `);

    await page.waitForChanges();
    element = await page.find('sbb-train');
    const trainSlotChangeSpy = await element.spyOnEvent('trainSlotChange');

    await page.evaluate(() => document.querySelector('sbb-train-wagon').remove());
    await page.waitForChanges();

    expect(trainSlotChangeSpy).toHaveReceivedEvent();
  });
});
