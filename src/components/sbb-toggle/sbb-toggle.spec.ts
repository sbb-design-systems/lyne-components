import { SbbToggle } from './sbb-toggle';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-toggle', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbToggle],
      html: '<sbb-toggle />',
    });

    expect(root).toEqualHtml(`
        <sbb-toggle>
          <mock:shadow-root>
            <div class="sbb-toggle" tabindex="0">
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
            <div class="sbb-toggle" tabindex="-1">
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
            <div class="sbb-toggle" tabindex="0">
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
            <div class="sbb-toggle" tabindex="0">
              <slot></slot>
            </div>  
          </mock:shadow-root>
        </sbb-toggle>
      `);
  });
});
