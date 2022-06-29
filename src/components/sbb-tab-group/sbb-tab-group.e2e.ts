import { newE2EPage } from '@stencil/core/testing';

describe('sbb-tab-group', () => {
  let element, page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
    <sbb-tab-group initial-selected-index="1">
      <h1>Test tab label 1</h1>
      <div>Test tab content 1</div>
      <h2>Test tab label 2</h2>
      <div>Test tab content 2</div>
      <h3 disabled>Test tab label 3</h3>
      <div>Test tab content 3</div>
      <h4>Test tab label 4</h4>
    </sbb-tab-group>
    `);
    element = await page.find('sbb-tab-group');
  });

  it('renders', () => {
    expect(element).toHaveClass('hydrated');
  });

  it('renders tab content', async () => {
    const content = await page.find('sbb-tab-group > h1 + div');

    expect(content.textContent).toEqual('Test tab content 1');
  });

  it('renders no content tab panel', async () => {
    const content = await page.find('sbb-tab-group > h4 + div');

    expect(content.textContent).toEqual('No content.');
  });

  it('renders initial selected index', async () => {
    const initialSelectedTab = await page.find('sbb-tab-group > h2');

    expect(initialSelectedTab).toHaveAttribute('active');
  });

  describe('events', () => {
    it('selects tab on click', async () => {
      const tab = await page.find('sbb-tab-group > h1');

      await tab.click();
      expect(tab).toHaveAttribute('active');
    });

    it('dispatches event on tab change', async () => {
      const tab = await page.find('sbb-tab-group > h1');
      const changeSpy = await page.spyOnEvent('sbb-tab-group_did-change');

      await tab.click();
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('selects tab on left arrow key pressed', async () => {
      await page.keyboard.down('Tab');
      await page.keyboard.down('ArrowLeft');
      const tab = await page.find('sbb-tab-group > h1');

      expect(tab).toHaveAttribute('active');
    });

    it('selects tab on right arrow key pressed', async () => {
      await page.keyboard.down('Tab');
      await page.keyboard.down('ArrowRight');
      const tab = await page.find('sbb-tab-group > h4');

      expect(tab).toHaveAttribute('active');
    });

    it('wraps around on arrow key navigation', async () => {
      await page.keyboard.down('Tab');
      await page.keyboard.down('ArrowRight');
      await page.keyboard.down('ArrowRight');
      const tab = await page.find('sbb-tab-group > h1');

      expect(tab).toHaveAttribute('active');
    });
  });
});
