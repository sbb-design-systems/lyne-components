import { newE2EPage } from '@stencil/core/testing';

describe('sbb-tab-group', () => {
  let element, page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
    <sbb-tab-group initial-selected-index="1">
      <sbb-tab-title id="sbb-tab-1">Test tab label 1</sbb-tab-title>
      <div>Test tab content 1</div>
      <sbb-tab-title id="sbb-tab-3">Test tab label 2</sbb-tab-title>
      <div>Test tab content 2</div>
      <sbb-tab-title id="sbb-tab-5" disabled>Test tab label 3</sbb-tab-title>
      <div>Test tab content 3</div>
      <sbb-tab-title id="sbb-tab-7">Test tab label 4</sbb-tab-title>
    </sbb-tab-group>
    `);
    element = await page.find('sbb-tab-group');
  });

  it('renders', () => {
    expect(element).toHaveClass('hydrated');
  });

  it('renders tab content', async () => {
    const content = await page.find('sbb-tab-group > sbb-tab-title:first-child + div');

    expect(content.textContent).toEqual('Test tab content 1');
  });

  it('renders no content tab panel', async () => {
    const content = await page.find('sbb-tab-group > sbb-tab-title#sbb-tab-7 + div');
    console.log('CONTENUTOOOOO', content.nodeName);

    expect(content.textContent).toEqual('No content.');
  });

  it('renders initial selected index', async () => {
    const initialSelectedTab = await page.find('sbb-tab-group > sbb-tab-title#sbb-tab-3');

    expect(initialSelectedTab).toHaveAttribute('active');
  });

  describe('events', () => {
    it('selects tab on click', async () => {
      const tab = await page.find('sbb-tab-group > sbb-tab-title#sbb-tab-1');

      await tab.click();
      expect(tab).toHaveAttribute('active');
    });

    it('dispatches event on tab change', async () => {
      const tab = await page.find('sbb-tab-group > sbb-tab-title#sbb-tab-1');
      const changeSpy = await page.spyOnEvent('sbb-tab-group_did-change');

      await tab.click();
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('selects tab on left arrow key pressed', async () => {
      await page.keyboard.down('Tab');
      await page.keyboard.down('ArrowLeft');
      const tab = await page.find('sbb-tab-group > sbb-tab-title#sbb-tab-1');

      expect(tab).toHaveAttribute('active');
    });

    it('selects tab on right arrow key pressed', async () => {
      await page.keyboard.down('Tab');
      await page.keyboard.down('ArrowRight');
      const tab = await page.find('sbb-tab-group > sbb-tab-title#sbb-tab-7');

      expect(tab).toHaveAttribute('active');
    });

    it('wraps around on arrow key navigation', async () => {
      await page.keyboard.down('Tab');
      await page.keyboard.down('ArrowRight');
      await page.keyboard.down('ArrowRight');
      const tab = await page.find('sbb-tab-group > sbb-tab-title#sbb-tab-1');

      expect(tab).toHaveAttribute('active');
    });
  });
});
