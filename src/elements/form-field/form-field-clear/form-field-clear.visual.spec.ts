import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualRegressionFixture,
  visualDiffDefault,
} from '../../core/testing/private.js';

import './form-field-clear.js';
import '../form-field.js';

describe(`sbb-form-field-clear`, () => {
  let root: HTMLElement;

  const cases = {
    negative: [false, true],
    state: [
      { disabled: false, readonly: false },
      { disabled: true, readonly: false },
      { disabled: false, readonly: true },
    ],
  };

  describeViewports({ viewports: ['medium'] }, () => {
    describeEach(cases, ({ negative, state }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-form-field ?negative=${negative}>
              <label>Label</label>
              <input
                type="text"
                placeholder="Input placeholder"
                value="Input value"
                ?disabled=${state.disabled}
                ?readonly=${state.readonly}
              />
              <sbb-form-field-clear></sbb-form-field-clear>
            </sbb-form-field>
          `,
          { backgroundColor: negative ? '#484040' : undefined },
        );
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });
  });
});
