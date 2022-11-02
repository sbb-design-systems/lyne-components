import { newE2EPage } from '@stencil/core/testing';

describe('sbb-wagon', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-wagon></sbb-wagon>');

    element = await page.find('sbb-wagon');
    expect(element).toHaveClass('hydrated');
  });
});
