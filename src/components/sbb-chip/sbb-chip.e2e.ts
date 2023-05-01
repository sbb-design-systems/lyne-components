import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-chip', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-chip>Label</sbb-chip>');

    element = await page.find('sbb-chip');
    expect(element).toHaveClass('hydrated');
  });
});
