import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-radio-button', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-radio-button value="Value">Value label</sbb-radio-button>');

    element = await page.find('sbb-radio-button');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('selects radio on click', async () => {
    await element.click();
    await page.waitForChanges();
    expect(element).toHaveAttribute('checked');
  });

  it('does not deselect radio if already checked', async () => {
    await element.click();
    await page.waitForChanges();
    expect(element).toHaveAttribute('checked');

    await element.click();
    await page.waitForChanges();
    expect(element).toHaveAttribute('checked');
  });
});
