import { html, nothing, type TemplateResult } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.js';

import './checkbox.js';

describe('sbb-checkbox', () => {
  const defaultArgs = {
    size: 'm',
    disabled: false,
    iconName: undefined as string | undefined,
    iconPlacement: undefined as string | undefined,
  };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const state of ['checked', 'unchecked', 'indeterminate']) {
      const template = ({
        size,
        disabled,
        iconName,
        iconPlacement,
      }: typeof defaultArgs): TemplateResult => html`
        <sbb-checkbox
          size=${size}
          .disabled=${disabled}
          .indeterminate=${state === 'indeterminate'}
          .checked=${state === 'checked'}
          icon-name=${iconName || nothing}
          icon-placement=${iconPlacement || nothing}
          >Label</sbb-checkbox
        >
      `;

      for (const visualDiffState of [visualDiffDefault, visualDiffFocus]) {
        it(
          `${state} ${visualDiffState.name}`,
          visualDiffState.with(async (setup) => {
            await setup.withFixture(template(defaultArgs));
          }),
        );
      }

      it(
        `${state} size=s`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ ...defaultArgs, size: 's' }));
        }),
      );

      it(
        `${state} disabled`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ ...defaultArgs, disabled: true }));
        }),
      );

      for (const iconPlacement of ['start', 'end']) {
        it(
          `${state} iconPlacement=${iconPlacement}`,
          visualDiffDefault.with(async (setup) => {
            const args = { ...defaultArgs, iconName: 'tickets-class-small', iconPlacement };
            await setup.withFixture(template(args));
          }),
        );
      }
    }
  });
});
