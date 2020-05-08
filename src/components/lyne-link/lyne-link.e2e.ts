import { newE2EPage } from '@stencil/core/testing';

describe('lyne-link', () => {
  let page,
    element;

  beforeEach(async () => {
		page = await newE2EPage();
		await page.setContent('<lyne-link></lyne-link>');
		element = await page.find('lyne-link');
	});

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

});
