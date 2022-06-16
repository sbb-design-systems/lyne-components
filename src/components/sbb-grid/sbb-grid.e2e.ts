import { newE2EPage } from '@stencil/core/testing';

describe('sbb-grid', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-grid></sbb-grid>');

    element = await page.find('sbb-grid');
    expect(element)
      .toHaveClass('hydrated');
  });

});
