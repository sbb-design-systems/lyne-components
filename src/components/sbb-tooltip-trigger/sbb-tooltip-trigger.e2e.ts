import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-tooltip-trigger', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-tooltip-trigger></sbb-tooltip-trigger>');

    element = await page.find('sbb-tooltip-trigger');
    expect(element).toHaveClass('hydrated');
  });
});
