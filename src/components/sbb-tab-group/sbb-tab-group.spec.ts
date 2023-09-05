import { SbbTabGroup } from './sbb-tab-group';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-tab-group', () => {
  let component, page;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [SbbTabGroup],
      html: `<sbb-tab-group initial-selected-index="0">
              <sbb-tab-title>Test tab label 1</sbb-tab-title>
              <div>Test tab content 1</div>
              <sbb-tab-title>Test tab label 2</sbb-tab-title>
              <div>Test tab content 2</div>
              <sbb-tab-title disabled>Test tab label 3</sbb-tab-title>
              <div>Test tab content 3</div>
              <sbb-tab-title>Test tab label 4</sbb-tab-title>
            </sbb-tab-group>`,
      supportsShadowDom: true,
    });
    component = page.doc.querySelector('sbb-tab-group');
  });

  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTabGroup],
      html: '<sbb-tab-group />',
    });

    expect(root).toEqualHtml(`
        <sbb-tab-group>
          <mock:shadow-root>
          <div class="tab-group" role="tablist">
            <slot name="tab-bar"></slot>
          </div>
          <div class="tab-content">
            <slot></slot>
          </div>
          </mock:shadow-root>
        </sbb-tab-group>
      `);
  });

  it('activates tab by index', async () => {
    component.activateTab(1);
    await page.waitForChanges();
    const tab = page.root.querySelectorAll('sbb-tab-title')[1];

    expect(tab).toHaveAttribute('active');
  });

  it('disables tab by index', async () => {
    component.disableTab(0);
    await page.waitForChanges();
    const tab = page.root.querySelectorAll('sbb-tab-title')[0];

    expect(tab).toHaveAttribute('disabled');
  });

  it('enables tab by index', async () => {
    component.enableTab(2);
    await page.waitForChanges();
    const tab = page.root.querySelectorAll('sbb-tab-title')[2];

    expect(tab).not.toHaveAttribute('disabled');
  });

  it('does not activate a disabled tab', async () => {
    const tab = page.root.querySelectorAll('sbb-tab-title')[2];

    tab.disabled = true;
    component.activateTab(2);
    await page.waitForChanges();
    expect(tab).not.toHaveAttribute('active');
  });

  describe('initial tab', () => {
    it('activates the first tab', () => {
      const tab = page.root.querySelectorAll('sbb-tab-title')[0];

      expect(tab).toHaveAttribute('active');
    });
  });
});
