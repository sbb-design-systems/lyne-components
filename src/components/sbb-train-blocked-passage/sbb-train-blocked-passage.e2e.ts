import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-train-blocked-passage', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-train-blocked-passage></sbb-train-blocked-passage>');

    element = await page.find('sbb-train-blocked-passage');
    expect(element).toHaveClass('hydrated');
  });
});
