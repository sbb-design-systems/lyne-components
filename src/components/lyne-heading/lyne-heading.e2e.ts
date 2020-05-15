import { newE2EPage } from '@stencil/core/testing';

describe('lyne-heading', () => {
  let element,
    page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-heading></lyne-heading>');
    element = await page.find('lyne-heading');
  });

  it('renders', async () => {
    element = await page.find('lyne-heading');
    expect(element)
      .toHaveClass('hydrated');
  });

});
