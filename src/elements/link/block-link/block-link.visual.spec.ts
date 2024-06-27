import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffStandardStates,
} from '../../core/testing/private.js';

import './block-link.js';

describe(`sbb-block-link`, () => {
  const iconState = {
    iconPlacement: ['start', 'end'],
    slotted: [false, true],
  };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const negative of [true, false]) {
      for (const state of visualDiffStandardStates) {
        it(
          state.name,
          state.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-block-link href="#" ?negative=${negative}
                >Travelcards & tickets</sbb-block-link
              >`,
              {
                backgroundColor: negative ? 'var(--sbb-color-charcoal)' : undefined,
              },
            );
          }),
        );
      }
    }

    describeEach(iconState, ({ iconPlacement, slotted }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-block-link
              href="#"
              icon-name=${slotted ? nothing : 'chevron-small-right-small'}
              icon-placement=${iconPlacement}
            >
              ${slotted
                ? html`<sbb-icon slot="icon" name="chevron-small-left-small"></sbb-icon>`
                : nothing}
              Travelcards & tickets
            </sbb-block-link>
          `);
        }),
      );
    });

    for (const size of ['xs', 's', 'm']) {
      it(
        `size=${size} ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-block-link href="#" size=${size}>Travelcards & tickets</sbb-block-link>`,
          );
        }),
      );
    }

    it(
      `width=fixed ${visualDiffDefault.name}`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-block-link href="#" icon-name="chevron-small-right-small" style="width: 200px;">
            A lot of link text to show what happens if there is not enough space.
          </sbb-block-link>`,
        );
      }),
    );
  });
});
