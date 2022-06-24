import { newE2EPage } from '@stencil/core/testing';

describe('sbb-link', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(
      '<sbb-link href-value="https://github.com/lyne-design-system/lyne-components"></sbb-link>'
    );

    element = await page.find('sbb-link');
    expect(element).toHaveClass('hydrated');
  });
});
