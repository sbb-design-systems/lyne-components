import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-expansion-panel', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-expansion-panel></sbb-expansion-panel>');

    element = await page.find('sbb-expansion-panel');
    expect(element).toHaveClass('hydrated');
  });
});
