import { newE2EPage } from '@stencil/core/testing';

describe('lyne-toast', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-toast></lyne-toast>');

    element = await page.find('lyne-toast');
    expect(element)
      .toHaveClass('hydrated');
  });

});
