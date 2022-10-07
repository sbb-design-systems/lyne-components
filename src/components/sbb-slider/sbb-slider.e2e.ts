import { newE2EPage } from '@stencil/core/testing';

describe('sbb-slider', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-slider></sbb-slider>');

    element = await page.find('sbb-slider');
    expect(element).toHaveClass('hydrated');
  });
});
