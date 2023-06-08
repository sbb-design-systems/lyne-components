import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/helpers/testing/wait-for-condition';

describe('sbb-breadcrumb-group', () => {
  describe('without ellipsis', () => {
    let element: E2EElement, page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`
        <sbb-breadcrumb-group>
          <sbb-breadcrumb href="/" icon-name="house-small" id="breadcrumb-0"></sbb-breadcrumb>
          <sbb-breadcrumb href="/" id="breadcrumb-1">One</sbb-breadcrumb>
          <sbb-breadcrumb href="/" id="breadcrumb-2">Two</sbb-breadcrumb>
        </sbb-breadcrumb-group>
      `);

      element = await page.find('sbb-breadcrumb-group');
    });

    it('renders', async () => {
      expect(element).toHaveClass('hydrated');
    });

    it('keyboard navigation', async () => {
      const first = await page.find('sbb-breadcrumb-group > sbb-breadcrumb#breadcrumb-0');
      const second = await page.find('sbb-breadcrumb-group > sbb-breadcrumb#breadcrumb-1');
      const third = await page.find('sbb-breadcrumb-group > sbb-breadcrumb#breadcrumb-2');

      await first.focus();
      await page.keyboard.down('ArrowRight');
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(second.id);
      await page.keyboard.down('ArrowRight');
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(third.id);
    });
  });

  describe('with ellipsis', () => {
    let element: E2EElement, page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setViewport({ width: 320, height: 600 });
      await page.setContent(`
        <sbb-breadcrumb-group id='sbb-breadcrumb-group'>
          <sbb-breadcrumb href="/" icon-name="house-small" id="breadcrumb-0"></sbb-breadcrumb>
          <sbb-breadcrumb href="/" id="breadcrumb-1">First</sbb-breadcrumb>
          <sbb-breadcrumb href="/" id="breadcrumb-2">Second</sbb-breadcrumb>
          <sbb-breadcrumb href="/" id="breadcrumb-3">Third</sbb-breadcrumb>
          <sbb-breadcrumb href="/" id="breadcrumb-4">Fourth</sbb-breadcrumb>
          <sbb-breadcrumb href="/" id="breadcrumb-5">Fifth</sbb-breadcrumb>
          <sbb-breadcrumb href="/" id="breadcrumb-6">Sixth</sbb-breadcrumb>
        </sbb-breadcrumb-group>
      `);

      element = await page.find('sbb-breadcrumb-group');
      await page.waitForChanges();
    });

    it('renders', async () => {
      expect(element).toEqualHtml(`
        <sbb-breadcrumb-group class="hydrated" id="sbb-breadcrumb-group" data-loaded role="navigation">
          <mock:shadow-root>
            <ol class="sbb-breadcrumb-group">
              <li class="sbb-breadcrumb-group__item">
                <slot name="breadcrumb-0"></slot>
              </li>
              <li class="sbb-breadcrumb-group__item" id="sbb-breadcrumb-group-ellipsis">
                <sbb-icon aria-hidden="true" class="hydrated" data-namespace="default" name="chevron-small-right-small" role="img"></sbb-icon>
                <sbb-breadcrumb class="hydrated" dir="ltr" id="sbb-breadcrumb-ellipsis" role="button" tabindex="0" aria-label="Show more breadcrumbs">
                  …
                </sbb-breadcrumb>
              </li>
              <li class="sbb-breadcrumb-group__item">
                <sbb-icon aria-hidden="true" class="hydrated" data-namespace="default" name="chevron-small-right-small" role="img"></sbb-icon>
                <slot name="breadcrumb-6"></slot>
              </li>
            </ol>
            <span hidden="">
              <slot></slot>
            </span>
          </mock:shadow-root>
          <sbb-breadcrumb class="hydrated" dir="ltr" href="/" icon-name="house-small" id="breadcrumb-0" role="link" slot="breadcrumb-0" tabindex="0"></sbb-breadcrumb>
          <sbb-breadcrumb class="hydrated" dir="ltr" href="/" id="breadcrumb-1" role="link" tabindex="0">
            First
          </sbb-breadcrumb>
          <sbb-breadcrumb class="hydrated" dir="ltr" href="/" id="breadcrumb-2" role="link" tabindex="0">
            Second
          </sbb-breadcrumb>
          <sbb-breadcrumb class="hydrated" dir="ltr" href="/" id="breadcrumb-3" role="link" tabindex="0">
            Third
          </sbb-breadcrumb>
          <sbb-breadcrumb class="hydrated" dir="ltr" href="/" id="breadcrumb-4" role="link" tabindex="0">
            Fourth
          </sbb-breadcrumb>
          <sbb-breadcrumb class="hydrated" dir="ltr" href="/" id="breadcrumb-5" role="link" tabindex="0">
            Fifth
          </sbb-breadcrumb>
          <sbb-breadcrumb class="hydrated" dir="ltr" href="/" id="breadcrumb-6" role="link" slot="breadcrumb-6" tabindex="0">
            Sixth
          </sbb-breadcrumb>
        </sbb-breadcrumb-group>
      `);
    });

    it('keyboard navigation with ellipsis', async () => {
      const ellipsisElement = await page.find(
        'sbb-breadcrumb-group >>> #sbb-breadcrumb-group-ellipsis'
      );
      const ellipsisBreadcrumb = await page.find(
        'sbb-breadcrumb-group >>> #sbb-breadcrumb-ellipsis'
      );
      const first = await page.find('sbb-breadcrumb-group > sbb-breadcrumb#breadcrumb-0');
      const last = await page.find('sbb-breadcrumb-group > sbb-breadcrumb#breadcrumb-6');

      expect(ellipsisElement).not.toBeNull();
      expect(ellipsisBreadcrumb).not.toBeNull();

      await first.focus();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(first.id);

      await page.keyboard.down('ArrowRight');
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(element.id);
      expect(
        await page.evaluate(
          () => document.getElementById('sbb-breadcrumb-group').shadowRoot.activeElement.id
        )
      ).toEqual(ellipsisBreadcrumb.id);

      await page.keyboard.down('ArrowRight');
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(last.id);

      await page.keyboard.down('ArrowRight');
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(first.id);
    });

    it('expand breadcrumbs with ellipsis', async () => {
      let ellipsisElement = await page.find(
        'sbb-breadcrumb-group >>> #sbb-breadcrumb-group-ellipsis'
      );
      let ellipsisBreadcrumb = await page.find('sbb-breadcrumb-group >>> #sbb-breadcrumb-ellipsis');
      expect(ellipsisElement).not.toBeNull();
      expect(ellipsisBreadcrumb).not.toBeNull();

      const changeSpy = await ellipsisBreadcrumb.spyOnEvent('click');
      await ellipsisBreadcrumb.click();
      await waitForCondition(() => changeSpy.events.length === 1);

      ellipsisElement = await page.find('sbb-breadcrumb-group >>> #sbb-breadcrumb-group-ellipsis');
      ellipsisBreadcrumb = await page.find('sbb-breadcrumb-group >>> #sbb-breadcrumb-ellipsis');
      expect(ellipsisElement).toBeNull();
      expect(ellipsisBreadcrumb).toBeNull();
    });
  });
});
