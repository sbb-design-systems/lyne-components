import { newE2EPage } from '@stencil/core/testing';

describe('lyne-autocomplete-item', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-autocomplete-item></lyne-autocomplete-item>');

    element = await page.find('lyne-autocomplete-item');
    expect(element)
      .toHaveClass('hydrated');
  });

});
