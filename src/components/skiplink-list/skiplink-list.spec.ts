import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import './skiplink-list';
import '../link';

describe('sbb-skiplink-list', () => {
  it('renders', async () => {
    const root = await fixture(html`
      <sbb-skiplink-list>
        <sbb-link href="#">Link 1</sbb-link>
        <sbb-link href="#">Link 2</sbb-link>
        <sbb-link href="#">Link 3</sbb-link>
      </sbb-skiplink-list>
    `);

    expect(root).dom.to.be.equal(
      `
      <sbb-skiplink-list data-slot-names="link-0 link-1 link-2">
        <sbb-link dir="ltr" href='#' id="sbb-skiplink-list-link-0" negative="" role="link" size="m" slot="link-0" tabindex="0" variant="block">Link 1</sbb-link>
        <sbb-link dir="ltr" href='#' id="sbb-skiplink-list-link-1" negative="" role="link" size="m" slot="link-1" tabindex="0" variant="block">Link 2</sbb-link>
        <sbb-link dir="ltr" href='#' id="sbb-skiplink-list-link-2" negative="" role="link" size="m" slot="link-2" tabindex="0" variant="block">Link 3</sbb-link>
      </sbb-skiplink-list>
    `,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders with title', async () => {
    const root = await fixture(html`
      <sbb-skiplink-list title-content="Skip to" title-level="3">
        <sbb-link href="#">Link 1</sbb-link>
        <sbb-link href="#">Link 2</sbb-link>
        <sbb-link href="#">Link 3</sbb-link>
      </sbb-skiplink-list>
    `);

    expect(root).dom.to.be.equal(
      `
      <sbb-skiplink-list title-content="Skip to" title-level="3" data-slot-names="link-0 link-1 link-2">
        <sbb-link dir="ltr" href='#' id="sbb-skiplink-list-link-0" negative="" role="link" size="m" slot="link-0" tabindex="0" variant="block">Link 1</sbb-link>
        <sbb-link dir="ltr" href='#' id="sbb-skiplink-list-link-1" negative="" role="link" size="m" slot="link-1" tabindex="0" variant="block">Link 2</sbb-link>
        <sbb-link dir="ltr" href='#' id="sbb-skiplink-list-link-2" negative="" role="link" size="m" slot="link-2" tabindex="0" variant="block">Link 3</sbb-link>
      </sbb-skiplink-list>
    `,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('should render named slots if data-ssr-child-count attribute is set', async () => {
    const root = await fixture(
      html`<sbb-skiplink-list data-ssr-child-count="3"></sbb-skiplink-list>`,
    );
    await expect(root).shadowDom.to.equalSnapshot();
  });
});
