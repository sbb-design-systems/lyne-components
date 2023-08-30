import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/testing';

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
      const ellipsisBreadcrumb = `
        <li class="sbb-breadcrumb-group__item" id="sbb-breadcrumb-group-ellipsis">
          <sbb-icon aria-hidden="true" class="hydrated" data-namespace="default" name="chevron-small-right-small" role="img"></sbb-icon>
          <button aria-expanded="false" aria-label="Show more breadcrumbs" id="sbb-breadcrumb-ellipsis" type="button">
            ...
          </button>
        </li>`;

      const li = await page.findAll('sbb-breadcrumb-group >>> li');
      const slots = await page.findAll('sbb-breadcrumb-group >>> li > slot');
      expect(li).not.toBeNull();
      expect(li.length).toEqual(3);
      expect(li[1]).toEqualHtml(ellipsisBreadcrumb);
      expect(slots.length).toEqual(2);
      expect(slots[0]).toEqualAttribute('name', 'breadcrumb-0');
      expect(slots[1]).toEqualAttribute('name', 'breadcrumb-6');
    });

    it('keyboard navigation with ellipsis', async () => {
      const ellipsisElement = await page.find(
        'sbb-breadcrumb-group >>> #sbb-breadcrumb-group-ellipsis',
      );
      const ellipsisBreadcrumb = await page.find(
        'sbb-breadcrumb-group >>> #sbb-breadcrumb-ellipsis',
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
          () => document.getElementById('sbb-breadcrumb-group').shadowRoot.activeElement.id,
        ),
      ).toEqual(ellipsisBreadcrumb.id);

      await page.keyboard.down('ArrowRight');
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(last.id);

      await page.keyboard.down('ArrowRight');
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(first.id);
    });

    it('expand breadcrumbs with ellipsis', async () => {
      let ellipsisElement = await page.find(
        'sbb-breadcrumb-group >>> #sbb-breadcrumb-group-ellipsis',
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

    it('should expand breadcrumbs and focus correctly by keyboard', async () => {
      // When pressing space key on ellipsis
      const ellipsisBreadcrumb = await page.find(
        'sbb-breadcrumb-group >>> #sbb-breadcrumb-ellipsis',
      );
      await ellipsisBreadcrumb.press('Space');
      await page.waitForChanges();

      // Then focus should be on first breadcrumb
      expect(await page.evaluate(() => document.activeElement.id)).toEqual('breadcrumb-1');

      // When blurring the focus
      await page.evaluate(() => (document.activeElement as HTMLElement).blur());

      // Then body should be focused
      expect(await page.evaluate(() => document.activeElement.tagName)).toEqual('BODY');

      // When triggering a slotChange by removing a breadcrumb
      await page.evaluate(() => document.getElementById('breadcrumb-6').remove());
      await page.waitForChanges();

      // Then still the body should be focused
      expect(await page.evaluate(() => document.activeElement.tagName)).toEqual('BODY');
    });

    it('should remove expand button when too less breadcrumbs available', async () => {
      let ellipsisElement = await page.find(
        'sbb-breadcrumb-group >>> #sbb-breadcrumb-group-ellipsis',
      );
      let ellipsisBreadcrumb = await page.find('sbb-breadcrumb-group >>> #sbb-breadcrumb-ellipsis');
      expect(ellipsisElement).not.toBeNull();
      expect(ellipsisBreadcrumb).not.toBeNull();

      // Remove every breadcrumb from DOM except the first two
      await page.evaluate(() =>
        Array.from(document.querySelectorAll('sbb-breadcrumb'))
          .slice(2)
          .forEach((el) => el.remove()),
      );

      await page.waitForChanges();

      ellipsisElement = await page.find('sbb-breadcrumb-group >>> #sbb-breadcrumb-group-ellipsis');
      ellipsisBreadcrumb = await page.find('sbb-breadcrumb-group >>> #sbb-breadcrumb-ellipsis');
      expect(ellipsisElement).toBeNull();
      expect(ellipsisBreadcrumb).toBeNull();
    });
  });
});
