import { newE2EPage } from '@stencil/core/testing';

describe('lyne-product-subscription', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-product-subscription></lyne-product-subscription>');

    element = await page.find('lyne-product-subscription');
    expect(element)
      .toHaveClass('hydrated');
  });

});
