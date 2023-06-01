import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-toast', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-toast></sbb-toast>');

    element = await page.find('sbb-toast');
    expect(element).toHaveClass('hydrated');
  });
});
