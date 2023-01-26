import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-group', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-group></sbb-group>');

    element = await page.find('sbb-group');
    expect(element).toHaveClass('hydrated');
  });
});
