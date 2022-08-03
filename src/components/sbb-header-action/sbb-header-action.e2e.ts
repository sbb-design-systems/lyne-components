import { newE2EPage } from '@stencil/core/testing';

describe('sbb-header-action', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-header-action></sbb-header-action>');

    element = await page.find('sbb-header-action');
    expect(element).toHaveClass('hydrated');
  });
});
