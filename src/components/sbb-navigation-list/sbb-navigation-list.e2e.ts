import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-navigation-list', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-navigation-list>
        <sbb-navigation-action>Label</sbb-navigation-action>
      </sbb-navigation-list>
    `);

    element = await page.find('sbb-navigation-list');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('automatic list generation', async () => {
    const list = await page.find('sbb-navigation-list >>> ul');
    expect(list.className).toBe('sbb-navigation-list__content');

    const listItem = await list.find('li');

    expect(listItem).toHaveClass('sbb-navigation-list__action');
  });

  it('force size on children elements', async () => {
    const action = await page.find('sbb-navigation-list > sbb-navigation-action');
    expect(action).toEqualAttribute('size', 'm');
  });
});
