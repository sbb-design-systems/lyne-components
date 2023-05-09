import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-skiplink-list', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-skiplink-list>
        <sbb-link href='1' id="link-1">Link 1</sbb-link>
        <sbb-link href='2'>Link 2</sbb-link>
      </sbb-skiplink-list>
      <button id="button">Focus me</button>
    `);
    element = await page.find('sbb-skiplink-list');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('show/hide when focused/blurred', async () => {
    const link = await page.find('sbb-skiplink-list > sbb-link#link-1');
    await link.focus();
    expect(element).toEqualAttribute('data-focus-visible', '');

    const button = await page.find('#button');
    await button.focus();
    expect(button).not.toHaveAttribute('data-focus-visible');
  });
});
