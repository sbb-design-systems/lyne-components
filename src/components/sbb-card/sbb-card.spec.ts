import { SbbCard } from './sbb-card';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-card', () => {
  it('renders sbb-card', async () => {
    const { root } = await newSpecPage({
      components: [SbbCard],
      html: '<sbb-card></sbb-card>',
    });

    expect(root).toEqualHtml(`
        <sbb-card>
          <mock:shadow-root>
          <span>
                 <slot></slot>
               </span>
               <span>
                 <slot name="badge"></slot>
               </span>
          </mock:shadow-root>
        </sbb-card>
      `);
  });

  it('renders sbb-card with sbb-card-badge', async () => {
    const { root } = await newSpecPage({
      components: [SbbCard],
      html: `<sbb-card>
        <sbb-card-badge slot="badge" appearance="primary" is-discount></sbb-card-badge>
      </sbb-card>`,
    });

    expect(root).toEqualHtml(`
        <sbb-card>
          <mock:shadow-root>
          <span>
                 <slot></slot>
               </span>
               <span>
                 <slot name="badge"></slot>
               </span>
          </mock:shadow-root>
          <sbb-card-badge appearance="primary" is-discount="" slot="badge"></sbb-card-badge>
        </sbb-card>
      `);
  });
});
