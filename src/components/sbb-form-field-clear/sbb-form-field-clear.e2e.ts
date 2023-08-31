import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-form-field-clear', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-form-field-clear></sbb-form-field-clear>');

    element = await page.find('sbb-form-field-clear');
    expect(element).toHaveClass('hydrated');
  });
});
