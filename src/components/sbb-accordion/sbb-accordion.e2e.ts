import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/testing';
import sbbExpansionPanelEvents from '../sbb-expansion-panel/sbb-expansion-panel.events';

describe('sbb-accordion', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-accordion title-level='4'>
        <sbb-expansion-panel id='panel-1'>
          <sbb-expansion-panel-header>Header 1</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content 1</sbb-expansion-panel-content>
        </sbb-expansion-panel>
        <sbb-expansion-panel id='panel-2'>
          <sbb-expansion-panel-header>Header 2</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content 2</sbb-expansion-panel-content>
        </sbb-expansion-panel>
        <sbb-expansion-panel id='panel-3'>
          <sbb-expansion-panel-header>Header 3</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content 3</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      </sbb-accordion>
    `);

    element = await page.find('sbb-accordion');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('titleLevel prop is inherited by panels', async () => {
    const panels = await page.findAll('sbb-expansion-panel');
    expect(panels.length).toEqual(3);
    expect(panels[0].shadowRoot.querySelector('.sbb-expansion-panel').firstChild.nodeName).toEqual(
      'H4',
    );
    expect(panels[1].shadowRoot.querySelector('.sbb-expansion-panel').firstChild.nodeName).toEqual(
      'H4',
    );
    expect(panels[2].shadowRoot.querySelector('.sbb-expansion-panel').firstChild.nodeName).toEqual(
      'H4',
    );
  });

  it('titleLevel prop is dynamically updated', async () => {
    await element.setProperty('titleLevel', '6');
    await page.waitForChanges();
    const panels = await page.findAll('sbb-expansion-panel');
    expect(panels.length).toEqual(3);
    expect(panels[0].shadowRoot.querySelector('.sbb-expansion-panel').firstChild.nodeName).toEqual(
      'H6',
    );
    expect(panels[1].shadowRoot.querySelector('.sbb-expansion-panel').firstChild.nodeName).toEqual(
      'H6',
    );
    expect(panels[2].shadowRoot.querySelector('.sbb-expansion-panel').firstChild.nodeName).toEqual(
      'H6',
    );
  });

  it('expanding a panel should close others when multi = false', async () => {
    const willOpenEventSpy = await page.spyOnEvent(sbbExpansionPanelEvents.willOpen);
    const panelOne: E2EElement = await page.find('#panel-1');
    const panelTwo: E2EElement = await page.find('#panel-2');
    const panelThree: E2EElement = await page.find('#panel-3');
    for (const panel of [panelOne, panelTwo, panelThree]) {
      expect(await panel.getProperty('expanded')).toEqual(false);
    }

    await panelTwo.click();
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();
    expect(await panelOne.getProperty('expanded')).toEqual(false);
    expect(await panelTwo.getProperty('expanded')).toEqual(true);
    expect(await panelThree.getProperty('expanded')).toEqual(false);

    await panelOne.click();
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 2);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(2);
    await page.waitForChanges();
    expect(await panelOne.getProperty('expanded')).toEqual(true);
    expect(await panelTwo.getProperty('expanded')).toEqual(false);
    expect(await panelThree.getProperty('expanded')).toEqual(false);

    await panelThree.click();
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 3);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(3);
    await page.waitForChanges();
    expect(await panelOne.getProperty('expanded')).toEqual(false);
    expect(await panelTwo.getProperty('expanded')).toEqual(false);
    expect(await panelThree.getProperty('expanded')).toEqual(true);
  });

  it('expanding a panel should not change others when multi = false', async () => {
    await element.setProperty('multi', 'true');
    await page.waitForChanges();
    const willOpenEventSpy = await page.spyOnEvent(sbbExpansionPanelEvents.willOpen);
    const panelOne: E2EElement = await page.find('#panel-1');
    const panelTwo: E2EElement = await page.find('#panel-2');
    const panelThree: E2EElement = await page.find('#panel-3');
    for (const panel of [panelOne, panelTwo, panelThree]) {
      expect(await panel.getProperty('expanded')).toEqual(false);
    }

    await panelTwo.click();
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();
    expect(await panelOne.getProperty('expanded')).toEqual(false);
    expect(await panelTwo.getProperty('expanded')).toEqual(true);
    expect(await panelThree.getProperty('expanded')).toEqual(false);

    await panelOne.click();
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 2);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(2);
    await page.waitForChanges();
    expect(await panelOne.getProperty('expanded')).toEqual(true);
    expect(await panelTwo.getProperty('expanded')).toEqual(true);
    expect(await panelThree.getProperty('expanded')).toEqual(false);

    await panelThree.click();
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 3);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(3);
    await page.waitForChanges();
    expect(await panelOne.getProperty('expanded')).toEqual(true);
    expect(await panelTwo.getProperty('expanded')).toEqual(true);
    expect(await panelThree.getProperty('expanded')).toEqual(true);
  });

  it('should close all panels except the first when multi changes from true to false', async () => {
    await element.setProperty('multi', 'true');
    await page.waitForChanges();
    const panelOne: E2EElement = await page.find('#panel-1');
    const panelTwo: E2EElement = await page.find('#panel-2');
    const panelThree: E2EElement = await page.find('#panel-3');
    for (const panel of [panelOne, panelTwo, panelThree]) {
      expect(await panel.getProperty('expanded')).toEqual(false);
    }

    const willOpenEventSpy = await page.spyOnEvent(sbbExpansionPanelEvents.willOpen);

    await panelTwo.click();
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();
    expect(await panelTwo.getProperty('expanded')).toEqual(true);

    await panelThree.click();
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 2);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(2);
    await page.waitForChanges();
    expect(await panelThree.getProperty('expanded')).toEqual(true);

    await element.setProperty('multi', 'false');
    await page.waitForChanges();
    expect(await panelOne.getProperty('expanded')).toEqual(true);
    expect(await panelTwo.getProperty('expanded')).toEqual(false);
    expect(await panelThree.getProperty('expanded')).toEqual(false);
  });
});
