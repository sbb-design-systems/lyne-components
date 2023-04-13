import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/helpers/testing/wait-for-condition';

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
      <sbb-card color="white" class='hydrated' data-has-badge role="link" size="xl" tabindex="0" href="https://github.com/lyne-design-system/lyne-components" target="_blank" dir="ltr">
        <mock:shadow-root>
          <a class="sbb-card" href="https://github.com/lyne-design-system/lyne-components" target="_blank" rel="external noopener nofollow" role="presentation" tabindex="-1">
            <span class="sbb-card__wrapper">
              <slot></slot>
            </span>
            <slot name="badge"></slot>
            <span class="sbb-card__opens-in-new-window">
              . Link target opens in new window.
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
      <sbb-card color="white" class='hydrated' data-has-badge role="button" size="xl" tabindex="0" name="button" form="form" value="value" dir="ltr">
        <mock:shadow-root>
          <span class="sbb-card">
            <span class="sbb-card__wrapper">
              <slot></slot>
            </span>
            <slot name="badge"></slot>
          </span>
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
      await page.setContent('<sbb-card id="focus-id">Card</sbb-card>');

      element = await page.find('sbb-card');
    });

    it('dispatches event on click', async () => {
      await page.waitForChanges();
      const changeSpy = await page.spyOnEvent('click');

      await element.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should dispatch click event on pressing Enter', async () => {
      const changeSpy = await page.spyOnEvent('click');
      await element.press('Enter');
      expect(changeSpy).toHaveReceivedEvent();
    });

    it('should dispatch click event on pressing Space', async () => {
      const changeSpy = await page.spyOnEvent('click');
      await element.press(' ');
      expect(changeSpy).toHaveReceivedEvent();
    });

    it('should dispatch click event on pressing Enter with href', async () => {
      element.setAttribute('href', 'test');
      await page.waitForChanges();

      const changeSpy = await page.spyOnEvent('click');
      await element.press('Enter');
      expect(changeSpy).toHaveReceivedEvent();
    });

    it('should not dispatch click event on pressing Space with href', async () => {
      element.setAttribute('href', 'test');
      await page.waitForChanges();

      const changeSpy = await page.spyOnEvent('click');
      await element.press(' ');
      expect(changeSpy).not.toHaveReceivedEvent();
    });

    it('should receive focus', async () => {
      await element.focus();
      await page.waitForChanges();

      expect(await page.evaluate(() => document.activeElement.id)).toBe('focus-id');
    });
  });
});
