import { newE2EPage } from '@stencil/core/testing';

describe('lyne-stack', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-stack></lyne-stack>');

    element = await page.find('lyne-stack');
    expect(element)
      .toHaveClass('hydrated');
  });

});
