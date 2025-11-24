import { html, nothing, type TemplateResult } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.ts';

import './stepper.component.ts';
import '../step.ts';
import '../step-label.ts';

describe(`sbb-stepper`, () => {
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

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    describeEach(cases, ({ linear, orientation }) => {
      for (const state of [visualDiffDefault, visualDiffFocus]) {
        it(
          state.name,
          state.with(async (setup) => {
            await setup.withFixture(template(linear, orientation));
          }),
        );
      }
    });

    it(
      `horizontal-from=large`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template(false, 'vertical', false, 'large'));
      }),
    );
  });

  describeViewports({ viewports: ['large'] }, () => {
    for (const { darkMode, forcedColors } of [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ]) {
      describe(`forcedColors=${forcedColors} darkMode=${darkMode}`, () => {
        for (const orientation of cases.orientation) {
          describe(`orientation=${orientation}`, () => {
            it(
              `long labels`,
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(template(false, orientation, true), {
                  forcedColors,
                  darkMode,
                });
              }),
            );

            it(
              `size=s`,
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(template(false, orientation, false, undefined, 's'), {
                  forcedColors,
                  darkMode,
                });
              }),
            );
          });
        }
      });
    }
  });
});
