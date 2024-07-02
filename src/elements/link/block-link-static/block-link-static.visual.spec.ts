import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffHover,
} from '../../core/testing/private.js';

import './block-link-static.js';

describe(`sbb-block-link-static`, () => {
  const iconState = {
    iconPlacement: ['start', 'end'],
    slotted: [false, true],
  };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const negative of [true, false]) {
      for (const state of [visualDiffDefault, visualDiffActive, visualDiffHover]) {
        it(
          `negative=${negative} ${state.name}`,
          state.with(async (setup) => {
            await setup.withFixture(
              html` <sbb-block-link-static ?negative="${negative}"
                >Travelcards & tickets</sbb-block-link-static
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
            <sbb-block-link-static
              icon-name="${slotted ? nothing : 'chevron-small-right-small'}"
              icon-placement="${iconPlacement}"
            >
              ${slotted
                ? html` <sbb-icon slot="icon" name="chevron-small-left-small"></sbb-icon>`
                : nothing}
              Travelcards & tickets
            </sbb-block-link-static>
          `);
        }),
      );
    });

    for (const size of ['xs', 's', 'm']) {
      it(
        `size=${size} ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html` <sbb-block-link-static size="${size}"
              >Travelcards & tickets</sbb-block-link-static
            >`,
          );
        }),
      );
    }

    it(
      `width=fixed ${visualDiffDefault.name}`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html` <sbb-block-link-static icon-name="chevron-small-right-small" style="width: 200px;">
            A lot of link text to show what happens if there is not enough space.
          </sbb-block-link-static>`,
        );
      }),
    );
  });
});
