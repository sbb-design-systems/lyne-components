import { newE2EPage } from '@stencil/core/testing';

describe('lyne-test7', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lyne-test7></lyne-test7>');

    const element = await page.find('lyne-test7');
    expect(element).toHaveClass('hydrated');
  });
});
