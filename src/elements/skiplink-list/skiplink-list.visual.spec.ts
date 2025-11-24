import { html, nothing, type TemplateResult } from 'lit';

import { describeViewports, visualDiffDefault, visualDiffFocus } from '../core/testing/private.ts';

import './skiplink-list.component.ts';
import '../link/block-link.ts';

const template = (title?: string): TemplateResult => html`
  <sbb-skiplink-list title-content=${title || nothing}>
    <sbb-block-link href="#">Link 1</sbb-block-link>
    <sbb-block-link href="#">Link 2</sbb-block-link>
    <sbb-block-link href="#">Link 3</sbb-block-link>
  </sbb-skiplink-list>
`;

describe(`sbb-skiplink-list`, () => {
  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const state of [visualDiffDefault, visualDiffFocus]) {
      it(
        state.name,
        state.with(async (setup) => {
          await setup.withFixture(template(), { minHeight: '100px' });
        }),
      );
    }

    describe('with one link', () => {
      for (const state of [visualDiffDefault, visualDiffFocus]) {
        it(
          state.name,
          state.with(async (setup) => {
            await setup.withFixture(
              html`
                <sbb-skiplink-list>
                  <sbb-block-link href="#">Link 1</sbb-block-link>
                </sbb-skiplink-list>
              `,
              { minHeight: '100px' },
            );
          }),
        );
      }
    });

    it(
      `title content`,
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(template('Skip to'), { minHeight: '100px' });
      }),
    );

    it(
      `darkMode=true`,
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(template(), { minHeight: '100px', darkMode: true });
      }),
    );
  });
});
