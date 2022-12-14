import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-time-input', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-time-input></sbb-time-input>');

    element = await page.find('sbb-time-input');
    expect(element).toHaveClass('hydrated');
  });
});
