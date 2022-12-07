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
          <label class="sbb-tag" htmlFor="sbb-tag-1">
            <input type="checkbox" value="all" id="sbb-tag-1"/>
            <span class="sbb-tag__wrapper">
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

  it('renders required checked with icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbTag],
      html: '<sbb-tag checked="true" required="true" icon-name="circle-information-small">Info</sbb-tag>',
    });

    expect(root).toEqualHtml(`
      <sbb-tag checked="" required="true" icon-name="circle-information-small">
        <mock:shadow-root>
          <label class="sbb-tag" htmlFor="sbb-tag-2">
            <input type="checkbox" id="sbb-tag-2" aria-checked="" checked="" required=""/>
            <span class="sbb-tag__wrapper">
              <span class="sbb-tag__icon">
                <slot name="icon">
                  <sbb-icon name="circle-information-small" /></slot>
              </span>
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
        <sbb-tag disabled="true" icon-name="circle-information-small">
          Info
          <span slot="amount">123</span>
        </sbb-tag>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-tag disabled="" icon-name="circle-information-small">
        <mock:shadow-root>
          <label class="sbb-tag" htmlFor="sbb-tag-3">
            <input type="checkbox" id="sbb-tag-3" aria-disabled="" disabled=""/>
            <span class="sbb-tag__wrapper">
              <span class="sbb-tag__icon">
                <slot name="icon">
                  <sbb-icon name="circle-information-small" /></slot>
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
        Info
        <span slot="amount">123</span>
      </sbb-tag>
    `);
  });
});
