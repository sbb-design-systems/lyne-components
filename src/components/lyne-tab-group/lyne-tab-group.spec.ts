import { LyneTabGroup } from './lyne-tab-group';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-tab-group', () => {
  let component, page;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [LyneTabGroup],
      html: `<lyne-tab-group initial-selected-index="0">
              <h1>Test tab label 1</h1>
              <div>Test tab content 1</div>
              <h2>Test tab label 2</h2>
              <div>Test tab content 2</div>
              <h3 disabled>Test tab label 3</h3>
              <div>Test tab content 3</div>
              <h4>Test tab label 4</h4>
            </lyne-tab-group>`,
      supportsShadowDom: true
    });
    component = page.doc.querySelector('lyne-tab-group');
  });

  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTabGroup],
      html: '<lyne-tab-group />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-tab-group>
          <mock:shadow-root>
          <div class="tab-group" role="tablist">
            <slot name="tab-bar"></slot>
          </div>
          <div class="tab-content">
            <slot></slot>
          </div>
          </mock:shadow-root>
        </lyne-tab-group>
      `);
  });

  it('activates tab by index', async () => {
    component.activateTab(1);
    await page.waitForChanges();
    const tab = page.root.querySelector('h2');

    expect(tab)
      .toHaveAttribute('active');
  });

  it('disables tab by index', async () => {
    component.disableTab(0);
    await page.waitForChanges();
    const tab = page.root.querySelector('h1');

    expect(tab)
      .toHaveAttribute('disabled');
  });

  it('enables tab by index', async () => {
    component.enableTab(2);
    await page.waitForChanges();
    const tab = page.root.querySelector('h3');

    expect(tab).not
      .toHaveAttribute('disabled');
  });

  it('does not activate a disabled tab', async () => {
    const tab = page.root.querySelector('h3');

    tab.disabled = true;
    component.activateTab(2);
    await page.waitForChanges();
    expect(tab).not
      .toHaveAttribute('active');
  });

  describe('initial tab', () => {
    it('activates the first tab', () => {
      const tab = page.root.querySelector('h1');

      expect(tab)
        .toHaveAttribute('active');
    });

    it('activates the first enabled tab if targets a disabled tab', async () => {
      page = await newSpecPage({
        components: [LyneTabGroup],
        html: `<lyne-tab-group initial-selected-index="0">
                <h1 disabled>Test tab label 1</h1>
                <div>Test tab content 1</div>
                <h2>Test tab label 2</h2>
                <div>Test tab content 2</div>
              </lyne-tab-group>`,
        supportsShadowDom: true
      });
      const tab = page.root.querySelector('h2');

      expect(tab)
        .toHaveAttribute('active');
    });

    it('activates the first enabled tab if exceeds the length of the tab group', async () => {
      page = await newSpecPage({
        components: [LyneTabGroup],
        html: `<lyne-tab-group initial-selected-index="2">
                <h1>Test tab label 1</h1>
                <div>Test tab content 1</div>
                <h2>Test tab label 2</h2>
                <div>Test tab content 2</div>
              </lyne-tab-group>`,
        supportsShadowDom: true
      });
      const tab = page.root.querySelector('h1');

      expect(tab)
        .toHaveAttribute('active');
    });
  });

  describe('events', () => {
    it('selects tab on right arrow key pressed', async () => {
      const tab1 = page.root.querySelector('h1');
      const tab2 = page.root.querySelector('h2');

      // Mock focus function
      tab1.focus = jest.fn();
      tab2.focus = jest.fn();

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowRight'
      });

      component.dispatchEvent(event);
      await page.waitForChanges();

      expect(tab2)
        .toHaveAttribute('active');
    });

    it('wraps around on left arrow key pressed', async () => {
      const tab1 = page.root.querySelector('h1');
      const tab4 = page.root.querySelector('h4');

      // Mock focus function
      tab1.focus = jest.fn();
      tab4.focus = jest.fn();

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowLeft'
      });

      component.dispatchEvent(event);
      await page.waitForChanges();

      expect(tab4)
        .toHaveAttribute('active');
    });
  });
});
