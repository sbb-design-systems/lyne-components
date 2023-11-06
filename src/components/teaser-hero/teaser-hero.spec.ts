import sampleImages from '../core/images';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './teaser-hero';
import '../link';
import '../image';

describe('sbb-teaser-hero', () => {
  it('should render all properties', async () => {
    const root = await fixture(
      html`<sbb-teaser-hero
        aria-label="label"
        href="https://www.sbb.ch"
        rel="external"
        target="_blank"
        link-content="Find out more"
        image-src="${sampleImages[1]}"
        image-alt="SBB CFF FFS Employee"
        >Break out and explore castles and palaces.</sbb-teaser-hero
      >`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-teaser-hero
          aria-label="label"
          href="https://www.sbb.ch"
          rel="external"
          target="_blank"
          link-content="Find out more"
          image-src="${sampleImages[1]}"
          image-alt="SBB CFF FFS Employee"
          role="link"
          tabindex="0"
          dir="ltr"
        >
          Break out and explore castles and palaces.
        </sbb-teaser-hero>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <a
          class="sbb-teaser-hero"
          href="https://www.sbb.ch"
          rel="external"
          target="_blank"
          role="presentation"
          tabindex="-1"
        >
          <span class="sbb-teaser-hero__panel">
            <p class="sbb-teaser-hero__panel-text">
              <slot></slot>
            </p>
            <sbb-link
              dir="ltr"
              is-static
              variant="block"
              class="sbb-teaser-hero__panel-link"
              icon-name="chevron-small-right-small"
              icon-placement="end"
              size="m"
              negative
            >
              <slot name="link-content">Find out more</slot>
            </sbb-link>
          </span>
          <slot name="image">
            <sbb-image image-src="${sampleImages[1]}" alt="SBB CFF FFS Employee"></sbb-image>
          </slot>
          <span class="sbb-teaser-hero__opens-in-new-window">
            . Link target opens in new window.
          </span>
        </a>
      `,
    );
  });

  it('should render without link', async () => {
    const root = await fixture(
      html`<sbb-teaser-hero
        aria-label="label"
        link-content="Find out more"
        image-src="${sampleImages[1]}"
        image-alt="SBB CFF FFS Employee"
        >Break out and explore castles and palaces.</sbb-teaser-hero
      >`,
    );

    expect(root).dom.to.be.equal(
      `
      <sbb-teaser-hero aria-label="label" link-content="Find out more" image-src="${sampleImages[1]}" image-alt="SBB CFF FFS Employee" dir="ltr">
          Break out and explore castles and palaces.
        </sbb-teaser-hero>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <span class="sbb-teaser-hero">
          <span class="sbb-teaser-hero__panel">
            <p class="sbb-teaser-hero__panel-text">
              <slot></slot>
            </p>
          </span>
          <slot name="image">
            <sbb-image image-src="${sampleImages[1]}" alt="SBB CFF FFS Employee"></sbb-image>
          </slot>
        </span>
      `,
    );
  });

  it('should render with slots', async () => {
    const root = await fixture(
      html`<sbb-teaser-hero aria-label="label" href="https://www.sbb.ch"
        >Break out and explore castles and palaces.<span slot="link-content">Find out more</span
        ><sbb-image
          slot="image"
          image-src="${sampleImages[1]}"
          alt="SBB CFF FFS Employee"
        ></sbb-image
      ></sbb-teaser-hero>`,
    );

    expect(root).dom.to.be.equal(
      `
      <sbb-teaser-hero aria-label="label" href="https://www.sbb.ch" role="link" tabindex="0" dir="ltr">
          Break out and explore castles and palaces.
          <span slot="link-content">Find out more</span>
          <sbb-image slot="image" image-src="${sampleImages[1]}" alt="SBB CFF FFS Employee"></sbb-image>
        </sbb-teaser-hero>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <a
          class="sbb-teaser-hero"
          href="https://www.sbb.ch"
          role="presentation"
          tabindex="-1"
        >
          <span class="sbb-teaser-hero__panel">
            <p class="sbb-teaser-hero__panel-text">
              <slot></slot>
            </p>
            <sbb-link
              dir="ltr"
              is-static
              variant="block"
              class="sbb-teaser-hero__panel-link"
              icon-name="chevron-small-right-small"
              icon-placement="end"
              size="m"
              negative
            >
              <slot name="link-content"></slot>
            </sbb-link>
          </span>
          <slot name="image"></slot>
        </a>
      `,
    );
  });
});
