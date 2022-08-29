import { newE2EPage } from '@stencil/core/testing';

describe('sbb-tab-amount', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-tab-amount></sbb-tab-amount>');

    element = await page.find('sbb-tab-amount');
    expect(element).toHaveClass('hydrated');
  });
});
