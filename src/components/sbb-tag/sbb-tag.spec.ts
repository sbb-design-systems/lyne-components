import { SbbTag } from './sbb-tag';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-tag', () => {
  it('renders unchecked', async () => {
    const { root } = await newSpecPage({
      components: [SbbTag],
      html: '<sbb-tag value="all" accessibility-label="Check to remove filters">All</sbb-tag>',
    });

    expect(root).toEqualHtml(`
      <sbb-tag value="all" role="presentation" accessibility-label="Check to remove filters">
        <mock:shadow-root>
          <button class="sbb-tag" aria-pressed="false" type="button" aria-label="Check to remove filters">
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
      <sbb-tag checked="" role="presentation" value="info">
        <mock:shadow-root>
          <button class="sbb-tag" aria-pressed="true" type="button">
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
      <sbb-tag disabled="" amount="123" icon-name="circle-information-small" role="presentation" value="information">
        <mock:shadow-root>
          <button class="sbb-tag" aria-pressed="false" aria-disabled="" disabled="" type="button">
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
      <sbb-tag value="foo" role="presentation">
        <mock:shadow-root>
          <button class="sbb-tag" aria-pressed="false" type="button">
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
