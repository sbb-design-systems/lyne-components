import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { waitForCondition, EventSpy, waitForLitRender, fixture } from '../../core/testing';
import { SbbPopoverElement } from '../popover';

import { SbbPopoverTriggerElement } from './popover-trigger';

import '../../icon';

describe(`sbb-popover-trigger with ${fixture.name}`, () => {
  let element: SbbPopoverTriggerElement, popover: SbbPopoverElement;

  beforeEach(async () => {
    await fixture(
      html`
        <sbb-popover-trigger id="popover-trigger"></sbb-popover-trigger>
        <sbb-popover id="popover" trigger="popover-trigger" disable-animation>
          Popover content.
          <sbb-link id="popover-link" sbb-popover-close>Link</sbb-link>
        </sbb-popover>
      `,
      { modules: ['./popover-trigger.ts', '../popover/index.ts', '../../link/index.ts'] },
    );
    element = document.querySelector<SbbPopoverTriggerElement>('sbb-popover-trigger')!;
    popover = document.querySelector<SbbPopoverElement>('sbb-popover')!;
  });

  it('renders', () => {
    assert.instanceOf(element, SbbPopoverTriggerElement);
  });

  it('shows popover on popover-trigger click', async () => {
    const willOpenEventSpy = new EventSpy(SbbPopoverElement.events.willOpen);
    const didOpenEventSpy = new EventSpy(SbbPopoverElement.events.didOpen);

    element.click();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(popover).to.have.attribute('data-state', 'opened');
  });

  it("doesn't show popover on disabled popover-trigger click", async () => {
    const willOpenEventSpy = new EventSpy(SbbPopoverElement.events.willOpen);
    element.disabled = true;
    await waitForLitRender(element);

    element.click();
    await waitForLitRender(element);

    expect(willOpenEventSpy.count).to.be.equal(0);
    expect(popover).to.have.attribute('data-state', 'closed');
  });

  it('shows popover on keyboard event', async () => {
    const focusSpy = new EventSpy('focus', element);

    element.focus();
    await waitForCondition(() => focusSpy.events.length === 1);
    expect(focusSpy.count).to.be.equal(1);

    await sendKeys({ down: 'Enter' });
    await waitForCondition(() => popover.getAttribute('data-state') === 'opened');

    expect(popover).to.have.attribute('data-state', 'opened');
  });

  it('shows popover on keyboard event with hover-trigger', async () => {
    const changeSpy = new EventSpy('focus', element);

    popover.hoverTrigger = true;
    element.focus();

    await waitForCondition(() => changeSpy.events.length === 1);
    expect(changeSpy.count).to.be.equal(1);

    await sendKeys({ down: 'Enter' });
    await waitForCondition(() => popover.getAttribute('data-state') === 'opened');

    expect(popover).to.have.attribute('data-state', 'opened');
  });

  it("doesn't focus popover-trigger on keyboard event when disabled", async () => {
    const changeSpy = new EventSpy('focus', element);

    element.disabled = true;
    popover.hoverTrigger = true;
    await waitForLitRender(element);

    element.focus();

    await waitForLitRender(element);

    expect(changeSpy.count).not.to.be.greaterThan(0);
    expect(popover).to.have.attribute('data-state', 'closed');
  });
});
