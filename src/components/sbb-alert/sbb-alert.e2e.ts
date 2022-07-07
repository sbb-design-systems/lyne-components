import { newE2EPage } from '@stencil/core/testing';

describe('sbb-alert', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-alert></sbb-alert>');

    element = await page.find('sbb-alert');
    expect(element).toHaveClass('hydrated');
  });
});
