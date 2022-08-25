import { newE2EPage } from '@stencil/core/testing';

describe('sbb-tab-title', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-tab-title></sbb-tab-title>');

    element = await page.find('sbb-tab-title');
    expect(element).toHaveClass('hydrated');
  });
});
