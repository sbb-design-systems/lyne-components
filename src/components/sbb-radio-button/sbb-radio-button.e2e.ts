import { newE2EPage } from '@stencil/core/testing';

describe('sbb-radio-button', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-radio-button></sbb-radio-button>');

    element = await page.find('sbb-radio-button');
    expect(element).toHaveClass('hydrated');
  });
});
