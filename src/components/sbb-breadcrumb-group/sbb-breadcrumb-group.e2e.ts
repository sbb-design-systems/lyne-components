import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-breadcrumb-group', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-breadcrumb-group>
        <sbb-breadcrumb href="/" icon-name="house-small" id="breadcrumb-0"></sbb-breadcrumb>
        <sbb-breadcrumb href="/" id="breadcrumb-1">One</sbb-breadcrumb>
        <sbb-breadcrumb href="/" id="breadcrumb-2">Two</sbb-breadcrumb>
      </sbb-breadcrumb-group>
    `);

    element = await page.find('sbb-breadcrumb-group');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('keybord navigation', async () => {
    const first = await page.find('sbb-breadcrumb-group > sbb-breadcrumb#breadcrumb-0');
    const second = await page.find('sbb-breadcrumb-group > sbb-breadcrumb#breadcrumb-1');
    const third = await page.find('sbb-breadcrumb-group > sbb-breadcrumb#breadcrumb-2');

    await first.focus();
    await page.keyboard.down('ArrowRight');
    expect(await page.evaluate(() => document.activeElement.id)).toEqual(second.id);
    await page.keyboard.down('ArrowRight');
    expect(await page.evaluate(() => document.activeElement.id)).toEqual(third.id);
  });
});
