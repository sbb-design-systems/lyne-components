import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-file-selector', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-file-selector></sbb-file-selector>');
    element = await page.find('sbb-file-selector');
  });

  it('renders', () => {
    expect(element).toHaveClass('hydrated');
  });
});
