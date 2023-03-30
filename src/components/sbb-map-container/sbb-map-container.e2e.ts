import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-map-container', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-map-container></sbb-map-container>');

    element = await page.find('sbb-map-container');
    expect(element).toHaveClass('hydrated');
  });
});
