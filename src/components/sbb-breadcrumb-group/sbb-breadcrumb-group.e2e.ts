import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-breadcrumb-group', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-breadcrumb-group></sbb-breadcrumb-group>');

    element = await page.find('sbb-breadcrumb-group');
    expect(element).toHaveClass('hydrated');
  });
});
