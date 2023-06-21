import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-visual-checkbox', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-visual-checkbox></sbb-visual-checkbox>');

    element = await page.find('sbb-visual-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});
