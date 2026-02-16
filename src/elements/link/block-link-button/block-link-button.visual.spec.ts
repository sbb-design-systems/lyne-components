import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../../core/testing/private.ts';

import './block-link-button.component.ts';

describe(`sbb-block-link-button`, () => {
  const cases = {
    negative: [false, true],
    active: [false, true],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  const iconState = {
    iconPlacement: ['start', 'end'],
    slotted: [false, true],
  };

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const size of ['xs', 's', 'm']) {
      it(
        `size=${size} ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-block-link-button size=${size}>Travelcards & tickets</sbb-block-link-button>`,
          );
        }),
      );
    }
  });

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ negative, active, emulateMedia: { darkMode, forcedColors } }) => {
      let root: HTMLElement;

      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`<sbb-block-link-button
            ?negative=${negative}
            class=${active ? 'sbb-active' : nothing}
          >
            Travelcards & tickets
          </sbb-block-link-button>`,
          {
            backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
            forcedColors,
            darkMode,
          },
        );
      });

      for (const state of visualDiffStandardStates) {
        it(
          state.name,
          state.with((setup) => {
            setup.withSnapshotElement(root);
          }),
        );
      }
    });

    describeEach(iconState, ({ iconPlacement, slotted }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-block-link-button
              icon-name=${slotted ? nothing : 'chevron-small-right-small'}
              icon-placement=${iconPlacement}
            >
              ${slotted
                ? html`<sbb-icon slot="icon" name="chevron-small-left-small"></sbb-icon>`
                : nothing}
              Travelcards & tickets
            </sbb-block-link-button>
          `);
        }),
      );
    });

    it(
      `width=fixed ${visualDiffDefault.name}`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-block-link-button icon-name="chevron-small-right-small" style="width: 200px;">
            A lot of link text to show what happens if there is not enough space.
          </sbb-block-link-button>`,
        );
      }),
    );
  });
});
