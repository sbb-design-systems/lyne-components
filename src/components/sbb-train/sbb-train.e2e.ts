import { newE2EPage } from '@stencil/core/testing';

describe('sbb-train', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-train></sbb-train>');

    element = await page.find('sbb-train');
    expect(element).toHaveClass('hydrated');
  });
});
