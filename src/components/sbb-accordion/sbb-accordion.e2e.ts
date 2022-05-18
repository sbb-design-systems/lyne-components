import { newE2EPage } from '@stencil/core/testing';

describe('sbb-accordion', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-accordion></sbb-accordion>');

    element = await page.find('sbb-accordion');
    expect(element)
      .toHaveClass('hydrated');
  });

});
