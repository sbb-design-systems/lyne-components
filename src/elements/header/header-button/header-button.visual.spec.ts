import { html } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffStandardStates,
} from '../../core/testing/private.js';
import { waitForImageReady } from '../../core/testing.js';

import './header-button.component.js';
import '../../image.js';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe(`sbb-header-button`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const forcedColors of [false, true]) {
      describe(`forcedColors=${forcedColors}`, () => {
        for (const active of [false, true]) {
          describe(`active=${active}`, () => {
            for (const state of visualDiffStandardStates) {
              it(
                state.name,
                state.with(async (setup) => {
                  await setup.withFixture(
                    html`
                      <sbb-header-button
                        icon-name="hamburger-menu-small"
                        class=${active ? 'sbb-active' : ''}
                      >
                        Menu
                      </sbb-header-button>
                    `,
                    { forcedColors },
                  );
                }),
              );
            }
          });
        }
      });
    }

    for (const img of [
      {
        selector: 'sbb-image',
        template: html`<sbb-image slot="icon" image-src=${imageUrl} sbb-badge="22"></sbb-image>`,
      },
      {
        selector: 'img',
        template: html`<img slot="icon" src=${imageUrl} alt=""></img>`,
      },
    ]) {
      it(
        img.selector,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-header-button>${img.template} Menu</sbb-header-button>
          `);

          setup.withPostSetupAction(
            async () => await waitForImageReady(setup.snapshotElement.querySelector(img.selector)!),
          );
        }),
      );
    }

    describe('without icon', () => {
      for (const state of visualDiffStandardStates) {
        it(
          state.name,
          state.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-header-button expand-from="medium">Menu</sbb-header-button>`,
            );
          }),
        );
      }
    });
  });
});
