import { newE2EPage } from '@stencil/core/testing';

describe('lyne-panel', () => {
  let element,
    page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-panel />');
    element = await page.find('lyne-panel');
  });

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-panel />');

    element = await page.find('lyne-panel');
    expect(element)
      .toHaveClass('hydrated');
  });

});
