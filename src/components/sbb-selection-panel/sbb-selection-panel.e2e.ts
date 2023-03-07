import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-selection-panel', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-selection-panel></sbb-selection-panel>');

    element = await page.find('sbb-selection-panel');
    expect(element).toHaveClass('hydrated');
  });
});
