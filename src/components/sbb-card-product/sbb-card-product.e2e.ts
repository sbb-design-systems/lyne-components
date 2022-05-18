import { newE2EPage } from '@stencil/core/testing';

describe('sbb-card-product', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-card-product accessibility-label="SBB product card"></sbb-card-product>');

    element = await page.find('sbb-card-product');
    expect(element)
      .toHaveClass('hydrated');
  });

});
