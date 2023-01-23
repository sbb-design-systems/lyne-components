import { SbbTooltipTrigger } from './sbb-tooltip-trigger';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-tooltip-trigger', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTooltipTrigger],
      html: '<sbb-tooltip-trigger />',
    });

    expect(root).toEqualHtml(`
        <sbb-tooltip-trigger>
          <mock:shadow-root>
            <button class="sbb-tooltip-trigger">
              <slot>
                <sbb-icon name="circle-information-small"></sbb-icon>
              </slot>
            </button>
          </mock:shadow-root>
        </sbb-tooltip-trigger>
      `);
  });

  it('renders with custom content', async () => {
    const { root } = await newSpecPage({
      components: [SbbTooltipTrigger],
      html: '<sbb-tooltip-trigger>Custom Content</sbb-tooltip-trigger>',
    });

    expect(root).toEqualHtml(`
        <sbb-tooltip-trigger>
          <mock:shadow-root>
            <button class="sbb-tooltip-trigger">
              <slot>
                <sbb-icon name="circle-information-small"></sbb-icon>
              </slot>
            </button>
          </mock:shadow-root>
          Custom Content
        </sbb-tooltip-trigger>
      `);
  });
});
