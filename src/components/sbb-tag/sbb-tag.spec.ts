import { SbbTag } from './sbb-tag';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-tag', () => {
  it('renders unchecked', async () => {
    const { root } = await newSpecPage({
      components: [SbbTag],
      html: '<sbb-tag value="all" aria-label="Check to remove filters">All</sbb-tag>',
    });

    expect(root).toEqualHtml(`
      <sbb-tag aria-label="Check to remove filters" aria-pressed="false" role="button" tabindex="0" value="all">
        <mock:shadow-root>
          <button class="sbb-tag" dir="ltr" role="presentation" tabindex="-1" type="button" value="all">
            <span class="sbb-tag__text sbb-tag--shift">
              <slot></slot>
            </span>
          </button>
        </mock:shadow-root>
        All
      </sbb-tag>
    `);
  });

  it('renders checked', async () => {
    const { root } = await newSpecPage({
      components: [SbbTag],
      html: '<sbb-tag checked="true" value="info">Info</sbb-tag>',
    });

    expect(root).toEqualHtml(`
      <sbb-tag aria-pressed="true" checked role="button" tabindex="0" value="info">
        <mock:shadow-root>
          <button class="sbb-tag" dir="ltr" role="presentation" tabindex="-1" type="button" value="info">
            <span class="sbb-tag__text sbb-tag--shift">
              <slot></slot>
            </span>
          </button>
        </mock:shadow-root>
        Info
      </sbb-tag>
    `);
  });

  it('renders disabled with icon and amount', async () => {
    const { root } = await newSpecPage({
      components: [SbbTag],
      html: `
        <sbb-tag disabled="true" amount="123" icon-name="circle-information-small" value="information">
          Info
        </sbb-tag>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-tag amount="123" aria-disabled="true" aria-pressed="false" disabled icon-name="circle-information-small" role="button" value="information">
        <mock:shadow-root>
          <button class="sbb-tag" dir="ltr" disabled="true" role="presentation" tabindex="-1" type="button" value="information">
            <span class="sbb-tag__icon sbb-tag--shift">
              <slot name="icon">
                <sbb-icon name="circle-information-small" />
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
          </button>
        </mock:shadow-root>
        Info
      </sbb-tag>
    `);
  });

  it('renders slotted icon and amount', async () => {
    const { root } = await newSpecPage({
      components: [SbbTag],
      html: `
        <sbb-tag value="foo">
          <sbb-icon slot="icon" name="cross-small"></sbb-icon>
          Info
          <span slot="amount">123</span>
        </sbb-tag>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-tag value="foo" aria-pressed="false" role="button" tabindex="0">
        <mock:shadow-root>
          <button class="sbb-tag" dir="ltr" role="presentation" tabindex="-1" type="button" value="foo">
            <span class="sbb-tag__icon sbb-tag--shift">
              <slot name="icon"></slot>
            </span>
            <span class="sbb-tag__text sbb-tag--shift">
              <slot></slot>
            </span>
            <span class="sbb-tag__amount sbb-tag--shift">
              <slot name="amount"></slot>
            </span>
          </button>
        </mock:shadow-root>
        <sbb-icon slot="icon" name="cross-small"></sbb-icon>
        Info
        <span slot="amount">123</span>
      </sbb-tag>
    `);
  });
});
