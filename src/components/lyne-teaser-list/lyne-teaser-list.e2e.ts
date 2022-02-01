import { newE2EPage } from '@stencil/core/testing';

describe('lyne-teaser-list', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-teaser-list></lyne-teaser-list>');

    element = await page.find('lyne-teaser-list');
    expect(element)
      .toHaveClass('hydrated');
  });

});
