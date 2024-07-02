import { html, type TemplateResult } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.js';

import '../../card.js';
import '../../icon.js';
import './checkbox-panel.js';

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
    html` <sbb-checkbox-panel
      ?checked=${state === 'checked'}
      ?indeterminate=${state === 'indeterminate'}
      ?disabled=${disabled}
      color=${color}
      ?borderless=${borderless}
      size=${size}
    >
      Label ${size}
      <span slot="subtext">Subtext</span>
      <span slot="suffix" style="margin-inline-start: auto;">
        <span style="display:flex;align-items:center;">
          <sbb-icon
            name="diamond-small"
            style="margin-inline: var(--sbb-spacing-fixed-2x);"
            data-namespace="default"
            role="img"
            aria-hidden="true"
          ></sbb-icon>
          <span class="${size ? `sbb-text-${size}` : 'sbb-text-m'} sbb-text--bold">
            CHF 40.00
          </span>
        </span>
      </span>
      <sbb-card-badge>%</sbb-card-badge>
    </sbb-checkbox-panel>`;

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const state of ['checked', 'unchecked', 'indeterminate']) {
      const args = { ...defaultArgs, state };
      for (const visualDiffState of [visualDiffDefault, visualDiffFocus]) {
        it(
          `state=${state} ${visualDiffState.name}`,
          visualDiffState.with(async (setup) => {
            await setup.withFixture(template(args));
          }),
        );
      }

      it(
        `state=${state} disabled ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ ...args, disabled: true }));
        }),
      );
    }

    it(
      `color=milk ${visualDiffDefault.name}`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({ ...defaultArgs, color: 'milk' }));
      }),
    );

    it(
      `size=s ${visualDiffDefault.name}`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({ ...defaultArgs, size: 's' }));
      }),
    );

    it(
      `borderless ${visualDiffDefault.name}`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({ ...defaultArgs, borderless: true }));
      }),
    );
  });
});
