import { html } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffStandardStates,
} from '../../core/testing/private.ts';
import { waitForImageReady } from '../../core/testing.ts';

import './header-button.component.ts';
import '../../image.ts';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

function testHeaderButton({
  forcedColors,
  darkMode,
}: {
  forcedColors: boolean;
  darkMode: boolean;
}): void {
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
              { forcedColors, darkMode },
            );
          }),
        );
      }
    });
  }
}

describe(`sbb-header-button`, () => {
  describeViewports({ viewports: ['zero', 'large'] }, () => {
    testHeaderButton({ forcedColors: false, darkMode: false });

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
              html`<sbb-header-button expand-from="large">Menu</sbb-header-button>`,
            );
          }),
        );
      }
    });

    describe('without text', () => {
      for (const state of visualDiffStandardStates) {
        it(
          state.name,
          state.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-header-button
                expand-from="large"
                icon-name="hamburger-menu-small"
              ></sbb-header-button>`,
            );
          }),
        );
      }
    });
  });

  describeViewports({ viewports: ['large'] }, () => {
    describe(`forcedColors=true`, () => {
      testHeaderButton({ forcedColors: true, darkMode: false });
    });
    describe(`darkMode=true`, () => {
      testHeaderButton({ forcedColors: false, darkMode: true });
    });
  });
});
