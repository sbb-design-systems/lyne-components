import { newE2EPage } from '@stencil/core/testing';

describe('sbb-slot-component', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-slot-component></sbb-slot-component>');

    element = await page.find('sbb-slot-component');
    expect(element)
      .toHaveClass('hydrated');
  });

});
