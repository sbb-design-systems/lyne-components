import { newE2EPage } from '@stencil/core/testing';

describe('lyne-alert', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-alert></lyne-alert>');

    element = await page.find('lyne-alert');
    expect(element)
      .toHaveClass('hydrated');
  });

});
