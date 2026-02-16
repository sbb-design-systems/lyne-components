import { html, nothing, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import type { visualRegressionFixture } from '../../core/testing/private.ts';
import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffHover,
} from '../../core/testing/private.ts';

import './menu-button.component.ts';

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
        <sbb-menu-button
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
    backgroundColor: 'var(--sbb-background-color-1-inverted)',
    maxWidth: '256px',
  };

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const { darkMode, forcedColors } of [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ]) {
      describe(`darkMode=${darkMode} forcedColors=${forcedColors}`, () => {
        for (const visualDiffState of [visualDiffDefault, visualDiffHover]) {
          it(
            visualDiffState.name,
            visualDiffState.with(async (setup) => {
              await setup.withFixture(template(defaultArgs), {
                ...wrapperStyles,
                darkMode,
                forcedColors,
              });
            }),
          );

          it(
            `disabled ${visualDiffState.name}`,
            visualDiffState.with(async (setup) => {
              await setup.withFixture(template({ ...defaultArgs, disabled: true }), {
                ...wrapperStyles,
                darkMode,
                forcedColors,
              });
            }),
          );
        }
      });
    }

    for (const visualDiffState of [visualDiffDefault, visualDiffHover]) {
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
