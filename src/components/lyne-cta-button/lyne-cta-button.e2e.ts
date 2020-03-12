import { newE2EPage } from '@stencil/core/testing';

describe('lyne-cta-button', () => {
  let page,
    element;

  beforeEach(async () => {
		page = await newE2EPage();
		await page.setContent('<lyne-cta-button></lyne-cta-button>');
		element = await page.find('lyne-cta-button');
	});

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lyne-cta-button></lyne-cta-button>');

    const element = await page.find('lyne-cta-button');
    expect(element).toHaveClass('hydrated');
  });

  it('renders button text', async () => {
    const buttonText = 'Custom Button Text';
    element.setProperty('label', buttonText);
    await page.waitForChanges();
    const button = await page.find('lyne-cta-button >>> button');
    expect(button.textContent).toEqual(buttonText);
  });

  it('dispatches event on click', async () => {
    const button = await page.find('lyne-cta-button >>> button');
    const changeSpy = await page.spyOnEvent('onClick');
    await button.click();
    expect(changeSpy).toHaveReceivedEventTimes(1);
  });
});
