import { newE2EPage } from '@stencil/core/testing';

describe('sbb-input-error', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-input-error></sbb-input-error>');

    element = await page.find('sbb-input-error');
    expect(element).toHaveClass('hydrated');
  });
});
