import images from '../../global/images';
import { newE2EPage } from '@stencil/core/testing';

describe('lyne-teaser-hero', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<lyne-teaser-hero button-text="Button text" image-src="${images[0]}" text="Panel text"></lyne-teaser-hero>`);

    element = await page.find('lyne-teaser-hero');
    expect(element)
      .toHaveClass('hydrated');
  });
});
