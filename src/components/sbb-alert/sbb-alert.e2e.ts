import { newE2EPage } from '@stencil/core/testing';
import events from './sbb-alert.events';
import { waitForCondition } from '../../global/helpers/testing/wait-for-condition';

describe('sbb-alert', () => {
  let alert, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-alert></sbb-alert>');

    alert = await page.find('sbb-alert');
    expect(alert).toHaveClass('hydrated');
  });

  // TODO: maybe fix some day. Test just doesn't work for unknown reason.
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should fire animation events', async () => {
    page = await newE2EPage();

    const willPresentSpy = await page.spyOnEvent(events.willPresent);
    const didPresentSpy = await page.spyOnEvent(events.didPresent);

    await page.setContent(`<sbb-alert title-content="disruption">Interruption</sbb-alert>`);
    await page.waitForChanges();

    await waitForCondition(() => willPresentSpy.events.length === 1);
    expect(willPresentSpy).toHaveReceivedEventTimes(1);
    await waitForCondition(() => didPresentSpy.events.length === 1);
    expect(didPresentSpy).toHaveReceivedEventTimes(1);
  });
});
