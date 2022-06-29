import { newE2EPage } from '@stencil/core/testing';

describe('__name__', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<__name__></__name__>');

    element = await page.find('__name__');
    expect(element).toHaveClass('hydrated');
  });
});
