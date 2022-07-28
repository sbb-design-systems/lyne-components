import { newE2EPage } from '@stencil/core/testing';

describe('sbb-card', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-card></sbb-card>');

    element = await page.find('sbb-card');
    expect(element).toHaveClass('hydrated');
  });
});
