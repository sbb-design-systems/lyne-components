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
            <div class="sbb-tab-title__wrapper">
              <h1 class="sbb-tab-title">
                <span class="sbb-tab-title__text">
                  <slot></slot>
                </span>
              </h1>
            </div>
          </mock:shadow-root>
        </sbb-tab-title>
      `);
  });

  it('renders correctly an H2 heading tag', async () => {
    const { root } = await newSpecPage({
      components: [SbbTabTitle],
      html: '<sbb-tab-title level="2" icon-name="pie-small"></sbb-tab-title>',
    });

    expect(root).toEqualHtml(`
      <sbb-tab-title level="2" icon-name="pie-small">
        <mock:shadow-root>
          <div class="sbb-tab-title__wrapper">
            <h2 class="sbb-tab-title">
              <span class="sbb-tab-title__icon">
                <slot name="icon"><sbb-icon name="pie-small"></sbb-icon></slot>
              </span>
              <span class="sbb-tab-title__text">
                <slot></slot>
              </span>
            </h2>
            </div>
        </mock:shadow-root>
      </sbb-tab-title>
      `);
  });

  it('renders an H1 heading tag if the provided level is greater than 6', async () => {
    const { root } = await newSpecPage({
      components: [SbbTabTitle],
      html: '<sbb-tab-title level="7" amount="78"></sbb-tab-title>',
    });

    expect(root).toEqualHtml(`
        <sbb-tab-title level="7" amount="78">
          <mock:shadow-root>
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
          </mock:shadow-root>
        </sbb-tab-title>
      `);
  });
});
