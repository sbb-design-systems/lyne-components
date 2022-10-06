import images from '../../global/images';
import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-teaser-hero', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<sbb-teaser-hero href="https://www.sbb.ch" image-src="${images[0]}"></sbb-teaser-hero>`
    );

    element = await page.find('sbb-teaser-hero');
    expect(element).toHaveClass('hydrated');
  });

  it('should forward host click to action element', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-teaser-hero href="link">Hero content</sbb-teaser-hero>');
    const link = await page.find('sbb-teaser-hero >>> a');
    const changeSpy = await link.spyOnEvent('click');

    element = await page.find('sbb-teaser-hero');
    element.triggerEvent('click');

    await page.waitForChanges();

    expect(changeSpy).toHaveReceivedEventTimes(1);
  });
});
