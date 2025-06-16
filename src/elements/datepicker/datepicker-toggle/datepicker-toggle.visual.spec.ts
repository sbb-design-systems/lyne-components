import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.js';

import './datepicker-toggle.component.js';
import '../datepicker.js';
import '../../date-input.js';
import '../../form-field.js';

describe(`sbb-datepicker-toggle`, () => {
  describeViewports({ viewports: ['wide'] }, () => {
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
            backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
            focusOutlineDark: negative,
          });
        }),
      );

      it(
        `form field ${visualDiffFocus.name}`,
        visualDiffFocus.with(async (setup) => {
          await setup.withFixture(withFormFieldTemplate, {
            backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
            focusOutlineDark: negative,
          });
        }),
      );
    });
  });
});
