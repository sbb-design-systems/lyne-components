import { newE2EPage } from '@stencil/core/testing';

describe('sbb-journey-header', () => {
  let element, page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-journey-header></sbb-journey-header>');
    element = await page.find('sbb-journey-header');
  });

  it('renders', async () => {
    element = await page.find('sbb-journey-header');
    expect(element).toHaveClass('hydrated');
  });
});
