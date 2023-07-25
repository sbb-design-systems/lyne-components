import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/testing';
import sbbExpansionPanelEvents from '../sbb-expansion-panel/sbb-expansion-panel.events';

describe('sbb-accordion', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-accordion title-level='4'>
        <sbb-expansion-panel>
          <sbb-expansion-panel-header id='header-1'>Header 1</sbb-expansion-panel-header>
          <sbb-expansion-panel-content id='content-1'>Content 1</sbb-expansion-panel-content>
        </sbb-expansion-panel>
        <sbb-expansion-panel>
          <sbb-expansion-panel-header id='header-2'>Header 2</sbb-expansion-panel-header>
          <sbb-expansion-panel-content id='content-2'>Content 2</sbb-expansion-panel-content>
        </sbb-expansion-panel>
        <sbb-expansion-panel>
          <sbb-expansion-panel-header id='header-3'>Header 3</sbb-expansion-panel-header>
          <sbb-expansion-panel-content id='content-3'>Content 3</sbb-expansion-panel-content>
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
    const headerOne: E2EElement = await page.find('#header-1');
    const headerTwo: E2EElement = await page.find('#header-2');
    const headerThree: E2EElement = await page.find('#header-3');
    [headerOne, headerTwo, headerThree].forEach((header) =>
      expect(header).toEqualAttribute('expanded', 'false'),
    );

    await headerTwo.click();
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();
    expect(headerOne).toEqualAttribute('expanded', 'false');
    expect(headerTwo).toEqualAttribute('expanded', 'true');
    expect(headerThree).toEqualAttribute('expanded', 'false');

    await headerOne.click();
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 2);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(2);
    await page.waitForChanges();
    expect(headerOne).toEqualAttribute('expanded', 'true');
    expect(headerTwo).toEqualAttribute('expanded', 'false');
    expect(headerThree).toEqualAttribute('expanded', 'false');

    await headerThree.click();
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 3);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(3);
    await page.waitForChanges();
    expect(headerOne).toEqualAttribute('expanded', 'false');
    expect(headerTwo).toEqualAttribute('expanded', 'false');
    expect(headerThree).toEqualAttribute('expanded', 'true');
  });

  it('expanding a panel should not change others when multi = false', async () => {
    await element.setProperty('multi', 'true');
    await page.waitForChanges();
    const willOpenEventSpy = await page.spyOnEvent(sbbExpansionPanelEvents.willOpen);
    const headerOne: E2EElement = await page.find('#header-1');
    const headerTwo: E2EElement = await page.find('#header-2');
    const headerThree: E2EElement = await page.find('#header-3');
    [headerOne, headerTwo, headerThree].forEach((header) =>
      expect(header).toEqualAttribute('expanded', 'false'),
    );

    await headerTwo.click();
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();
    expect(headerOne).toEqualAttribute('expanded', 'false');
    expect(headerTwo).toEqualAttribute('expanded', 'true');
    expect(headerThree).toEqualAttribute('expanded', 'false');

    await headerOne.click();
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 2);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(2);
    await page.waitForChanges();
    expect(headerOne).toEqualAttribute('expanded', 'true');
    expect(headerTwo).toEqualAttribute('expanded', 'true');
    expect(headerThree).toEqualAttribute('expanded', 'false');

    await headerThree.click();
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 3);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(3);
    await page.waitForChanges();
    expect(headerOne).toEqualAttribute('expanded', 'true');
    expect(headerTwo).toEqualAttribute('expanded', 'true');
    expect(headerThree).toEqualAttribute('expanded', 'true');
  });

  it('should close all panels except the first when multi changes from true to false', async () => {
    await element.setProperty('multi', 'true');
    await page.waitForChanges();
    const headerOne: E2EElement = await page.find('#header-1');
    const headerTwo: E2EElement = await page.find('#header-2');
    const headerThree: E2EElement = await page.find('#header-3');
    [headerOne, headerTwo, headerThree].forEach((header) =>
      expect(header).toEqualAttribute('expanded', 'false'),
    );

    const willOpenEventSpy = await page.spyOnEvent(sbbExpansionPanelEvents.willOpen);

    await headerTwo.click();
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(1);
    await page.waitForChanges();
    expect(headerTwo).toEqualAttribute('expanded', 'true');

    await headerThree.click();
    await page.waitForChanges();
    await waitForCondition(() => willOpenEventSpy.events.length === 2);
    expect(willOpenEventSpy).toHaveReceivedEventTimes(2);
    await page.waitForChanges();
    expect(headerThree).toEqualAttribute('expanded', 'true');

    await element.setProperty('multi', 'false');
    await page.waitForChanges();
    expect(headerOne).toEqualAttribute('expanded', 'true');
    expect(headerTwo).toEqualAttribute('expanded', 'false');
    expect(headerThree).toEqualAttribute('expanded', 'false');
  });
});
