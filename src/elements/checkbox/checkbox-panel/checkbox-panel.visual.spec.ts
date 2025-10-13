import { html, type TemplateResult } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.js';

import '../../card.js';
import '../../icon.js';
import './checkbox-panel.component.js';

describe('sbb-checkbox-panel', () => {
  const defaultArgs = {
    state: 'unchecked',
    disabled: false,
    color: 'white',
    borderless: false,
    size: 'm',
  };

  const template = ({
    state,
    disabled,
    color,
    borderless,
    size,
  }: typeof defaultArgs): TemplateResult =>
    html`<sbb-checkbox-panel
      ?checked=${state === 'checked'}
      ?indeterminate=${state === 'indeterminate'}
      ?disabled=${disabled}
      color=${color}
      ?borderless=${borderless}
      size=${size}
    >
      Label ${size}
      <span slot="subtext">Subtext</span>
      <span slot="suffix" style="margin-inline-start: auto; display:flex; align-items:center;">
        <sbb-icon
          name="diamond-small"
          style="margin-inline: var(--sbb-spacing-fixed-2x);"
          data-namespace="default"
          role="img"
          aria-hidden="true"
        ></sbb-icon>
        <span class="${size ? `sbb-text-${size}` : 'sbb-text-m'} sbb-text--bold">CHF 40.00</span>
      </span>
      <sbb-card-badge>%</sbb-card-badge>
    </sbb-checkbox-panel>`;

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const state of ['checked', 'unchecked', 'indeterminate']) {
      describe(`state=${state}`, () => {
        const args = { ...defaultArgs, state };

        for (const visualDiffState of [visualDiffDefault, visualDiffFocus]) {
          it(
            `${visualDiffState.name}`,
            visualDiffState.with(async (setup) => {
              await setup.withFixture(template(args));
            }),
          );
        }

        it(
          `disabled default`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(template({ ...args, disabled: true }));
          }),
        );
      });
    }

    it(
      `darkMode=true`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({ ...defaultArgs, color: 'milk' }));
      }),
    );

    for (const darkMode of [false, true]) {
      it(
        `color=milk darkMode=${darkMode}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ ...defaultArgs, color: 'milk' }), { darkMode });
        }),
      );
    }

    it(
      `size=s`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({ ...defaultArgs, size: 's' }));
      }),
    );

    it(
      `borderless`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({ ...defaultArgs, borderless: true }), {
          backgroundColor: 'var(--sbb-background-color-3)',
        });
      }),
    );

    it(
      `forcedColors`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({ ...defaultArgs }), { forcedColors: true });
      }),
    );
  });
});
