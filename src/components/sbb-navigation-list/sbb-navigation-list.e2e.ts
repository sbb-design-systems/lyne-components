import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-navigation-list', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-navigation-list></sbb-navigation-list>');

    element = await page.find('sbb-navigation-list');
    expect(element).toHaveClass('hydrated');
  });
});
