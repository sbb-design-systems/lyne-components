import { newE2EPage } from '@stencil/core/testing';

describe('lyne-test6', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lyne-test6></lyne-test6>');

    const element = await page.find('lyne-test6');
    expect(element).toHaveClass('hydrated');
  });
});
