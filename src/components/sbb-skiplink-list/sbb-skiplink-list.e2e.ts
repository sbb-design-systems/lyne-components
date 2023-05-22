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
});
