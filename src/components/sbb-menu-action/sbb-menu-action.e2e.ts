import { newE2EPage } from '@stencil/core/testing';

describe('sbb-menu-action', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-menu-action></sbb-menu-action>');

    element = await page.find('sbb-menu-action');
    expect(element).toHaveClass('hydrated');
  });
});
