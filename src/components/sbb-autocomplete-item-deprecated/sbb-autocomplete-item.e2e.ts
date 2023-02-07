import { newE2EPage } from '@stencil/core/testing';

describe('sbb-autocomplete-item-deprecated', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-autocomplete-item-deprecated></sbb-autocomplete-item-deprecated>');

    element = await page.find('sbb-autocomplete-item-deprecated');
    expect(element).toHaveClass('hydrated');
  });
});
