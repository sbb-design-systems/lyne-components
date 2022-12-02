import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-navigation', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-navigation id="navigation" disable-animation>
        <sbb-navigation-marker>
          <sbb-navigation-action>Tickets & Offers</sbb-navigation-action>
          <sbb-navigation-action>Vacations & Recreation</sbb-navigation-action>
          <sbb-navigation-action>Travel information</sbb-navigation-action>
          <sbb-navigation-action>Help & Contact</sbb-navigation-action>
        </sbb-navigation-marker>
      </sbb-navigation>
    `);
    element = await page.find('sbb-navigation');
  });

  it('renders', () => {
    expect(element).toHaveClass('hydrated');
  });

  it('opens the navigation', async () => {
    const dialog = await page.find('sbb-navigation >>> dialog');

    await element.callMethod('open');
    await page.waitForChanges();

    expect(element).toHaveClass('sbb-navigation--opened');
    expect(dialog).toHaveAttribute('open');
  });

  it('closes the navigation', async () => {
    const dialog = await page.find('sbb-navigation >>> dialog');

    await element.callMethod('open');
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    await element.callMethod('close');
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
  });

  it('closes the navigation on close button click', async () => {
    const dialog = await page.find('sbb-navigation >>> dialog');
    const closeButton = await page.find('sbb-navigation >>> .sbb-navigation__close');

    await element.callMethod('open');
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    await closeButton.click();
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
  });

  it('closes the navigation on Esc key press', async () => {
    const dialog = await page.find('sbb-navigation >>> dialog');

    await element.callMethod('open');
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    await page.keyboard.down('Escape');
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
  });
});
