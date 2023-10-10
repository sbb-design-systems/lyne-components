import { mockScrollTo, waitForCondition } from '../../global/testing';
import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { setViewport } from '@web/test-runner-commands';
import { events } from '../sbb-menu';
import { SbbHeader } from './sbb-header';
import '../sbb-header-action';
import '../sbb-menu';
import '../sbb-menu-action';
import { EventSpy, waitForLitRender } from '../../global/testing';

describe('sbb-header', () => {
  let element: SbbHeader;

  beforeEach(async () => {
    await setViewport({ width: 1200, height: 600 });
  });

  it('renders', async () => {
    element = await fixture(html`<sbb-header></sbb-header>`);
    assert.instanceOf(element, SbbHeader);
  });

  it('should be fixed on scroll', async () => {
    await fixture(html`
      <sbb-header></sbb-header>
      <div style="height: 2000px;"></div>
    `);
    element = document.querySelector('sbb-header');

    mockScrollTo({ top: 200 });
    await waitForLitRender(element);
    expect(element).to.have.attribute('data-shadow');
  });

  it('should hide/show on scroll', async () => {
    await fixture(html`
      <sbb-header hide-on-scroll="true"></sbb-header>
      <div style="height: 2000px;"></div>
    `);

    element = document.querySelector('sbb-header');
    expect(element.scrollOrigin).not.to.be.undefined;
    expect(element.offsetHeight).to.be.equal(96);
    expect(document.documentElement.offsetHeight).to.be.equal(2096);

    // Scroll bottom (0px to 400px): header fixed.
    mockScrollTo({ top: 400 });
    await waitForLitRender(element);

    // Scroll top (400px to 200px): header fixed and visible, with shadow and animated.
    mockScrollTo({ top: 200 });

    await waitForLitRender(element);

    expect(element).to.have.attribute('data-shadow');
    expect(element).to.have.attribute('data-animated');
    expect(element).to.have.attribute('data-fixed');
    expect(element).to.have.attribute('data-visible');

    // Scroll top (100 to 0px): initial situation.
    mockScrollTo({ top: 0 });

    await waitForLitRender(element);

    expect(element).not.to.have.attribute('data-shadow');
    expect(element).not.to.have.attribute('data-animated');
    expect(element).not.to.have.attribute('data-fixed');
    expect(element).not.to.have.attribute('data-visible');
  });

  it('should close menu on scroll', async () => {
    await fixture(html`
      <sbb-header hide-on-scroll="true">
        <sbb-header-action id="language-menu-trigger">English</sbb-header-action>
        <sbb-menu trigger="language-menu-trigger" disable-animation>
          <sbb-menu-action>Deutsch</sbb-menu-action>
          <sbb-menu-action>Français</sbb-menu-action>
        </sbb-menu>
      </sbb-header>
      <div style="height: 2000px;"></div>
    `);

    element = document.querySelector('sbb-header');

    // Scroll down a little bit
    mockScrollTo({ top: 250 });
    await waitForLitRender(element);

    // Scroll up to show header
    mockScrollTo({ top: 200 });
    await waitForLitRender(element);
    expect(element).to.have.attribute('data-visible');

    // Open menu
    const willOpenEventSpy = new EventSpy(events.willOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const menuTrigger = document.querySelector('sbb-header-action');
    menuTrigger.click();
    await waitForLitRender(element);
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);
    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);
    const menuId = menuTrigger.getAttribute('aria-controls');
    const menu = document.querySelector(`#${menuId}`);

    // Assert menu opened
    expect(menuTrigger).to.have.attribute('aria-controls');
    expect(menuTrigger).to.have.attribute('aria-expanded', 'true');
    expect(menu).to.have.attribute('data-state', 'opened');

    // Scroll down to hide header.
    mockScrollTo({ top: 250 });
    await waitForLitRender(element);

    // Assert menu closed
    expect(element).not.to.have.attribute('data-visible');
    expect(menu).not.to.have.attribute('data-state', 'opened');
    expect(menuTrigger).to.have.attribute('aria-expanded', 'false');
  });
});
