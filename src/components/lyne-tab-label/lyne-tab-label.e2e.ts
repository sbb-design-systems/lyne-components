import { newE2EPage } from '@stencil/core/testing';

describe('lyne-tab-label', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-tab-label></lyne-tab-label>');

    element = await page.find('lyne-tab-label');
    expect(element)
      .toHaveClass('hydrated');
  });

});
