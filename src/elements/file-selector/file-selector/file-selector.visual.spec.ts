import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import '../../form-error.js';
import './file-selector.component.js';
import type { SbbFileSelectorElement } from './file-selector.component.js';

describe(`sbb-file-selector`, () => {
  function addFilesToComponentInput(elem: SbbFileSelectorElement): void {
    const dataTransfer: DataTransfer = new DataTransfer();
    for (let i: number = 0; i < 5; i++) {
      dataTransfer.items.add(
        new File([`Hello world - ${i}`], `hello${i}.txt`, {
          type: 'text/plain',
          lastModified: new Date(i).getMilliseconds(),
        }),
      );
    }
    const input: HTMLInputElement = elem.shadowRoot!.querySelector<HTMLInputElement>('input')!;
    input.files = dataTransfer.files;
    input.dispatchEvent(new Event('change'));
  }

  let root: HTMLElement;

  const states = {
    state: [
      { disabled: false, error: false, forcedColors: false },
      { disabled: false, error: false, forcedColors: true },
      { disabled: true, error: false, forcedColors: false },
      { disabled: true, error: false, forcedColors: true },
      { disabled: false, error: true, forcedColors: false },
    ],
    darkMode: [false, true],
  };

  describeViewports({ viewports: ['small', 'large'] }, () => {
    describeEach(states, ({ state, darkMode }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-file-selector id="fs" multiple ?disabled=${state.disabled}></sbb-file-selector>
            ${state.error
              ? html`<sbb-form-error slot="error">There has been an error.</sbb-form-error>`
              : nothing}
          `,
          { forcedColors: state.forcedColors, darkMode },
        );
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          if (!state.disabled && state.error) {
            addFilesToComponentInput(root.querySelector('#fs')!);
          }
          setup.withSnapshotElement(root);
        }),
      );
    });

    describeEach({ size: ['s', 'm'] }, ({ size }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-file-selector id="fs" multiple size=${size}></sbb-file-selector>
        `);
      });

      for (const visualDiffState of [visualDiffDefault, visualDiffFocus]) {
        it(
          visualDiffState.name,
          visualDiffState.with((setup) => {
            addFilesToComponentInput(root.querySelector('#fs')!);
            setup.withSnapshotElement(root);
          }),
        );
      }
    });
  });
});
