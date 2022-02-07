import { newE2EPage } from '@stencil/core/testing';

describe('lyne-footer', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-footer></lyne-footer>');

    element = await page.find('lyne-footer');
    expect(element)
      .toHaveClass('hydrated');
  });

});
