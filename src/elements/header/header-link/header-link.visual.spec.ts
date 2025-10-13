import { html } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffStandardStates,
} from '../../core/testing/private.js';
import { waitForImageReady } from '../../core/testing.js';

import './header-link.component.js';
import '../../image.js';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe(`sbb-header-link`, () => {
  describeViewports({ viewports: ['zero', 'large'] }, () => {
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
                      <sbb-header-link
                        icon-name="hamburger-menu-small"
                        class=${active ? 'sbb-active' : ''}
                        href="#"
                      >
                        Menu
                      </sbb-header-link>
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
            <sbb-header-link href="#">${img.template} Menu</sbb-header-link>
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
              html`<sbb-header-link href="" expand-from="large">Menu</sbb-header-link>`,
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
              html`<sbb-header-link
                href=""
                icon-name="hamburger-menu-small"
                expand-from="large"
              ></sbb-header-link>`,
            );
          }),
        );
      }
    });
  });
});
