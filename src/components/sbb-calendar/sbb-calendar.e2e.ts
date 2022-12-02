import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-calendar', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-calendar></sbb-calendar>');

    element = await page.find('sbb-calendar');
    expect(element).toHaveClass('hydrated');
  });
});
