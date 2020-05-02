import { newE2EPage } from '@stencil/core/testing';

describe('lyne-test9', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lyne-test9></lyne-test9>');

    const element = await page.find('lyne-test9');
    expect(element).toHaveClass('hydrated');
  });
});
