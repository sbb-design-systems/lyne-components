import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import events from './sbb-toast.events';
import { waitForCondition } from '../../global/helpers/testing/wait-for-condition';

describe('sbb-toast', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-toast></sbb-toast>
    `);

    element = await page.find('sbb-toast');
  });

  it('renders and sets the correct attributes', async () => {
    expect(element).toHaveClass('hydrated');

    // expect(element).toEqualAttribute('aria-live', 'assertive');
    // expect(element).toEqualAttribute('role', 'alert');
    expect(element).not.toHaveAttribute('data-has-action');
    expect(element).not.toHaveAttribute('data-has-icon');
    expect(element).toEqualAttribute('data-state', 'closed');
  });

  it('opens and closes after timeout', async () => {
    const willOpenEventSpy = await page.spyOnEvent(events.willOpen);
    const didOpenEventSpy = await page.spyOnEvent(events.didOpen);
    const willCloseEventSpy = await page.spyOnEvent(events.willClose);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);

    await element.setAttribute('duration', 1000);
    await page.waitForChanges();
    await element.callMethod('open');
    await page.waitForChanges();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();
    expect(element.getAttribute('data-state')).toEqual('opened');

    await new Promise((t) => setTimeout(t, 2000));

    await page.waitForChanges();
    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy).toHaveReceivedEventTimes(1);

    await page.waitForChanges();
    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);

    await page.waitForChanges();
    expect(element.getAttribute('data-state')).toEqual('closed');
  });

  it('closes by dismiss button click', async () => {
    const willCloseEventSpy = await page.spyOnEvent(events.willClose);
    const didCloseEventSpy = await page.spyOnEvent(events.didClose);

    await element.setAttribute('dismissible', true);
    await page.waitForChanges();
    await element.callMethod('open');
    await page.waitForChanges();

    const dismissBtn = (await page.waitForSelector('sbb-toast >>> sbb-button')).asElement();
    dismissBtn.click();

    await page.waitForChanges();
    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy).toHaveReceivedEventTimes(1);

    await page.waitForChanges();
    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);

    await page.waitForChanges();
    expect(element.getAttribute('data-state')).toEqual('closed');
  });

  it('forces state on button actions', async () => {
    page = await newE2EPage({
      html: `
      <sbb-toast>
        <sbb-button slot="action" />
      </sbb-toast>
    `,
    });

    element = await page.find('sbb-toast');
    const actionBtn = await element.find('sbb-button');

    expect(actionBtn).toEqualAttribute('variant', 'transparent');
    expect(actionBtn).toEqualAttribute('size', 'm');
    expect(actionBtn).toHaveAttribute('negative');
  });

  it('forces state on link actions', async () => {
    page = await newE2EPage({
      html: `
      <sbb-toast>
        <sbb-link slot="action" />
      </sbb-toast>
    `,
    });

    element = await page.find('sbb-toast');
    const actionLink = await element.find('sbb-link');

    expect(actionLink).toEqualAttribute('variant', 'inline');
    expect(actionLink).toHaveAttribute('negative');
  });

  it('closes other toasts on open', async () => {
    page = await newE2EPage({
      html: `
      <sbb-toast id="toast1" disable-animation />
      <sbb-toast id="toast2" disable-animation />
    `,
    });

    const toast1 = await page.find('#toast1');
    const toast2 = await page.find('#toast2');

    // Open the first toast
    await toast1.callMethod('open');
    await page.waitForChanges();

    expect(toast1).toEqualAttribute('data-state', 'opened');

    // Open the second toast and expect the first to be closed
    await toast2.callMethod('open');
    await page.waitForChanges();

    expect(toast1).toEqualAttribute('data-state', 'closed');
    expect(toast2).toEqualAttribute('data-state', 'opened');
  });
});
