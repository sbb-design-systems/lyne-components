import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-option', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-option></sbb-option>');

    element = await page.find('sbb-option');
    expect(element).toHaveClass('hydrated');
  });
});
