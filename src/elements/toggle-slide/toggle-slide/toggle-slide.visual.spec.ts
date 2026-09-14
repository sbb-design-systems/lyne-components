import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.ts';

import type { SbbToggleSlideElement } from './toggle-slide.component.ts';

import '../../icon.ts';
import '../../title.ts';
import '../../toggle-slide.ts';

describe(`sbb-toggle-slide`, () => {
  const longLabel = `For this example we need a very long label, like lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras nec dolor eget leo porttitor ultrices. Mauris sed erat nec justo posuere elementum.
  In pharetra ante vel fringilla tincidunt. Fusce congue accumsan arcu dictum porttitor.
  Pellentesque urna justo, lacinia at velit eu, sagittis tempus nibh.
  Quisque vitae massa et turpis fermentum tristique.`;

  const sizeCases = { size: [null, 's', 'm', 'l'] satisfies SbbToggleSlideElement['size'][] };

  const cases = {
    ...sizeCases,
    label: ['Label', 'Long label'],
  };

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    describeEach(cases, ({ size, label }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-toggle-slide size=${size || nothing}>
              ${label !== 'Long label' ? label : longLabel}
            </sbb-toggle-slide>
          `);
        }),
      );
    });
  });

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(
      {
        disabled: [false, true],
        checked: [false, true],
        emulateMedia: [
          { forcedColors: false, darkMode: false },
          { forcedColors: true, darkMode: false },
          { forcedColors: false, darkMode: true },
        ],
      },
      ({ disabled, checked, emulateMedia: { forcedColors, darkMode } }) => {
        for (const state of [visualDiffDefault, visualDiffFocus]) {
          it(
            state.name,
            state.with(async (setup) => {
              await setup.withFixture(
                html`
                  <sbb-toggle-slide ?disabled=${disabled} ?checked=${checked}>
                    Label
                  </sbb-toggle-slide>
                `,
                { forcedColors, darkMode },
              );
            }),
          );
        }
      },
    );

    it(
      'custom icon',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html` <sbb-toggle-slide checked>Label</sbb-toggle-slide> `);
      }),
    );

    for (const state of [visualDiffDefault, visualDiffFocus]) {
      it(
        `block variant ${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-toggle-slide style="display: block;">
              <sbb-title level="5" style="margin: 0;">Accessible Connection.</sbb-title>
              <span class="sbb-text-s" style="color: var(--sbb-color-4);">
                Show connections for accessible journeys.
              </span>
            </sbb-toggle-slide>
            <p class="sbb-text-xs">
              In this example <code>&lt;sbb-toggle-slide&gt;</code> is converted to a block element
              by setting <code>display: block</code>.
            </p>
          `);
        }),
      );
    }
  });
});
