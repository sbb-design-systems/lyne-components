import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { waitForLitRender } from '../../core/testing';
import { SbbTabGroup } from './tab-group';
import '../tab-group';
import '../tab-title';

describe('sbb-tab-group', () => {
  let element: SbbTabGroup;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-tab-group initial-selected-index="0">
        <sbb-tab-title>Test tab label 1</sbb-tab-title>
        <div>Test tab content 1</div>
        <sbb-tab-title>Test tab label 2</sbb-tab-title>
        <div>Test tab content 2</div>
        <sbb-tab-title disabled>Test tab label 3</sbb-tab-title>
        <div>Test tab content 3</div>
        <sbb-tab-title>Test tab label 4</sbb-tab-title>
      </sbb-tab-group>
    `);
  });

  it('renders', async () => {
    const root = await fixture(html`<sbb-tab-group />`);

    expect(root).dom.to.be.equal(`<sbb-tab-group></sbb-tab-group>`);
    expect(root).shadowDom.to.be.equal(
      `
        <div class="tab-group" role="tablist">
          <slot name="tab-bar"></slot>
        </div>

        <div class="tab-content">
          <slot></slot>
        </div>
      `,
    );
  });

  it('activates tab by index', async () => {
    element.activateTab(1);
    await waitForLitRender(element);
    const tab = document.querySelectorAll('sbb-tab-title')[1];

    expect(tab).to.have.attribute('active');
  });

  it('disables tab by index', async () => {
    element.disableTab(0);
    await waitForLitRender(element);
    const tab = document.querySelectorAll('sbb-tab-title')[0];

    expect(tab).to.have.attribute('disabled');
  });

  it('enables tab by index', async () => {
    element.enableTab(2);
    await waitForLitRender(element);
    const tab = document.querySelectorAll('sbb-tab-title')[2];

    expect(tab).not.to.have.attribute('disabled');
  });

  it('does not activate a disabled tab', async () => {
    const tab = document.querySelectorAll('sbb-tab-title')[2];

    tab.disabled = true;
    element.activateTab(2);
    await waitForLitRender(element);
    expect(tab).not.to.have.attribute('active');
  });

  describe('initial tab', () => {
    it('activates the first tab', () => {
      const tab = document.querySelectorAll('sbb-tab-title')[0];

      expect(tab).to.have.attribute('active');
    });
  });
});
