import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-tag-group', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-tag-group>
        <sbb-tag id="sbb-tag-1">Tag 1</sbb-tag>
        <sbb-tag id="sbb-tag-2">Tag 2</sbb-tag>
        <sbb-tag id="sbb-tag-3">Tag 3</sbb-tag>
      </sbb-tag-group>
    `);
    element = await page.find('sbb-tag-group');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('navigation with arrow keys', async () => {
    const tagOne = await page.find('sbb-tag-group > sbb-tag#sbb-tag-1');
    const tagTwo = await page.find('sbb-tag-group > sbb-tag#sbb-tag-2');
    const tagThree = await page.find('sbb-tag-group > sbb-tag#sbb-tag-3');
    expect(tagTwo).not.toHaveAttribute('checked');
    expect(tagThree).not.toHaveAttribute('checked');
    await tagOne.focus();
    await page.keyboard.down('ArrowRight');
    await page.keyboard.down('ArrowRight');
    await element.press('Space');
    await page.waitForChanges();
    expect(tagThree).toEqualAttribute('checked', '');
    await page.keyboard.down('ArrowUp');
    await element.press('Space');
    await page.waitForChanges();
    expect(tagTwo).toEqualAttribute('checked', '');
  });
});
