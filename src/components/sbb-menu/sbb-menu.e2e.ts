import { newE2EPage } from '@stencil/core/testing';

describe('sbb-menu', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-menu></sbb-menu>');

    element = await page.find('sbb-menu');
    expect(element).toHaveClass('hydrated');
  });
});
