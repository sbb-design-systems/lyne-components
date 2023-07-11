import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/helpers/testing/wait-for-condition';

describe('sbb-map-container', () => {
  let element: E2EElement, page: E2EPage;

  it('should react to scrolling', async () => {
    page = await newE2EPage();
    await page.setViewport({ width: 320, height: 600 });

    await page.setContent(`
      <sbb-map-container>
        <div style="height: 1000px; width: 100%"></div>
        <div slot="map" style="height: 100%;"></div>
      </sbb-map-container>`);

    element = await page.find('sbb-map-container');
    expect(element).toHaveClass('hydrated');

    await page.waitForChanges();

    async function getInert(): Promise<boolean> {
      return await page.evaluate(() =>
        document
          .querySelector('sbb-map-container')
          .shadowRoot.querySelector('sbb-button')
          .hasAttribute('inert'),
      );
    }

    expect(element).not.toHaveAttribute('data-scroll-up-button-visible');
    expect(await getInert()).toBe(true);

    // Scroll down
    await page.evaluate(() => (document.documentElement.scrollTop = 400));
    await page.waitForChanges();

    await waitForCondition(async () => !(await getInert()));
    expect(element).toHaveAttribute('data-scroll-up-button-visible');
    expect(await getInert()).toBe(false);
  });
});
