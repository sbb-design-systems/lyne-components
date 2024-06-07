import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';
import { waitForLitRender } from '../../core/testing.js';

import type { SbbTabGroupElement } from './tab-group.js';
import './tab-group.js';
import '../tab-label.js';

describe(`sbb-tab-group`, () => {
  let element: SbbTabGroupElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-tab-group initial-selected-index="0">
        <sbb-tab-label>Test tab label 1</sbb-tab-label>
        <div>Test tab content 1</div>
        <sbb-tab-label>Test tab label 2</sbb-tab-label>
        <div>Test tab content 2</div>
        <sbb-tab-label disabled>Test tab label 3</sbb-tab-label>
        <div>Test tab content 3</div>
        <sbb-tab-label>Test tab label 4</sbb-tab-label>
      </sbb-tab-group>
    `);
  });

  it('renders', async () => {
    const root = await fixture(html`<sbb-tab-group></sbb-tab-group>`);

    expect(root).dom.to.be.equal(`<sbb-tab-group></sbb-tab-group>`);
    await expect(root).shadowDom.to.be.equalSnapshot();
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

  describe('initial tab', () => {
    it('activates the first tab', () => {
      const tab = element.querySelectorAll('sbb-tab-label')[0];

      expect(tab).to.have.attribute('active');
    });
  });

  testA11yTreeSnapshot();
});
