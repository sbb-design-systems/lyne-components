import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-datepicker-toggle', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-datepicker-toggle></sbb-datepicker-toggle>');

    element = await page.find('sbb-datepicker-toggle');
    expect(element).toHaveClass('hydrated');
  });
});
