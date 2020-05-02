import { newE2EPage } from '@stencil/core/testing';

describe('lyne-test3', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lyne-test3></lyne-test3>');

    const element = await page.find('lyne-test3');
    expect(element).toHaveClass('hydrated');
  });
});
