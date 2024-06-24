import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import readme from './readme.md?raw';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm'],
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
  'color-theme': colorTheme,
};

const defaultArgs: Args = {
  size: size.options![1],
  negative: false,
  striped: true,
  'color-theme': colorTheme.options![0],
};

const caption: () => TemplateResult = () => html`
  <caption>
    Front-end web developer course 2021
  </caption>
`;

const header: () => TemplateResult = () => html`
  <thead>
    <tr>
      <th>Person</th>
      <th>Most interest in</th>
      <th>Age</th>
    </tr>
  </thead>
`;

const body: () => TemplateResult = () => html`
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
    <tr>
      <td>Sarah</td>
      <td>JavaScript frameworks</td>
      <td>29</td>
    </tr>
    <tr>
      <td>KAREN</td>
      <td>Web performance</td>
      <td>36</td>
    </tr>
  </tbody>
`;

const Template = (args: Args): TemplateResult => html`
  <table
    class=${classMap({
      'sbb-table--negative': args.negative,
      'sbb-table-s': args.size === 's',
      'sbb-table-m': args.size === 'm',
      'sbb-table--unstriped': !args.striped,
      'sbb-table--theme-iron': args['color-theme'] === 'iron',
    })}
  >
    ${caption()} ${header()} ${body()}
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

const meta: Meta = {
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'styles/table',
};

export default meta;
