import { SbbTag } from './sbb-tag';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-tag', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTag],
      html: '<sbb-tag value="all">All</sbb-tag>',
    });

    expect(root).toEqualHtml(`
      <sbb-tag value="all">
        <mock:shadow-root>
          <label class="sbb-tag__wrapper">
            <input type="checkbox" value="all"/>
            <span class="sbb-tag">
              <span class="sbb-tag__text">
                <slot></slot>
              </span>
            </span>
          </label>
        </mock:shadow-root>
        All
      </sbb-tag>
    `);
  });

  it('renders checked', async () => {
    const { root } = await newSpecPage({
      components: [SbbTag],
      html: '<sbb-tag checked="true">Info</sbb-tag>',
    });

    expect(root).toEqualHtml(`
      <sbb-tag checked="">
        <mock:shadow-root>
          <label class="sbb-tag__wrapper">
            <input type="checkbox" aria-checked="" checked=""/>
            <span class="sbb-tag">
              <span class="sbb-tag__text">
                <slot></slot>
              </span>
            </span>
          </label>
        </mock:shadow-root>
        Info
      </sbb-tag>
    `);
  });

  it('renders disabled with icon and amount', async () => {
    const { root } = await newSpecPage({
      components: [SbbTag],
      html: `
        <sbb-tag disabled="true" amount="123" icon-name="circle-information-small">
          Info
        </sbb-tag>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-tag disabled="" amount="123" icon-name="circle-information-small">
        <mock:shadow-root>
          <label class="sbb-tag__wrapper">
            <input type="checkbox" aria-disabled="" disabled=""/>
            <span class="sbb-tag">
              <span class="sbb-tag__icon">
                <slot name="icon">
                  <sbb-icon name="circle-information-small" />
                </slot>
              </span>
              <span class="sbb-tag__text">
                <slot></slot>
              </span>
              <span class="sbb-tag__amount">
                <slot name="amount">
                  123
                </slot>
              </span>
            </span>
          </label>
        </mock:shadow-root>
        Info
      </sbb-tag>
    `);
  });

  it('renders slotted icon and amount', async () => {
    const { root } = await newSpecPage({
      components: [SbbTag],
      html: `
        <sbb-tag>
          <sbb-icon slot="icon" name="cross-small"></sbb-icon>
          Info
          <span slot="amount">123</span>
        </sbb-tag>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-tag>
        <mock:shadow-root>
          <label class="sbb-tag__wrapper">
            <input type="checkbox"/>
            <span class="sbb-tag">
              <span class="sbb-tag__icon">
                <slot name="icon"></slot>
              </span>
              <span class="sbb-tag__text">
                <slot></slot>
              </span>
              <span class="sbb-tag__amount">
                <slot name="amount"></slot>
              </span>
            </span>
          </label>
        </mock:shadow-root>
        <sbb-icon slot="icon" name="cross-small"></sbb-icon>
        Info
        <span slot="amount">123</span>
      </sbb-tag>
    `);
  });
});
