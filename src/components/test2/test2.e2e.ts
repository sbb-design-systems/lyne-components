import { newE2EPage } from '@stencil/core/testing';

describe('lyne-test2', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lyne-test2></lyne-test2>');

    const element = await page.find('lyne-test2');
    expect(element).toHaveClass('hydrated');
  });
});
