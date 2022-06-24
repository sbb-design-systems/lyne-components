import { newE2EPage } from '@stencil/core/testing';

describe('sbb-link-list', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-link-list></sbb-link-list>');

    element = await page.find('sbb-link-list');
    expect(element).toHaveClass('hydrated');
  });
});
