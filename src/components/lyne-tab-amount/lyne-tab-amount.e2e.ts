import { newE2EPage } from '@stencil/core/testing';

describe('lyne-tab-amount', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-tab-amount></lyne-tab-amount>');

    element = await page.find('lyne-tab-amount');
    expect(element)
      .toHaveClass('hydrated');
  });

});
