import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbTimetableFormElement } from './timetable-form.component.ts';

import './timetable-form.component.ts';
import '../../button/button.ts';
import '../../divider.ts';
import '../../icon.ts';
import '../../signet.ts';
import '../../time-input.ts';
import '../../toggle.ts';
import '../timetable-form-field.ts';
import '../timetable-form-swap-button.ts';
import '../timetable-form-details.ts';

describe(`sbb-timetable-form`, () => {
  describe('renders', () => {
    let element: SbbTimetableFormElement;

    beforeEach(async () => {
      element = await fixture(html`
        <form class="sbb-timetable-form">
          <sbb-signet></sbb-signet>
          <sbb-timetable-form>
            <sbb-timetable-form-field>
              <label>From</label>
              <input type="text" name="from" />
            </sbb-timetable-form-field>
            <sbb-timetable-form-swap-button></sbb-timetable-form-swap-button>
            <sbb-timetable-form-field>
              <label>To</label>
              <input type="text" name="to" />
            </sbb-timetable-form-field>
            <sbb-timetable-form-details>
              <sbb-form-field width="collapse" size="l" borderless>
                <sbb-time-input value="13:30"></sbb-time-input>
              </sbb-form-field>
              <sbb-toggle size="s" name="departure-arrival">
                <sbb-toggle-option value="departure">Dep</sbb-toggle-option>
                <sbb-toggle-option value="arrival">Arr</sbb-toggle-option>
              </sbb-toggle>
              <div style="flex-grow: 1;"></div>
              <sbb-button type="submit" size="m">Search</sbb-button>
            </sbb-timetable-form-details>
          </sbb-timetable-form>
        </form>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['style'] });
    });

    testA11yTreeSnapshot();
  });
});
