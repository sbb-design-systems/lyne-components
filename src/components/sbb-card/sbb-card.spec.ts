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
      <sbb-card class='sbb-card--has-badge' size="xl" href="https://github.com/lyne-design-system/lyne-components" target="_blank">
        <mock:shadow-root>
          <a class="sbb-card__link" dir="ltr" href="https://github.com/lyne-design-system/lyne-components" target="_blank" rel="external noopener nofollow" >
            <slot name="badge"></slot>
            <span class="sbb-card__content">
              <slot></slot>
              <span class="sbb-card__opens-in-new-window">
                . Link target opens in new window.
              </span>
            </span>
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
      <sbb-card class='sbb-card--has-badge' size="xl" name="button" form="form" value="value">
        <mock:shadow-root>
          <button class="sbb-card__button" dir="ltr" type='button' name="button" form="form" value="value">
            <slot name="badge"></slot>
            <span class="sbb-card__content">
              <slot></slot>
            </span>
          </button>
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
        <sbb-card size="s" href="https://github.com/lyne-design-system/lyne-components" target="_blank">
          <h2>Title</h2>
          Content text
        </sbb-card>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-card size="s" href="https://github.com/lyne-design-system/lyne-components" target="_blank">
        <mock:shadow-root>
          <a class="sbb-card__link" dir="ltr" href="https://github.com/lyne-design-system/lyne-components" target="_blank" rel="external noopener nofollow" >
            <span class="sbb-card__content">
              <slot></slot>
              <span class="sbb-card__opens-in-new-window">
                . Link target opens in new window.
              </span>
            </span>
          </a>
        </mock:shadow-root>
        <h2>Title</h2>
        Content text
      </sbb-card>
    `);
  });

  it('renders sbb-card as button without sbb-card-badge', async () => {
    const { root } = await newSpecPage({
      components: [SbbCard],
      html: `
        <sbb-card size="s" name="button" form="form" value="value">
          <h2>Title</h2>
          Content text
        </sbb-card>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-card size="s" name="button" form="form" value="value">
        <mock:shadow-root>
          <button class="sbb-card__button" dir="ltr" type="button" name="button" form="form" value="value">
            <span class="sbb-card__content">
              <slot></slot>
            </span>
          </button>
        </mock:shadow-root>
        <h2>Title</h2>
        Content text
      </sbb-card>
    `);
  });
});
