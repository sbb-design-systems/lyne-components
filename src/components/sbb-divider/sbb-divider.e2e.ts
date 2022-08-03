import { newE2EPage } from '@stencil/core/testing';

describe('sbb-divider', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-divider></sbb-divider>');

    element = await page.find('sbb-divider');
    expect(element).toHaveClass('hydrated');
  });
});
