import { newE2EPage } from '@stencil/core/testing';

describe('sbb-panel', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-panel />');

    element = await page.find('sbb-panel');
    expect(element).toHaveClass('hydrated');
  });
});
