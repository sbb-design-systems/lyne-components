import { newE2EPage } from '@stencil/core/testing';

describe('lyne-test10', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lyne-test10></lyne-test10>');

    const element = await page.find('lyne-test10');
    expect(element).toHaveClass('hydrated');
  });
});
