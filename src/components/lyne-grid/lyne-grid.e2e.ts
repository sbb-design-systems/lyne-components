import { newE2EPage } from '@stencil/core/testing';

describe('lyne-grid', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-grid></lyne-grid>');

    element = await page.find('lyne-grid');
    expect(element)
      .toHaveClass('hydrated');
  });

});
