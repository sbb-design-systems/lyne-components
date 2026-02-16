import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.ts';

import './datepicker-toggle.component.ts';
import '../datepicker.ts';
import '../../date-input.ts';
import '../../form-field.ts';

describe(`sbb-datepicker-toggle`, () => {
  describeViewports({ viewports: ['ultra'] }, () => {
    describeEach({ negative: [true, false] }, ({ negative }) => {
      const withFormFieldTemplate = html`
        <sbb-form-field ?negative=${negative}>
          <sbb-date-input></sbb-date-input>
          <sbb-datepicker-toggle></sbb-datepicker-toggle>
          <sbb-datepicker></sbb-datepicker>
        </sbb-form-field>
      `;

      it(
        `form field ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(withFormFieldTemplate, {
            backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
            focusOutlineDark: negative,
          });
        }),
      );

      it(
        `form field ${visualDiffFocus.name}`,
        visualDiffFocus.with(async (setup) => {
          await setup.withFixture(withFormFieldTemplate, {
            backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
            focusOutlineDark: negative,
          });

          setup.withStateElement(setup.snapshotElement.querySelector('sbb-datepicker-toggle')!);
        }),
      );
    });
  });
});
