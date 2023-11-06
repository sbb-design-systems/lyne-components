import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './tag';

describe('sbb-tag', () => {
  it('renders unchecked', async () => {
    const root = await fixture(
      html`<sbb-tag value="all" aria-label="Check to remove filters">All</sbb-tag>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-tag aria-label="Check to remove filters" aria-pressed="false" role="button" tabindex="0" value="all" dir="ltr">
          All
        </sbb-tag>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <span class="sbb-tag">
          <span class="sbb-tag__text sbb-tag--shift">
            <slot></slot>
          </span>
        </span>
      `,
    );
  });

  it('renders checked', async () => {
    const root = await fixture(html`<sbb-tag checked value="info">Info</sbb-tag>`);

    expect(root).dom.to.be.equal(
      `
      <sbb-tag aria-pressed="true" checked role="button" tabindex="0" value="info" dir="ltr">
        Info
      </sbb-tag>
    `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <span class="sbb-tag">
          <span class="sbb-tag__text sbb-tag--shift">
            <slot></slot>
          </span>
        </span>
      `,
    );
  });

  it('renders disabled with icon and amount', async () => {
    const root = await fixture(html`
      <sbb-tag disabled amount="123" icon-name="circle-information-small" value="information">
        Info
      </sbb-tag>
    `);

    expect(root).dom.to.be.equal(
      `
        <sbb-tag amount="123" aria-disabled="true" aria-pressed="false" disabled icon-name="circle-information-small" role="button" value="information" dir="ltr">
          Info
        </sbb-tag>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <span class="sbb-tag">
          <span class="sbb-tag__icon sbb-tag--shift">
            <slot name="icon">
              <sbb-icon
                aria-hidden="true"
                data-namespace="default"
                name="circle-information-small"
                role="img"
              >
              </sbb-icon>
            </slot>
          </span>
          <span class="sbb-tag__text sbb-tag--shift">
            <slot></slot>
          </span>
          <span class="sbb-tag__amount sbb-tag--shift">
              <slot name="amount">
                123
              </slot>
          </span>
        </span>
      `,
    );
  });

  it('renders slotted icon and amount', async () => {
    const root = await fixture(html`
      <sbb-tag value="foo">
        <sbb-icon slot="icon" name="cross-small"></sbb-icon>
        Info
        <span slot="amount">123</span>
      </sbb-tag>
    `);

    expect(root).dom.to.be.equal(
      `
        <sbb-tag value="foo" aria-pressed="false" role="button" tabindex="0" dir="ltr">
          <sbb-icon slot="icon" name="cross-small" aria-hidden="true" data-namespace="default" role="img">
          </sbb-icon>
          Info
          <span slot="amount">123</span>
        </sbb-tag>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <span class="sbb-tag" >
          <span class="sbb-tag__icon sbb-tag--shift">
            <slot name="icon"></slot>
          </span>
          <span class="sbb-tag__text sbb-tag--shift">
            <slot></slot>
          </span>
          <span class="sbb-tag__amount sbb-tag--shift">
            <slot name="amount"></slot>
          </span>
        </span>
      `,
    );
  });
});
