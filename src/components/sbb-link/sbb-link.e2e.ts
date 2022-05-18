import { newE2EPage } from '@stencil/core/testing';

describe('lyne-link', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-link href-value="https://github.com/lyne-design-system/lyne-components"></lyne-link>');

    element = await page.find('lyne-link');
    expect(element)
      .toHaveClass('hydrated');
  });

});
