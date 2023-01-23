import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-datepicker', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-datepicker></sbb-datepicker>');

    element = await page.find('sbb-datepicker');
    expect(element).toHaveClass('hydrated');
  });
});
