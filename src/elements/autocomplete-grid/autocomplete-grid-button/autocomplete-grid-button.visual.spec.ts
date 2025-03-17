import { html, type TemplateResult } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffHover,
} from '../../core/testing/private.js';

import './autocomplete-grid-button.component.js';

describe(`sbb-autocomplete-grid-button`, () => {
  const defaultArgs = {
    disabled: false,
    negative: false,
    active: false,
    focusVisible: false,
  };

  const template = ({
    disabled,
    negative,
    active,
    focusVisible,
  }: typeof defaultArgs): TemplateResult => html`
    <sbb-autocomplete-grid-button
      icon-name="arrow-right-small"
      ?disabled=${disabled}
      ?negative=${negative}
      ?data-active=${active}
      ?data-focus-visible=${focusVisible}
    ></sbb-autocomplete-grid-button>
  `;

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const negative of [false, true]) {
      const wrapperStyle = {
        backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
      };

      for (const disabled of [false, true]) {
        for (const state of [visualDiffDefault, visualDiffHover]) {
          it(
            `negative=${negative} disabled=${disabled} ${state.name}`,
            state.with(async (setup) => {
              const args = { ...defaultArgs, negative, disabled };
              await setup.withFixture(template(args), wrapperStyle);
            }),
          );
        }
      }

      it(
        `negative=${negative} active`,
        visualDiffDefault.with(async (setup) => {
          const args = { ...defaultArgs, negative, active: true };
          await setup.withFixture(template(args), wrapperStyle);
        }),
      );

      it(
        `negative=${negative} focus-visible`,
        visualDiffDefault.with(async (setup) => {
          const args = { ...defaultArgs, negative, focusVisible: true };
          await setup.withFixture(template(args), { ...wrapperStyle, focusOutlineDark: negative });
        }),
      );
    }
  });
});
