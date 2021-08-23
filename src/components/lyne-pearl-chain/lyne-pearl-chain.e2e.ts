import { newE2EPage } from '@stencil/core/testing';

describe('lyne-pearlchain', () => {
  let element,
    page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-pearlchain></lyne-pearlchain>');
    element = await page.find('lyne-pearlchain');
  });

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-pearlchain></lyne-pearlchain>');

    element = await page.find('lyne-pearlchain');
    expect(element)
      .toHaveClass('hydrated');
  });

});
