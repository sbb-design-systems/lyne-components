import { newE2EPage } from '@stencil/core/testing';

describe('lyne-title', () => {
  let page,
    element;

  beforeEach(async () => {
		page = await newE2EPage();
		await page.setContent('<lyne-title></lyne-title>');
		element = await page.find('lyne-title');
	});

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lyne-title></lyne-title>');

    const element = await page.find('lyne-title');
    expect(element).toHaveClass('hydrated');
  });

});
