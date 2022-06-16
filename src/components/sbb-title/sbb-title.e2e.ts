import { newE2EPage } from '@stencil/core/testing';

describe('sbb-title', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-title></sbb-title>');
    element = await page.find('sbb-title');
    expect(element)
      .toHaveClass('hydrated');
  });

});
