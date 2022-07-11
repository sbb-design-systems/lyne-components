import { newE2EPage } from '@stencil/core/testing';

describe('sbb-icon', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-icon></sbb-icon>');

    element = await page.find('sbb-icon');
    expect(element).toHaveClass('hydrated');
  });
});
