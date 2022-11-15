import { newE2EPage } from '@stencil/core/testing';

describe('sbb-toggle-option', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-toggle-option></sbb-toggle-option>');

    element = await page.find('sbb-toggle-option');
    expect(element).toHaveClass('hydrated');
  });
});
