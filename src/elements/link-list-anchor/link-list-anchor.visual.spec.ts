import { html, nothing, type TemplateResult } from 'lit';

import { describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './link-list-anchor.js';
import '../link/block-link.js';

const links = (): TemplateResult[] =>
  new Array(5).fill('').map((_v, i) => html` <sbb-block-link href="#">Link ${i}</sbb-block-link> `);
const title = 'Help &amp; Contact';
const listAnchor = (
  titleContent?: boolean,
  negative?: boolean,
  slottedTitle?: boolean,
): TemplateResult => html`
  <sbb-link-list-anchor title-content=${titleContent ? title : nothing} ?negative=${negative}>
    ${slottedTitle ? html`<span slot="title">${title}</span>` : nothing} ${links()}
  </sbb-link-list-anchor>
`;

describe(`sbb-link-list-anchor`, () => {
  describeViewports({ viewports: ['zero', 'medium', 'wide'] }, () => {
    it(
      `default`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(listAnchor(true));
      }),
    );

    it(
      `negative`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(listAnchor(false, true, true), {
          backgroundColor: 'var(--sbb-color-charcoal)',
        });
      }),
    );

    it(
      `no title`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(listAnchor());
      }),
    );
  });
});
