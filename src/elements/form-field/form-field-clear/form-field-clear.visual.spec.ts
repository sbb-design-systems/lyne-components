import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualRegressionFixture,
  visualDiffDefault,
} from '../../core/testing/private.ts';

import './form-field-clear.component.ts';
import '../form-field.ts';

describe(`sbb-form-field-clear`, () => {
  let root: HTMLElement;

  const cases = {
    negative: [false, true],
    state: [
      { disabled: false, readonly: false },
      { disabled: true, readonly: false },
      { disabled: false, readonly: true },
    ],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  describeViewports({ viewports: ['large'] }, () => {
    describeEach(cases, ({ negative, state, emulateMedia: { forcedColors, darkMode } }) => {
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
          {
            backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
            forcedColors,
            darkMode,
          },
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
