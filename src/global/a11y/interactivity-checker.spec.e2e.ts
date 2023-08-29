import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../testing';
import events from '../../components/sbb-menu/sbb-menu.events';

// In unit testing environment, the visibility check does not work.
// We work around with providing an e2e test and using the sbb-menu with keyboard navigation.
describe('Interactivity-checker', () => {
  let trigger: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-button id="menu-trigger">Menu trigger</sbb-button>
      <sbb-menu id="menu" trigger="menu-trigger" disable-animation>
        <sbb-menu-action id="menu-action-1">Action 1</sbb-menu-action>

        <sbb-menu-action style="display: none" id="menu-action-2" icon="swisspass-small" amount="2">Action 2</sbb-menu-action>
        <span style="display: none">
          <sbb-menu-action id="menu-action-3" icon="pen-small" amount="1">Action 3</sbb-menu-action>
        </span>

        <sbb-menu-action style="visibility: hidden" id="menu-action-4" icon="cross-small">Action 4</sbb-menu-action>
        <span style="visibility: hidden">
          <sbb-menu-action id="menu-action-5" icon="pen-small" amount="1">Action 5</sbb-menu-action>
        </span>
        <span style="visibility: hidden">
          <span style="visibility: visible">
            <sbb-menu-action id="menu-action-6" icon="pen-small" amount="1">Action 6</sbb-menu-action>
          </span>
        </span>

        <sbb-menu-action id="menu-action-7" icon="cross-small">Action 7</sbb-menu-action>
      </sbb-menu>
    `);
    trigger = await page.find('sbb-button');

    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    await trigger.press('Enter');
    await page.waitForChanges();
    await waitForCondition(() => didOpenEventSpy.events.length === 1);
  });

  it('should respect visibility', async () => {
    const focusedElementId = await page.evaluate(() => document.activeElement.id);
    expect(focusedElementId).toBe('menu-action-1');

    const menuAction1 = await page.find('#menu-action-1');
    await menuAction1.press('ArrowRight');
    await page.waitForChanges();

    // Several elements should be skipped:
    // - `display: none` element (menu-action-2)
    // - child of a `display: none` element (menu-action-3)
    // - `visibility: hidden` element (menu-action-4)
    // - child of a `visibility: hidden` element (menu-action-5)

    const focusedElementIdAfterInvisibleElements = await page.evaluate(
      () => document.activeElement.id,
    );
    expect(focusedElementIdAfterInvisibleElements).toBe('menu-action-6');

    const menuAction6 = await page.find('#menu-action-6');
    await menuAction6.press('ArrowRight');
    await page.waitForChanges();

    const focusedElementIdAfterInvisibleElements2 = await page.evaluate(
      () => document.activeElement.id,
    );
    expect(focusedElementIdAfterInvisibleElements2).toBe('menu-action-7');
  });
});
