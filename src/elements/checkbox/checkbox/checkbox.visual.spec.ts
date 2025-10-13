import { html, nothing, type TemplateResult } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.js';

import './checkbox.component.js';

describe('sbb-checkbox', () => {
  const defaultArgs = {
    size: 'm',
    disabled: false,
    iconName: undefined as string | undefined,
    iconPlacement: undefined as string | undefined,
  };

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const state of ['checked', 'unchecked', 'indeterminate']) {
      describe(`state=${state}`, () => {
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

        for (const forcedColors of [false, true]) {
          describe(`forcedColors=${forcedColors}`, () => {
            for (const darkMode of forcedColors ? [true] : [false, true]) {
              describe(`darkMode=${darkMode}`, () => {
                for (const visualDiffState of [visualDiffDefault, visualDiffFocus]) {
                  it(
                    visualDiffState.name,
                    visualDiffState.with(async (setup) => {
                      await setup.withFixture(template(defaultArgs), { forcedColors, darkMode });
                    }),
                  );

                  it(
                    `disabled`,
                    visualDiffDefault.with(async (setup) => {
                      await setup.withFixture(template({ ...defaultArgs, disabled: true }), {
                        forcedColors,
                        darkMode,
                      });
                    }),
                  );
                }
              });
            }
          });
        }

        it(
          `size=s`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(template({ ...defaultArgs, size: 's' }));
          }),
        );

        it(
          `size=xs`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(template({ ...defaultArgs, size: 'xs' }));
          }),
        );

        for (const iconPlacement of ['start', 'end']) {
          it(
            `iconPlacement=${iconPlacement}`,
            visualDiffDefault.with(async (setup) => {
              const args = { ...defaultArgs, iconName: 'tickets-class-small', iconPlacement };
              await setup.withFixture(template(args));
            }),
          );
        }
      });
    }
  });
});
