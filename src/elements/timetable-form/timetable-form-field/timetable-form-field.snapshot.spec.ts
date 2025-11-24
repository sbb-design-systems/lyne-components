import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbTimetableFormFieldElement } from './timetable-form-field.component.ts';
import './timetable-form-field.component.ts';

describe(`sbb-timetable-form-field`, () => {
  describe('renders', () => {
    let element: SbbTimetableFormFieldElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-timetable-form-field>
          <label>From</label>
          <input type="text" name="from" />
        </sbb-timetable-form-field>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
