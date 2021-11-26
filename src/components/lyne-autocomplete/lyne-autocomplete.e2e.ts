import { newE2EPage } from '@stencil/core/testing';

describe('lyne-autocomplete', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-autocomplete></lyne-autocomplete>');

    element = await page.find('lyne-autocomplete');
    expect(element)
      .toHaveClass('hydrated');
  });

});
