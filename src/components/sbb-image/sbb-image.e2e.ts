import images from '../../global/images';
import { newE2EPage } from '@stencil/core/testing';

describe('sbb-image', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<sbb-image image-src="${images[0]}"></sbb-image>`);

    element = await page.find('sbb-image');
    expect(element).toHaveClass('hydrated');
  });
});
