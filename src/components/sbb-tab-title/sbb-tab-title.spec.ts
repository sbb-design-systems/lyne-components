import { SbbTabTitle } from './sbb-tab-title';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-tab-title', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTabTitle],
      html: '<sbb-tab-title />',
    });

    expect(root).toEqualHtml(`
        <sbb-tab-title>
          <mock:shadow-root>
          <h1 class="sbb-tab-title">
            <slot name="icon"></slot>
            <span class="sbb-tab-title__text">
              <slot></slot>
            </span>
            <slot name="amount"></slot>
          </h1>
          </mock:shadow-root>
        </sbb-tab-title>
      `);
  });

  it('renders correctly an H2 heading tag', async () => {
    const { root } = await newSpecPage({
      components: [SbbTabTitle],
      html: '<sbb-tab-title level="2"></sbb-tab-title>',
    });

    expect(root).toEqualHtml(`
        <sbb-tab-title level="2">
          <mock:shadow-root>
          <h2 class="sbb-tab-title">
            <slot name="icon"></slot>
            <span class="sbb-tab-title__text">
              <slot></slot>
            </span>
            <slot name="amount"></slot>
          </h2>
          </mock:shadow-root>
        </sbb-tab-title>
      `);
  });

  it('renders an H1 heading tag if the provided level is greater than 6', async () => {
    const { root } = await newSpecPage({
      components: [SbbTabTitle],
      html: '<sbb-tab-title level="7"></sbb-tab-title>',
    });

    expect(root).toEqualHtml(`
        <sbb-tab-title level="7">
          <mock:shadow-root>
          <h1 class="sbb-tab-title">
            <slot name="icon"></slot>
            <span class="sbb-tab-title__text">
              <slot></slot>
            </span>
            <slot name="amount"></slot>
          </h1>
          </mock:shadow-root>
        </sbb-tab-title>
      `);
  });
});
