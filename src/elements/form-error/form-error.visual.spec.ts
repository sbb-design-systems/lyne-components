import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualRegressionFixture,
  visualDiffDefault,
} from '../core/testing/private.js';

import '../icon.js';
import './form-error.component.js';

describe(`sbb-form-error`, () => {
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

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ negative, iconName, errorText }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-form-error .negative=${negative}>
              ${iconName ? html`<sbb-icon name=${iconName} slot="icon"></sbb-icon>` : nothing}
              ${errorText === 'short' ? 'Required field.' : longText}
            </sbb-form-error>
          `,
          { backgroundColor: negative ? 'var(--sbb-color-charcoal)' : undefined },
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
