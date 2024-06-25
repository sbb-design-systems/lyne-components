import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualRegressionFixture,
} from '../core/testing/private.js';

import '../icon.js';
import '../title.js';
import './toggle-check.js';

describe(`sbb-toggle-check`, () => {
  let root: HTMLElement;

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

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ size, label }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-toggle-check size=${size as 'xs' | 's' | 'm'}>
            ${label !== 'Long label' ? label : longLabel}
          </sbb-toggle-check>
        `);
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    describe('checked', () => {
      for (const state of [visualDiffDefault, visualDiffFocus]) {
        it(
          state.name,
          state.with(async (setup) => {
            await setup.withFixture(html` <sbb-toggle-check checked> Label </sbb-toggle-check> `);
          }),
        );
      }
    });

    describe('without label', () => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html` <sbb-toggle-check></sbb-toggle-check> `);
        }),
      );
    });

    describe('label before', () => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-toggle-check label-position="before">Label</sbb-toggle-check>
          `);
        }),
      );
    });

    describe('custom icon', () => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-toggle-check checked icon-name="face-smiling-small">Label</sbb-toggle-check>
          `);
        }),
      );
    });

    describe('custom icon slotted', () => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-toggle-check checked
              >Label
              <sbb-icon slot="icon" name="eye-small"></sbb-icon>
            </sbb-toggle-check>
          `);
        }),
      );
    });

    describeEach({ checked: [false, true] }, ({ checked }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-toggle-check .checked=${checked} ?checked=${checked} disabled>
            Label
          </sbb-toggle-check>
        `);
      });

      it(
        `disabled ${visualDiffDefault.name}`,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    describe('block variant', () => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <div>
              <sbb-toggle-check label-position="before" style="display: block;">
                <sbb-title level="5" style="margin: 0;"> Accessible Connection. </sbb-title>
                <span class="sbb-text-s" style="color: var(--sbb-color-iron);">
                  Show connections for accessible journeys.
                </span>
              </sbb-toggle-check>
              <p class="sbb-text-xs">
                In this example <code>&lt;sbb-toggle-check&gt;</code> is converted to a block
                element by setting <code>display: block</code>.
              </p>
            </div>
          `);
        }),
      );
    });
  });
});
