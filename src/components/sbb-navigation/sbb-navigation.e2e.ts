import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-navigation', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-navigation></sbb-navigation>');

    element = await page.find('sbb-navigation');
    expect(element).toHaveClass('hydrated');
  });
});
