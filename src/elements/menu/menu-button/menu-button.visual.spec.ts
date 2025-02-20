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
    badge: 123 as number | undefined,
    iconName: 'tick-small' as string | undefined,
    label: 'Button',
    disabled: false,
    disabledInteractive: false,
    slottedIcon: false,
  };

  const template = ({
    badge,
    iconName,
    label,
    disabled,
    disabledInteractive,
    slottedIcon,
  }: typeof defaultArgs): TemplateResult => html`
    ${repeat(
      new Array(3),
      (_, index) => html`
        <!--
          TODO: remove amount property usage.
          Until we remove the amount property completely we keep both ways of displaying the badge in the same test.
        -->
        <sbb-menu-button
          amount=${badge || nothing}
          sbb-badge=${badge && !disabled && !disabledInteractive ? badge : nothing}
          icon-name=${iconName || nothing}
          ?disabled=${disabled}
          ?disabled-interactive=${disabledInteractive}
        >
          ${label} ${index}
          ${slottedIcon
            ? html`<sbb-icon slot="icon" name="face-smiling-small"></sbb-icon>`
            : nothing}
        </sbb-menu-button>
      `,
    )}
  `;

  const state = {
    badge: [undefined, 123],
    slottedIcon: [false, true],
    iconName: ['tick-small', undefined],
  };

  const wrapperStyles: Parameters<typeof visualRegressionFixture>[1] = {
    backgroundColor: 'var(--sbb-color-black)',
    maxWidth: '256px',
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
        `disabledInteractive ${visualDiffState.name}`,
        visualDiffState.with(async (setup) => {
          await setup.withFixture(
            template({ ...defaultArgs, disabledInteractive: true }),
            wrapperStyles,
          );
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

    describeEach(state, ({ badge, slottedIcon, iconName }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            template({ ...defaultArgs, badge, slottedIcon, iconName }),
            wrapperStyles,
          );
        }),
      );
    });
  });
});
