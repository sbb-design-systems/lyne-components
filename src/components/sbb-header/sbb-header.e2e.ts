import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-header', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-header></sbb-header>');

    element = await page.find('sbb-header');
    expect(element).toHaveClass('hydrated');
  });

  it('should be fixed on scroll', async () => {
    page = await newE2EPage();
    await page.setContent(`
        <sbb-header></sbb-header>
        <div style="height: 2000px;"></div>
    `);
    element = await page.find('sbb-header');

    await page.evaluate(() => window.scrollTo({ top: 200 }));
    await page.waitForChanges();
    expect(element).toEqualHtml(`
      <sbb-header class="hydrated" data-shadow>
        <mock:shadow-root>
          <header class="sbb-header">
            <div class="sbb-header__wrapper">
              <slot></slot>
              <div class="sbb-header__logo">
                <slot name="logo">
                  <sbb-logo class="hydrated" protective-room="none"></sbb-logo>
                </slot>
              </div>
            </div>
          </header>
        </mock:shadow-root>
      </sbb-header>
    `);
  });

  it('should hide/show on scroll', async () => {
    page = await newE2EPage();
    await page.setContent(`
        <sbb-header hide-on-scroll="true"></sbb-header>
        <div style="height: 2000px;"></div>
    `);

    element = await page.find('sbb-header');
    expect(await element.getProperty('scrollOrigin')).not.toBeUndefined();
    expect(await page.evaluate(() => document.querySelector('sbb-header').offsetHeight)).toBe(56);
    expect(await page.evaluate(() => document.documentElement.offsetHeight)).toBe(2056);

    // Scroll bottom (0px to 200px): header fixed.
    await page.evaluate(() => window.scrollTo({ top: 200 }));
    await page.waitForChanges();
    expect(element).toEqualHtml(`
      <sbb-header class="hydrated" hide-on-scroll="" data-fixed-header>
        <mock:shadow-root>
          <header class="sbb-header">
            <div class="sbb-header__wrapper">
              <slot></slot>
              <div class="sbb-header__logo">
                <slot name="logo">
                  <sbb-logo class="hydrated" protective-room="none"></sbb-logo>
                </slot>
              </div>
            </div>
          </header>
        </mock:shadow-root>
      </sbb-header>
    `);

    // Scroll top (200px to 100px): header fixed and visible, with shadow and animated.
    await page.evaluate(() => window.scrollTo({ top: 100 }));
    await page.waitForChanges();
    expect(element).toEqualHtml(`
      <sbb-header class="hydrated" hide-on-scroll="" data-shadow data-animated data-fixed-header data-visible-header>
        <mock:shadow-root>
          <header class="sbb-header">
            <div class="sbb-header__wrapper">
              <slot></slot>
              <div class="sbb-header__logo">
                <slot name="logo">
                  <sbb-logo class="hydrated" protective-room="none"></sbb-logo>
                </slot>
              </div>
            </div>
          </header>
        </mock:shadow-root>
      </sbb-header>
    `);

    // Scroll top (100 to 0px): initial situation.
    await page.evaluate(() => window.scrollTo({ top: 0 }));
    await page.waitForChanges();
    expect(element).toEqualHtml(`
      <sbb-header class="hydrated" hide-on-scroll="">
        <mock:shadow-root>
          <header class="sbb-header">
            <div class="sbb-header__wrapper">
              <slot></slot>
              <div class="sbb-header__logo">
                <slot name="logo">
                  <sbb-logo class="hydrated" protective-room="none"></sbb-logo>
                </slot>
              </div>
            </div>
          </header>
        </mock:shadow-root>
      </sbb-header>
    `);
  });
});
