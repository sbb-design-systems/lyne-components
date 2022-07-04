import images from '../../global/images';
import { newE2EPage } from '@stencil/core/testing';

describe('sbb-teaser-hero', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<sbb-teaser-hero link="https://www.sbb.ch" image-src="${images[0]}"></sbb-teaser-hero>`
    );

    element = await page.find('sbb-teaser-hero');
    expect(element).toHaveClass('hydrated');
  });
});
