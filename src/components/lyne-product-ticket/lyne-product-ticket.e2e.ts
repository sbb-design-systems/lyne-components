import { newE2EPage } from '@stencil/core/testing';

describe('lyne-product-ticket', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-product-ticket></lyne-product-ticket>');

    element = await page.find('lyne-product-ticket');
    expect(element)
      .toHaveClass('hydrated');
  });

});
