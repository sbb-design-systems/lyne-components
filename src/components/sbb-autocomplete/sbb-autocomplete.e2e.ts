import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-autocomplete', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-autocomplete></sbb-autocomplete>');

    element = await page.find('sbb-autocomplete');
    expect(element).toHaveClass('hydrated');
  });
});
