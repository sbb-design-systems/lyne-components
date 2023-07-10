import { SbbCard } from './sbb-card';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-card', () => {
  // TODO: temporary moved to e2e, enable once onSlotchange is fixed https://github.com/ionic-team/stencil/issues/3536
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('renders sbb-card as a link with sbb-card-badge', async () => {
    const { root } = await newSpecPage({
      components: [SbbCard],
      html: `
        <sbb-card size="xl" href="https://github.com/lyne-design-system/lyne-components" target="_blank">
          <h2>Title</h2>
          Content text
          <sbb-card-badge slot="badge" appearance="primary" is-discount></sbb-card-badge>
        </sbb-card>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-card data-has-badge size="xl" href="https://github.com/lyne-design-system/lyne-components" target="_blank" dir="ltr">
        <mock:shadow-root>
          <a class="sbb-card" href="https://github.com/lyne-design-system/lyne-components" target="_blank" rel="external noopener nofollow" >
            <span class="sbb-card__wrapper">
              <slot></slot>
            </span>
            <span class="sbb-card__opens-in-new-window">
              . Link target opens in new window.
            </span>
            <slot name="badge"></slot>
          </a>
        </mock:shadow-root>
        <h2>Title</h2>
        Content text
        <sbb-card-badge appearance="primary" is-discount="" slot="badge"></sbb-card-badge>
      </sbb-card>
    `);
  });

  // TODO: temporary moved to e2e, enable once onSlotchange is fixed https://github.com/ionic-team/stencil/issues/3536
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('renders sbb-card as a button with sbb-card-badge', async () => {
    const { root } = await newSpecPage({
      components: [SbbCard],
      html: `
        <sbb-card size="xl" name="button" form="form" value="value">
          <h2>Title</h2>
          Content text
          <sbb-card-badge slot="badge" appearance="primary" is-discount></sbb-card-badge>
        </sbb-card>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-card data-has-badge size="xl" name="button" form="form" value="value">
        <mock:shadow-root>
          <span class="sbb-card">
            <span class="sbb-card__wrapper">
              <slot></slot>
            </span>
            <slot name="badge"></slot>
          </span>
        </mock:shadow-root>
        <h2>Title</h2>
        Content text
        <sbb-card-badge appearance="primary" is-discount="" slot="badge"></sbb-card-badge>
      </sbb-card>
    `);
  });

  it('renders sbb-card as link without sbb-card-badge', async () => {
    const { root } = await newSpecPage({
      components: [SbbCard],
      html: `
        <sbb-card size="l" href="https://github.com/lyne-design-system/lyne-components" target="_blank">
          <h2>Title</h2>
          Content text
        </sbb-card>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-card color="white" size="l" href="https://github.com/lyne-design-system/lyne-components" target="_blank" role="link" size="l" tabindex="0" dir="ltr">
        <mock:shadow-root>
          <a class="sbb-card" href="https://github.com/lyne-design-system/lyne-components" target="_blank" rel="external noopener nofollow" role="gridcell" tabindex="-1">
            <span class="sbb-card__wrapper">
              <slot></slot>
            </span>
            <span class="sbb-card__opens-in-new-window">
              . Link target opens in new window.
            </span>
          </a>
        </mock:shadow-root>
        <h2>Title</h2>
        Content text
      </sbb-card>
    `);
  });

  it('renders active sbb-card as button without sbb-card-badge because of size s', async () => {
    const { root } = await newSpecPage({
      components: [SbbCard],
      html: `
        <sbb-card size="s" name="button" form="form" value="value" active="true">
          <span slot="badge">Badge not to render</span>
          <h2>Title</h2>
          Content text
        </sbb-card>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-card color="white" size="s" name="button" form="form" value="value" active="" role="button" size="s" tabindex="0" dir="ltr">
        <mock:shadow-root>
          <span class="sbb-card">
            <span class="sbb-card__wrapper">
              <slot></slot>
            </span>
          </span>
        </mock:shadow-root>
        <span slot="badge">Badge not to render</span>
        <h2>Title</h2>
        Content text
      </sbb-card>
    `);
  });
});
