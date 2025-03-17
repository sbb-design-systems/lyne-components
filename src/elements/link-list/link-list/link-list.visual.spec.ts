import { html, type TemplateResult } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import './link-list.component.js';
import '../../link/block-link.js';

describe(`sbb-link-list`, () => {
  let root: HTMLElement;

  const cases = {
    negative: [false, true],
    orientation: ['horizontal', 'vertical'],
    size: ['xs', 's', 'm'],
  };

  const linksTemplate = (): TemplateResult => html`
    <sbb-block-link href="#">Link 1</sbb-block-link>
    <sbb-block-link href="#">Link 2</sbb-block-link>
    <sbb-block-link href="#">Link 3</sbb-block-link>
    <sbb-block-link href="#">Link 4</sbb-block-link>
    <sbb-block-link href="#">Link 5</sbb-block-link>
  `;

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    // Main test cases
    describeEach(cases, ({ negative, orientation, size }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-link-list ?negative=${negative} orientation=${orientation} size=${size}>
              <span slot="title">Help &amp; Contact</span>
              ${linksTemplate()}
            </sbb-link-list>
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

    it(
      `horizontal-from=medium`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-link-list horizontal-from="medium">
            <span slot="title">Help &amp; Contact</span>
            ${linksTemplate()}
          </sbb-link-list>
        `);
      }),
    );
  });
});
