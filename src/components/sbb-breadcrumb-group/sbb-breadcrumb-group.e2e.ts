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

  it('keyboard navigation', async () => {
    const first = await page.find('sbb-breadcrumb-group > sbb-breadcrumb#breadcrumb-0');
    const second = await page.find('sbb-breadcrumb-group > sbb-breadcrumb#breadcrumb-1');
    const third = await page.find('sbb-breadcrumb-group > sbb-breadcrumb#breadcrumb-2');

    await first.focus();
    await page.keyboard.down('ArrowRight');
    expect(await page.evaluate(() => document.activeElement.id)).toEqual(second.id);
    await page.keyboard.down('ArrowRight');
    expect(await page.evaluate(() => document.activeElement.id)).toEqual(third.id);
  });

  it('keyboard navigation with ellipsis', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 320, height: 600 });
    await page.setContent(`
      <sbb-breadcrumb-group id='sbb-breadcrumb-group'>
        <sbb-breadcrumb href="/" icon-name="house-small" id="breadcrumb-0"></sbb-breadcrumb>
        <sbb-breadcrumb href="/" id="breadcrumb-1">First</sbb-breadcrumb>
        <sbb-breadcrumb href="/" id="breadcrumb-2">Second</sbb-breadcrumb>
        <sbb-breadcrumb href="/" id="breadcrumb-3">Third</sbb-breadcrumb>
        <sbb-breadcrumb href="/" id="breadcrumb-4">Fourth</sbb-breadcrumb>
        <sbb-breadcrumb href="/" id="breadcrumb-5">Fifth</sbb-breadcrumb>
        <sbb-breadcrumb href="/" id="breadcrumb-6">Sixth</sbb-breadcrumb>
      </sbb-breadcrumb-group>
    `);

    const element = await page.find('sbb-breadcrumb-group');
    await page.waitForChanges();

    const ellipsisElement = await page.find(
      'sbb-breadcrumb-group >>> #sbb-breadcrumb-group-ellipsis'
    );
    const ellipsisBreadcrumb = await page.find('sbb-breadcrumb-group >>> #sbb-breadcrumb-ellipsis');
    const first = await page.find('sbb-breadcrumb-group > sbb-breadcrumb#breadcrumb-0');
    const last = await page.find('sbb-breadcrumb-group > sbb-breadcrumb#breadcrumb-6');

    expect(ellipsisElement).not.toBeNull();
    expect(ellipsisBreadcrumb).not.toBeNull();

    await first.focus();
    expect(await page.evaluate(() => document.activeElement.id)).toEqual(first.id);

    await page.keyboard.down('ArrowRight');
    expect(await page.evaluate(() => document.activeElement.id)).toEqual(element.id);
    expect(
      await page.evaluate(
        () => document.getElementById('sbb-breadcrumb-group').shadowRoot.activeElement.id
      )
    ).toEqual(ellipsisBreadcrumb.id);

    await page.keyboard.down('ArrowRight');
    expect(await page.evaluate(() => document.activeElement.id)).toEqual(last.id);

    await page.keyboard.down('ArrowRight');
    expect(await page.evaluate(() => document.activeElement.id)).toEqual(first.id);
  });
});
