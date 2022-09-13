import { newE2EPage } from '@stencil/core/testing';

describe('sbb-alert-group', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-alert-group></sbb-alert-group>');

    element = await page.find('sbb-alert-group');
    expect(element).toHaveClass('hydrated');
  });
});
