import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-teaser', () => {
  let element: E2EElement, page: E2EPage;

  it('should receive focus', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-teaser href="link" id="focus-id">Hero content</sbb-teaser>');

    element = await page.find('sbb-teaser');
    await element.focus();
    await page.waitForChanges();

    expect(await page.evaluate(() => document.activeElement.id)).toBe('focus-id');
  });
});
