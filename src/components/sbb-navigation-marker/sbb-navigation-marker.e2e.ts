import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-navigation-marker', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(
      `<sbb-navigation-marker size="l">
        <sbb-navigation-action id="nav-1" size="s">Tickets & Offers</sbb-navigation-action>
        <sbb-navigation-action id="nav-2">Vacations & Recreation</sbb-navigation-action>
        <sbb-navigation-action id="nav-3">Travel information</sbb-navigation-action>
        <sbb-navigation-action id="nav-4">Help & Contact</sbb-navigation-action>
      </sbb-navigation-marker>`,
    );

    element = await page.find('sbb-navigation-marker');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('selects action on click', async () => {
    const firstAction = await page.find('sbb-navigation-marker > sbb-navigation-action#nav-1');
    const secondAction = await page.find('sbb-navigation-marker > sbb-navigation-action#nav-2');

    await secondAction.click();

    expect(secondAction).toHaveAttribute('active');
    expect(firstAction).not.toHaveAttribute('active');

    await firstAction.click();

    expect(firstAction).toHaveAttribute('active');
    expect(secondAction).not.toHaveAttribute('active');
  });

  it('automatic list generation', async () => {
    const list = await page.find('sbb-navigation-marker >>> ul');
    expect(list.className).toBe('sbb-navigation-marker');

    const listItem = await list.find('li');

    expect(listItem).toHaveClass('sbb-navigation-marker__action');
  });

  it('force size on children elements', async () => {
    const firstAction = await page.find('sbb-navigation-marker > sbb-navigation-action#nav-1');
    expect(firstAction).toEqualAttribute('size', 'l');
  });
});
