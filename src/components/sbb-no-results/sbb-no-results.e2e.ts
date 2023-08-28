import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-no-results', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-no-results></sbb-no-results>');

    element = await page.find('sbb-no-results');
    expect(element).toHaveClass('hydrated');
  });
});
