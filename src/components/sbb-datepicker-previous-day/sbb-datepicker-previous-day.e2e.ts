import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-datepicker-previous-day', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-datepicker-previous-day></sbb-datepicker-previous-day>');

    element = await page.find('sbb-datepicker-previous-day');
    expect(element).toHaveClass('hydrated');
  });
});
