import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-loading-indicator', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-loading-indicator></sbb-loading-indicator>');

    element = await page.find('sbb-loading-indicator');
    expect(element).toHaveClass('hydrated');
  });
});
