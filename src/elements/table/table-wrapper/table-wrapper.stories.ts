import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { InputType } from 'storybook/internal/types';

import readme from './readme.md?raw';
import './table-wrapper.component.ts';

const columns = [
  'Line',
  'From',
  'To',
  'Provider',
  'Year',
  'Trains count',
  'Tons',
  'Timestamp',
  'Record ID',
];
const data = [
  [
    'Lausanne - Fribourg - Bern Steigerhubel',
    'Schmitten',
    'Wünnewil',
    'SBB',
    '2024',
    '1756',
    '1052197',
    '2024-03-08T14:23:54.78Z',
    'c4dd',
  ],
  [
    'Lausanne - Fribourg - Bern Steigerhubel',
    'Thörishaus Station',
    'Oberwangen',
    'SBB',
    '2024',
    '2007',
    '1131857',
    '2024-03-08T14:23:54.78Z',
    'de82',
  ],
  [
    'Lausanne - Fribourg - Bern Steigerhubel',
    'Villars-sur-Glâne',
    'Fribourg/Freiburg',
    'SBB',
    '2024',
    '36110',
    '10803746',
    '2024-03-08T14:23:54.78Z',
    '740a',
  ],
  [
    'Löchligut/Solothurn - NBS/ABS - Olten',
    'Derendingen',
    'Subingen',
    'SBB',
    '2024',
    '10',
    '10147',
    '2024-03-08T14:23:54.78Z',
    '0396',
  ],
];

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const focusable: InputType = {
  control: {
    type: 'boolean',
  },
};

const sticky: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  negative,
  focusable,
  sticky,
};

const defaultArgs: Args = {
  negative: false,
  focusable: false,
  sticky: false,
};

const header = (sticky = false): TemplateResult => html`
  <thead>
    <tr>
      ${columns.map(
        (c, i) => html`
          <th
            scope="col"
            class=${classMap({
              'sbb-table-sticky': sticky,
              'sbb-table-sticky-border-elem-left': sticky && i === 0,
              'sbb-table-sticky-border-elem-right': sticky && i === columns.length - 1,
            })}
            style=${styleMap({
              top: sticky ? '0' : null,
              left: sticky && i === 0 ? '0' : null,
              right: sticky && i === columns.length - 1 ? '0' : null,
              zIndex: sticky ? (i === 0 || i === columns.length - 1 ? '101' : '100') : null,
            })}
          >
            ${c}
          </th>
        `,
      )}
    </tr>
  </thead>
`;

const body = (sticky = false): TemplateResult => html`
  <tbody>
    ${data.map(
      (row) => html`
        <tr>
          ${row.map(
            (d, i) => html`
              <td
                class=${classMap({
                  'sbb-table-sticky': sticky && (i === 0 || i === columns.length - 1),
                  'sbb-table-sticky-border-elem-left': sticky && i === 0,
                  'sbb-table-sticky-border-elem-right': sticky && i === columns.length - 1,
                })}
                style=${styleMap({
                  left: sticky && i === 0 ? '0' : null,
                  right: sticky && i === columns.length - 1 ? '0' : null,
                  zIndex: sticky && (i === 0 || i === columns.length - 1) ? '1' : null,
                })}
              >
                ${d}
              </td>
            `,
          )}
        </tr>
      `,
    )}
  </tbody>
`;

const Template = (args: Args): TemplateResult => html`
  <sbb-table-wrapper ?negative=${args.negative} ?focusable=${args.focusable} style="height: 75vh">
    <table
      aria-label="Train lines 2024"
      class=${classMap({
        'sbb-table': true,
        'sbb-table--negative': args.negative,
      })}
    >
      ${header(args.sticky)} ${body(args.sticky)}
    </table>
  </sbb-table-wrapper>
  <p class="sbb-table-caption">Train lines 2024</p>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Negative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const Sticky: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, sticky: true },
};

const meta: Meta = {
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-table/sbb-table-wrapper',
};

export default meta;
