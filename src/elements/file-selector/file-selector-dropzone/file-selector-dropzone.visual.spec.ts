import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualRegressionFixture,
} from '../../core/testing/private.ts';

import type { SbbFileSelectorDropzoneElement } from './file-selector-dropzone.component.ts';

import '../../form-field/error.ts';
import './file-selector-dropzone.component.ts';

describe(`sbb-file-selector-dropzone`, () => {
  function addFilesToComponentInput(elem: SbbFileSelectorDropzoneElement): void {
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
      { disabled: false, error: false },
      { disabled: true, error: false },
      { disabled: false, error: true },
    ],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  describeViewports({ viewports: ['small', 'large'] }, () => {
    describeEach(states, ({ state, emulateMedia: { forcedColors, darkMode } }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-file-selector-dropzone
              id="fs"
              title-content="Title"
              multiple
              ?disabled=${state.disabled}
            ></sbb-file-selector-dropzone>
            ${state.error
              ? html`<sbb-error slot="error">There has been an error.</sbb-error>`
              : nothing}
          `,
          { forcedColors: forcedColors, darkMode },
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
          <sbb-file-selector-dropzone
            id="fs"
            title-content="Title"
            multiple
            size=${size}
          ></sbb-file-selector-dropzone>
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
