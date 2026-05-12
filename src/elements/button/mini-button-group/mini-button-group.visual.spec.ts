import { html, nothing, type TemplateResult } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.ts';

import type { SbbMiniButtonGroupElement } from './mini-button-group.component.ts';

import '../../button.ts';
import '../../divider.ts';

describe('sbb-mini-button-group', () => {
  const sizeCases = [null, 's', 'm', 'l', 'xl'] satisfies SbbMiniButtonGroupElement['size'][];

  const template = (
    size?: SbbMiniButtonGroupElement['size'],
    negative?: boolean,
  ): TemplateResult => html`
    <sbb-mini-button-group size=${size || nothing} ?negative=${negative}>
      <sbb-mini-button icon-name="pen-small"></sbb-mini-button>
      <sbb-mini-button icon-name="pen-small"></sbb-mini-button>
      <sbb-divider orientation="vertical"></sbb-divider>
      <sbb-mini-button icon-name="pen-small"></sbb-mini-button>
    </sbb-mini-button-group>
  `;

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const size of sizeCases) {
      it(
        `size=${size}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template(size));
        }),
      );
    }

    for (const negative of [false, true]) {
      describe(`negative=${negative}`, () => {
        for (const darkMode of [false, true]) {
          describe(`darkMode=${darkMode}`, () => {
            it(
              visualDiffFocus.name,
              visualDiffFocus.with(async (setup) => {
                await setup.withFixture(template(undefined, negative), {
                  backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
                  focusOutlineDark: negative,
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
