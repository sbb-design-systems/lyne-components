import { html, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../../core/testing/private.js';

import './menu-button.js';

describe(`sbb-menu-button`, () => {
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
                  <sbb-menu-button amount="123" icon-name="tick-small"
                    >Button ${index}</sbb-menu-button
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

      it(
        `long label ${visualDiffState.name}`,
        visualDiffState.with(async (setup) => {
          await setup.withFixture(
            html`
              ${repeat(
                new Array(3),
                (_, index) => html`
                  <sbb-menu-button amount="123" icon-name="tick-small"
                    >Button lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    ${index}</sbb-menu-button
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

    describeEach(state, ({ amount, slotted }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              ${repeat(
                new Array(3),
                (_, index) => html`
                  <sbb-menu-button amount=${amount || nothing}>
                    Button ${index}
                    ${slotted ? html`<sbb-icon slot="icon" name="pie-small"></sbb-icon>` : nothing}
                  </sbb-menu-button>
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

    it(
      `disabled=true ${visualDiffDefault.name}`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            ${repeat(
              new Array(3),
              (_, index) => html`
                <sbb-menu-button amount="123" icon-name="tick-small" disabled
                  >Button ${index}</sbb-menu-button
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
  });
});
