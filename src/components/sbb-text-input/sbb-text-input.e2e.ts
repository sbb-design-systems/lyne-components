import { newE2EPage } from '@stencil/core/testing';

describe('sbb-text-input', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-text-input></sbb-text-input>');

    element = await page.find('sbb-text-input');
    expect(element).toHaveClass('hydrated');
  });
});
