import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-wagon-blocked-passage', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-wagon-blocked-passage></sbb-wagon-blocked-passage>');

    element = await page.find('sbb-wagon-blocked-passage');
    expect(element).toHaveClass('hydrated');
  });
});
