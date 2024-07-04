import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffHover,
} from '../../core/testing/private.js';

import '../tab-group.js';
import '../tab-label.js';
import '../tab.js';
import '../../icon.js';

const cases = {
  amount: [false, true],
  icon: [false, true],
};

describe(`sbb-tab-label`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const state of [visualDiffDefault, visualDiffHover, visualDiffActive]) {
      it(
        state.name,
        state.with(async (setup) => {
          await setup.withFixture(html`<sbb-tab-label>Tab title</sbb-tab-label>`);
        }),
      );
    }

    describeEach(cases, ({ amount, icon }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-tab-label
              amount=${amount ? 16 : nothing}
              icon-name=${icon ? 'app-icon-small' : nothing}
              >Tab title</sbb-tab-label
            >`,
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
      'disabled',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html` <sbb-tab-label amount="16" icon-name="app-icon-small" disabled
            >Tab title</sbb-tab-label
          >`,
        );
      }),
    );

    it(
      'slotted icon',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html` <sbb-tab-label amount="16"
            >Tab title
            <sbb-icon name="app-icon-small" slot="icon"></sbb-icon>
          </sbb-tab-label>`,
        );
      }),
    );

    it(
      'slotted amount',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html` <sbb-tab-label icon-name="app-icon-small"
            >Tab title
            <span slot="amount">16</span>
          </sbb-tab-label>`,
        );
      }),
    );
  });
});
