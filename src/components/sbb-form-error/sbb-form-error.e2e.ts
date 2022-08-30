import { newE2EPage } from '@stencil/core/testing';

describe('sbb-form-error', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-form-error></sbb-form-error>');

    element = await page.find('sbb-form-error');
    expect(element).toHaveClass('hydrated');
  });
});
