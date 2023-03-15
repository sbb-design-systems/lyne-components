import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-wagon', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-wagon></sbb-wagon>');

    element = await page.find('sbb-wagon');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit sectorChange', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-wagon sector="A"></sbb-wagon>');
    await page.waitForChanges();
    element = await page.find('sbb-wagon');
    const sectorChangeSpy = await element.spyOnEvent('sectorChange');

    element.setProperty('sector', 'B');
    await page.waitForChanges();

    expect(sectorChangeSpy).toHaveReceivedEvent();
  });

  it('should change slot name when changing from multiple to single icon', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<sbb-wagon sector="A">
              <sbb-icon name="sa-rs"></sbb-icon>
              <sbb-icon name="sa-rs"></sbb-icon>
            </sbb-wagon>`
    );
    await page.waitForChanges();
    element = await page.find('sbb-wagon');

    expect(
      (await page.findAll('sbb-icon')).every((icon) =>
        icon.getAttribute('slot').startsWith('sbb-wagon-icon-')
      )
    ).toBe(true);

    // Remove one icon
    await page.evaluate(() => document.querySelector('sbb-icon').remove());
    await page.waitForChanges();

    expect(
      (await page.findAll('sbb-icon')).every((icon) => icon.getAttribute('slot') === null)
    ).toBe(true);
  });
});
