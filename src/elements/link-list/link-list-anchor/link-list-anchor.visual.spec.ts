import { html, nothing, type TemplateResult } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import './link-list-anchor.component.js';
import '../../link/block-link.js';

const links = (): TemplateResult[] =>
  new Array(5).fill('').map((_v, i) => html` <sbb-block-link href="#">Link ${i}</sbb-block-link> `);
const title = 'Help & Contact';
const listAnchor = (
  negative: boolean,
  size: string,
  titleContent?: boolean,
  slottedTitle?: boolean,
): TemplateResult => html`
  <sbb-link-list-anchor
    title-content=${titleContent ? title : nothing}
    ?negative=${negative || nothing}
    size=${size}
  >
    ${slottedTitle ? html`<span slot="title">Slotted title</span>` : nothing} ${links()}
  </sbb-link-list-anchor>
`;

describe(`sbb-link-list-anchor`, () => {
  const cases = { negative: [false, true] };

  describeViewports({ viewports: ['zero', 'medium', 'wide'] }, () => {
    describeEach(cases, ({ negative }) => {
      let root: HTMLElement;

      beforeEach(async function () {
        root = await visualRegressionFixture(listAnchor(negative, 's', true), {
          backgroundColor: negative ? 'var(--sbb-color-charcoal)' : undefined,
        });
      });

      for (const state of [visualDiffActive, visualDiffHover, visualDiffFocus]) {
        it(
          state.name,
          state.with((setup) => {
            setup.withSnapshotElement(root);
          }),
        );
      }
    });

    describeEach({ ...cases, size: ['xs', 's', 'm'] }, ({ negative, size }) => {
      it(
        'title',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(listAnchor(negative, size, true), {
            backgroundColor: negative ? 'var(--sbb-color-charcoal)' : undefined,
          });
        }),
      );

      it(
        'no title',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(listAnchor(negative, size), {
            backgroundColor: negative ? 'var(--sbb-color-charcoal)' : undefined,
          });
        }),
      );

      it(
        'slotted title',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(listAnchor(negative, size, false, true), {
            backgroundColor: negative ? 'var(--sbb-color-charcoal)' : undefined,
          });
        }),
      );
    });
  });
});
