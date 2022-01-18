import { newE2EPage } from '@stencil/core/testing';

describe('lyne-card-product', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-card-product></lyne-card-product>');

    element = await page.find('lyne-card-product');
    expect(element)
      .toHaveClass('hydrated');
  });

});
