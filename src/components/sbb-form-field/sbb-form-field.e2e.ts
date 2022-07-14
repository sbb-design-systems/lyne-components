import { newE2EPage } from '@stencil/core/testing';

describe('sbb-form-field', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-form-field><input slot="input"/></sbb-form-field>');

    element = await page.find('sbb-form-field');
    expect(element).toHaveClass('hydrated');
  });
});
