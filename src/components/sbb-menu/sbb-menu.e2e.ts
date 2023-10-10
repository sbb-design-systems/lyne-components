import { waitForCondition } from '../../global/testing';
import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { EventSpy, waitForLitRender } from '../../global/testing';
import { SbbMenu, events } from './sbb-menu';
import '../sbb-button';
import '../sbb-menu-action';
import '../sbb-link';
import '../sbb-divider';

describe('sbb-menu', () => {
  let element: SbbMenu, trigger: HTMLElement;

  beforeEach(async () => {
    await fixture(html`
      <sbb-button id="menu-trigger">Menu trigger</sbb-button>
      <sbb-menu id="menu" trigger="menu-trigger" disable-animation>
        <sbb-link id="menu-link" href="#" size="xs" variant="block">Profile</sbb-link>
        <sbb-menu-action id="menu-action-1" icon="tick-small">View</sbb-menu-action>
        <sbb-menu-action id="menu-action-2" icon="pen-small" amount="1" disabled
          >Edit</sbb-menu-action
        >
        <sbb-menu-action id="menu-action-3" icon="swisspass-small" amount="2"
          >Details</sbb-menu-action
        >
        <sbb-divider id="menu-divider"></sbb-divider>
        <sbb-menu-action id="menu-action-4" icon="cross-small">Cancel</sbb-menu-action>
      </sbb-menu>
    `);
    trigger = document.querySelector('sbb-button');
    element = document.querySelector('sbb-menu');
  });

  it('renders', () => {
    assert.instanceOf(element, SbbMenu);
  });

  it('opens on trigger click', async () => {
    const dialog = element.shadowRoot.querySelector('dialog');
    const willOpenEventSpy = new EventSpy(events.willOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);

    trigger.click();
    await waitForLitRender(element);
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    expect(dialog).to.have.attribute('open');
  });

  it('closes on Esc keypress', async () => {
    const willOpenEventSpy = new EventSpy(events.willOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const willCloseEventSpy = new EventSpy(events.willClose);
    const didCloseEventSpy = new EventSpy(events.didClose);
    const dialog = element.shadowRoot.querySelector('dialog');

    trigger.click();
    await waitForLitRender(element);

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');

    await sendKeys({ down: 'Tab' });
    await waitForLitRender(element);

    await sendKeys({ down: 'Escape' });
    await waitForLitRender(element);

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).not.to.have.attribute('open');
  });

  it('closes on menu action click', async () => {
    const willOpenEventSpy = new EventSpy(events.willOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const willCloseEventSpy = new EventSpy(events.willClose);
    const didCloseEventSpy = new EventSpy(events.didClose);
    const dialog = element.shadowRoot.querySelector('dialog');
    const menuAction = document.querySelector('sbb-menu > sbb-menu-action') as HTMLElement;

    trigger.click();
    await waitForLitRender(element);

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');
    expect(menuAction).not.to.be.null;

    menuAction.click();
    await waitForLitRender(element);
    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    expect(dialog).not.to.have.attribute('open');
  });

  it('closes on interactive element click', async () => {
    const willOpenEventSpy = new EventSpy(events.willOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const willCloseEventSpy = new EventSpy(events.willClose);
    const didCloseEventSpy = new EventSpy(events.didClose);
    const dialog = element.shadowRoot.querySelector('dialog');
    const menuLink = document.querySelector('sbb-menu > sbb-link') as HTMLElement;

    trigger.click();
    await waitForLitRender(element);

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');
    expect(menuLink).not.to.be.null;

    menuLink.click();
    await waitForLitRender(element);

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).not.to.have.attribute('open');
  });

  it('is correctly positioned on desktop', async () => {
    const willOpenEventSpy = new EventSpy(events.willOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);
    await setViewport({ width: 1200, height: 800 });
    const dialog = element.shadowRoot.querySelector('dialog');

    trigger.click();
    await waitForLitRender(element);

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');

    const buttonHeight = getComputedStyle(document.documentElement).getPropertyValue(
      `--sbb-size-button-l-min-height-large`,
    );
    expect(buttonHeight.trim()).to.be.equal('3.5rem');

    const buttonHeightPx = parseFloat(buttonHeight) * 16;
    expect(trigger.offsetHeight).to.be.equal(buttonHeightPx);
    expect(trigger.offsetTop).to.be.equal(0);
    expect(trigger.offsetLeft).to.be.equal(0);

    // Expect dialog offsetTop to be equal to the trigger height + the dialog offset (8px)
    expect(dialog.offsetTop).to.be.equal(buttonHeightPx + 8);
    expect(dialog.offsetLeft).to.be.equal(0);
  });

  it('is correctly positioned on mobile', async () => {
    const willOpenEventSpy = new EventSpy(events.willOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);

    await setViewport({ width: 800, height: 600 });
    const dialog = element.shadowRoot.querySelector('dialog');

    trigger.click();
    await waitForLitRender(element);

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');

    const menuOffsetTop = dialog.offsetTop;
    const menuHeight = dialog.offsetHeight;
    const pageHeight = window.innerHeight;

    expect(menuOffsetTop).to.be.equal(pageHeight - menuHeight);
  });

  it('sets the focus on the dialog content when the menu is opened by click', async () => {
    const willOpenEventSpy = new EventSpy(events.willOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const dialog = element.shadowRoot.querySelector('dialog');

    trigger.click();
    await waitForLitRender(element);

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');
    await waitForLitRender(element);

    await sendKeys({ down: 'Tab' });
    await waitForLitRender(element);

    expect(document.activeElement.id).to.be.equal('menu-link');
  });

  it('sets the focus to the first focusable element when the menu is opened by keyboard', async () => {
    const willOpenEventSpy = new EventSpy(events.willOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const dialog = element.shadowRoot.querySelector('dialog');

    await sendKeys({ down: 'Tab' });
    await waitForLitRender(element);

    await sendKeys({ down: 'Enter' });
    await waitForLitRender(element);

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(dialog).to.have.attribute('open');

    await waitForLitRender(element);
    expect(document.activeElement.id).to.be.equal('menu-link');
  });
});
