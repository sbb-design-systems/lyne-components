import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-teaser', () => {
  let element: E2EElement, page: E2EPage;

  it('should forward host click to action element', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-teaser href="link">Teaser content</sbb-teaser>');
    const teaserHero = await page.find('sbb-teaser >>> .sbb-teaser');
    const changeSpy = await teaserHero.spyOnEvent('click');

    element = await page.find('sbb-teaser');
    element.triggerEvent('click');

    await page.waitForChanges();

    expect(changeSpy).toHaveReceivedEventTimes(1);
  });

  it('should forward host focus event to action element', async () => {
    page = await newE2EPage();
    await page.setContent(
      '<sbb-teaser href="link" id="outer-id" teaser-id="inner-id">Teaser content</sbb-teaser>'
    );
    element = await page.find('sbb-teaser');
    const link = await page.find('sbb-teaser >>> .sbb-teaser');

    const changeSpy = await link.spyOnEvent('focus');

    await element.focus();
    await page.waitForChanges();

    expect(changeSpy).toHaveReceivedEventTimes(1);
  });
});
