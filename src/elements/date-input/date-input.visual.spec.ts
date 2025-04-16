import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../core/testing/private.js';

import './date-input.component.js';
import '../form-field/form-field.js';

describe('sbb-date-input', () => {
  let root: HTMLElement;

  const cases = {
    disabled: [false, true],
    negative: [false, true],
    forcedColors: [false, true],
  };

  const sizeCases = ['s', 'm', 'l'];

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ disabled, negative, forcedColors }) => {
      describe('with value', () => {
        beforeEach(async function () {
          root = await visualRegressionFixture(
            html`
              <sbb-form-field ?negative=${negative}>
                <sbb-date-input value="2024-12-11" ?disabled=${disabled}></sbb-date-input>
              </sbb-form-field>
            `,
            {
              backgroundColor: negative ? 'var(--sbb-color-iron)' : undefined,
              focusOutlineDark: negative,
              forcedColors,
            },
          );
        });

        for (const state of visualDiffStandardStates) {
          it(
            state.name,
            state.with(async (setup) => {
              setup
                .withSnapshotElement(root)
                .withStateElement(setup.snapshotElement.querySelector('sbb-date-input')!);
            }),
          );
        }
      });

      describe('empty', () => {
        beforeEach(async function () {
          root = await visualRegressionFixture(
            html`
              <sbb-form-field ?negative=${negative}>
                <sbb-date-input ?disabled=${disabled}></sbb-date-input>
              </sbb-form-field>
            `,
            {
              backgroundColor: negative ? 'var(--sbb-color-iron)' : undefined,
              focusOutlineDark: negative,
              forcedColors,
            },
          );
        });

        for (const state of visualDiffStandardStates) {
          it(
            state.name,
            state.with(async (setup) => {
              setup
                .withSnapshotElement(root)
                .withStateElement(setup.snapshotElement.querySelector('sbb-date-input')!);
            }),
          );
        }
      });
    });

    for (const size of sizeCases) {
      it(
        `size=${size}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-form-field size=${size}>
              <sbb-date-input value="2024-12-11"></sbb-date-input>
            </sbb-form-field>`,
          );
        }),
      );
    }
  });
});
