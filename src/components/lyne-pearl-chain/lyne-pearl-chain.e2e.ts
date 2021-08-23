import { newE2EPage } from '@stencil/core/testing';

describe('lyne-pearl-chain', () => {
  let element,
    page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-pearl-chain></lyne-pearl-chain>');
    element = await page.find('lyne-pearl-chain');
  });

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-pearl-chain></lyne-pearl-chain>');

    element = await page.find('lyne-pearl-chain');
    expect(element)
      .toHaveClass('hydrated');
  });

});
