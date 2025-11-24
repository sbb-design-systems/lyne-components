import { html, type TemplateResult } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../core/testing/private.ts';

import './link-list.component.ts';
import '../../link/block-link.ts';

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

  describeViewports({ viewports: ['zero', 'large'] }, () => {
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

    it(
      `horizontal-from=large`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-link-list horizontal-from="large">
            <span slot="title">Help &amp; Contact</span>
            ${linksTemplate()}
          </sbb-link-list>
        `);
      }),
    );
  });

  describeViewports({ viewports: ['zero'] }, () => {
    it(
      `darkMode=true`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-link-list horizontal-from="large">
              <span slot="title">Help &amp; Contact</span>
              ${linksTemplate()}
            </sbb-link-list>
          `,
          { darkMode: true },
        );
      }),
    );
  });
});
