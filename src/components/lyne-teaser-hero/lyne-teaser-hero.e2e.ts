import { newE2EPage } from '@stencil/core/testing';

describe('lyne-teaser-hero', () => {
  let element,
    page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-teaser-hero></lyne-teaser-hero>');
    element = await page.find('lyne-teaser-hero');
  });

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-teaser-hero></lyne-teaser-hero>');

    element = await page.find('lyne-teaser-hero');
    expect(element)
      .toHaveClass('hydrated');
  });
});
