import { html } from 'lit';

import { describeViewports, describeEach, visualDiffDefault } from '../../core/testing/private.js';

import '../../select.js';
import '../../form-field.js';
import '../../autocomplete.js';
import '../optgroup.js';
import '../option.js';
import './option-hint.component.js';

describe('sbb-option-hint', () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    const cases = {
      divider: [true, false],
      negative: [true, false],
    };

    describeEach(cases, ({ divider, negative }) => {
      it(
        'Autocomplete',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-form-field ?negative=${negative}>
              <label>Autocomplete</label>
              <input />
              <sbb-autocomplete>
                <sbb-option value="1"> Option 1 </sbb-option>
                <sbb-option value="2"> Option 2 </sbb-option>
                <sbb-option value="3"> Option 3 </sbb-option>
                <sbb-option value="4"> Option 4 </sbb-option>
                <sbb-option-hint ?divider=${divider}>42 more hits</sbb-option-hint>
              </sbb-autocomplete>
            </sbb-form-field>
          `);
        }),
      );

      it(
        'Autocomplete with group',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-form-field ?negative=${negative}>
              <label>Autocomplete</label>
              <input />
              <sbb-autocomplete preserve-icon-space>
                <sbb-optgroup>
                  <sbb-option value="1" icon-name="clock-small"> Option 1 </sbb-option>
                  <sbb-option value="2" icon-name="clock-small"> Option 2 </sbb-option>
                  <sbb-option-hint>Group hint</sbb-option-hint>
                </sbb-optgroup>
                <sbb-optgroup>
                  <sbb-option value="3" icon-name="clock-small"> Option 3 </sbb-option>
                  <sbb-option value="4"> Option 4 </sbb-option>
                </sbb-optgroup>
                <sbb-option-hint ?divider=${divider}>42 more hits</sbb-option-hint>
              </sbb-autocomplete>
            </sbb-form-field>
          `);
        }),
      );

      it(
        'Select',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-form-field ?negative=${negative}>
              <label>Select</label>
              <sbb-select>
                <sbb-option value="1"> Option 1 </sbb-option>
                <sbb-option value="2"> Option 2 </sbb-option>
                <sbb-option value="3"> Option 3 </sbb-option>
                <sbb-option value="4"> Option 4 </sbb-option>
                <sbb-option-hint ?divider=${divider}>42 more hits</sbb-option-hint>
              </sbb-select>
            </sbb-form-field>
          `);
        }),
      );
    });
  });
});
