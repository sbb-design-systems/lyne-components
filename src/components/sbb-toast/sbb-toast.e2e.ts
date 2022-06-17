import { newE2EPage } from '@stencil/core/testing';

describe('sbb-toast', () => {
  let page;

  it('renders', async () => {
    page = await newE2EPage({
      url: '/src/components/lyne-toast/sbb-toast.e2e.html'
    });
    const button = await page.find('button');

    await button.waitForVisible();
    await button.click();
    await page.waitForTimeout(250);
    let toast = await page.find('sbb-toast');

    await toast.waitForVisible();
    expect(toast).not.toBe(null);
    expect(toast)
      .toHaveClass('hydrated');
    const label = await page.find('sbb-toast >>> .toast-vertical-end');

    expect(label.textContent)
      .toEqual('This is a toast!');
    await toast.waitForVisible();

    await toast.callMethod('dismiss');
    await toast.waitForNotVisible();
    toast = await page.find('sbb-toast');
    expect(toast)
      .toBe(null);
  });

});
