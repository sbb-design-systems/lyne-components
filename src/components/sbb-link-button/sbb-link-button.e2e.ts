import { newE2EPage } from '@stencil/core/testing';

describe('sbb-link', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(
      '<sbb-link-button href-value="https://github.com/lyne-design-system/lyne-components"></sbb-link-button>'
    );

    element = await page.find('sbb-link-button');
    expect(element).toHaveClass('hydrated');
  });
});
