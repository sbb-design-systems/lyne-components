import { newE2EPage } from '@stencil/core/testing';

describe('lyne-input-error', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-input-error></lyne-input-error>');

    element = await page.find('lyne-input-error');
    expect(element)
      .toHaveClass('hydrated');
  });

});
