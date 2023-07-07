import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-accordion', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-accordion level='4'>
        <sbb-expansion-panel>
          <sbb-expansion-panel-header id='header-1'>Header 1</sbb-expansion-panel-header>
          <sbb-expansion-panel-content id='content-1'>Content 1</sbb-expansion-panel-content>
        </sbb-expansion-panel>
        <sbb-expansion-panel>
          <sbb-expansion-panel-header id='header-2'>Header 2</sbb-expansion-panel-header>
          <sbb-expansion-panel-content id='content-2'>Content 2</sbb-expansion-panel-content>
        </sbb-expansion-panel>
        <sbb-expansion-panel>
          <sbb-expansion-panel-header id='header-3'>Header 3</sbb-expansion-panel-header>
          <sbb-expansion-panel-content id='content-3'>Content 3</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      </sbb-accordion>
    `);

    element = await page.find('sbb-accordion');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('level prop is inherited by panels', async () => {
    const panels = await page.findAll('sbb-expansion-panel');
    expect(panels.length).toEqual(3);
    expect(panels[0].shadowRoot.querySelector('.sbb-expansion-panel').firstChild.nodeName).toEqual(
      'H4'
    );
    expect(panels[1].shadowRoot.querySelector('.sbb-expansion-panel').firstChild.nodeName).toEqual(
      'H4'
    );
    expect(panels[2].shadowRoot.querySelector('.sbb-expansion-panel').firstChild.nodeName).toEqual(
      'H4'
    );
  });
});
