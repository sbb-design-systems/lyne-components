import type { SbbButtonElement } from '@sbb-esta/lyne-elements/button.js';
import {
  describeViewports,
  visualDiffDefault,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import '@sbb-esta/lyne-elements/button.js';

import '../easter-egg.ts';

describe(`sbb-easter-egg`, () => {
  const negativeCases = [false, true];

  describeViewports({ viewports: ['zero', 'large'], viewportHeight: 600 }, () => {
    for (const darkMode of [false, true]) {
      describe(`darkMode=${darkMode}`, () => {
        for (const negative of negativeCases) {
          it(
            `negative=${negative}`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                html`
                  <sbb-button id="trigger">Trigger</sbb-button>
                  <sbb-easter-egg ?negative="${negative}" trigger="trigger"></sbb-easter-egg>
                `,
                { darkMode, minHeight: '600px' },
              );
              setup.withPostSetupAction(() => {
                const button = setup.snapshotElement.querySelector<SbbButtonElement>('#trigger')!;
                button.click();
              });
            }),
          );
        }
      });
    }
  });
});
