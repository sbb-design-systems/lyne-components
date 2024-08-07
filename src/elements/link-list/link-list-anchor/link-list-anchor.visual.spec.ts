import { html, nothing, type TemplateResult } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import './link-list-anchor.js';
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
  const cases = {
    negative: [false, true],
    size: ['xs', 's', 'm'],
  };

  describeViewports({ viewports: ['zero', 'medium', 'wide'] }, () => {
    describeEach(cases, ({ negative, size }) => {
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
