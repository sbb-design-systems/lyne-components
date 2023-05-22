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

  it('should be visible on focus', async () => {
    const listItemLinks = await page.findAll('sbb-skiplink-list >>> li');
    expect(listItemLinks).toHaveLength(3);

    const getProperty = async (el: E2EElement, prop: string): Promise<string> => {
      return (await el.getComputedStyle()).getPropertyValue(prop);
    };

    expect(await getProperty(listItemLinks[0], 'height')).toEqual('0px');
    expect(await getProperty(listItemLinks[0], 'overflow')).toEqual('hidden');

    const firstLink = await page.find('sbb-skiplink-list > sbb-link#sbb-skiplink-list-link-0');
    await firstLink.focus();
    expect(await getProperty(listItemLinks[0], 'height')).not.toEqual('0px');
    expect(await getProperty(listItemLinks[0], 'overflow')).toEqual('visible');

    const secondLink = await page.find('sbb-skiplink-list > sbb-link#sbb-skiplink-list-link-1');
    await secondLink.focus();
    expect(await getProperty(listItemLinks[0], 'height')).toEqual('0px');
    expect(await getProperty(listItemLinks[0], 'overflow')).toEqual('hidden');
    expect(await getProperty(listItemLinks[1], 'height')).not.toEqual('0px');
    expect(await getProperty(listItemLinks[1], 'overflow')).toEqual('visible');
  });
});
