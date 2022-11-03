import { newE2EPage } from '@stencil/core/testing';

describe('sbb-checkbox-group', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-checkbox-group></sbb-checkbox-group>');

    element = await page.find('sbb-checkbox-group');
    expect(element).toHaveClass('hydrated');
  });
});
