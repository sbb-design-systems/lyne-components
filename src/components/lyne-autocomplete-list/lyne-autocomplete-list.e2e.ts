import { newE2EPage } from '@stencil/core/testing';

describe('lyne-autocomplete-list', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-autocomplete-list></lyne-autocomplete-list>');

    element = await page.find('lyne-autocomplete-list');
    expect(element)
      .toHaveClass('hydrated');
  });

});
