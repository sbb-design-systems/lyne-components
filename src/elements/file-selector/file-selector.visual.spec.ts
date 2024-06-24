import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../core/testing/private.js';

import '../form-error.js';
import './file-selector.js';
import type { SbbFileSelectorElement } from '@sbb-esta/lyne-elements/file-selector/file-selector';

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
    variant: ['default', 'dropzone'],
    state: [
      { disabled: false, error: false },
      { disabled: true, error: false },
      { disabled: false, error: true },
    ],
  };

  const sizes = {
    variant: ['default', 'dropzone'],
    size: ['s', 'm'],
  };

  describeViewports({ viewports: ['small', 'medium'] }, () => {
    describeEach(states, ({ variant, state }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-file-selector
            id="fs"
            title-content="Title"
            ?multiple=${true}
            variant=${variant}
            ?disabled=${state.disabled}
          ></sbb-file-selector>
          ${state.error
            ? html`<sbb-form-error slot="error">There has been an error.</sbb-form-error>`
            : nothing}
        `);
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

    describeEach(sizes, ({ variant, size }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-file-selector
            id="fs"
            title-content="Title"
            ?multiple=${true}
            variant=${variant}
            size=${size}
          ></sbb-file-selector>
        `);
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          addFilesToComponentInput(root.querySelector('#fs')!);
          setup.withSnapshotElement(root);
        }),
      );
    });
  });
});
