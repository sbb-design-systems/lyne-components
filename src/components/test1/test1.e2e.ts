import { newE2EPage } from '@stencil/core/testing';

describe('lyne-test1', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lyne-test1></lyne-test1>');

    const element = await page.find('lyne-test1');
    expect(element).toHaveClass('hydrated');
  });
});
