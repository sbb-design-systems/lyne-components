import { html, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../../core/testing/private.js';

import './menu-link.js';

describe(`sbb-menu-link`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    const state = {
      amount: [undefined, 123],
      slotted: [false, true],
    };

    for (const visualDiffState of [visualDiffDefault, visualDiffHover, visualDiffFocus]) {
      it(
        visualDiffState.name,
        visualDiffState.with(async (setup) => {
          await setup.withFixture(
            html`
              ${repeat(
                new Array(3),
                (_, index) => html`
                  <sbb-menu-link href="#" amount="123" icon-name="tick-small"
                    >Details ${index}</sbb-menu-link
                  >
                `,
              )}
            `,
            {
              backgroundColor: 'var(--sbb-color-black)',
              width: '256px',
              focusOutlineDark: true,
            },
          );
        }),
      );
    }

    describeEach(state, ({ amount, slotted }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              ${repeat(
                new Array(3),
                (_, index) => html`
                  <sbb-menu-link href="#" amount=${amount || nothing}>
                    Details ${index}
                    ${slotted ? html`<sbb-icon slot="icon" name="pie-small"></sbb-icon>` : nothing}
                  </sbb-menu-link>
                `,
              )}
            `,
            {
              backgroundColor: 'var(--sbb-color-black)',
              width: '256px',
            },
          );
        }),
      );
    });

    for (const disabled of [true, false]) {
      it(
        `long label disabled=${disabled} ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              ${repeat(
                new Array(3),
                (_, index) => html`
                  <sbb-menu-link href="#" amount="123" icon-name="tick-small" .disabled=${disabled}
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    ${index}</sbb-menu-link
                  >
                `,
              )}
            `,
            {
              backgroundColor: 'var(--sbb-color-black)',
              width: '256px',
            },
          );
        }),
      );
    }
  });
});
