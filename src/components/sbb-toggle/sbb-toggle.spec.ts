import { SbbToggle } from './sbb-toggle';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-toggle', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbToggle],
      html: '<sbb-toggle />',
    });

    expect(root).toEqualHtml(`
        <sbb-toggle aria-label="sbb-toggle-1-name">
          <mock:shadow-root>
            <div class="sbb-toggle">
              <slot></slot>
            </div>  
          </mock:shadow-root>
        </sbb-toggle>
      `);
  });

  it('renders disabled toggle', async () => {
    const { root } = await newSpecPage({
      components: [SbbToggle],
      html: '<sbb-toggle disabled />',
    });

    expect(root).toEqualHtml(`
        <sbb-toggle disabled>
          <mock:shadow-root>
            <div class="sbb-toggle">
              <slot></slot>
            </div>  
          </mock:shadow-root>
        </sbb-toggle>
      `);
  });

  it('renders toggle with fixed width', async () => {
    const { root } = await newSpecPage({
      components: [SbbToggle],
      html: '<sbb-toggle even />',
    });

    expect(root).toEqualHtml(`
        <sbb-toggle even>
          <mock:shadow-root>
            <div class="sbb-toggle">
              <slot></slot>
            </div>  
          </mock:shadow-root>
        </sbb-toggle>
      `);
  });

  it('renders toggle with size s', async () => {
    const { root } = await newSpecPage({
      components: [SbbToggle],
      html: '<sbb-toggle size="s" />',
    });

    expect(root).toEqualHtml(`
        <sbb-toggle size="s">
          <mock:shadow-root>
            <div class="sbb-toggle">
              <slot></slot>
            </div>  
          </mock:shadow-root>
        </sbb-toggle>
      `);
  });
});
