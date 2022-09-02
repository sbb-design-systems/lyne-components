import { newE2EPage } from '@stencil/core/testing';

describe('sbb-menu', () => {
  let element, page, trigger;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-button id="menu-trigger" label="Menu trigger"></sbb-button>
      <sbb-menu trigger="menu-trigger">
        <sbb-link href="https://www.sbb.ch/en" text-size="xs" variant="block">Profile</sbb-link>
        <sbb-menu-action icon="tick-small">View</sbb-menu-action>
        <sbb-menu-action icon="pen-small" amount="1" disabled>Edit</sbb-menu-action>
        <sbb-menu-action icon="swisspass-small" amount="2">Details</sbb-menu-action>
        <sbb-divider />
        <sbb-menu-action icon="cross-small">Cancel</sbb-menu-action>
      </sbb-menu>
    `);
    trigger = await page.find('sbb-button');
    element = await page.find('sbb-menu');
  });

  it('renders', () => {
    expect(element).toHaveClass('hydrated');
  });

  it('renders an icon', async () => {
    //
  });

  it('renders an amount', async () => {
    //
  });

  it('renders no amount if disabled', async () => {
    //
  });

  it('opens on trigger click', async () => {
    await trigger.click();
    const dialog = await page.find('sbb-menu >>> dialog');

    expect(dialog).toHaveAttribute('open');
  });

  it('closes on menu action click', async () => {
    await trigger.click();
    const menuAction = await page.find('sbb-menu > sbb-menu-action');
    await menuAction.click();
    const dialog = await page.find('sbb-menu >>> dialog');

    expect(dialog).toHaveClass('sbb-menu--dismissing');
  });

  it('closes on interactive element click', async () => {
    await trigger.click();
    const menuLink = await page.find('sbb-menu > sbb-link');
    await menuLink.click();
    const dialog = await page.find('sbb-menu >>> dialog');

    expect(dialog).toHaveClass('sbb-menu--dismissing');
  });

  // it('closes on "Esc" key pressed', async () => {
  //   await trigger.click();
  //   await page.keyboard.down('Escape');
  //   const dialog = await page.find('sbb-menu >>> dialog');

  //   expect(dialog).toHaveClass('sbb-menu--dismissing');
  // });
});
