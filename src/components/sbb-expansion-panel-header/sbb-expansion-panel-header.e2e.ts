import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-expansion-panel-header', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-expansion-panel-header></sbb-expansion-panel-header>');

    element = await page.find('sbb-expansion-panel-header');
    expect(element).toHaveClass('hydrated');
  });
});
