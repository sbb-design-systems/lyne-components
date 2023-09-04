import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-message', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-message></sbb-message>');

    element = await page.find('sbb-message');
    expect(element).toHaveClass('hydrated');
  });
});
