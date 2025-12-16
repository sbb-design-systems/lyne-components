import { html } from 'lit';

import {
  describeViewports,
  describeEach,
  visualDiffStandardStates,
  visualDiffDefault,
} from '../../core/testing/private.ts';

import '../../icon.ts';
import './tab-nav-bar.component.ts';

describe('sbb-tab-nav-bar', () => {
  describeViewports({ viewports: ['small', 'large'] }, () => {
    describeEach(
      {
        size: ['s', 'l', 'xl'],
      },
      ({ size }) => {
        for (const state of visualDiffStandardStates) {
          it(
            `${state.name}`,
            state.with(async (setup) => {
              await setup.withFixture(html`
                <sbb-tab-nav-bar size=${size}>
                  <a href="javascript:void(0);">Nav 1</a>
                  <a href="javascript:void(0);">Nav 2</a>
                  <a class="sbb-disabled" aria-disabled="true">Nav 3</a>
                  <a href="javascript:void(0);" class="sbb-active">Nav 4</a>
                </sbb-tab-nav-bar>
              `);
              setup.withStateElement(setup.snapshotElement.querySelector('a')!);
            }),
          );
        }

        it(
          `with icon ${visualDiffDefault.name}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-tab-nav-bar size=${size}>
                <a href="javascript:void(0);">
                  <sbb-icon name="circle-information-small"></sbb-icon>
                  Nav 1</a
                >
                <a href="javascript:void(0);">
                  <sbb-icon name="circle-information-small"></sbb-icon>
                  Nav 2</a
                >
                <a class="sbb-disabled" aria-disabled="true">
                  <sbb-icon name="circle-information-small"></sbb-icon>
                  Nav 3</a
                >
                <a href="javascript:void(0);" class="sbb-active">
                  <sbb-icon name="circle-information-small"></sbb-icon>
                  Nav 4</a
                >
              </sbb-tab-nav-bar>
            `);
            setup.withStateElement(setup.snapshotElement.querySelector('a')!);
          }),
        );
      },
    );
  });
});
