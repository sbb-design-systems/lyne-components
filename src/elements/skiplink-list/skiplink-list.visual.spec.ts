import { html, nothing, type TemplateResult } from 'lit';

import { describeViewports, visualDiffDefault, visualDiffFocus } from '../core/testing/private.js';

import './skiplink-list.js';
import '../link/block-link.js';

const template = (title?: string): TemplateResult => html`
  <sbb-skiplink-list title-content=${title || nothing}>
    <sbb-block-link href="#">Link 1</sbb-block-link>
    <sbb-block-link href="#">Link 2</sbb-block-link>
    <sbb-block-link href="#">Link 3</sbb-block-link>
  </sbb-skiplink-list>
`;

describe(`sbb-skiplink-list`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    it(
      'not focused',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template(), { minHeight: '100px' });
      }),
    );

    it(
      `no title`,
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(template(), { minHeight: '100px' });
      }),
    );

    it(
      `title content`,
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(template(), { minHeight: '100px' });
      }),
    );
  });
});
