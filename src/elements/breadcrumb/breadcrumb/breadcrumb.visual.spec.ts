import { html, nothing } from 'lit';

import {
  describeViewports,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import './breadcrumb.js';

describe('sbb-breadcrumb', () => {
  let root: HTMLElement;

  const cases = [
    { name: 'text', icon: undefined, text: 'Breadcrumb' },
    { name: 'icon', icon: 'house-small', text: undefined },
    { name: 'both', icon: 'house-small', text: 'Breadcrumb' },
  ];

  describeViewports({ viewports: ['wide'] }, () => {
    describe('combination', () => {
      for (const singleCase of cases) {
        for (const state of visualDiffStandardStates) {
          it(
            `${singleCase.name} ${state.name}`,
            state.with((setup) => {
              setup.withFixture(html`
                <sbb-breadcrumb
                  href="https://www.sbb.ch"
                  target="_blank"
                  download="false"
                  .iconName=${singleCase.icon}
                  >${singleCase.text ? singleCase.text : nothing}</sbb-breadcrumb
                >
              `);
            }),
          );
        }
      }
    });

    describe('slotted icon', () => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-breadcrumb href="https://www.sbb.ch" target="_blank" download="false">
            Slotted icon
            <sbb-icon slot="icon" name="dog-small"></sbb-icon
          ></sbb-breadcrumb>
        `);
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

    describe('long label', () => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <div style="max-width: 200px;">
            <sbb-breadcrumb
              href="https://www.sbb.ch"
              target="_blank"
              download="false"
              icon-name="house-small"
            >
              This label name is so long that it needs ellipsis to fit
            </sbb-breadcrumb>
          </div>
        `);
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
  });
});
