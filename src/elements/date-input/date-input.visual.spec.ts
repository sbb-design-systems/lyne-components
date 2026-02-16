import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../core/testing/private.ts';

import './date-input.component.ts';
import '../form-field/form-field.ts';

describe('sbb-date-input', () => {
  let root: HTMLElement;

  const cases = {
    disabled: [false, true],
    negative: [false, true],
    forcedColors: [false, true],
  };

  const sizeCases = {
    size: ['s', 'm', 'l'],
    label: [undefined, 'Label'],
    floatingLabel: [false, true],
  };

  describeViewports({ viewports: ['zero', 'large'] }, () => {
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
              backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
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
              backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
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

    describeEach(sizeCases, ({ size, label, floatingLabel }) => {
      it(
        ``,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-form-field size=${size} ?floating-label=${floatingLabel}>
              ${label ? html`<label>${label}</label>` : nothing}
              <sbb-date-input value="2024-12-11"></sbb-date-input>
            </sbb-form-field>`,
          );
        }),
      );
    });
  });
});
