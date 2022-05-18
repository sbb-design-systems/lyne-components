import { newE2EPage } from '@stencil/core/testing';

describe('lyne-section', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-section></lyne-section>');

    element = await page.find('lyne-section');
    expect(element)
      .toHaveClass('hydrated');
  });

});
