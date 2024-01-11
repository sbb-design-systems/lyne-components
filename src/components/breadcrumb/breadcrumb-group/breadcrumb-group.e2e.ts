import { assert, expect, fixture } from '@open-wc/testing';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { waitForCondition, EventSpy, waitForLitRender } from '../../core/testing';
import type { SbbBreadcrumbElement } from '../breadcrumb';
import '../breadcrumb';

import { SbbBreadcrumbGroupElement } from './breadcrumb-group';

describe('sbb-breadcrumb-group', () => {
  describe('without ellipsis', () => {
    let element: SbbBreadcrumbGroupElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-breadcrumb-group>
          <sbb-breadcrumb href="#" icon-name="house-small" id="breadcrumb-0"></sbb-breadcrumb>
          <sbb-breadcrumb href="#" id="breadcrumb-1">One</sbb-breadcrumb>
          <sbb-breadcrumb href="#" id="breadcrumb-2">Two</sbb-breadcrumb>
        </sbb-breadcrumb-group>
      `);
      await waitForLitRender(element);
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbBreadcrumbGroupElement);
    });

    it('keyboard navigation', async () => {
      const first: SbbBreadcrumbElement =
        document.querySelector<SbbBreadcrumbElement>('#breadcrumb-0')!;
      const second: SbbBreadcrumbElement =
        document.querySelector<SbbBreadcrumbElement>('#breadcrumb-1')!;
      const third: SbbBreadcrumbElement =
        document.querySelector<SbbBreadcrumbElement>('#breadcrumb-2')!;

      first.focus();
      await sendKeys({ down: 'ArrowRight' });
      expect(document.activeElement!.id).to.be.equal(second.id);
      await sendKeys({ down: 'ArrowRight' });
      expect(document.activeElement!.id).to.be.equal(third.id);
    });
  });

  describe('with ellipsis', () => {
    let breadcrumbGroup: SbbBreadcrumbGroupElement;
    let ellipsisListItemElement: HTMLLIElement;
    let ellipsisButton: HTMLButtonElement;

    beforeEach(async () => {
      await setViewport({ width: 160, height: 320 });
      breadcrumbGroup = await fixture(html`
        <sbb-breadcrumb-group id="sbb-breadcrumb-group">
          <sbb-breadcrumb href="#" icon-name="house-small" id="breadcrumb-0"></sbb-breadcrumb>
          <sbb-breadcrumb href="#" id="breadcrumb-1">First</sbb-breadcrumb>
          <sbb-breadcrumb href="#" id="breadcrumb-2">Second</sbb-breadcrumb>
          <sbb-breadcrumb href="#" id="breadcrumb-3">Third</sbb-breadcrumb>
          <sbb-breadcrumb href="#" id="breadcrumb-4">Fourth</sbb-breadcrumb>
          <sbb-breadcrumb href="#" id="breadcrumb-5">Fifth</sbb-breadcrumb>
          <sbb-breadcrumb href="#" id="breadcrumb-6">Sixth</sbb-breadcrumb>
        </sbb-breadcrumb-group>
      `);
      await waitForLitRender(breadcrumbGroup);

      ellipsisListItemElement = breadcrumbGroup.shadowRoot!.querySelector<HTMLLIElement>(
        '#sbb-breadcrumb-group-ellipsis',
      )!;
      ellipsisButton = breadcrumbGroup.shadowRoot!.querySelector<HTMLButtonElement>(
        '#sbb-breadcrumb-ellipsis',
      )!;
    });

    it('renders', async () => {
      expect(ellipsisListItemElement).not.to.be.null;
      expect(ellipsisButton).not.to.be.null;

      // only three list items are displayed, and the middle one is the ellipsis button
      const li = breadcrumbGroup.shadowRoot!.querySelectorAll('li');
      expect(li).not.to.be.null;
      expect(li.length).to.be.equal(3);
      expect(li[1]).dom.to.be.equal(`
        <li class="sbb-breadcrumb-group__item" id="sbb-breadcrumb-group-ellipsis">
          <sbb-icon aria-hidden="true" class="sbb-breadcrumb-group__divider-icon" data-namespace="default" name="chevron-small-right-small" role="img"></sbb-icon>
          <button aria-expanded="false" aria-label="Show more breadcrumbs" id="sbb-breadcrumb-ellipsis" type="button">
            ...
          </button>
        </li>
      `);

      // only two slots are displayed, and the second is the last one
      const slots = breadcrumbGroup.shadowRoot!.querySelectorAll('li > slot');
      expect(slots.length).to.be.equal(2);
      expect(slots[0]).to.have.attribute('name', 'breadcrumb-0');
      expect(slots[1]).to.have.attribute('name', 'breadcrumb-6');
    });

    it('keyboard navigation with ellipsis', async () => {
      expect(ellipsisListItemElement).not.to.be.null;
      expect(ellipsisButton).not.to.be.null;
      const first: SbbBreadcrumbElement =
        document.querySelector<SbbBreadcrumbElement>('#breadcrumb-0')!;
      const last: SbbBreadcrumbElement =
        document.querySelector<SbbBreadcrumbElement>('#breadcrumb-6')!;

      first.focus();
      expect(document.activeElement!.id).to.be.equal(first.id);

      await sendKeys({ down: 'ArrowRight' });
      expect(document.activeElement!.id).to.be.equal(breadcrumbGroup.id);
      expect(breadcrumbGroup.shadowRoot!.activeElement!.id).to.be.equal(ellipsisButton.id);

      await sendKeys({ down: 'ArrowRight' });
      expect(document.activeElement!.id).to.be.equal(last.id);

      await sendKeys({ down: 'ArrowRight' });
      expect(document.activeElement!.id).to.be.equal(first.id);
    });

    it('expand breadcrumbs with ellipsis', async () => {
      expect(ellipsisListItemElement).not.to.be.null;
      expect(ellipsisButton).not.to.be.null;
      const changeSpy = new EventSpy('click', ellipsisButton);
      ellipsisButton.click();
      await waitForLitRender(ellipsisListItemElement);
      await waitForCondition(() => changeSpy.events.length === 1);

      ellipsisListItemElement = breadcrumbGroup.shadowRoot!.querySelector(
        '#sbb-breadcrumb-group-ellipsis',
      )!;
      ellipsisButton = breadcrumbGroup.shadowRoot!.querySelector('#sbb-breadcrumb-ellipsis')!;
      expect(ellipsisListItemElement).to.be.null;
      expect(ellipsisButton).to.be.null;
    });

    it('should expand breadcrumbs and focus correctly by keyboard', async () => {
      expect(ellipsisListItemElement).not.to.be.null;
      expect(ellipsisButton).not.to.be.null;
      // When pressing the space key on ellipsis button
      ellipsisButton.focus();
      await sendKeys({ press: 'Space' });
      await waitForLitRender(breadcrumbGroup);

      // Then focus should be on first breadcrumb
      expect(document.activeElement!.id).to.be.equal('breadcrumb-1');

      // When blurring the focus
      (document.activeElement as HTMLElement).blur();

      // Then the body should be focused
      expect(document.activeElement!.tagName).to.be.equal('BODY');

      // When triggering a slotChange by removing a breadcrumb
      document.getElementById('breadcrumb-6')!.remove();
      await waitForLitRender(breadcrumbGroup);

      // Then the body should still be focused
      expect(document.activeElement!.tagName).to.be.equal('BODY');
    });

    it('should remove expand button when too less breadcrumbs available', async () => {
      expect(ellipsisListItemElement).not.to.be.null;
      expect(ellipsisButton).not.to.be.null;

      // Remove every breadcrumb from DOM except the first two
      Array.from(document.querySelectorAll('sbb-breadcrumb'))
        .slice(2)
        .forEach((el) => el.remove());

      await waitForLitRender(breadcrumbGroup);

      ellipsisListItemElement = breadcrumbGroup.shadowRoot!.querySelector(
        '#sbb-breadcrumb-group-ellipsis',
      )!;
      ellipsisButton = breadcrumbGroup.shadowRoot!.querySelector('#sbb-breadcrumb-ellipsis')!;
      expect(ellipsisListItemElement).to.be.null;
      expect(ellipsisButton).to.be.null;
    });
  });
});
