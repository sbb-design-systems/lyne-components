import { newE2EPage } from '@stencil/core/testing';

describe('lyne-slot-component', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-slot-component></lyne-slot-component>');

    element = await page.find('lyne-slot-component');
    expect(element)
      .toHaveClass('hydrated');
  });

});
