import { ɵstateController } from '@sbb-esta/lyne-elements/core/mixins.js';
import {
  describeViewports,
  visualDiffDefault,
  visualDiffHover,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html, type TemplateResult } from 'lit';
import { ref } from 'lit/directives/ref.js';

import type { SbbAutocompleteGridButtonElement } from './autocomplete-grid-button.component.ts';

import './autocomplete-grid-button.component.ts';

describe(`sbb-autocomplete-grid-button`, () => {
  const defaultArgs = {
    disabled: false,
    negative: false,
    focusVisible: false,
  };

  const template = ({
    disabled,
    negative,
    focusVisible,
  }: typeof defaultArgs): TemplateResult => html`
    <sbb-autocomplete-grid-button
      icon-name="arrow-right-small"
      ?disabled=${disabled}
      ?negative=${negative}
      ${ref((b?: Element) =>
        ɵstateController(b as SbbAutocompleteGridButtonElement | undefined)?.toggle(
          'focus-visible',
          focusVisible,
        ),
      )}
    ></sbb-autocomplete-grid-button>
  `;

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const negative of [false, true]) {
      const wrapperStyle = {
        backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
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
        `negative=${negative} focus-visible`,
        visualDiffDefault.with(async (setup) => {
          const args = { ...defaultArgs, negative, focusVisible: true };
          await setup.withFixture(template(args), { ...wrapperStyle, focusOutlineDark: negative });
        }),
      );
    }
  });
});
