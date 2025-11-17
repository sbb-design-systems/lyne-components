import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../core/testing/private.ts';

import '../../icon.ts';
import './error.component.ts';

describe(`sbb-error`, () => {
  let root: HTMLElement;

  const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit,
    ultricies in tincidunt quis, mattis eu quam. Nulla sit amet lorem fermentum, molestie nunc ut, hendrerit risus. Vestibulum
    rutrum elit et lacus sollicitudin, quis malesuada lorem vehicula. Suspendisse at augue quis tellus vulputate tempor.
    Vivamus urna velit, varius nec est ac, mollis efficitur lorem. Quisque non nisl eget massa interdum tempus. Praesent
    vel feugiat metus. Donec pharetra odio at turpis bibendum, vel commodo dui vulputate. Aenean congue nec nisl vel bibendum.
    Praesent sit amet lorem augue. Suspendisse ornare a justo sagittis fermentum.`;

  const cases = {
    negative: [false, true],
    iconName: [undefined, 'chevron-small-right-small'],
    errorText: ['short', 'long'],
  };

  const colorCases = {
    negative: [false, true],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    describeEach(cases, ({ negative, iconName, errorText }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-error .negative=${negative}>
              ${iconName ? html`<sbb-icon name=${iconName} slot="icon"></sbb-icon>` : nothing}
              ${errorText === 'short' ? 'Required field.' : longText}
            </sbb-error>
          `,
          { backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined },
        );
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });
  });

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(colorCases, ({ negative, emulateMedia: { forcedColors, darkMode } }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-error .negative=${negative}>
              <sbb-icon name="chevron-small-right-small" slot="icon"></sbb-icon>
              Required field.
            </sbb-error>
          `,
          {
            backgroundColor: negative ? 'var(--sbb-background-color-1-negative)' : undefined,
            forcedColors,
            darkMode,
          },
        );
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });
  });
});
