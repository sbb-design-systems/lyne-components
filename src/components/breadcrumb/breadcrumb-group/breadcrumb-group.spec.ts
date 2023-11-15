import './breadcrumb-group';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

describe('sbb-breadcrumb-group', () => {
  it('renders', async () => {
    const root = await fixture(html`
      <sbb-breadcrumb-group>
        <sbb-breadcrumb href="/" icon-name="pie-small"></sbb-breadcrumb>
        <sbb-breadcrumb href="/one">One</sbb-breadcrumb>
        <sbb-breadcrumb href="/one">Two</sbb-breadcrumb>
      </sbb-breadcrumb-group>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-breadcrumb-group role='navigation' data-loaded>
        <sbb-breadcrumb id="sbb-breadcrumb-0" href="/" icon-name="pie-small" slot="breadcrumb-0"></sbb-breadcrumb>
        <sbb-breadcrumb id="sbb-breadcrumb-1" href="/one" slot="breadcrumb-1">
          One
        </sbb-breadcrumb>
        <sbb-breadcrumb id="sbb-breadcrumb-2" href="/one" slot="breadcrumb-2" aria-current="page">
          Two
        </sbb-breadcrumb>
      </sbb-breadcrumb-group>
    `);

    expect(root).shadowDom.to.be.equal(`
      <ol class="sbb-breadcrumb-group">
        <li class="sbb-breadcrumb-group__item">
          <slot name="breadcrumb-0"></slot>
          <sbb-icon name="chevron-small-right-small" class="sbb-breadcrumb-group__divider-icon"></sbb-icon>
        </li>
        <li class="sbb-breadcrumb-group__item">
          <slot name="breadcrumb-1"></slot>
          <sbb-icon name="chevron-small-right-small" class="sbb-breadcrumb-group__divider-icon"></sbb-icon>
        </li>
        <li class="sbb-breadcrumb-group__item">
          <slot name="breadcrumb-2"></slot>
        </li>
      </ol>
      <span hidden="">
        <slot></slot>
      </span>
    `);
  });
});
