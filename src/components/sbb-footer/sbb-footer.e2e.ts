import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-footer', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-footer></sbb-footer>');

    element = await page.find('sbb-footer');
    expect(element).toHaveClass('hydrated');
  });
});
