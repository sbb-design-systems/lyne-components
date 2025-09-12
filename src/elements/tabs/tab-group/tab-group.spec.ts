import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture, tabKey } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';
import type { SbbTabLabelElement } from '../tab-label.js';
import type { SbbTabElement } from '../tab.js';

import { SbbTabGroupElement } from './tab-group.component.js';

import '../tab-label.js';
import '../tab.js';

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

      it('dispatches event on tab change', async () => {
        const tab = element.querySelector<SbbTabLabelElement>(':scope > sbb-tab-label#sbb-tab-1')!;
        const changeSpy = new EventSpy(SbbTabGroupElement.events.tabchange);

        tab.click();
        await changeSpy.calledOnce();
        expect(changeSpy.count).to.be.equal(1);
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
    expect(element.querySelector('sbb-tab')).to.have.attribute('data-active');

    let secondTabLabel = element.querySelector(
      'sbb-tab-label:nth-of-type(2)',
    ) as SbbTabLabelElement;
    expect(secondTabLabel).not.to.have.attribute('active');
    expect(secondTabLabel['internals'].ariaSelected).to.be.equal('false');
    expect(element.querySelector('sbb-tab:nth-of-type(2)')).not.to.have.attribute('data-active');

    newLabelActive.click();
    await waitForLitRender(element);

    expect(changeSpy.count).to.be.equal(2);

    firstTabLabel = element.querySelector('sbb-tab-label') as SbbTabLabelElement;
    expect(firstTabLabel).not.to.have.attribute('active');
    expect(firstTabLabel['internals'].ariaSelected).to.be.equal('false');
    expect(element.querySelector('sbb-tab')).not.to.have.attribute('data-active');

    secondTabLabel = element.querySelector('sbb-tab-label:nth-of-type(2)') as SbbTabLabelElement;
    expect(secondTabLabel).to.have.attribute('active');
    expect(secondTabLabel['internals'].ariaSelected).to.be.equal('true');
    expect(element.querySelector('sbb-tab:nth-of-type(2)')).to.have.attribute('data-active');
  });
});
