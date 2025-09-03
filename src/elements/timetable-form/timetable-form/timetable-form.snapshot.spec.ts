import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbTimetableFormElement } from './timetable-form.component.js';

import './timetable-form.component.js';
import '../../button/button.js';
import '../../divider.js';
import '../../icon.js';
import '../../signet.js';
import '../../time-input.js';
import '../../toggle.js';
import '../timetable-form-field.js';
import '../timetable-form-swap-button.js';
import '../timetable-form-details.js';

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
      await expect(element).dom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
