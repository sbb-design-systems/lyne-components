import { newE2EPage } from '@stencil/core/testing';

describe('lyne-tab', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-tab></lyne-tab>');

    element = await page.find('lyne-tab');
    expect(element)
      .toHaveClass('hydrated');
  });

});
