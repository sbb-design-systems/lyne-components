import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-expansion-panel-header', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<sbb-expansion-panel-header>Header</sbb-expansion-panel-header>`);
    element = await page.find('sbb-expansion-panel-header');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('emits event on click', async () => {
    const spy = await page.spyOnEvent('toggle-expanded');
    await element.click();
    expect(spy).toHaveReceivedEvent();
  });

  it('does not emits event on click if disabled', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<sbb-expansion-panel-header disabled>Header</sbb-expansion-panel-header>`,
    );
    element = await page.find('sbb-expansion-panel-header');
    const spy = await page.spyOnEvent('toggle-expanded');
    await element.click();
    expect(spy).not.toHaveReceivedEvent();
  });
});
