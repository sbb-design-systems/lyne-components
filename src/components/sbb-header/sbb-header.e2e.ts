import { newE2EPage } from '@stencil/core/testing';

describe('sbb-header', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-header></sbb-header>');

    element = await page.find('sbb-header');
    expect(element).toHaveClass('hydrated');
  });
});
