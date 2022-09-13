import { newE2EPage } from '@stencil/core/testing';

describe('sbb-action-group', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-action-group></sbb-action-group>');

    element = await page.find('sbb-action-group');
    expect(element).toHaveClass('hydrated');
  });
});
