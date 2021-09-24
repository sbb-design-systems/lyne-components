import { newE2EPage } from '@stencil/core/testing';

describe('lyne-image', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-image image-src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg"></lyne-image>');

    element = await page.find('lyne-image');
    expect(element)
      .toHaveClass('hydrated');
  });
});
