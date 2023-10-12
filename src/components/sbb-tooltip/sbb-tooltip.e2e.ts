import { assert, expect, fixture, fixtureCleanup } from '@open-wc/testing';
import { sendKeys, sendMouse, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import { waitForCondition } from '../../global/testing';
import { EventSpy } from '../../global/testing/event-spy';
import '../sbb-button';
import { SbbButton } from '../sbb-button';
import '../sbb-link';
import './sbb-tooltip';
import { SbbTooltip, events } from './sbb-tooltip';

describe('sbb-tooltip', () => {
  let element: SbbTooltip, trigger: SbbButton;

  beforeEach(async () => {
    await fixture(html`
      <sbb-button id="tooltip-trigger">Tooltip trigger</sbb-button>
      <sbb-tooltip id="tooltip" trigger="tooltip-trigger" disable-animation>
        Tooltip content.
        <sbb-link id="tooltip-link" href="#" variant="inline" sbb-tooltip-close>Link</sbb-link>
      </sbb-tooltip>
      <sbb-link href="#" id="interactive-background-element">Other interactive element</sbb-link>
    `);
    trigger = document.querySelector('sbb-button');
    element = document.querySelector('sbb-tooltip');
  });

  it('renders', () => {
    assert.instanceOf(element, SbbTooltip);
  });

  it('shows the tooltip', async () => {
    const willOpenEventSpy = new EventSpy(events.willOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const dialog = element.shadowRoot.querySelector('dialog');

    element.open();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);

    expect(dialog).to.have.attribute('open');
  });

  it('shows on trigger click', async () => {
    const willOpenEventSpy = new EventSpy(events.willOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const dialog = element.shadowRoot.querySelector('dialog');

    trigger.click();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);

    expect(dialog).to.have.attribute('open');
  });

  it('closes the tooltip', async () => {
    const willOpenEventSpy = new EventSpy(events.willOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const willCloseEventSpy = new EventSpy(events.willClose);
    const didCloseEventSpy = new EventSpy(events.didClose);
    const dialog = element.shadowRoot.querySelector('dialog');

    element.open();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(dialog).to.have.attribute('open');

    element.close();

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    expect(dialog).not.to.have.attribute('open');
  });

  it('closes the tooltip on close button click', async () => {
    const willOpenEventSpy = new EventSpy(events.willOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const willCloseEventSpy = new EventSpy(events.willClose);
    const didCloseEventSpy = new EventSpy(events.didClose);
    const dialog = element.shadowRoot.querySelector('dialog');
    const closeButton = element.shadowRoot.querySelector('[sbb-tooltip-close]') as HTMLElement;

    element.open();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(dialog).to.have.attribute('open');

    closeButton.click();

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);

    expect(dialog).not.to.have.attribute('open');
    expect(trigger).to.have.attribute('data-focus-origin', 'mouse');
    expect(document.activeElement.id).to.be.equal('tooltip-trigger');
  });

  it('closes the tooltip on close button click by keyboard', async () => {
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const didCloseEventSpy = new EventSpy(events.didClose);
    const closeButton = document
      .querySelector('sbb-tooltip')
      .shadowRoot.querySelector('[sbb-tooltip-close]') as HTMLElement;

    element.open();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);

    closeButton.focus();
    await sendKeys({ down: 'Enter' });

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);

    expect(trigger).to.have.attribute('data-focus-origin', 'keyboard');
    expect(document.activeElement.id).to.be.equal('tooltip-trigger');
  });

  it('closes on Esc keypress', async () => {
    const willOpenEventSpy = new EventSpy(events.willOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const willCloseEventSpy = new EventSpy(events.willClose);
    const didCloseEventSpy = new EventSpy(events.didClose);
    const dialog = element.shadowRoot.querySelector('dialog');

    trigger.click();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);

    expect(dialog).to.have.attribute('open');

    await sendKeys({ down: 'Tab' });
    await sendKeys({ down: 'Escape' });

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);

    expect(dialog).not.to.have.attribute('open');
    expect(trigger).to.have.attribute('data-focus-origin', 'keyboard');
    expect(document.activeElement.id).to.be.equal('tooltip-trigger');
  });

  it('closes on interactive element click', async () => {
    const willOpenEventSpy = new EventSpy(events.willOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const willCloseEventSpy = new EventSpy(events.willClose);
    const didCloseEventSpy = new EventSpy(events.didClose);
    const dialog = element.shadowRoot.querySelector('dialog');
    const tooltipLink = document.querySelector('sbb-tooltip > sbb-link') as HTMLElement;

    trigger.click();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);

    expect(dialog).to.have.attribute('open');
    expect(tooltipLink).not.to.be.null;

    tooltipLink.click();

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);

    expect(dialog).not.to.have.attribute('open');
    expect(trigger).to.have.attribute('data-focus-origin', 'mouse');
    expect(document.activeElement.id).to.be.equal('tooltip-trigger');
  });

  it('closes on interactive element click by keyboard', async () => {
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const didCloseEventSpy = new EventSpy(events.didClose);
    const tooltipLink = document.querySelector('sbb-tooltip > sbb-link') as HTMLElement;

    trigger.click();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);

    expect(tooltipLink).not.to.be.null;

    tooltipLink.focus();
    await sendKeys({ down: 'Enter' });

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);

    expect(trigger).to.have.attribute('data-focus-origin', 'keyboard');
    expect(document.activeElement.id).to.be.equal('tooltip-trigger');
  });

  it('is correctly positioned on screen', async () => {
    const willOpenEventSpy = new EventSpy(events.willOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);

    await setViewport({ width: 1200, height: 800 });
    const dialog = element.shadowRoot.querySelector('dialog');

    trigger.click();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);

    expect(dialog).to.have.attribute('open');

    const buttonHeight = getComputedStyle(document.documentElement).getPropertyValue(
      `--sbb-size-button-l-min-height-large`,
    );
    expect(buttonHeight.trim()).to.be.equal('3.5rem');

    const buttonHeightPx = parseFloat(buttonHeight) * 16;
    expect(document.querySelector('sbb-button').offsetHeight).to.be.equal(buttonHeightPx);
    expect(document.querySelector('sbb-button').offsetTop).to.be.equal(0);
    expect(document.querySelector('sbb-button').offsetLeft).to.be.equal(0);

    // Expect dialog offsetTop to be equal to the trigger height + the dialog offset (8px)
    expect(element.shadowRoot.querySelector('dialog').offsetTop).to.be.equal(buttonHeightPx + 16);
    expect(element.shadowRoot.querySelector('dialog').offsetLeft).to.be.equal(0);
  });

  it('sets the focus on the dialog content when the tooltip is opened by click', async () => {
    const willOpenEventSpy = new EventSpy(events.willOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const dialog = element.shadowRoot.querySelector('dialog');

    trigger.click();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);

    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(dialog).to.have.attribute('open');
    expect(element.shadowRoot.activeElement.className).to.be.equal('sbb-tooltip__content');

    await sendKeys({ down: 'Tab' });

    expect(document.activeElement.id).to.be.equal('tooltip-link');
  });

  it('sets the focus to the first focusable element when the tooltip is opened by keyboard', async () => {
    const willOpenEventSpy = new EventSpy(events.willOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const dialog = element.shadowRoot.querySelector('dialog');

    await sendKeys({ down: 'Tab' });
    await sendKeys({ down: 'Enter' });

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(dialog).to.have.attribute('open');

    expect(document.activeElement.id).to.be.equal('tooltip');
    expect(
      document.activeElement.shadowRoot.activeElement ===
        document.activeElement.shadowRoot.querySelector('[sbb-tooltip-close]'),
    ).to.be.equal(true);
  });

  it('should set correct focus attribute on trigger after backdrop click', async () => {
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const didCloseEventSpy = new EventSpy(events.didClose);

    element.open();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);

    // Simulate backdrop click
    document.dispatchEvent(new MouseEvent('mousedown', { buttons: 1, clientX: 1 }));
    window.dispatchEvent(new PointerEvent('pointerup'));

    await waitForCondition(() => didCloseEventSpy.events.length === 1);

    expect(trigger).to.have.attribute('data-focus-origin', 'mouse');
    expect(document.activeElement.id).to.be.equal('tooltip-trigger');
  });

  it('should set correct focus attribute on trigger after backdrop click on an interactive element', async () => {
    const interactiveBackgroundElement = document.querySelector(
      '#interactive-background-element',
    ) as HTMLElement;
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const didCloseEventSpy = new EventSpy(events.didClose);

    element.open();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);

    const interactiveElementPosition = interactiveBackgroundElement.getBoundingClientRect();
    await sendMouse({
      type: 'click',
      position: [interactiveElementPosition.x, interactiveElementPosition.y],
    });
    await waitForCondition(() => didCloseEventSpy.events.length === 1);

    expect(document.activeElement.id).to.be.equal('interactive-background-element');
  });

  it('should close an open tooltip when another one is opened', async () => {
    fixtureCleanup();
    await fixture(html`
      <sbb-link href="#somewhere" id="interactive-background-element"
        >Other interactive element</sbb-link
      >
      <sbb-button id="tooltip-trigger">Tooltip trigger</sbb-button>
      <sbb-button id="another-tooltip-trigger">Another tooltip trigger</sbb-button>
      <sbb-tooltip id="tooltip" trigger="tooltip-trigger" disable-animation>
        Tooltip content.
      </sbb-tooltip>
      <sbb-tooltip id="another-tooltip" trigger="another-tooltip-trigger" disable-animation>
        Another tooltip content.
      </sbb-tooltip>
    `);
    trigger = document.querySelector('#tooltip-trigger');
    const secondTrigger = document.querySelector('#another-tooltip-trigger');
    element = document.querySelector('#tooltip');
    const secondElement: SbbTooltip = document.querySelector('#another-tooltip');

    const dialog: HTMLDialogElement = document
      .querySelector('#tooltip')
      .shadowRoot.querySelector('dialog');
    const secondDialog = document
      .querySelector('#another-tooltip')
      .shadowRoot.querySelector('dialog');

    const willOpenEventSpy = new EventSpy(events.didOpen);
    const didOpenEventSpy = new EventSpy(events.didOpen);
    const willCloseEventSpy = new EventSpy(events.didClose);
    const didCloseEventSpy = new EventSpy(events.didClose, element);

    expect(secondTrigger).not.to.be.null;
    expect(secondElement).not.to.be.null;
    expect(secondDialog).not.to.be.null;

    trigger.focus();
    await sendKeys({ press: 'Space' });

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);

    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(dialog.open).to.be.equal(true);

    trigger.focus();
    await sendKeys({ press: 'Tab' });

    expect(document.activeElement.id).to.be.equal('another-tooltip-trigger');

    await sendKeys({ press: 'Space' });

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    expect(dialog).not.to.have.attribute('open');

    await waitForCondition(() => willOpenEventSpy.events.length === 2);
    expect(willOpenEventSpy.count).to.be.equal(2);

    await waitForCondition(() => didOpenEventSpy.events.length === 2);
    expect(didOpenEventSpy.count).to.be.equal(2);
    expect(secondDialog).to.have.attribute('open');
  });
});
