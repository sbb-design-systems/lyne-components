import { newE2EPage } from '@stencil/core/testing';

describe('lyne-link', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-link></lyne-link>');

    element = await page.find('lyne-link');
    expect(element)
      .toHaveClass('hydrated');
  });

});
