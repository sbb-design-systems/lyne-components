import { newE2EPage } from '@stencil/core/testing';

describe('lyne-journey-header', () => {
  let element,
    page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-journey-header></lyne-journey-header>');
    element = await page.find('lyne-journey-header');
  });

  it('renders', async () => {
    element = await page.find('lyne-journey-header');
    expect(element)
      .toHaveClass('hydrated');
  });

});
