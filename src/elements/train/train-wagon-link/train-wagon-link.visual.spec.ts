import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffStandardStates,
} from '../../core/testing/private.ts';
import type { SbbTrainFormationElement } from '../../train.ts';

import '../../train.ts';

describe(`sbb-train-wagon-link`, () => {
  const cases = {
    orientation: ['horizontal', 'vertical'] satisfies SbbTrainFormationElement['orientation'][],
    view: ['side', 'top'] satisfies SbbTrainFormationElement['view'][],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ orientation, view, emulateMedia: { forcedColors, darkMode } }) => {
      for (const state of visualDiffStandardStates) {
        it(
          state.name,
          state.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-train-formation orientation=${orientation} view=${view}>
                <sbb-train>
                  <sbb-train-wagon-link
                    href="#"
                    wagon-type="wagon-end-left"
                    occupancy="medium"
                    wagon-class="1"
                  >
                  </sbb-train-wagon-link>
                </sbb-train>
              </sbb-train-formation>`,
              { forcedColors, darkMode },
            );
            setup.withStateElement(setup.snapshotElement.querySelector('sbb-train-wagon-link')!);
          }),
        );
      }
    });
  });
});
