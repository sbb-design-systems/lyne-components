import { assert, aTimeout, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForLitRender } from '../core/testing.ts';
import {
  SbbExpansionPanelElement,
  type SbbExpansionPanelHeaderElement,
} from '../expansion-panel.ts';

import { SbbAccordionElement } from './accordion.component.ts';

import '../accordion.ts';
import '../expansion-panel.ts';

describe(`sbb-accordion`, () => {
  let element: SbbAccordionElement;

  beforeEach(async function () {
    element = await fixture(html`
      <sbb-accordion title-level="4">
        <sbb-expansion-panel id="panel-1">
          <sbb-expansion-panel-header id="header-1">Header 1</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content 1</sbb-expansion-panel-content>
        </sbb-expansion-panel>
        <sbb-expansion-panel id="panel-2">
          <sbb-expansion-panel-header id="header-2">Header 2</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content 2</sbb-expansion-panel-content>
        </sbb-expansion-panel>
        <sbb-expansion-panel id="panel-3">
          <sbb-expansion-panel-header id="header-3">Header 3</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content 3</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      </sbb-accordion>
    `);
  });

  it('renders', () => {
    assert.instanceOf(element, SbbAccordionElement);
  });

  it('should set accordion context on expansion panel', () => {
    const panels = Array.from(element.querySelectorAll('sbb-expansion-panel'));

    expect(panels[0]).to.match(':state(accordion-first)');
    expect(panels[0]).to.match(':state(accordion)');
    expect(panels[0]).not.to.have.attribute('size');
    expect(panels[1]).to.match(':state(accordion)');
    expect(panels[2]).to.match(':state(accordion)');
    expect(panels[2]).to.match(':state(accordion-last)');
  });

  it('should set accordion context on expansion panel when removing and adding expansion-panels', async () => {
    let panels: SbbExpansionPanelElement[];

    element.querySelector('sbb-expansion-panel')!.remove();
    await waitForLitRender(element);

    panels = Array.from(element.querySelectorAll('sbb-expansion-panel'));
    expect(panels[0]).to.match(':state(accordion-first)');
    expect(panels[1]).to.match(':state(accordion-last)');

    element.querySelector('sbb-expansion-panel')!.remove();
    await waitForLitRender(element);

    const lastRemainingPanel = element.querySelector('sbb-expansion-panel');
    expect(lastRemainingPanel).to.match(':state(accordion-first)');
    expect(lastRemainingPanel).to.match(':state(accordion-last)');

    const panel = document.createElement('sbb-expansion-panel');
    element.append(panel);
    await waitForLitRender(element);

    panels = Array.from(element.querySelectorAll('sbb-expansion-panel'));
    expect(panels[0]).to.match(':state(accordion-first)');
    expect(panels[0]).not.to.match(':state(accordion-last)');
    expect(panels[1]).to.match(':state(accordion-last)');
  });

  it('should inherit titleLevel prop by panels', () => {
    const panels = Array.from(element.querySelectorAll('sbb-expansion-panel'));
    expect(panels.length).to.be.equal(3);
    expect(panels[0].shadowRoot!.querySelector('.sbb-expansion-panel__header')!).to.have.attribute(
      'role',
      'heading',
    );
    expect(panels[0].shadowRoot!.querySelector('.sbb-expansion-panel__header')!).to.have.attribute(
      'aria-level',
      '4',
    );
    expect(panels[1].shadowRoot!.querySelector('.sbb-expansion-panel__header')!).to.have.attribute(
      'role',
      'heading',
    );
    expect(panels[1].shadowRoot!.querySelector('.sbb-expansion-panel__header')!).to.have.attribute(
      'aria-level',
      '4',
    );
    expect(panels[2].shadowRoot!.querySelector('.sbb-expansion-panel__header')!).to.have.attribute(
      'role',
      'heading',
    );
    expect(panels[2].shadowRoot!.querySelector('.sbb-expansion-panel__header')!).to.have.attribute(
      'aria-level',
      '4',
    );
  });

  it('should dynamically update titleLevel prop', async () => {
    element.titleLevel = '6';
    await waitForLitRender(element);
    const panels = Array.from(element.querySelectorAll('sbb-expansion-panel'));
    expect(panels.length).to.be.equal(3);
    expect(panels[0].shadowRoot!.querySelector('.sbb-expansion-panel__header')!).to.have.attribute(
      'aria-level',
      '6',
    );
    expect(panels[1].shadowRoot!.querySelector('.sbb-expansion-panel__header')!).to.have.attribute(
      'aria-level',
      '6',
    );
    expect(panels[2].shadowRoot!.querySelector('.sbb-expansion-panel__header')!).to.have.attribute(
      'aria-level',
      '6',
    );
  });

  it('should dynamically update size prop', async () => {
    element.size = 's';
    await waitForLitRender(element);
    const panels = Array.from(element.querySelectorAll('sbb-expansion-panel'));
    expect(panels.length).to.be.equal(3);
    expect(panels[0].size).to.be.equal('s');
    expect(panels[1].size).to.be.equal('s');
    expect(panels[2].size).to.be.equal('s');
  });

  it('should close others when expanding and multi = false', async () => {
    const beforeOpenSpy = new EventSpy(SbbExpansionPanelElement.events.beforeopen, null, {
      capture: true,
    });
    const panelOne: SbbExpansionPanelElement =
      element.querySelector<SbbExpansionPanelElement>('#panel-1')!;
    const headerOne: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('#header-1')!;
    const panelTwo: SbbExpansionPanelElement =
      element.querySelector<SbbExpansionPanelElement>('#panel-2')!;
    const headerTwo: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('#header-2')!;
    const panelThree: SbbExpansionPanelElement =
      element.querySelector<SbbExpansionPanelElement>('#panel-3')!;
    const headerThree: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('#header-3')!;

    for (const panel of [panelOne, panelTwo, panelThree]) {
      expect(panel.expanded).to.be.equal(false);
    }

    headerTwo.click();
    await beforeOpenSpy.calledOnce();
    await aTimeout(0);
    expect(beforeOpenSpy.count).to.be.equal(1);
    expect(panelOne.expanded, 'headerTwo panelOne.expanded').to.be.equal(false);
    expect(panelTwo.expanded, 'headerTwo panelTwo.expanded').to.be.equal(true);
    expect(panelThree.expanded, 'headerTwo panelThree.expanded').to.be.equal(false);

    headerOne.click();
    await beforeOpenSpy.calledTimes(2);
    await aTimeout(0);
    expect(beforeOpenSpy.count).to.be.equal(2);
    expect(panelOne.expanded, 'headerOne panelOne.expanded').to.be.equal(true);
    expect(panelTwo.expanded, 'headerOne panelTwo.expanded').to.be.equal(false);
    expect(panelThree.expanded, 'headerOne panelThree.expanded').to.be.equal(false);

    headerThree.click();
    await beforeOpenSpy.calledTimes(3);
    await aTimeout(0);
    expect(beforeOpenSpy.count).to.be.equal(3);
    expect(panelOne.expanded, 'headerThree panelOne.expanded').to.be.equal(false);
    expect(panelTwo.expanded, 'headerThree panelTwo.expanded').to.be.equal(false);
    expect(panelThree.expanded, 'headerThree panelThree.expanded').to.be.equal(true);
  });

  it('should not change others when expanding and multi = false', async () => {
    element.multi = true;
    await waitForLitRender(element);
    const beforeOpenSpy = new EventSpy(SbbExpansionPanelElement.events.beforeopen, null, {
      capture: true,
    });
    const panelOne: SbbExpansionPanelElement =
      element.querySelector<SbbExpansionPanelElement>('#panel-1')!;
    const headerOne: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('#header-1')!;
    const panelTwo: SbbExpansionPanelElement =
      element.querySelector<SbbExpansionPanelElement>('#panel-2')!;
    const headerTwo: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('#header-2')!;
    const panelThree: SbbExpansionPanelElement =
      element.querySelector<SbbExpansionPanelElement>('#panel-3')!;
    const headerThree: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('#header-3')!;

    for (const panel of [panelOne, panelTwo, panelThree]) {
      expect(panel.expanded).to.be.equal(false);
    }

    headerTwo.click();
    await beforeOpenSpy.calledOnce();
    expect(beforeOpenSpy.count).to.be.equal(1);
    expect(panelOne.expanded).to.be.equal(false);
    expect(panelTwo.expanded).to.be.equal(true);
    expect(panelThree.expanded).to.be.equal(false);

    headerOne.click();
    await beforeOpenSpy.calledTimes(2);
    expect(beforeOpenSpy.count).to.be.equal(2);
    expect(panelOne.expanded).to.be.equal(true);
    expect(panelTwo.expanded).to.be.equal(true);
    expect(panelThree.expanded).to.be.equal(false);

    headerThree.click();
    await beforeOpenSpy.calledTimes(3);
    expect(beforeOpenSpy.count).to.be.equal(3);
    expect(panelOne.expanded).to.be.equal(true);
    expect(panelTwo.expanded).to.be.equal(true);
    expect(panelThree.expanded).to.be.equal(true);
  });

  it('should close all panels except the first when multi changes from true to false', async () => {
    element.multi = true;
    await waitForLitRender(element);
    const panelOne: SbbExpansionPanelElement =
      element.querySelector<SbbExpansionPanelElement>('#panel-1')!;
    const panelTwo: SbbExpansionPanelElement =
      element.querySelector<SbbExpansionPanelElement>('#panel-2')!;
    const headerTwo: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('#header-2')!;
    const panelThree: SbbExpansionPanelElement =
      element.querySelector<SbbExpansionPanelElement>('#panel-3')!;
    const headerThree: SbbExpansionPanelHeaderElement =
      element.querySelector<SbbExpansionPanelHeaderElement>('#header-3')!;

    for (const panel of [panelOne, panelTwo, panelThree]) {
      expect(panel.expanded).to.be.equal(false);
    }

    const beforeOpenSpy = new EventSpy(SbbExpansionPanelElement.events.beforeopen, null, {
      capture: true,
    });

    headerTwo.click();
    await beforeOpenSpy.calledOnce();
    expect(beforeOpenSpy.count).to.be.equal(1);
    expect(panelTwo.expanded).to.be.equal(true);

    headerThree.click();
    await beforeOpenSpy.calledTimes(2);
    expect(beforeOpenSpy.count).to.be.equal(2);
    expect(panelThree.expanded).to.be.equal(true);

    element.multi = false;
    await waitForLitRender(element);
    expect(panelOne.expanded).to.be.equal(true);
    expect(panelTwo.expanded).to.be.equal(false);
    expect(panelThree.expanded).to.be.equal(false);
  });

  it('should only handle direct child panels and not panels from nested accordions', async () => {
    const nestedAccordion: SbbAccordionElement = await fixture(html`
      <sbb-accordion id="outer">
        <sbb-expansion-panel id="outer-panel-1">
          <sbb-expansion-panel-header id="outer-header-1"
            >Outer Header 1</sbb-expansion-panel-header
          >
          <sbb-expansion-panel-content>
            <sbb-accordion id="inner">
              <sbb-expansion-panel id="inner-panel-1">
                <sbb-expansion-panel-header id="inner-header-1"
                  >Inner Header 1</sbb-expansion-panel-header
                >
                <sbb-expansion-panel-content>Inner Content 1</sbb-expansion-panel-content>
              </sbb-expansion-panel>
              <sbb-expansion-panel id="inner-panel-2">
                <sbb-expansion-panel-header id="inner-header-2"
                  >Inner Header 2</sbb-expansion-panel-header
                >
                <sbb-expansion-panel-content>Inner Content 2</sbb-expansion-panel-content>
              </sbb-expansion-panel>
            </sbb-accordion>
          </sbb-expansion-panel-content>
        </sbb-expansion-panel>
        <sbb-expansion-panel id="outer-panel-2">
          <sbb-expansion-panel-header id="outer-header-2"
            >Outer Header 2</sbb-expansion-panel-header
          >
          <sbb-expansion-panel-content>Outer Content 2</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      </sbb-accordion>
    `);

    const outerPanelOne =
      nestedAccordion.querySelector<SbbExpansionPanelElement>('#outer-panel-1')!;
    const outerPanelTwo =
      nestedAccordion.querySelector<SbbExpansionPanelElement>('#outer-panel-2')!;
    const innerPanelOne =
      nestedAccordion.querySelector<SbbExpansionPanelElement>('#inner-panel-1')!;
    const innerPanelTwo =
      nestedAccordion.querySelector<SbbExpansionPanelElement>('#inner-panel-2')!;

    // Outer accordion should only mark its own panels as accordion-first/last
    expect(outerPanelOne).to.match(':state(accordion-first)');
    expect(outerPanelTwo).to.match(':state(accordion-last)');

    // Inner accordion panels should have their own first/last states
    expect(innerPanelOne).to.match(':state(accordion-first)');
    expect(innerPanelTwo).to.match(':state(accordion-last)');

    // Open outer-panel-1, which also reveals the inner accordion.
    outerPanelOne.querySelector('sbb-expansion-panel-header')!.click();
    await aTimeout(0);
    expect(outerPanelOne.expanded).to.be.equal(true);

    // Open inner-panel-1 while outer-panel-1 is still open.
    innerPanelOne.querySelector('sbb-expansion-panel-header')!.click();
    await aTimeout(0);
    expect(innerPanelOne.expanded).to.be.equal(true);

    // Now click outer-panel-2's header: outer accordion (single-mode) must close outer-panel-1.
    // Critically, inner-panel-1 must NOT be closed by the outer accordion —
    // this only stays true when _expansionPanels() filters to direct children.
    outerPanelTwo.querySelector('sbb-expansion-panel-header')!.click();
    await aTimeout(0);
    expect(outerPanelOne.expanded).to.be.equal(false);
    expect(outerPanelTwo.expanded).to.be.equal(true);
    expect(innerPanelOne.expanded).to.be.equal(true); // must not be touched by outer accordion

    // Inner accordion single-mode: opening inner-panel-2 must close inner-panel-1,
    // but outer panels must remain unaffected.
    innerPanelTwo.querySelector('sbb-expansion-panel-header')!.click();
    await aTimeout(0);
    expect(innerPanelOne.expanded).to.be.equal(false);
    expect(innerPanelTwo.expanded).to.be.equal(true);
    expect(outerPanelTwo.expanded).to.be.equal(true); // must not be touched by inner accordion
  });
});
