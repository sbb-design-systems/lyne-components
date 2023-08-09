import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/testing';
import sbbExpansionPanelEvents from '../sbb-expansion-panel/sbb-expansion-panel.events';

describe('sbb-accordion', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-accordion title-level='4'>
        <sbb-expansion-panel id='panel-1' disable-animation>
          <sbb-expansion-panel-header id='header-1'>Header 1</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content 1</sbb-expansion-panel-content>
        </sbb-expansion-panel>
        <sbb-expansion-panel id='panel-2' disable-animation>
          <sbb-expansion-panel-header id='header-2'>Header 2</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content 2</sbb-expansion-panel-content>
        </sbb-expansion-panel>
        <sbb-expansion-panel id='panel-3' disable-animation>
          <sbb-expansion-panel-header id='header-3'>Header 3</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content 3</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      </sbb-accordion>
    `);

    element = await page.find('sbb-accordion');
    await page.waitForChanges();
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('should set accordion context on expansion panel', async () => {
    const panels = await page.findAll('sbb-expansion-panel');

    expect(panels[0]).toHaveAttribute('data-accordion-first');
    expect(panels[0]).toHaveAttribute('data-accordion');
    expect(panels[1]).toHaveAttribute('data-accordion');
    expect(panels[2]).toHaveAttribute('data-accordion');
    expect(panels[2]).toHaveAttribute('data-accordion-last');
  });

  it('should set accordion context on expansion panel when removing and adding expansion-panels', async () => {
    let panels: E2EElement[];
    await page.waitForChanges();

    await page.evaluate(() => document.querySelector('sbb-expansion-panel').remove());
    await page.waitForChanges();

    panels = await page.findAll('sbb-expansion-panel');
    expect(panels[0]).toHaveAttribute('data-accordion-first');
    expect(panels[1]).toHaveAttribute('data-accordion-last');

    await page.evaluate(() => document.querySelector('sbb-expansion-panel').remove());
    await page.waitForChanges();

    const lastRemainingPanel = await page.find('sbb-expansion-panel');
    expect(lastRemainingPanel).toHaveAttribute('data-accordion-first');
    expect(lastRemainingPanel).toHaveAttribute('data-accordion-last');

    await page.evaluate(() => {
      const panel = document.createElement('sbb-expansion-panel');
      document.querySelector('sbb-accordion').append(panel);
    });
    await page.waitForChanges();

    panels = await page.findAll('sbb-expansion-panel');
    expect(panels[0]).toHaveAttribute('data-accordion-first');
    expect(panels[0]).not.toHaveAttribute('data-accordion-last');
    expect(panels[1]).toHaveAttribute('data-accordion-last');
  });

  it('should inherit titleLevel prop by panels', async () => {
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

  it('should dynamically update titleLevel prop', async () => {
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

  it('should close others when expanding and multi = false', async () => {
    const willOpenEventSpy = await page.spyOnEvent(sbbExpansionPanelEvents.willOpen);
    const panelOne: E2EElement = await page.find('#panel-1');
    const headerOne: E2EElement = await page.find('#header-1');
    const panelTwo: E2EElement = await page.find('#panel-2');
    const headerTwo: E2EElement = await page.find('#header-2');
    const panelThree: E2EElement = await page.find('#panel-3');
    const headerThree: E2EElement = await page.find('#header-3');

    for (const panel of [panelOne, panelTwo, panelThree]) {
      expect(await panel.getProperty('expanded')).toEqual(false);
    }

    await headerTwo.click();
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();
    expect(await panelOne.getProperty('expanded')).toEqual(false);
    expect(await panelTwo.getProperty('expanded')).toEqual(true);
    expect(await panelThree.getProperty('expanded')).toEqual(false);

    await headerOne.click();
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 2);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(2);
    await page.waitForChanges();
    expect(await panelOne.getProperty('expanded')).toEqual(true);
    expect(await panelTwo.getProperty('expanded')).toEqual(false);
    expect(await panelThree.getProperty('expanded')).toEqual(false);

    await headerThree.click();
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 3);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(3);
    await page.waitForChanges();
    expect(await panelOne.getProperty('expanded')).toEqual(false);
    expect(await panelTwo.getProperty('expanded')).toEqual(false);
    expect(await panelThree.getProperty('expanded')).toEqual(true);
  });

  it('should not change others when expanding and multi = false', async () => {
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
