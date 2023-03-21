import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-option-group', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-option-group></sbb-option-group>');

    element = await page.find('sbb-option-group');
    expect(element).toHaveClass('hydrated');
  });
});
