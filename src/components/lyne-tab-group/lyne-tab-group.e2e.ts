import { newE2EPage } from '@stencil/core/testing';

describe('lyne-tab-group', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-tab-group></lyne-tab-group>');

    element = await page.find('lyne-tab-group');
    expect(element)
      .toHaveClass('hydrated');
  });

});
