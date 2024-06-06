import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import readme from './readme.md?raw';
import './table-wrapper.js';

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm'],
};

const defaultArgTypes: ArgTypes = {
  negative,
  size,
};

const defaultArgs: Args = {
  negative: false,
  size: size.options![1],
};

const caption: () => TemplateResult = () => html`
  <caption>
    Front-end web developer course 2021
  </caption>
`;

const header: () => TemplateResult = () => html`
  <thead>
    <tr>
      <th scope="col">Person</th>
      <th scope="col">Most interest in</th>
      <th scope="col">Age</th>
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
  <sbb-table-wrapper>
    <table
      class=${classMap({
        'sbb-table': true,
        'sbb-table-negative': args.negative,
        'sbb-table-s': args.size === 's',
        'sbb-table-m': args.size === 'm',
      })}
    >
      ${caption()} ${header()} ${body()}
    </table>
  </sbb-table-wrapper>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-table/sbb-table-wrapper',
};

export default meta;
