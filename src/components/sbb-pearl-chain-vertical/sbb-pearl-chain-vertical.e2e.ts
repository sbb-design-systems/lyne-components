import { newE2EPage } from '@stencil/core/testing';

describe('sbb-pearl-chain', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-pearl-chain-vertical></sbb-pearl-chain-vertical>');

    element = await page.find('sbb-pearl-chain-vertical');
    expect(element).toHaveClass('hydrated');
  });
});
