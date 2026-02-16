import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';
import type { SbbFormFieldElement } from '../../form-field.ts';

import '../datepicker-next-day.ts';
import '../datepicker-previous-day.ts';
import '../datepicker-toggle.ts';
import '../../date-input.ts';
import '../../form-field.ts';
import './datepicker.component.ts';

describe(`sbb-datepicker`, () => {
  let formField: SbbFormFieldElement;

  describe('renders', async () => {
    beforeEach(async () => {
      formField = await fixture(
        html`<sbb-form-field>
          <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
          <sbb-date-input id="datepicker-input" value="2021-12-20"></sbb-date-input>
          <sbb-datepicker-toggle></sbb-datepicker-toggle>
          <sbb-datepicker-next-day></sbb-datepicker-next-day>
          <sbb-datepicker></sbb-datepicker>
        </sbb-form-field> `,
      );
    });

    it('DOM', async () => {
      await expect(formField).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(formField).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
