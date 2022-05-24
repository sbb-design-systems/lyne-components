import { newE2EPage } from '@stencil/core/testing';

describe('lyne-overlay', () => {
  let page;

  it('renders', async () => {
    page = await newE2EPage({
      url: '/src/global/core/components/overlay/overlay.e2e.html'
    });
    const buttonPresent = await page.find('#create-and-present-overlay');

    await buttonPresent.waitForVisible();
    await buttonPresent.click();
    await page.waitForTimeout(250);
    let overlay = await page.find('lyne-overlay');

    await overlay.waitForVisible();
    expect(overlay).not.toBe(null);
    expect(overlay)
      .toHaveClass('hydrated');
    const label = await page.find('lyne-overlay >>> .overlay-class');

    expect(label.textContent)
      .toEqual('Overlay');
    await overlay.waitForVisible();

    const buttonDismiss = await page.find('#dismiss-overlay');

    await buttonDismiss.waitForVisible();
    await buttonDismiss.click();
    await page.waitForTimeout(250);

    await overlay.waitForNotVisible();
    overlay = await page.find('lyne-overlay');
    expect(overlay)
      .toBe(null);
  });

});
