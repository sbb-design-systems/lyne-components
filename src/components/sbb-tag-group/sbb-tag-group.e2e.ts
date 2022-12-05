import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-tag-group', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-tag-group></sbb-tag-group>');

    element = await page.find('sbb-tag-group');
    expect(element).toHaveClass('hydrated');
  });
});
