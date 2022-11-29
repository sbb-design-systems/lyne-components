import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-navigation-section', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-navigation-section></sbb-navigation-section>');

    element = await page.find('sbb-navigation-section');
    expect(element).toHaveClass('hydrated');
  });
});
