import { newE2EPage } from '@stencil/core/testing';

describe('lyne-test5', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lyne-test5></lyne-test5>');

    const element = await page.find('lyne-test5');
    expect(element).toHaveClass('hydrated');
  });
});
