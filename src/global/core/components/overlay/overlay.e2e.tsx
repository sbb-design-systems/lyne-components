import { newE2EPage } from '@stencil/core/testing';

describe('overlay', () => {
  let element,
    page;

  it('renders the overlay when programmatically opened', async () => {
    page = await newE2EPage({
      url: '/src/global/core/components/overlay'
    });

    expect(page).not.toBe(null);

    const presentButton = await page.find('#create-overlay');

    expect(presentButton).not.toBe(null);

    await presentButton.click();

    element = await page.find('lyne-overlay');

    expect(element).not.toBe(null);
  });

});

