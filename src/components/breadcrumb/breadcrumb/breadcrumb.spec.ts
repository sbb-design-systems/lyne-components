import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './breadcrumb';

describe('sbb-breadcrumb', () => {
  it('renders with text', async () => {
    const root = await fixture(html`
      <sbb-breadcrumb href="/test" target="_blank" download="true" rel="subsection"
        >Breadcrumb</sbb-breadcrumb
      >
    `);

    expect(root).dom.to.be.equal(`
      <sbb-breadcrumb dir="ltr" role="link" tabindex="0" href="/test" target="_blank" download="true" rel="subsection">
        Breadcrumb
      </sbb-breadcrumb>
    `);

    expect(root).shadowDom.to.be.equal(`
      <a role="presentation" tabindex="-1" class="sbb-breadcrumb" href="/test" target="_blank" download rel="subsection">
        <span class="sbb-breadcrumb__label">
          <slot></slot>
          <span class="sbb-breadcrumb__label--opens-in-new-window">
            . Link target opens in new window.
          </span>
        </span>
      </a>
    `);
  });

  it('renders with icon', async () => {
    const root = await fixture(html`
      <sbb-breadcrumb href="/" icon-name="house-small"></sbb-breadcrumb>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-breadcrumb dir="ltr" role="link" tabindex="0" href="/" icon-name="house-small"></sbb-breadcrumb>
    `);

    expect(root).shadowDom.to.be.equal(`
      <a role="presentation" tabindex="-1" class="sbb-breadcrumb" href="/">
        <span class="sbb-breadcrumb__icon">
          <slot name="icon">
            <sbb-icon name="house-small" aria-hidden="true" data-namespace="default" role="img"></sbb-icon>
          </slot>
        </span>
        <span hidden>
          <slot></slot>
        </span>
      </a>
    `);
  });

  it('renders with icon and text', async () => {
    const root = await fixture(html`
      <sbb-breadcrumb href="/" icon-name="house-small">Home</sbb-breadcrumb>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-breadcrumb dir="ltr" role="link" tabindex="0" href="/" icon-name="house-small">
        Home
      </sbb-breadcrumb>
    `);

    expect(root).shadowDom.to.be.equal(`
      <a role="presentation" tabindex="-1" class="sbb-breadcrumb" href="/">
        <span class="sbb-breadcrumb__icon">
          <slot name="icon">
            <sbb-icon name="house-small" aria-hidden="true" data-namespace="default" role="img"></sbb-icon>
          </slot>
        </span>
        <span class="sbb-breadcrumb__label">
          <slot></slot>
        </span>
      </a>
    `);
  });

  it('renders as span if no href is provided', async () => {
    const root = await fixture(html`<sbb-breadcrumb>Breadcrumb</sbb-breadcrumb>`);

    expect(root).dom.to.be.equal(`
      <sbb-breadcrumb dir="ltr">
        Breadcrumb
      </sbb-breadcrumb>
    `);

    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-breadcrumb">
        <span class="sbb-breadcrumb__label">
          <slot></slot>
        </span>
      </span>
    `);
  });
});
