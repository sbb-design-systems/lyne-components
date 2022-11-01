import { newE2EPage } from '@stencil/core/testing';

describe('sbb-journey-summary', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sbb-journey-summary></sbb-journey-summary>');

    const element = await page.find('sbb-journey-summary');
    expect(element).toHaveClass('hydrated');
  });
});
