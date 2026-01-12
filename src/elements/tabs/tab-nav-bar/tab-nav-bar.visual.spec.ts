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
            state.name,
            state.with(async (setup) => {
              await setup.withFixture(html`
                <sbb-tab-nav-bar size=${size}>
                  <a href="#">Nav 1</a>
                  <a href="#">Nav 2</a>
                  <a class="sbb-disabled" aria-disabled="true" role="link">Nav 3</a>
                  <a href="#" class="sbb-active" aria-current="page">Nav 4</a>
                </sbb-tab-nav-bar>
              `);
              setup.withStateElement(setup.snapshotElement.querySelector('a')!);
            }),
          );
        }

        it(
          `with icon and amount ${visualDiffDefault.name}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-tab-nav-bar size=${size}>
                <a href="#" class="sbb-active" aria-current="page">
                  <sbb-icon name="app-icon-small"></sbb-icon>
                  Nav 1
                  <p class="sbb-tab-amount">42</p>
                </a>
                <a href="#">
                  <sbb-icon name="user-small"></sbb-icon>
                  Nav 2
                  <p class="sbb-tab-amount">42</p>
                </a>
                <a class="sbb-disabled" aria-disabled="true" role="link">
                  <sbb-icon name="circle-information-small"></sbb-icon>
                  Nav 3
                  <p class="sbb-tab-amount">42</p></a
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
