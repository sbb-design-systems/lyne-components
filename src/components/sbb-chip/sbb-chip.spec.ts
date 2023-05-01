import { SbbChip } from './sbb-chip';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-chip', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbChip],
      html: '<sbb-chip>Label</sbb-chip>',
    });

    expect(root).toEqualHtml(`
        <sbb-chip color="milk" size="xxs">
          <mock:shadow-root>
            <span class="sbb-chip">
              <span class="sbb-chip__text-wrapper">
                <slot></slot>
              </span>
            </span>
          </mock:shadow-root>
          Label
        </sbb-chip>
      `);
  });
});
