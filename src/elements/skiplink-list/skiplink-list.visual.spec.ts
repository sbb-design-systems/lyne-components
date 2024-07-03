import { html, type TemplateResult } from 'lit';

import { describeViewports, visualDiffDefault, visualDiffFocus } from '../core/testing/private.js';

import './skiplink-list.js';
import '../link/block-link.js';

const links = (): TemplateResult => html`
  <sbb-block-link href="#">Link 1</sbb-block-link>
  <sbb-block-link href="#">Link 2</sbb-block-link>
  <sbb-block-link href="#">Link 3</sbb-block-link>
`;

describe(`sbb-skiplink-list`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    it(
      'not focused',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html` <sbb-skiplink-list title-content="Skip to"> ${links()} </sbb-skiplink-list> `,
          { minHeight: '100px' },
        );
      }),
    );

    it(
      `no title`,
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(html` <sbb-skiplink-list> ${links()} </sbb-skiplink-list> `, {
          minHeight: '100px',
        });
      }),
    );

    it(
      `title content`,
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-skiplink-list title-content="Skip to" title-level="3">
              ${links()}
            </sbb-skiplink-list>
          `,
          { minHeight: '100px' },
        );
      }),
    );

    it(
      `slotted title`,
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-skiplink-list>
              <span slot="title">Slotted title</span>
              ${links()}
            </sbb-skiplink-list>
          `,
          { minHeight: '100px' },
        );
      }),
    );
  });
});
