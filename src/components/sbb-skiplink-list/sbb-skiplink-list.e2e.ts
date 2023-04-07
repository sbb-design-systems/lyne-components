import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-skiplink-list', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-skiplink-list></sbb-skiplink-list>');

    element = await page.find('sbb-skiplink-list');
    expect(element).toHaveClass('hydrated');
  });
});
