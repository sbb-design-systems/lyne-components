import { html, nothing, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import type { visualRegressionFixture } from '../../core/testing/private.js';
import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../../core/testing/private.js';

import './menu-button.js';

describe(`sbb-menu-button`, () => {
  const defaultArgs = {
    amount: 123 as number | undefined,
    iconName: 'tick-small',
    label: 'Button',
    disabled: false,
    slottedIcon: false,
  };

  const template = ({
    amount,
    iconName,
    label,
    disabled,
    slottedIcon,
  }: typeof defaultArgs): TemplateResult => html`
    ${repeat(
      new Array(3),
      (_, index) => html`
        <sbb-menu-button
          amount=${amount || nothing}
          icon-name=${iconName || nothing}
          .disabled=${disabled}
        >
          ${label} ${index}
          ${slottedIcon ? html`<sbb-icon slot="icon" name="pie-small"></sbb-icon>` : nothing}
        </sbb-menu-button>
      `,
    )}
  `;

  const state = {
    amount: [undefined, 123],
    slottedIcon: [false, true],
  };

  const wrapperStyles: Parameters<typeof visualRegressionFixture>[1] = {
    backgroundColor: 'var(--sbb-color-black)',
    width: '256px',
  };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const visualDiffState of [visualDiffDefault, visualDiffHover, visualDiffFocus]) {
      it(
        visualDiffState.name,
        visualDiffState.with(async (setup) => {
          await setup.withFixture(template(defaultArgs), wrapperStyles);
        }),
      );

      it(
        `disabled ${visualDiffState.name}`,
        visualDiffState.with(async (setup) => {
          await setup.withFixture(template({ ...defaultArgs, disabled: true }), wrapperStyles);
        }),
      );

      it(
        `long label ${visualDiffState.name}`,
        visualDiffState.with(async (setup) => {
          await setup.withFixture(
            template({
              ...defaultArgs,
              label: 'Button lorem ipsum dolor sit amet, consectetur adipiscing elit',
            }),
            wrapperStyles,
          );
        }),
      );
    }

    describeEach(state, ({ amount, slottedIcon }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ ...defaultArgs, amount, slottedIcon }), wrapperStyles);
        }),
      );
    });
  });
});
