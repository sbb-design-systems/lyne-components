import { newE2EPage } from '@stencil/core/testing';

describe('lyne-text-input', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-text-input></lyne-text-input>');

    element = await page.find('lyne-text-input');
    expect(element)
      .toHaveClass('hydrated');
  });

});
