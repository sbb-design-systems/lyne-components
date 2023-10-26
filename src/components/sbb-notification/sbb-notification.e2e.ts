import { waitForCondition } from '../core/testing';
import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { sendKeys } from '@web/test-runner-commands';
import { EventSpy, waitForLitRender } from '../core/testing';
import { SbbNotification } from './sbb-notification';
import { SbbButton } from '../sbb-button';
import '../sbb-link';
import '../sbb-button';

describe('sbb-notification', () => {
  let element: SbbNotification;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-notification id="notification" disable-animation>
        The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
        <sbb-link href="/" variant="inline">Link one</sbb-link>
      </sbb-notification>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbNotification);
  });

  it('closes the notification and removes it from the DOM', async () => {
    const willCloseEventSpy = new EventSpy(SbbNotification.events.willClose);
    const didCloseEventSpy = new EventSpy(SbbNotification.events.didClose);

    expect(element).not.to.be.null;
    expect(element).to.have.attribute('data-state', 'opened');

    element.close();
    await waitForLitRender(element);

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');

    element = document.querySelector('sbb-notification');
    expect(element).to.be.null;
  });

  it('closes the notification and removes it from the DOM on close button click', async () => {
    const willCloseEventSpy = new EventSpy(SbbNotification.events.willClose);
    const didCloseEventSpy = new EventSpy(SbbNotification.events.didClose);
    const closeButton = element.shadowRoot.querySelector('.sbb-notification__close') as SbbButton;

    expect(element).not.to.be.null;
    expect(element).to.have.attribute('data-state', 'opened');

    closeButton.click();
    await waitForLitRender(element);

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');

    element = document.querySelector('sbb-notification');
    expect(element).to.be.null;
  });

  it('closes the notification and removes it from the DOM on close button click by keyboard', async () => {
    const willCloseEventSpy = new EventSpy(SbbNotification.events.willClose);
    const didCloseEventSpy = new EventSpy(SbbNotification.events.didClose);
    const closeButton = element.shadowRoot.querySelector('.sbb-notification__close') as SbbButton;

    expect(element).not.to.be.null;
    expect(element).to.have.attribute('data-state', 'opened');

    closeButton.focus();
    await sendKeys({ down: 'Enter' });
    await waitForLitRender(element);

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');

    element = document.querySelector('sbb-notification');
    expect(element).to.be.null;
  });
});
