import { newE2EPage } from '@stencil/core/testing';

describe('lyne-teaser-hero', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-teaser-hero button-text="Button text" image-src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg" text="Panel text"></lyne-teaser-hero>');

    element = await page.find('lyne-teaser-hero');
    expect(element)
      .toHaveClass('hydrated');
  });
});
