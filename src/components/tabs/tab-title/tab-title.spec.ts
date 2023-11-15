import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './tab-title';

describe('sbb-tab-title', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-tab-title></sbb-tab-title>`);

    expect(root).dom.to.be.equal(`<sbb-tab-title></sbb-tab-title>`);
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-tab-title__wrapper">
          <h1 class="sbb-tab-title">
            <span class="sbb-tab-title__text">
              <slot></slot>
            </span>
          </h1>
        </div>
      `,
    );
  });

  it('renders correctly an H2 heading tag', async () => {
    const root = await fixture(
      html`<sbb-tab-title level="2" icon-name="pie-small"></sbb-tab-title>`,
    );

    expect(root).dom.to.be.equal(`<sbb-tab-title level="2" icon-name="pie-small"></sbb-tab-title>`);
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-tab-title__wrapper">
          <h2 class="sbb-tab-title">
            <span class="sbb-tab-title__icon">
              <slot name="icon">
                <sbb-icon
                  aria-hidden="true"
                  data-namespace="default"
                  name="pie-small"
                  role="img"
                ></sbb-icon>
              </slot>
            </span>
            <span class="sbb-tab-title__text">
              <slot></slot>
            </span>
          </h2>
          </div>
      `,
    );
  });

  it('renders an H1 heading tag if the provided level is greater than 6', async () => {
    const root = await fixture(html`<sbb-tab-title level="7" amount="78"></sbb-tab-title>`);

    expect(root).dom.to.be.equal(`<sbb-tab-title level="7" amount="78"></sbb-tab-title>`);
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-tab-title__wrapper">
          <h1 class="sbb-tab-title">
            <span class="sbb-tab-title__text">
              <slot></slot>
            </span>
            <span class="sbb-tab-title__amount">
              <slot name="amount">78</slot>
            </span>
          </h1>
        </div>
      `,
    );
  });
});
