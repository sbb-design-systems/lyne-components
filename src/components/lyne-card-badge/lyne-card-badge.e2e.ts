import { newE2EPage } from '@stencil/core/testing';

describe('lyne-card-badge', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-card-badge></lyne-card-badge>');

    element = await page.find('lyne-card-badge');
    expect(element)
      .toHaveClass('hydrated');
  });

});
