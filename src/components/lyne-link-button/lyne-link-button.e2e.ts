import { newE2EPage } from '@stencil/core/testing';

describe('lyne-link', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-link-button href-value="https://github.com/lyne-design-system/lyne-components"></lyne-link-button>');

    element = await page.find('lyne-link-button');
    expect(element)
      .toHaveClass('hydrated');
  });

});
