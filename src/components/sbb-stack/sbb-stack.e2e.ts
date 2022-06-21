import { newE2EPage } from '@stencil/core/testing';

describe('sbb-stack', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-stack></sbb-stack>');

    element = await page.find('sbb-stack');
    expect(element).toHaveClass('hydrated');
  });
});
