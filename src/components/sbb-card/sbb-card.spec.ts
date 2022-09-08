import { SbbCard } from './sbb-card';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-card', () => {
  // TODO: Enable once onSlotchange is fixed https://github.com/ionic-team/stencil/issues/3536
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('renders sbb-card with sbb-card-badge', async () => {
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
          <span class="card__content">
            <slot></slot>
          </span>
          <slot name="badge"></slot>
        </mock:shadow-root>
        <sbb-card-badge appearance="primary" is-discount="" slot="badge"></sbb-card-badge>
      </sbb-card>
    `);
  });

  it('renders sbb-card without sbb-card-badge', async () => {
    const { root } = await newSpecPage({
      components: [SbbCard],
      html: `
        <sbb-card size="s">
          <span>
            <p>Test</p>
          </span>
          <sbb-card-badge slot="badge" appearance="primary" is-discount></sbb-card-badge>
        </sbb-card>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-card size="s">
        <mock:shadow-root>
          <span class="sbb-card__content">
            <slot></slot>
          </span>
        </mock:shadow-root>
        <span>
          <p>Test</p>
        </span>
        <sbb-card-badge appearance="primary" is-discount="" slot="badge"></sbb-card-badge>
      </sbb-card>
    `);
  });
});
