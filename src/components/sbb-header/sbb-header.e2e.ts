import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import events from '../sbb-menu/sbb-menu.events';
import { waitForCondition } from '../../global/testing';

describe('sbb-header', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setViewport({ width: 1200, height: 600 });
  });

  it('renders', async () => {
    await page.setContent('<sbb-header></sbb-header>');

    element = await page.find('sbb-header');
    expect(element).toHaveClass('hydrated');
  });

  it('should be fixed on scroll', async () => {
    await page.setContent(`
        <sbb-header></sbb-header>
        <div style="height: 2000px;"></div>
    `);
    element = await page.find('sbb-header');

    await page.evaluate(() => window.scrollTo({ top: 200 }));
    await page.waitForChanges();
    expect(element).toHaveAttribute('data-shadow');
  });

  it('should hide/show on scroll', async () => {
    await page.setContent(`
        <sbb-header hide-on-scroll="true"></sbb-header>
        <div style="height: 2000px;"></div>
    `);

    element = await page.find('sbb-header');
    expect(await element.getProperty('scrollOrigin')).not.toBeUndefined();
    expect(await page.evaluate(() => document.querySelector('sbb-header').offsetHeight)).toBe(96);
    expect(await page.evaluate(() => document.documentElement.offsetHeight)).toBe(2096);

    // Scroll bottom (0px to 400px): header fixed.
    await page.evaluate(() => window.scrollTo({ top: 400 }));
    await page.waitForChanges();

    // Scroll top (400px to 200px): header fixed and visible, with shadow and animated.
    await page.evaluate(() => window.scrollTo({ top: 200 }));
    await page.waitForChanges();
    expect(element).toHaveAttribute('data-shadow');
    expect(element).toHaveAttribute('data-animated');
    expect(element).toHaveAttribute('data-fixed');
    expect(element).toHaveAttribute('data-visible');

    // Scroll top (100 to 0px): initial situation.
    await page.evaluate(() => window.scrollTo({ top: 0 }));
    await page.waitForChanges();
    expect(element).not.toHaveAttribute('data-shadow');
    expect(element).not.toHaveAttribute('data-animated');
    expect(element).not.toHaveAttribute('data-fixed');
    expect(element).not.toHaveAttribute('data-visible');
  });

  it('should close menu on scroll', async () => {
    await page.setContent(`
        <sbb-header hide-on-scroll="true">
          <sbb-header-action id="language-menu-trigger">English</sbb-header-action>
          <sbb-menu trigger="language-menu-trigger" disable-animation>
            <sbb-menu-action>Deutsch</sbb-menu-action>
            <sbb-menu-action>Français</sbb-menu-action>
          </sbb-menu>
        </sbb-header>
        <div style="height: 2000px;"></div>
    `);

    element = await page.find('sbb-header');

    // Scroll down a little bit
    await page.evaluate(() => window.scrollTo({ top: 250 }));
    await page.waitForChanges();

    // Scroll up to show header
    await page.evaluate(() => window.scrollTo({ top: 200 }));
    await page.waitForChanges();
    expect(element).toHaveAttribute('data-visible');

    // Open menu
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const menuTrigger = await page.find('sbb-header-action');
    await page.evaluate(() => document.querySelector('sbb-header-action').click());
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();
    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();
    const menuId = menuTrigger.getAttribute('aria-controls');
    const menu = await page.find(`#${menuId}`);

    // Assert menu opened
    expect(menuTrigger).toHaveAttribute('aria-controls');
    expect(menuTrigger).toEqualAttribute('aria-expanded', 'true');
    expect(menu).toEqualAttribute('data-state', 'opened');

    // Scroll down to hide header.
    await page.evaluate(() => window.scrollTo({ top: 250 }));
    await page.waitForChanges();

    // Assert menu closed
    expect(element).not.toHaveAttribute('data-visible');
    expect(menu).not.toEqualAttribute('data-state', 'opened');
    expect(menuTrigger).toEqualAttribute('aria-expanded', 'false');
  });
});
