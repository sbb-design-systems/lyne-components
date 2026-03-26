import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import type { InputType } from 'storybook/internal/types';

import '../../../elements/form-field.ts';

import readme from './readme.md?raw';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['xs', 's', 'm'],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
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

const defaultArgTypes: ArgTypes = {
  size,
  negative,
  striped,
  inlineFilters,
  groupWithNext,
  'color-theme': colorTheme,
};

const defaultArgs: Args = {
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

const header: (groupWithNext?: boolean) => TemplateResult = (groupWithNext = false) => html`
  <thead>
    <tr>
      <th class=${groupWithNext ? 'sbb-table-group-with-next' : ''}>Person</th>
      <th>Most interest in</th>
      <th>Age</th>
    </tr>
  </thead>
`;

const headerWithFilters: (groupWithNext?: boolean) => TemplateResult = (
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
  'sbb-table-xs': args.size === 'xs',
  'sbb-table-s': args.size === 's',
  'sbb-table-m': args.size === 'm',
  'sbb-table--unstriped': !args.striped,
  'sbb-table--theme-iron': args['color-theme'] === 'iron',
});

const Template = (args: Args): TemplateResult => html`
  <table class=${classMap(tableClasses(args))}>
    ${caption()}
    ${args['inline-filters'] ? headerWithFilters(args.groupWithNext) : header(args.groupWithNext)}
    ${body(args.groupWithNext)}
  </table>
`;

const WithoutHeaderTemplate = (args: Args): TemplateResult => html`
  <table class=${classMap(tableClasses(args))}>
    ${caption()} ${body(args.groupWithNext)}
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
  args: { ...defaultArgs, size: 's' },
};

export const SizeXS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: 'xs' },
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
  args: { ...defaultArgs, 'inline-filters': true, size: 's' },
};

export const WithoutHeader: StoryObj = {
  render: WithoutHeaderTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'inline-filters': true, size: 's' },
};

export const GroupWithNext: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, groupWithNext: true },
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
  title: 'styles/Table',
};

export default meta;
