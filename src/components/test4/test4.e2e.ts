import { newE2EPage } from '@stencil/core/testing';

describe('lyne-test4', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lyne-test4></lyne-test4>');

    const element = await page.find('lyne-test4');
    expect(element).toHaveClass('hydrated');
  });
});
