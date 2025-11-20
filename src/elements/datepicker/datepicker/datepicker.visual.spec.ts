import { html } from 'lit';
import { stub, type SinonStub } from 'sinon';

import { defaultDateAdapter } from '../../core/datetime.ts';
import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../core/testing/private.ts';

import '../datepicker-previous-day.ts';
import '../datepicker-next-day.ts';
import '../datepicker-toggle.ts';
import '../../date-input.ts';
import '../../form-field.ts';
import './datepicker.component.ts';
import type { SbbDatepickerElement } from './datepicker.component.ts';

describe(`sbb-datepicker`, () => {
  let root: HTMLElement;
  let todayStub: SinonStub;

  const cases = {
    negative: [false, true],
    states: [
      { disabled: false, readonly: false },
      { disabled: true, readonly: false },
      { disabled: false, readonly: true },
    ],
  };

  const sizes = ['s', 'l'];

  before(() => {
    todayStub = stub(defaultDateAdapter, 'today').returns(new Date(2022, 4, 1, 0, 0, 0, 0));
  });

  after(() => {
    todayStub.restore();
  });

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    describeEach(cases, ({ negative, states }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-form-field ?negative=${negative}>
              <label>Label</label>
              <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
              <sbb-date-input
                ?disabled=${states.disabled}
                ?readonly=${states.readonly}
                value="12.02.2023"
              ></sbb-date-input>
              <sbb-datepicker-toggle></sbb-datepicker-toggle>
              <sbb-datepicker-next-day></sbb-datepicker-next-day>
              <sbb-datepicker></sbb-datepicker>
            </sbb-form-field>
          `,
          !states.disabled && !states.readonly ? { minHeight: '600px' } : undefined,
        );
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);

          if (!states.disabled && !states.readonly) {
            setup.withPostSetupAction(() => {
              setup.snapshotElement.querySelector<SbbDatepickerElement>('sbb-datepicker')!.open();
            });
          }
        }),
      );
    });

    describe('without form field', () => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <div style="display: flex; gap: 0.25rem;">
              <sbb-datepicker-previous-day input="datepicker-input"></sbb-datepicker-previous-day>
              <sbb-date-input value="12.02.2023" id="datepicker-input"></sbb-date-input>
              <sbb-datepicker-next-day input="datepicker-input"></sbb-datepicker-next-day>
              <sbb-datepicker-toggle
                input="datepicker-input"
                datepicker="datepicker"
              ></sbb-datepicker-toggle>
              <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
            </div>
          `);
        }),
      );
    });

    for (const size of sizes) {
      it(
        `size=${size}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-form-field width="collapse" size=${size as 's' | 'm' | 'l'}>
              <label>Label</label>
              <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
              <sbb-date-input value="12.02.2023"></sbb-date-input>
              <sbb-datepicker-toggle></sbb-datepicker-toggle>
              <sbb-datepicker-next-day></sbb-datepicker-next-day>
              <sbb-datepicker></sbb-datepicker>
            </sbb-form-field>
          `);
        }),
      );
    }
  });
});
