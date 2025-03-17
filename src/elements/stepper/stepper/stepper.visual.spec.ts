import { html, nothing, type TemplateResult } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import './stepper.component.js';
import '../step.js';
import '../step-label.js';

describe(`sbb-stepper`, () => {
  let root: HTMLElement;

  const cases = {
    orientation: ['horizontal', 'vertical'],
    linear: [false, true],
  };

  const template = (
    linear?: boolean,
    orientation?: string,
    longLabel?: boolean,
    horizontalFrom?: string,
    size: 's' | 'm' = 'm',
  ): TemplateResult => html`
    <sbb-stepper
      selected-index="0"
      ?linear=${linear}
      orientation=${orientation || nothing}
      horizontal-from=${horizontalFrom || nothing}
      size=${size}
    >
      <sbb-step-label icon-name="pen-small">Step 1</sbb-step-label>
      <sbb-step>
        <p>Step content 1</p>
      </sbb-step>
      <sbb-step-label icon-name="pen-small" disabled>Step 2</sbb-step-label>
      <sbb-step>
        <p>Step content 2</p>
      </sbb-step>
      <sbb-step-label
        >${longLabel
          ? 'Step 3 - Long label  lorem ipsum dolor sit amet, consetetur sadipscing elitr'
          : 'Step 3'}</sbb-step-label
      >
      <sbb-step>
        <p>Step content 3</p>
      </sbb-step>
      <sbb-step-label>Step 4</sbb-step-label>
      <sbb-step>
        <p>Step content 4</p>
      </sbb-step>
    </sbb-stepper>
  `;

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ linear, orientation }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(template(linear, orientation));
      });

      for (const state of [visualDiffDefault, visualDiffFocus]) {
        it(
          state.name,
          state.with((setup) => {
            setup.withSnapshotElement(root);
          }),
        );
      }
    });

    it(
      `horizontal-from=medium`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template(false, 'vertical', false, 'medium'));
      }),
    );
  });

  describeViewports({ viewports: ['medium'] }, () => {
    for (const orientation of cases.orientation) {
      it(
        `orientation=${orientation}_long labels`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template(false, orientation, true));
        }),
      );

      it(
        `orientation=${orientation} size=s`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template(false, orientation, false, undefined, 's'));
        }),
      );
    }
  });
});
