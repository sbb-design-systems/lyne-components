import { newE2EPage } from '@stencil/core/testing';

describe('lyne-toast', () => {
  let page;

  it('renders', async () => {
    page = await newE2EPage({
      url: '/src/components/lyne-toast/lyne-toast.e2e.html'
    });
    const button = await page.find('button');

    await button.waitForVisible();
    await button.click();
    await page.waitForTimeout(250);
    let toast = await page.find('lyne-toast');

    await toast.waitForVisible();
    expect(toast).not.toBe(null);
    expect(toast)
      .toHaveClass('hydrated');
    const label = await page.find('lyne-toast >>> .toast-bottom');

    expect(label.textContent)
      .toEqual('This is a toast!');
    await toast.waitForVisible();

    await toast.callMethod('dismiss');
    await toast.waitForNotVisible();
    toast = await page.find('lyne-toast');
    expect(toast)
      .toBe(null);
  });

});
