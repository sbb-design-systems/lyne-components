import { sendKeys } from '@web/test-runner-commands';
import { html, nothing } from 'lit';

import { tabKey } from '../../core/testing/private/keys.js';
import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import './datepicker-next-day.js';
import '../datepicker.js';
import '../../form-field.js';

describe(`sbb-datepicker-next-day`, () => {
  const cases = {
    negative: [true, false],
    value: [null, '15.02.2023'],
  };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    it(
      `standalone`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`<sbb-datepicker-next-day></sbb-datepicker-next-day>`);
      }),
    );

    describeEach(cases, ({ negative, value }) => {
      let root: HTMLElement;

      beforeEach(async () => {
        root = await visualRegressionFixture(
          html`
            <sbb-form-field ?negative=${negative}>
              <input value=${value || nothing} />
              <sbb-datepicker></sbb-datepicker>
              <sbb-datepicker-next-day></sbb-datepicker-next-day>
            </sbb-form-field>
          `,
          { backgroundColor: negative ? 'var(--sbb-color-black)' : undefined },
        );
      });

      it(
        `with form-field`,
        visualDiffDefault.with(async (setup) => {
          setup.withSnapshotElement(root);
        }),
      );

      it(
        `with form-field focus`,
        visualDiffDefault.with(async (setup) => {
          setup.withSnapshotElement(root);

          if (value) {
            // Focus input so that with a tab press it should land on next day
            setup.snapshotElement.querySelector('input')!.focus();
          } else {
            setup.snapshotElement.focus();
          }

          await sendKeys({ press: tabKey });
        }),
      );
    });
  });
});
