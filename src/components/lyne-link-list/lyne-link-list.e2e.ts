import { newE2EPage } from '@stencil/core/testing';

describe('lyne-link-list', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-link-list></lyne-link-list>');

    element = await page.find('lyne-link-list');
    expect(element)
      .toHaveClass('hydrated');
  });

});
