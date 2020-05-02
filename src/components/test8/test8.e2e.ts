import { newE2EPage } from '@stencil/core/testing';

describe('lyne-test8', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lyne-test8></lyne-test8>');

    const element = await page.find('lyne-test8');
    expect(element).toHaveClass('hydrated');
  });
});
