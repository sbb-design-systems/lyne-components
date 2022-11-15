import { newE2EPage } from '@stencil/core/testing';

describe('sbb-toggle', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-toggle></sbb-toggle>');

    element = await page.find('sbb-toggle');
    expect(element).toHaveClass('hydrated');
  });
});
