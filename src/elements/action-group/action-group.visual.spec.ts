import { html } from 'lit';

import {
  type DescribeViewportOptions,
  describeViewports,
  visualDiffDefault,
} from '../core/testing/private.ts';

import '../action-group.ts';
import '../button.ts';
import '../link.ts';

const items = html`<sbb-secondary-button>Button 1</sbb-secondary-button>
  <sbb-button>Button 2</sbb-button>
  <sbb-block-link
    icon-name="chevron-small-left-small"
    href="https://github.com/sbb-design-systems/lyne-components"
  >
    Link
  </sbb-block-link>`;

describe(`sbb-action-group`, () => {
  describeViewports({ viewports: ['zero', 'small', 'large', 'ultra'] }, () => {
    it(
      'default',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`<sbb-action-group>${items}</sbb-action-group>`);
      }),
    );

    it(
      'vertical',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-action-group class="sbb-orientation-vertical">${items}</sbb-action-group>
        `);
      }),
    );

    it(
      `sbb-orientation-vertical-full-width`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-action-group class="sbb-orientation-vertical-full-width">
            ${items}
          </sbb-action-group>
        `);
      }),
    );

    for (const breakpoint of [
      'small',
      'large',
      'ultra',
    ] satisfies DescribeViewportOptions['viewports']) {
      it(
        `sbb-orientation-horizontal-from-${breakpoint}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-action-group class="sbb-orientation-horizontal-from-${breakpoint}">
              ${items}
            </sbb-action-group>
          `);
        }),
      );
    }

    it(
      'flex-wrapping',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-action-group style="width: 200px;">
            <sbb-button>Button</sbb-button>
            <sbb-button>Button</sbb-button>
            <sbb-button>Button</sbb-button>
            <sbb-button>Button</sbb-button>
          </sbb-action-group>`,
        );
      }),
    );
  });
});
