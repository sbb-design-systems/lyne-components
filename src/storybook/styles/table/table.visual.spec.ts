import { html, type TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import type { ClassInfo } from 'lit-html/directives/class-map.js';

import {
  describeEach,
  describeViewports,
  visualRegressionFixture,
  visualDiffDefault,
} from '../../../elements/core/testing/private.js';

describe(`table`, () => {
  let root: HTMLElement;

  const cases = {
    negative: [false, true],
    striped: [false, true],
  };

  const sizeCases = {
    size: ['m', 's', 'xs'],
  };

  const header = (): TemplateResult => html`
    <thead>
      <tr>
        <th>Person</th>
        <th>Most interest in</th>
        <th>Age</th>
      </tr>
    </thead>
  `;

  const headerWithFilters = (): TemplateResult => html`
    <thead>
      <tr>
        <th>Person</th>
        <th>Most interest in</th>
        <th>Age</th>
      </tr>
      <tr>
        <th class="sbb-table-filter"><input /></th>
        <th class="sbb-table-filter"><input /></th>
        <th class="sbb-table-filter"><input /></th>
      </tr>
    </thead>
  `;

  const body = (): TemplateResult => html`
    <tbody>
      <tr>
        <td>Chris</td>
        <td>HTML tables</td>
        <td>22</td>
      </tr>
      <tr>
        <td>Dennis</td>
        <td>Web accessibility</td>
        <td>45</td>
      </tr>
    </tbody>
  `;

  const caption = (): TemplateResult => html`
    <caption>
      Table caption
    </caption>
  `;

  const tableTemplate = (classInfo: ClassInfo): TemplateResult => html`
    <table class=${classMap(classInfo)}>
      ${header()} ${body()} ${caption()}
    </table>
  `;

  const tableWithFiltersTemplate = (classInfo: ClassInfo): TemplateResult => html`
    <table class=${classMap(classInfo)}>
      ${headerWithFilters()} ${body()} ${caption()}
    </table>
  `;

  describeViewports({ viewports: ['medium'] }, () => {
    describeEach(cases, ({ negative, striped }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          tableTemplate({
            'sbb-table': true,
            'sbb-table--negative': negative,
            'sbb-table--unstriped': !striped,
          }),
          {
            backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
          },
        );
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    // Size cases
    for (const size of sizeCases.size) {
      it(
        `size=${size} ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            tableTemplate({
              'sbb-table-xs': size === 'xs',
              'sbb-table-s': size === 's',
              'sbb-table-m': size === 'm',
            }),
          );
        }),
      );

      it(
        `size=${size} inline-filters`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            tableWithFiltersTemplate({
              'sbb-table-xs': size === 'xs',
              'sbb-table-s': size === 's',
              'sbb-table-m': size === 'm',
            }),
          );
        }),
      );
    }

    describe('iron-theme', () => {
      for (const negative of [false, true]) {
        it(
          `negative=${negative}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              tableTemplate({
                'sbb-table': true,
                'sbb-table--theme-iron': true,
                'sbb-table--negative': negative,
              }),
              {
                backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
              },
            );
          }),
        );
      }
    });
  });
});
