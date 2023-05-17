import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-skiplink-list', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-skiplink-list>
        <sbb-link href='1'>Link 1</sbb-link>
        <sbb-link href='2'>Link 2</sbb-link>
        <sbb-link href='3'>Link 3</sbb-link>
      </sbb-skiplink-list>
      <button id="button">Focus me</button>
    `);
    element = await page.find('sbb-skiplink-list');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('show only focused link', async () => {
    const listItemLinks = await page.findAll('sbb-skiplink-list >>> li');
    expect(listItemLinks).toHaveLength(3);

    const firstLink = await page.find('sbb-skiplink-list > sbb-link#sbb-skiplink-list-link-0');
    await firstLink.focus();
    expect(listItemLinks[0]).toEqualAttribute('data-focus-visible', '');
    expect(listItemLinks[1]).not.toHaveAttribute('data-focus-visible');
    expect(listItemLinks[2]).not.toHaveAttribute('data-focus-visible');

    const secondLink = await page.find('sbb-skiplink-list > sbb-link#sbb-skiplink-list-link-1');
    await secondLink.focus();
    expect(listItemLinks[0]).not.toHaveAttribute('data-focus-visible');
    expect(listItemLinks[1]).toEqualAttribute('data-focus-visible', '');
    expect(listItemLinks[2]).not.toHaveAttribute('data-focus-visible');

    const thirdLink = await page.find('sbb-skiplink-list > sbb-link#sbb-skiplink-list-link-2');
    await thirdLink.focus();
    expect(listItemLinks[0]).not.toHaveAttribute('data-focus-visible');
    expect(listItemLinks[1]).not.toHaveAttribute('data-focus-visible');
    expect(listItemLinks[2]).toEqualAttribute('data-focus-visible', '');

    const button = await page.find('#button');
    await button.focus();
    listItemLinks.forEach((item) => expect(item).not.toHaveAttribute('data-focus-visible'));
  });
});
