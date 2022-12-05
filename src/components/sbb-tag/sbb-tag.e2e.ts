import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-tag', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-tag></sbb-tag>');

    element = await page.find('sbb-tag');
    expect(element).toHaveClass('hydrated');
  });
});
