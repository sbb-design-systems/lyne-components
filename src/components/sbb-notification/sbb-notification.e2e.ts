import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-notification', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-notification></sbb-notification>');

    element = await page.find('sbb-notification');
    expect(element).toHaveClass('hydrated');
  });
});
