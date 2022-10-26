import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-card', () => {
  let element: E2EElement, page: E2EPage;

  it('renders sbb-card with sbb-badge as a link', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-card size="xl" href="https://github.com/lyne-design-system/lyne-components" target="_blank">
        <h2>Title</h2>
        Content text
        <sbb-card-badge slot="badge" appearance="primary" is-discount></sbb-card-badge>
      </sbb-card>
    `);

    element = await page.find('sbb-card');
    expect(element).toEqualHtml(`
      <sbb-card class='hydrated sbb-card--has-badge' size="xl" href="https://github.com/lyne-design-system/lyne-components" target="_blank">
        <mock:shadow-root>
          <a class="sbb-card" dir="ltr" href="https://github.com/lyne-design-system/lyne-components" target="_blank" rel="external noopener nofollow" >
            <slot name="badge"></slot>
            <span class="sbb-card__content">
              <slot></slot>
              <span class="sbb-card__opens-in-new-window">
                . Link target opens in new window.
              </span>
            </span>
          </a>
        </mock:shadow-root>
        <h2>Title</h2>
        Content text
        <sbb-card-badge class='hydrated' appearance="primary" is-discount="" slot="badge"></sbb-card-badge>
      </sbb-card>
    `);
  });

  it('renders sbb-card with sbb-badge as a button', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-card size="xl" name="button" form="form" value="value">
        <h2>Title</h2>
        Content text
        <sbb-card-badge slot="badge" appearance="primary" is-discount></sbb-card-badge>
      </sbb-card>
    `);

    element = await page.find('sbb-card');
    expect(element).toEqualHtml(`
      <sbb-card class='hydrated sbb-card--has-badge' size="xl" name="button" form="form" value="value">
        <mock:shadow-root>
          <button class="sbb-card" dir="ltr" type='button' name="button" form="form" value="value">
            <slot name="badge"></slot>
            <span class="sbb-card__content">
              <slot></slot>
            </span>
          </button>
        </mock:shadow-root>
        <h2>Title</h2>
        Content text
        <sbb-card-badge class='hydrated' appearance="primary" is-discount="" slot="badge"></sbb-card-badge>
      </sbb-card>
    `);
  });

  describe('events', () => {
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent('<sbb-card id="outer-id" card-id="inner-id">Card</sbb-card>');
      element = await page.find('sbb-card');
    });

    it('dispatches event on click', async () => {
      await page.waitForChanges();
      const card = await page.find('sbb-card >>> .sbb-card');
      const changeSpy = await page.spyOnEvent('click');

      await card.click();
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should forward host click to action element', async () => {
      const changeSpy = await page.spyOnEvent('click');

      element.triggerEvent('click');
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should forward host focus event to action element', async () => {
      const button = await page.find('sbb-card >>> .sbb-card');

      const changeSpy = await button.spyOnEvent('focus');

      await element.focus();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);

      // Even the inner native button receives the focus, the active element is the host
      expect(await page.evaluate(() => document.activeElement.id)).toBe('outer-id');
    });
  });
});
