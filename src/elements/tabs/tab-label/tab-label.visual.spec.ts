import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffHover,
} from '../../core/testing/private.ts';

import '../tab-group.ts';
import '../tab-label.ts';
import '../tab.ts';
import '../../icon.ts';

const cases = {
  amount: [false, true],
  icon: [false, true],
  text: [true, false],
};

describe(`sbb-tab-label`, () => {
  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const { forcedColors, darkMode } of [
      { forcedColors: false, darkMode: true },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ]) {
      describe(`forcedColors=${forcedColors} darkMode=${darkMode}`, () => {
        for (const state of [visualDiffDefault, visualDiffHover, visualDiffActive]) {
          it(
            state.name,
            state.with(async (setup) => {
              await setup.withFixture(
                html`<sbb-tab-label amount="123" icon-name="app-icon-small">
                  Tab title
                </sbb-tab-label>`,
                { darkMode, forcedColors },
              );
            }),
          );
        }

        it(
          'disabled',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-tab-label amount="16" icon-name="app-icon-small" disabled>
                Tab title
              </sbb-tab-label>`,
              { darkMode, forcedColors },
            );
          }),
        );
      });
    }

    describeEach(cases, ({ amount, icon, text }) => {
      it(
        visualDiffHover.name,
        // We use `visualDiffHover` here to ensure the bottom line is visible as a visual reference.
        visualDiffHover.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-tab-label
              amount=${amount ? 16 : nothing}
              icon-name=${icon ? 'app-icon-small' : nothing}
            >
              ${text || (!text && !amount && !icon) ? 'Tab title' : nothing}
            </sbb-tab-label>`,
          );
        }),
      );
    });

    it(
      'with ellipsis',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-tab-label amount="16" icon-name="app-icon-small">
            A very long label which gets ellipsis when there is no more space to display it
          </sbb-tab-label>`,
        );
      }),
    );

    it(
      'slotted icon',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-tab-label amount="16">
            Tab title
            <sbb-icon name="app-icon-small" slot="icon"></sbb-icon>
          </sbb-tab-label>`,
        );
      }),
    );

    it(
      'slotted amount',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-tab-label icon-name="app-icon-small">
            Tab title
            <span slot="amount">16</span>
          </sbb-tab-label>`,
        );
      }),
    );
  });
});
