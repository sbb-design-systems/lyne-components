import { aTimeout } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html, nothing } from 'lit';

import {
  describeViewports,
  describeEach,
  visualDiffDefault,
  type VisualDiffSetupBuilder,
} from '../../core/testing/private.ts';

import '../../select.ts';
import '../../form-field.ts';
import '../../autocomplete.ts';
import '../../../elements-experimental/autocomplete-grid.ts';
import '../optgroup.ts';
import '../option.ts';
import './option-hint.component.ts';

const openAutocomplete = async (setup: VisualDiffSetupBuilder): Promise<void> => {
  // Wait for page is rendered stable. Otherwise, the overlay can be positioned slightly off.
  await aTimeout(10);
  const input = setup.snapshotElement.querySelector('input')!;
  input.focus();
  await sendKeys({ press: 'O' });
};

describe('sbb-option-hint', () => {
  describeViewports({ viewports: ['zero', 'large'], viewportHeight: 500 }, () => {
    const cases = {
      divider: [true, false],
      negative: [true, false],
      size: ['s', 'm'],
    };

    describeEach(cases, ({ divider, negative, size }) => {
      it(
        'Autocomplete',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-form-field ?negative=${negative} size=${size}>
                <label>Autocomplete</label>
                <input />
                <sbb-autocomplete>
                  <sbb-option value="1"> Option 1 </sbb-option>
                  <sbb-option value="2"> Option 2 </sbb-option>
                  <sbb-option value="3"> Option 3 </sbb-option>
                  <sbb-option value="4"> Option 4 </sbb-option>
                  ${divider ? html`<sbb-divider></sbb-divider>` : nothing}
                  <sbb-option-hint>42 more hits</sbb-option-hint>
                </sbb-autocomplete>
              </sbb-form-field>
            `,
            { minHeight: '500px' },
          );
          setup.withPostSetupAction(() => openAutocomplete(setup));
        }),
      );

      it(
        'Autocomplete with group',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-form-field ?negative=${negative} size=${size}>
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
                  ${divider ? html`<sbb-divider></sbb-divider>` : nothing}
                  <sbb-option-hint>42 more hits</sbb-option-hint>
                </sbb-autocomplete>
              </sbb-form-field>
            `,
            { minHeight: '500px' },
          );
          setup.withPostSetupAction(() => openAutocomplete(setup));
        }),
      );

      it(
        'Select',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-form-field ?negative=${negative} size=${size}>
                <label>Select</label>
                <sbb-select>
                  <sbb-option value="1"> Option 1 </sbb-option>
                  <sbb-option value="2"> Option 2 </sbb-option>
                  <sbb-option value="3"> Option 3 </sbb-option>
                  <sbb-option value="4"> Option 4 </sbb-option>
                  ${divider ? html`<sbb-divider></sbb-divider>` : nothing}
                  <sbb-option-hint>42 more hits</sbb-option-hint>
                </sbb-select>
              </sbb-form-field>
            `,
            { minHeight: '500px' },
          );
          setup.withPostSetupAction(() =>
            setup.snapshotElement.querySelector('sbb-select')!.open(),
          );
        }),
      );

      it(
        'Autocomplete-grid',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-form-field ?negative=${negative} size=${size}>
                <label>Autocomplete</label>
                <input />
                <sbb-autocomplete-grid>
                  <sbb-autocomplete-grid-row>
                    <sbb-autocomplete-grid-option value="1">Option 1</sbb-autocomplete-grid-option>
                    <sbb-autocomplete-grid-cell>
                      <sbb-autocomplete-grid-button
                        icon-name="pen-small"
                      ></sbb-autocomplete-grid-button>
                    </sbb-autocomplete-grid-cell>
                  </sbb-autocomplete-grid-row>
                  <sbb-autocomplete-grid-row>
                    <sbb-autocomplete-grid-option value="2">Option 2</sbb-autocomplete-grid-option>
                    <sbb-autocomplete-grid-cell>
                      <sbb-autocomplete-grid-button
                        icon-name="pen-small"
                      ></sbb-autocomplete-grid-button>
                    </sbb-autocomplete-grid-cell>
                  </sbb-autocomplete-grid-row>
                  ${divider ? html`<sbb-divider></sbb-divider>` : nothing}
                  <sbb-option-hint>42 more hits</sbb-option-hint>
                </sbb-autocomplete-grid>
              </sbb-form-field>
            `,
            { minHeight: '500px' },
          );
          setup.withPostSetupAction(() => openAutocomplete(setup));
        }),
      );
    });
  });

  describeViewports({ viewports: ['zero'] }, () => {
    describe('autocomplete darkMode=true', () => {
      for (const negative of [false, true]) {
        it(
          `negative=${negative}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`
                <sbb-form-field ?negative=${negative}>
                  <label>Autocomplete</label>
                  <input />
                  <sbb-autocomplete>
                    <sbb-option value="1">Option 1</sbb-option>
                    <sbb-option value="2">Option 2</sbb-option>
                    <sbb-option value="3">Option 3</sbb-option>
                    <sbb-option value="4">Option 4</sbb-option>
                    <sbb-divider></sbb-divider>
                    <sbb-option-hint>42 more hits</sbb-option-hint>
                  </sbb-autocomplete>
                </sbb-form-field>
              `,
              { minHeight: '500px', darkMode: true },
            );
            setup.withPostSetupAction(() => openAutocomplete(setup));
          }),
        );
      }
    });

    describe('autocomplete centered content', () => {
      for (const negative of [false, true]) {
        it(
          `negative=${negative}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`
                <sbb-form-field ?negative=${negative}>
                  <label>Autocomplete</label>
                  <input />
                  <sbb-autocomplete>
                    <sbb-option value="1">Option 1</sbb-option>
                    <sbb-option value="2">Option 2</sbb-option>
                    <sbb-option value="3">Option 3</sbb-option>
                    <sbb-option value="4">Option 4</sbb-option>
                    <sbb-divider></sbb-divider>
                    <sbb-option-hint
                      ><div style="width:100%;text-align: center">centered</div></sbb-option-hint
                    >
                  </sbb-autocomplete>
                </sbb-form-field>
              `,
              { minHeight: '500px', darkMode: true },
            );
            setup.withPostSetupAction(() => openAutocomplete(setup));
          }),
        );
      }
    });
  });
});
