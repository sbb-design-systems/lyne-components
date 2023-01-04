import { newE2EPage } from '@stencil/core/testing';

describe('sbb-train-formation', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-train-formation></sbb-train-formation>');

    element = await page.find('sbb-train-formation');
    expect(element).toHaveClass('hydrated');
  });
});
