import { E2EElement, E2EPage, EventSpy, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/testing';
import sbbExpansionPanelHeaderEvents from '../sbb-expansion-panel-header/sbb-expansion-panel-header.events';
import sbbExpansionPanelEvents from './sbb-expansion-panel.events';

describe('sbb-expansion-panel', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-expansion-panel disable-animation>
        <sbb-expansion-panel-header icon-name='dog-medium'>Header</sbb-expansion-panel-header>
        <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
      </sbb-expansion-panel>
    `);

    element = await page.find('sbb-expansion-panel');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('has slotted elements with the correct properties', async () => {
    const header = await page.find('sbb-expansion-panel-header');
    expect(header).toEqualAttribute('id', 'sbb-expansion-panel-header-1');
    expect(header).toEqualAttribute('aria-controls', 'sbb-expansion-panel-content-1');
    expect(header).toEqualAttribute('data-icon', '');
    const content = await page.find('sbb-expansion-panel-content');
    expect(content).toEqualAttribute('id', 'sbb-expansion-panel-content-1');
    expect(content).toEqualAttribute('aria-labelledby', `sbb-expansion-panel-header-1`);
    expect(content).toEqualAttribute('data-icon-space', '');
  });

  it('has slotted elements with the correct properties when id are set', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-expansion-panel disable-animation>
        <sbb-expansion-panel-header id='header'>Header</sbb-expansion-panel-header>
        <sbb-expansion-panel-content id='content'>Content</sbb-expansion-panel-content>
      </sbb-expansion-panel>
    `);

    const header = await page.find('sbb-expansion-panel-header');
    expect(header).toEqualAttribute('aria-controls', 'content');
    const content = await page.find('sbb-expansion-panel-content');
    expect(content).toEqualAttribute('aria-labelledby', `header`);
  });

  it('click the header expands the panel, click again collapses it', async () => {
    const header: E2EElement = await page.find('sbb-expansion-panel-header');
    const content: E2EElement = await page.find('sbb-expansion-panel-content');
    expect(await element.getProperty('expanded')).toEqual(false);
    expect(header.getAttribute('aria-expanded')).toEqual('false');
    expect(content.getAttribute('aria-hidden')).toEqual('true');

    const toggleExpandedEventSpy: EventSpy = await page.spyOnEvent(
      sbbExpansionPanelHeaderEvents.toggleExpanded,
    );
    const willOpenEventSpy: EventSpy = await page.spyOnEvent(sbbExpansionPanelEvents.willOpen);
    const willCloseEventSpy: EventSpy = await page.spyOnEvent(sbbExpansionPanelEvents.willClose);
    const didOpenEventSpy: EventSpy = await page.spyOnEvent(sbbExpansionPanelEvents.didOpen);
    const didCloseEventSpy: EventSpy = await page.spyOnEvent(sbbExpansionPanelEvents.didClose);

    await header.click();
    await waitForCondition(() => toggleExpandedEventSpy.events.length === 1);
    expect(toggleExpandedEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();
    expect(await element.getProperty('expanded')).toEqual(true);
    expect(header.getAttribute('aria-expanded')).toEqual('true');
    expect(content.getAttribute('aria-hidden')).toEqual('false');
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy).toHaveReceivedEventTimes(1);

    await header.click();
    await waitForCondition(() => toggleExpandedEventSpy.events.length === 2);
    expect(toggleExpandedEventSpy).toHaveReceivedEventTimes(2);
    await page.waitForChanges();
    expect(await element.getProperty('expanded')).toEqual(false);
    expect(header.getAttribute('aria-expanded')).toEqual('false');
    expect(content.getAttribute('aria-hidden')).toEqual('true');
    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy).toHaveReceivedEventTimes(1);
    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy).toHaveReceivedEventTimes(1);
  });

  it('disabled property is proxied to header', async () => {
    const header: E2EElement = await page.find('sbb-expansion-panel-header');
    expect(await header.getProperty('disabled')).toBeUndefined();
    expect(header).not.toHaveAttribute('aria-disabled');

    element.setProperty('disabled', true);
    await page.waitForChanges();
    expect(await header.getProperty('disabled')).toEqual(true);
    expect(header).toEqualAttribute('aria-disabled', 'true');

    element.setProperty('disabled', false);
    await page.waitForChanges();
    expect(await header.getProperty('disabled')).toEqual(false);
    expect(header).toEqualAttribute('aria-disabled', 'false');
  });
});
