import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-navigation-list', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`
    <sbb-navigation-list>
      <sbb-navigation-action>Label</sbb-navigation-action>
    </sbb-navigation-list>
    `);

    element = await page.find('sbb-navigation-list');
    expect(element).toHaveClass('hydrated');

    expect(
      await page.evaluate(
        () => document.querySelector('sbb-navigation-list').shadowRoot.querySelector('ul').className
      )
    ).toBe('sbb-navigation-list__content');

    expect(
      await page.evaluate(
        () => document.querySelector('sbb-navigation-list').shadowRoot.querySelector('li').className
      )
    ).toBe('sbb-navigation-list__action');

    expect(
      await page.evaluate(
        () =>
          document.querySelector('sbb-navigation-list').querySelector('sbb-navigation-action').size
      )
    ).toBe('m');
  });
});
