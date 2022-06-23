import { newE2EPage } from '@stencil/core/testing';

describe('sbb-accordion-item', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.waitForChanges();
    await page.setContent('<sbb-accordion-item></sbb-accordion-item>');

    element = await page.find('sbb-accordion-item');
    expect(element).toHaveClass('hydrated');
  });
});
