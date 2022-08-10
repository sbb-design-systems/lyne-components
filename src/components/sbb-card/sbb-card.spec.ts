import { SbbCard } from './sbb-card';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-card', () => {
  it('renders sbb-card', async () => {
    const { root } = await newSpecPage({
      components: [SbbCard],
      html: '<sbb-card></sbb-card>',
    });

    expect(root).toEqualHtml(`
        <sbb-card class="card__badge">
          <mock:shadow-root>
            <span>
              <slot></slot>
            </span>
            <span>
              <slot name="badge"></slot>
            </span>
          </mock:shadow-root>
        </sbb-cardcard__badge>
      `);
  });

  it('renders sbb-card with sbb-card-badge', async () => {
    const { root } = await newSpecPage({
      components: [SbbCard],
      html: `
        <sbb-card size='xl' >
            <sbb-card-badge slot="badge" appearance="primary" is-discount></sbb-card-badge>
        </sbb-card>`,
    });

    expect(root).toEqualHtml(`
        <sbb-card class="card__badge" size='xl' >
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

  it('renders sbb-card without sbb-card-badge', async () => {
    const { root } = await newSpecPage({
      components: [SbbCard],
      html: `<sbb-card size="s">
        <sbb-card-badge slot="badge" appearance="primary" is-discount></sbb-card-badge>
      </sbb-card>`,
    });

    expect(root).toEqualHtml(`
        <sbb-card size="s">
          <mock:shadow-root>
            <span>
              <slot></slot>
            </span>
          </mock:shadow-root>
          <sbb-card-badge appearance="primary" is-discount="" slot="badge"></sbb-card-badge>
        </sbb-card>
      `);
  });
});
