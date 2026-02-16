import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../core/testing/private.ts';

import '../icon.ts';
import '../title.ts';
import './toggle-check.component.ts';

describe(`sbb-toggle-check`, () => {
  const longLabel = `For this example we need a very long label, like lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras nec dolor eget leo porttitor ultrices. Mauris sed erat nec justo posuere elementum.
  In pharetra ante vel fringilla tincidunt. Fusce congue accumsan arcu dictum porttitor.
  Pellentesque urna justo, lacinia at velit eu, sagittis tempus nibh.
  Quisque vitae massa et turpis fermentum tristique.`;

  const sizeCases = { size: ['xs', 's', 'm'] };

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
            <sbb-toggle-check size=${size}>
              ${label !== 'Long label' ? label : longLabel}
            </sbb-toggle-check>
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
                  <sbb-toggle-check ?disabled=${disabled} ?checked=${checked}>
                    Label
                  </sbb-toggle-check>
                `,
                { forcedColors, darkMode },
              );
            }),
          );
        }
      },
    );

    it(
      `long label ${visualDiffFocus.name}`,
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(html`<sbb-toggle-check>${longLabel}</sbb-toggle-check>`);
      }),
    );

    it(
      'without label',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`<sbb-toggle-check></sbb-toggle-check>`);
      }),
    );

    it(
      'label before',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-toggle-check label-position="before">Label</sbb-toggle-check>
        `);
      }),
    );

    it(
      'custom icon',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-toggle-check checked icon-name="face-smiling-small">Label</sbb-toggle-check>
        `);
      }),
    );

    it(
      'custom icon slotted',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-toggle-check checked>
            Label
            <sbb-icon slot="icon" name="eye-small"></sbb-icon>
          </sbb-toggle-check>
        `);
      }),
    );

    for (const state of [visualDiffDefault, visualDiffFocus]) {
      it(
        `block variant ${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-toggle-check label-position="before" style="display: block;">
              <sbb-title level="5" style="margin: 0;">Accessible Connection.</sbb-title>
              <span class="sbb-text-s" style="color: var(--sbb-color-4);">
                Show connections for accessible journeys.
              </span>
            </sbb-toggle-check>
            <p class="sbb-text-xs">
              In this example <code>&lt;sbb-toggle-check&gt;</code> is converted to a block element
              by setting <code>display: block</code>.
            </p>
          `);
        }),
      );
    }
  });
});
