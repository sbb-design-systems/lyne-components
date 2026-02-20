import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture, tabKey } from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';
import type { SbbTabLabelElement } from '../tab-label.ts';
import { SbbTabElement } from '../tab.ts';

import { SbbTabGroupElement } from './tab-group.component.ts';

import '../tab-label.ts';

describe(`sbb-tab-group`, () => {
  let element: SbbTabGroupElement;

  describe('basic', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-tab-group initial-selected-index="1">
          <sbb-tab-label id="sbb-tab-1">Test tab label 1</sbb-tab-label>
          <sbb-tab>Test tab content 1</sbb-tab>
          <sbb-tab-label id="sbb-tab-2">Test tab label 2</sbb-tab-label>
          <sbb-tab>Test tab content 2</sbb-tab>
          <sbb-tab-label id="sbb-tab-3" disabled>Test tab label 3</sbb-tab-label>
          <sbb-tab>Test tab content 3</sbb-tab>
          <sbb-tab-label id="sbb-tab-4">Test tab label 4</sbb-tab-label>
          <sbb-tab>Test tab content 4</sbb-tab>
        </sbb-tab-group>`,
      );
    });

    it('renders', () => {
      assert.instanceOf(element, SbbTabGroupElement);
    });

    it('renders tab content', async () => {
      const content = element.querySelector<SbbTabElement>(
        ':scope > sbb-tab-label:first-of-type + sbb-tab',
      )!;

      expect(content.textContent).to.be.equal('Test tab content 1');
    });

    it('returns all tabs via tabs getter', () => {
      const tabs = element.tabs;

      expect(tabs).to.have.lengthOf(4);
      expect(tabs[0].textContent?.trim()).to.be.equal('Test tab content 1');
    });

    it('renders initial selected index', async () => {
      const initialSelectedTab = element.querySelector(':scope > sbb-tab-label#sbb-tab-2');

      expect(initialSelectedTab).to.have.attribute('active');
    });

    it('activates tab by index', async () => {
      element.activateTab(1);
      await waitForLitRender(element);
      const tab = element.querySelectorAll('sbb-tab-label')[1];

      expect(tab).to.have.attribute('active');
    });

    it('disables tab by index', async () => {
      element.disableTab(0);
      await waitForLitRender(element);
      const tab = element.querySelectorAll('sbb-tab-label')[0];

      expect(tab).to.have.attribute('disabled');
    });

    it('enables tab by index', async () => {
      element.enableTab(2);
      await waitForLitRender(element);
      const tab = element.querySelectorAll('sbb-tab-label')[2];

      expect(tab).not.to.have.attribute('disabled');
    });

    it('does not activate a disabled tab', async () => {
      const tab = element.querySelectorAll('sbb-tab-label')[2];

      tab.disabled = true;
      element.activateTab(2);
      await waitForLitRender(element);
      expect(tab).not.to.have.attribute('active');
    });

    it('activates the first tab', () => {
      const tab = element.querySelectorAll('sbb-tab-label')[1];

      expect(tab).to.have.attribute('active');
    });

    describe('events', () => {
      it('selects tab on click', async () => {
        const tab = element.querySelector<SbbTabLabelElement>(':scope > sbb-tab-label#sbb-tab-1')!;

        tab.click();
        await waitForLitRender(element);

        expect(tab).to.have.attribute('active');
      });

      it('dispatches tabchange event on tab change', async () => {
        const tab = element.querySelector<SbbTabLabelElement>(':scope > sbb-tab-label#sbb-tab-1')!;
        const changeSpy = new EventSpy(SbbTabGroupElement.events.tabchange);

        tab.click();
        await changeSpy.calledOnce();
        expect(changeSpy.count).to.be.equal(1);
      });

      it('dispatches active event on tab change', async () => {
        const tab = element.querySelector<SbbTabLabelElement>(':scope > sbb-tab-label#sbb-tab-1')!;
        const activeSpy = new EventSpy(SbbTabElement.events.active);

        tab.click();
        await activeSpy.calledOnce();
        expect(activeSpy.count).to.be.equal(1);
      });

      it('selects tab on left arrow key pressed', async () => {
        await sendKeys({ press: tabKey });
        await sendKeys({ press: 'ArrowLeft' });
        await waitForLitRender(element);
        const tab = element.querySelector(':scope > sbb-tab-label#sbb-tab-1');

        expect(tab).to.have.attribute('active');
      });

      it('selects tab on right arrow key pressed', async () => {
        await sendKeys({ press: tabKey });
        await sendKeys({ press: 'ArrowRight' });
        await waitForLitRender(element);

        const tab = element.querySelector(':scope > sbb-tab-label#sbb-tab-4');

        expect(tab).to.have.attribute('active');
      });

      it('wraps around on arrow key navigation', async () => {
        await sendKeys({ press: tabKey });
        await sendKeys({ press: 'ArrowRight' });
        await sendKeys({ press: 'ArrowRight' });
        await waitForLitRender(element);

        const tab = element.querySelector(':scope > sbb-tab-label#sbb-tab-1');

        expect(tab).to.have.attribute('active');
      });

      it('wraps around on arrow left arrow key navigation', async () => {
        await sendKeys({ press: tabKey });
        await sendKeys({ press: 'ArrowLeft' });
        await sendKeys({ press: 'ArrowLeft' });
        await waitForLitRender(element);

        const tab = element.querySelector(':scope > sbb-tab-label#sbb-tab-4');

        expect(tab).to.have.attribute('active');
      });
    });
  });

  it('activates the first enabled tab if exceeds the length of the tab group', async () => {
    element = await fixture(
      html` <sbb-tab-group initial-selected-index="2">
        <sbb-tab-label id="sbb-tab-1">Test tab label 1</sbb-tab-label>
        <sbb-tab> Test tab content 1 </sbb-tab>
        <sbb-tab-label id="sbb-tab-2">Test tab label 2</sbb-tab-label>
        <sbb-tab> Test tab content 2 </sbb-tab>
      </sbb-tab-group>`,
    );
    const tab = element.querySelector('sbb-tab-label#sbb-tab-1');
    expect(tab).to.have.attribute('active');
  });

  it('activates the first enabled tab if targets a disabled tab', async () => {
    element = await fixture(
      html` <sbb-tab-group initial-selected-index="0">
        <sbb-tab-label disabled>Test tab label 1</sbb-tab-label>
        <sbb-tab> Test tab content 1 </sbb-tab>
        <sbb-tab-label id="sbb-tab-2">Test tab label 2</sbb-tab-label>
        <sbb-tab> Test tab content 2 </sbb-tab>
      </sbb-tab-group>`,
    );
    const tab = element.querySelector('sbb-tab-label#sbb-tab-2');
    expect(tab).to.have.attribute('active');
  });

  it('recovers if active tabs are added later', async () => {
    element = await fixture(html`<sbb-tab-group></sbb-tab-group>`);
    const changeSpy = new EventSpy(SbbTabGroupElement.events.tabchange);

    const newLabel = document.createElement('sbb-tab-label');
    newLabel.textContent = 'Label 1';
    newLabel.toggleAttribute('active', true);
    const newTab = document.createElement('sbb-tab');
    newTab.textContent = 'Tab 1';

    element.append(newLabel, newTab);

    await waitForLitRender(element);
    // Await throttling
    await aTimeout(200);

    const newLabelActive = document.createElement('sbb-tab-label');
    newLabelActive.textContent = 'Label 2';
    const newTabActive = document.createElement('sbb-tab');
    newTabActive.textContent = 'Tab 2';

    element.append(newLabelActive, newTabActive);

    await waitForLitRender(element);
    // Await throttling
    await aTimeout(200);

    expect(changeSpy.count).to.be.equal(1);

    let firstTabLabel = element.querySelector('sbb-tab-label') as SbbTabLabelElement;
    expect(firstTabLabel).to.have.attribute('active');
    expect(firstTabLabel['internals'].ariaSelected).to.be.equal('true');
    expect(element.querySelector('sbb-tab')).to.match(':state(active)');

    let secondTabLabel = element.querySelector(
      'sbb-tab-label:nth-of-type(2)',
    ) as SbbTabLabelElement;
    expect(secondTabLabel).not.to.have.attribute('active');
    expect(secondTabLabel['internals'].ariaSelected).to.be.equal('false');
    expect(element.querySelector('sbb-tab:nth-of-type(2)')).not.to.match(':state(active)');

    newLabelActive.click();
    await waitForLitRender(element);

    expect(changeSpy.count).to.be.equal(2);

    firstTabLabel = element.querySelector('sbb-tab-label') as SbbTabLabelElement;
    expect(firstTabLabel).not.to.have.attribute('active');
    expect(firstTabLabel['internals'].ariaSelected).to.be.equal('false');
    expect(element.querySelector('sbb-tab')).not.to.match(':state(active)');

    secondTabLabel = element.querySelector('sbb-tab-label:nth-of-type(2)') as SbbTabLabelElement;
    expect(secondTabLabel).to.have.attribute('active');
    expect(secondTabLabel['internals'].ariaSelected).to.be.equal('true');
    expect(element.querySelector('sbb-tab:nth-of-type(2)')).to.match(':state(active)');
  });

  describe('tab removal', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-tab-group initial-selected-index="1">
          <sbb-tab-label id="sbb-tab-1">Test tab label 1</sbb-tab-label>
          <sbb-tab>Test tab content 1</sbb-tab>
          <sbb-tab-label id="sbb-tab-2">Test tab label 2</sbb-tab-label>
          <sbb-tab>Test tab content 2</sbb-tab>
          <sbb-tab-label id="sbb-tab-3">Test tab label 3</sbb-tab-label>
          <sbb-tab>Test tab content 3</sbb-tab>
        </sbb-tab-group>`,
      );
    });

    it('should return updated tabs list via tabs getter after removal', async () => {
      // Initial state: 3 tabs
      let tabs = element.tabs;
      expect(tabs).to.have.lengthOf(3);
      expect(tabs[0].textContent?.trim()).to.be.equal('Test tab content 1');
      expect(tabs[1].textContent?.trim()).to.be.equal('Test tab content 2');
      expect(tabs[2].textContent?.trim()).to.be.equal('Test tab content 3');

      // Remove the second tab
      const tabToRemove = element.querySelector<SbbTabElement>(
        'sbb-tab-label#sbb-tab-2 + sbb-tab',
      )!;
      tabToRemove.remove();

      await waitForLitRender(element);

      // After removal: 2 tabs
      tabs = element.tabs;
      expect(tabs).to.have.lengthOf(2);
      expect(tabs[0].textContent?.trim()).to.be.equal('Test tab content 1');
      expect(tabs[1].textContent?.trim()).to.be.equal('Test tab content 3');

      // Verify that removed tab is no longer in the list
      expect(tabs.some((tab) => tab.textContent?.trim() === 'Test tab content 2')).to.be.false;
    });

    it('should activate first available tab when active tab is removed', async () => {
      // Verify that tab 2 is initially active
      const activeTabLabel = element.querySelector<SbbTabLabelElement>('sbb-tab-label#sbb-tab-2')!;
      expect(activeTabLabel).to.have.attribute('active');
      expect(activeTabLabel.tab!).to.match(':state(active)');

      const changeSpy = new EventSpy(SbbTabGroupElement.events.tabchange);

      // Remove the active tab and its label
      activeTabLabel.tab!.remove();
      activeTabLabel.remove();

      await waitForLitRender(element);

      // The first available tab (tab 3) should now be active
      const newActiveTabLabel =
        element.querySelector<SbbTabLabelElement>('sbb-tab-label#sbb-tab-3')!;
      expect(newActiveTabLabel).to.have.attribute('active');

      // The tab content should also be active
      expect(newActiveTabLabel.tab!).to.match(':state(active)');

      // A tabchange event should have been fired
      expect(changeSpy.count).to.be.greaterThan(0);
    });

    it('should not change active tab when inactive tab is removed', async () => {
      // First, switch to tab 2
      const tabLabel2 = element.querySelector<SbbTabLabelElement>('sbb-tab-label#sbb-tab-2')!;
      tabLabel2.click();
      await waitForLitRender(element);

      // Verify that tab 1 is now active
      expect(tabLabel2).to.have.attribute('active');

      const changeSpy = new EventSpy(SbbTabGroupElement.events.tabchange);

      // Remove an inactive tab (tab 1) and its content
      const inactiveTabLabel =
        element.querySelector<SbbTabLabelElement>('sbb-tab-label#sbb-tab-1')!;

      inactiveTabLabel.tab!.remove();
      await aTimeout(0);
      inactiveTabLabel.remove();

      await waitForLitRender(element);
      // Await throttling
      await aTimeout(10);

      // Tab 1 should still be active
      expect(tabLabel2).to.have.attribute('active');
      expect(tabLabel2.tab!).to.match(':state(active)');

      // No tabchange event should have been fired
      expect(changeSpy.count).to.be.equal(0);
    });

    it('should activate first available tab when active tab is removed in inverse order', async () => {
      // Verify that tab 2 is initially active
      const activeTabLabel = element.querySelector<SbbTabLabelElement>('sbb-tab-label#sbb-tab-2')!;
      expect(activeTabLabel).to.have.attribute('active');
      expect(activeTabLabel.tab!).to.match(':state(active)');

      const changeSpy = new EventSpy(SbbTabGroupElement.events.tabchange);

      // Remove the active tab first, then the label (inverse order)
      const activeTab = activeTabLabel.tab!;
      activeTab.remove();
      await aTimeout(0);
      activeTabLabel.remove();

      await waitForLitRender(element);

      // The first available tab (tab 3) should now be active
      const newActiveTabLabel =
        element.querySelector<SbbTabLabelElement>('sbb-tab-label#sbb-tab-3')!;
      expect(newActiveTabLabel).to.have.attribute('active');

      // The tab content should also be active
      expect(newActiveTabLabel.tab!).to.match(':state(active)');

      // A tabchange event should have been fired
      expect(changeSpy.count).to.be.greaterThan(0);
    });
  });
});
