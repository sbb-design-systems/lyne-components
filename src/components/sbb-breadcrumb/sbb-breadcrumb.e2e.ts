import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-breadcrumb', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-breadcrumb>Test</sbb-breadcrumb>');

    element = await page.find('sbb-breadcrumb');
    expect(element).toHaveClass('hydrated');
  });
});
