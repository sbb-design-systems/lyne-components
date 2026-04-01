import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { InputType } from 'storybook/internal/types';

import readme from './readme.md?raw';

import '../table.ts';
import '../form-field.ts';

/**
 * Simple table examples.
 */

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['xs', 's', 'm'],
};

const striped: InputType = {
  control: {
    type: 'boolean',
  },
};

const inlineFilters: InputType = {
  control: {
    type: 'boolean',
  },
};

const groupWithNext: InputType = {
  control: {
    type: 'boolean',
  },
};

const colorTheme: InputType = {
  options: ['none', 'iron'],
  control: {
    type: 'select',
  },
};

const simpleDefaultArgTypes: ArgTypes = {
  size,
  negative,
  striped,
  inlineFilters,
  groupWithNext,
  'color-theme': colorTheme,
};

const simpleDefaultArgs: Args = {
  size: 'm',
  negative: false,
  striped: true,
  'inline-filters': false,
  groupWithNext: false,
  'color-theme': colorTheme.options![0],
};

const caption: () => TemplateResult = () => html`
  <caption>
    Front-end web developer course 2021
  </caption>
`;

const simpleHeader: (groupWithNext?: boolean) => TemplateResult = (groupWithNext = false) => html`
  <thead>
    <tr>
      <th class=${groupWithNext ? 'sbb-table-group-with-next' : ''}>Person</th>
      <th>Most interest in</th>
      <th>Age</th>
    </tr>
  </thead>
`;

const simpleHeaderWithFilters: (groupWithNext?: boolean) => TemplateResult = (
  groupWithNext = false,
) => html`
  <thead>
    <tr>
      <th class=${groupWithNext ? 'sbb-table-group-with-next' : ''}>Person</th>
      <th>Most interest in</th>
      <th>Age</th>
    </tr>
    <tr>
      <th class="sbb-table-filter">
        <sbb-form-field size="s"><input placeholder="Placeholder" /></sbb-form-field>
      </th>
      <th class="sbb-table-filter">
        <sbb-form-field size="s"><input placeholder="Placeholder" /></sbb-form-field>
      </th>
      <th class="sbb-table-filter">
        <sbb-form-field size="s"><input placeholder="Placeholder" /></sbb-form-field>
      </th>
    </tr>
  </thead>
`;

const simpleBody: (groupWithNext?: boolean) => TemplateResult = (groupWithNext = false) => html`
  <tbody>
    <tr>
      <td class=${groupWithNext ? 'sbb-table-group-with-next' : ''}>Chris</td>
      <td>HTML tables</td>
      <td>22</td>
    </tr>
    <tr>
      <td class=${groupWithNext ? 'sbb-table-group-with-next' : ''}>Dennis</td>
      <td>Web accessibility</td>
      <td>45</td>
    </tr>
    <tr>
      <td class=${groupWithNext ? 'sbb-table-group-with-next' : ''}>Sarah</td>
      <td>JavaScript frameworks</td>
      <td>29</td>
    </tr>
    <tr>
      <td class=${groupWithNext ? 'sbb-table-group-with-next' : ''}>KAREN</td>
      <td>Web performance</td>
      <td>36</td>
    </tr>
  </tbody>
`;

const tableClasses = (args: Args): Record<string, boolean> => ({
  'sbb-table--negative': args.negative,
  'sbb-table-xs': args.size === 'xs',
  'sbb-table-s': args.size === 's',
  'sbb-table-m': args.size === 'm',
  'sbb-table--unstriped': !args.striped,
  'sbb-table--theme-iron': args['color-theme'] === 'iron',
});

const SimpleTemplate = (args: Args): TemplateResult => html`
  <table class=${classMap(tableClasses(args))}>
    ${caption()}
    ${args['inline-filters']
      ? simpleHeaderWithFilters(args.groupWithNext)
      : simpleHeader(args.groupWithNext)}
    ${simpleBody(args.groupWithNext)}
  </table>
`;

const SimpleWithoutHeaderTemplate = (args: Args): TemplateResult => html`
  <table class=${classMap(tableClasses(args))}>
    ${caption()} ${simpleBody(args.groupWithNext)}
  </table>
`;

export const Simple: StoryObj = {
  render: SimpleTemplate,
  argTypes: simpleDefaultArgTypes,
  args: { ...simpleDefaultArgs },
};

export const SimpleSizeS: StoryObj = {
  render: SimpleTemplate,
  argTypes: simpleDefaultArgTypes,
  args: { ...simpleDefaultArgs, size: 's' },
};

export const SimpleSizeXS: StoryObj = {
  render: SimpleTemplate,
  argTypes: simpleDefaultArgTypes,
  args: { ...simpleDefaultArgs, size: 'xs' },
};

export const SimpleNegative: StoryObj = {
  render: SimpleTemplate,
  argTypes: simpleDefaultArgTypes,
  args: { ...simpleDefaultArgs, negative: true },
};

export const SimpleIronTheme: StoryObj = {
  render: SimpleTemplate,
  argTypes: simpleDefaultArgTypes,
  args: { ...simpleDefaultArgs, 'color-theme': 'iron' },
};

export const SimpleWithFilters: StoryObj = {
  render: SimpleTemplate,
  argTypes: simpleDefaultArgTypes,
  args: { ...simpleDefaultArgs, 'inline-filters': true, size: 's' },
};

export const SimpleWithoutHeader: StoryObj = {
  render: SimpleWithoutHeaderTemplate,
  argTypes: simpleDefaultArgTypes,
  args: { ...simpleDefaultArgs, 'inline-filters': true, size: 's' },
};

export const SimpleGroupWithNext: StoryObj = {
  render: SimpleTemplate,
  argTypes: simpleDefaultArgTypes,
  args: { ...simpleDefaultArgs, groupWithNext: true },
};

/**
 * Table-wrapper examples.
 */

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

export const TableWrapper: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const TableWrapperNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const TableWrapperSticky: StoryObj = {
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
  title: 'elements/Table',
};

export default meta;
