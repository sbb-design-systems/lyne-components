import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import './datepicker-toggle.js';

import '../datepicker.js';
import '../../form-field.js';
import '../../calendar.js';
import type { SbbDatepickerToggleElement } from './datepicker-toggle.js';

describe(`sbb-datepicker-toggle`, () => {
  describeViewports({ viewports: ['wide'] }, () => {
    describe('render', () => {
      let root: HTMLElement;
      beforeEach(async () => {
        root = await visualRegressionFixture(
          html`
            <div style="height: 600px;">
              <div style="display: flex; gap: 1rem;">
                <sbb-datepicker-toggle date-picker="datepicker" id="toggle"></sbb-datepicker-toggle>
                <sbb-datepicker
                  id="datepicker"
                  input="datepicker-input"
                  now="2023-01-12T00:00:00Z"
                ></sbb-datepicker>
                <input id="datepicker-input" />
              </div>
            </div>
          `,
          {
            padding: '4rem',
          },
        );
      });

      for (const state of [visualDiffDefault, visualDiffFocus]) {
        it(
          state.name,
          state.with(async (setup) => {
            const toggle = root.querySelector('#toggle')! as SbbDatepickerToggleElement;
            toggle.open();
            setup.withSnapshotElement(root);
          }),
        );
      }
    });

    describeEach({ negative: [true, false] }, ({ negative }) => {
      let root: HTMLElement;
      beforeEach(async () => {
        root = await visualRegressionFixture(
          html`
            <div style="height: 600px;">
              <sbb-form-field .negative=${negative}>
                <sbb-datepicker-toggle id="toggle"></sbb-datepicker-toggle>
                <sbb-datepicker now="2023-01-12T00:00:00Z"></sbb-datepicker>
                <input />
              </sbb-form-field>
            </div>
          `,
          {
            backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
            focusOutlineDark: negative,
          },
        );
      });

      for (const state of [visualDiffDefault, visualDiffFocus]) {
        it(
          `form field ${state.name}`,
          state.with(async (setup) => {
            const toggle = root.querySelector('#toggle')! as SbbDatepickerToggleElement;
            toggle.open();
            setup.withSnapshotElement(root);
          }),
        );
      }
    });
  });
});
