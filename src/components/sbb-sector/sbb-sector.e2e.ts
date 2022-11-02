import { newE2EPage } from '@stencil/core/testing';

describe('sbb-sector', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-sector></sbb-sector>');

    element = await page.find('sbb-sector');
    expect(element).toHaveClass('hydrated');
  });
});
