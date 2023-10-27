import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-skiplink-list';
import '../sbb-link';

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
      <sbb-skiplink-list>
        
        <sbb-link href='#' id="sbb-skiplink-list-link-0" slot='link-0'>Link 1</sbb-link>
        <sbb-link href='#' id="sbb-skiplink-list-link-1" slot='link-1'>Link 2</sbb-link>
        <sbb-link href='#' id="sbb-skiplink-list-link-2" slot='link-2'>Link 3</sbb-link>
      </sbb-skiplink-list>
    `,
    );
    expect(root).shadowDom.to.be.equal(
      `
          <div class="sbb-skiplink-list__wrapper">
            <ul class="sbb-skiplink-list">
              <li>
                <slot name="link-0"></slot>
              </li>
              <li>
                <slot name="link-1"></slot>
              </li>
              <li>
                <slot name="link-2"></slot>
              </li>
            </ul>
            <span hidden>
              <slot />
            </span>
          </div>
        `,
    );
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
      <sbb-skiplink-list title-content="Skip to" title-level="3">
        
        <sbb-link href='#' id="sbb-skiplink-list-link-0" slot='link-0'>Link 1</sbb-link>
        <sbb-link href='#' id="sbb-skiplink-list-link-1" slot='link-1'>Link 2</sbb-link>
        <sbb-link href='#' id="sbb-skiplink-list-link-2" slot='link-2'>Link 3</sbb-link>
      </sbb-skiplink-list>
    `,
    );
    expect(root).shadowDom.to.be.equal(
      `
          <div class="sbb-skiplink-list__wrapper">
            <sbb-title id="sbb-skiplink-list-title-id" level="3" negative="" visual-level="5" class="sbb-link-list-title" visually-hidden>
              <slot name="title">
                Skip to
              </slot>
            </sbb-title>
            <ul class="sbb-skiplink-list" aria-labelledby="sbb-skiplink-list-title-id">
              <li>
                <slot name="link-0"></slot>
              </li>
              <li>
                <slot name="link-1"></slot>
              </li>
              <li>
                <slot name="link-2"></slot>
              </li>
            </ul>
            <span hidden>
              <slot />
            </span>
          </div>
        `,
    );
  });
});
