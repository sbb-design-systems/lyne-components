import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { InputType } from 'storybook/internal/types';

import type { SbbCheckboxElement } from '../checkbox.pure.ts';

import readme from './readme.md?raw';

import '../table.ts';
import '../form-field.ts';
import '../checkbox.ts';

/**
 * Table examples.
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

const withSubtitle: InputType = {
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

const withRowHover: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  size,
  negative,
  striped,
  inlineFilters,
  groupWithNext,
  withSubtitle,
  'color-theme': colorTheme,
  withRowHover,
};

const defaultArgs: Args = {
  size: undefined,
  negative: false,
  striped: false,
  'inline-filters': false,
  groupWithNext: false,
  withSubtitle: false,
  'color-theme': colorTheme.options![0],
  withRowHover: false,
};

const caption: () => TemplateResult = () => html`
  <caption>
    Front-end web developer course 2021
  </caption>
`;

const header: (groupWithNext?: boolean, withSubtitle?: boolean) => TemplateResult = (
  groupWithNext = false,
  withSubtitle = false,
) => html`
  <thead>
    <tr>
      <th class=${groupWithNext ? 'sbb-table-group-with-next' : ''}>
        Person${withSubtitle ? html` <div class="sbb-table-header-subtitle">Subtitle</div>` : ''}
      </th>
      <th>
        Most interest
        in${withSubtitle ? html` <div class="sbb-table-header-subtitle">Subtitle</div>` : ''}
      </th>
      <th>
        Age${withSubtitle ? html` <div class="sbb-table-header-subtitle">Subtitle</div>` : ''}
      </th>
    </tr>
  </thead>
`;

const headerWithFilters: (groupWithNext?: boolean, withSubtitle?: boolean) => TemplateResult = (
  groupWithNext = false,
  withSubtitle = false,
) => html`
  <thead>
    <tr>
      <th class=${groupWithNext ? 'sbb-table-group-with-next' : ''}>
        Person${withSubtitle ? html` <div class="sbb-table-header-subtitle">Subtitle</div>` : ''}
      </th>
      <th>
        Most interest
        in${withSubtitle ? html` <div class="sbb-table-header-subtitle">Subtitle</div>` : ''}
      </th>
      <th>
        Age${withSubtitle ? html` <div class="sbb-table-header-subtitle">Subtitle</div>` : ''}
      </th>
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

const body: (groupWithNext?: boolean) => TemplateResult = (groupWithNext = false) => html`
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
  'sbb-table': !args.size,
  'sbb-table-xs': args.size === 'xs',
  'sbb-table-s': args.size === 's',
  'sbb-table-m': args.size === 'm',
  'sbb-table--striped': args.striped,
  'sbb-table--theme-iron': args['color-theme'] === 'iron',
  'sbb-table--hover': args.withRowHover,
});

const Template = (args: Args): TemplateResult => html`
  <table class=${classMap(tableClasses(args))}>
    ${caption()}
    ${
      args['inline-filters']
        ? headerWithFilters(args.groupWithNext, args.withSubtitle)
        : header(args.groupWithNext, args.withSubtitle)
    }
    ${body(args.groupWithNext)}
  </table>
`;

const withoutHeaderTemplate = (args: Args): TemplateResult => html`
  <table class=${classMap(tableClasses(args))}>
    ${caption()} ${body(args.groupWithNext)}
  </table>
`;

const SelectableTemplate = (args: Args): TemplateResult => html`
  <table class=${classMap(tableClasses(args))}>
    <thead>
      <tr>
        <th></th>
        <th>Train</th>
        <th>From</th>
        <th>To</th>
        <th>Departure</th>
        <th>Arrival</th>
      </tr>
    </thead>
    <tbody>
      ${[
        ['IC 1', 'Geneva', 'Zürich HB', '08:00', '10:30'],
        ['IR 15', 'Lausanne', 'Bern', '08:15', '09:10'],
        ['ICE 375', 'Basel SBB', 'Frankfurt', '09:00', '11:58'],
        ['RE 3', 'Olten', 'Aarau', '09:45', '10:05'],
      ].map(
        ([train, from, to, departure, arrival]) => html`
          <tr>
            <td>
              <sbb-checkbox
                aria-label="Select train ${train} from ${from} to ${to}"
                @change=${(e: Event) => {
                  const tr = (e.target as HTMLElement).closest('tr');
                  tr?.classList.toggle(
                    'sbb-table--selected',
                    (e.target as SbbCheckboxElement).checked,
                  );
                }}
              ></sbb-checkbox>
            </td>
            <td>${train}</td>
            <td>${from}</td>
            <td>${to}</td>
            <td>${departure}</td>
            <td>${arrival}</td>
          </tr>
        `,
      )}
    </tbody>
  </table>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

export const SizeXS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![0] },
};

export const Striped: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, striped: true },
};

export const Negative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const IronTheme: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'color-theme': 'iron' },
};

export const WithFilters: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'inline-filters': true, size: size.options![1] },
};

export const WithoutHeader: StoryObj = {
  render: withoutHeaderTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'inline-filters': true, size: size.options![1] },
};

export const GroupWithNext: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, groupWithNext: true },
};

export const HeaderSubtitle: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, withSubtitle: true },
};

export const Hover: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, striped: true, withRowHover: true },
};

export const Selectable: StoryObj = {
  render: SelectableTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, striped: true, withRowHover: true },
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

const withWrapperArgTypes: ArgTypes = {
  negative,
  focusable,
  sticky,
};

const withWrapperArgs: Args = {
  negative: false,
  focusable: false,
  sticky: false,
};

const withWrapperHeader = (sticky = false): TemplateResult => html`
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

const withWrapperBody = (sticky = false): TemplateResult => html`
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

const WithWrapperTemplate = (args: Args): TemplateResult => html`
  <sbb-table-wrapper ?negative=${args.negative} ?focusable=${args.focusable} style="height: 75vh">
    <table
      aria-label="Train lines 2024"
      class=${classMap({
        'sbb-table': true,
        'sbb-table--negative': args.negative,
      })}
    >
      ${withWrapperHeader(args.sticky)} ${withWrapperBody(args.sticky)}
    </table>
  </sbb-table-wrapper>
  <p class="sbb-table-caption">Train lines 2024</p>
`;

export const TableWrapper: StoryObj = {
  render: WithWrapperTemplate,
  argTypes: withWrapperArgTypes,
  args: { ...withWrapperArgs },
};

export const TableWrapperNegative: StoryObj = {
  render: WithWrapperTemplate,
  argTypes: withWrapperArgTypes,
  args: { ...withWrapperArgs, negative: true },
};

export const TableWrapperSticky: StoryObj = {
  render: WithWrapperTemplate,
  argTypes: withWrapperArgTypes,
  args: { ...withWrapperArgs, sticky: true },
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
