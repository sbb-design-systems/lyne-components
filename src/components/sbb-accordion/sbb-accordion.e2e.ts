import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-accordion', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-accordion></sbb-accordion>');

    element = await page.find('sbb-accordion');
    expect(element).toHaveClass('hydrated');
  });
});
