import { newE2EPage } from '@stencil/core/testing';

describe('lyne-heading', () => {
  let page,
    element;

  beforeEach(async () => {
		page = await newE2EPage();
		await page.setContent('<lyne-heading></lyne-heading>');
		element = await page.find('lyne-heading');
	});

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

});
