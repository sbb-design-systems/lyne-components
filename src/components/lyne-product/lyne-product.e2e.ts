import { newE2EPage } from '@stencil/core/testing';

describe('lyne-product', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-product></lyne-product>');

    element = await page.find('lyne-product');
    expect(element)
      .toHaveClass('hydrated');
  });

});
