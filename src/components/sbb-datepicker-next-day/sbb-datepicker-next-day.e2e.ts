import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-datepicker-next-day', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-datepicker-next-day></sbb-datepicker-next-day>');

    element = await page.find('sbb-datepicker-next-day');
    expect(element).toHaveClass('hydrated');
  });
});
