import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-navigation-action', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-navigation-action></sbb-navigation-action>');

    element = await page.find('sbb-navigation-action');
    expect(element).toHaveClass('hydrated');
  });
});
