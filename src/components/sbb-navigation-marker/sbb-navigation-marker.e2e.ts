import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-navigation-marker', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-navigation-marker></sbb-navigation-marker>');

    element = await page.find('sbb-navigation-marker');
    expect(element).toHaveClass('hydrated');
  });
});
