import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-expansion-panel-content', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-expansion-panel-content>Content</sbb-expansion-panel-content>');

    element = await page.find('sbb-expansion-panel-content');
    expect(element).toHaveClass('hydrated');
  });
});
