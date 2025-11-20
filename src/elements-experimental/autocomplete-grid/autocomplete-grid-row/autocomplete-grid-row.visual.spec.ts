import {
  describeViewports,
  visualDiffDefault,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html, nothing, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import './autocomplete-grid-row.component.ts';
import '../autocomplete-grid-cell.ts';
import '../autocomplete-grid-option.ts';
import '../autocomplete-grid-button.ts';

describe('sbb-autocomplete-grid-row', () => {
  const defaultArgs = {
    negative: false,
    withActions: false,
    numberOfActions: 1,
  };

  const template = ({
    negative,
    withActions,
    numberOfActions,
  }: typeof defaultArgs): TemplateResult => html`
    ${repeat(
      new Array(5),
      (_, i) => html`
        <sbb-autocomplete-grid-row ?data-negative=${negative}>
          <sbb-autocomplete-grid-option>Opt ${i}</sbb-autocomplete-grid-option>
          ${withActions
            ? repeat(
                new Array(numberOfActions),
                () => html`
                  <sbb-autocomplete-grid-cell>
                    <sbb-autocomplete-grid-button
                      icon-name="face-smiling-small"
                      ?negative=${negative}
                    ></sbb-autocomplete-grid-button>
                  </sbb-autocomplete-grid-cell>
                `,
              )
            : nothing}
        </sbb-autocomplete-grid-row>
      `,
    )}
  `;

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const negative of [false, true]) {
      const args = { ...defaultArgs, negative };
      const wrapperStyle = {
        backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
      };

      it(
        `negative=${negative}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template(args), wrapperStyle);
        }),
      );

      it(
        `negative=${negative} withActions=true`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ ...args, withActions: true }), wrapperStyle);
        }),
      );

      it(
        `negative=${negative} withMultipleActions=true`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            template({ ...args, withActions: true, numberOfActions: 3 }),
            wrapperStyle,
          );
        }),
      );
    }
  });
});
