import { newE2EPage } from '@stencil/core/testing';

describe('sbb-section', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-section></sbb-section>');

    element = await page.find('sbb-section');
    expect(element)
      .toHaveClass('hydrated');
  });

});
