import { newE2EPage } from '@stencil/core/testing';

describe('lyne-cta-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lyne-cta-button></lyne-cta-button>');

    const element = await page.find('lynes-cta-button');
    expect(element).toHaveClass('hydrated');
  });
});
