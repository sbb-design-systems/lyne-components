import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, StoryContext } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../storybook/helpers/spread.js';

import readme from './readme.md?raw';

import './chip.js';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color':
    context.args.color === 'milk' || context.args.color === 'white'
      ? 'var(--sbb-color-granite)'
      : 'var(--sbb-color-white)',
});

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['xxs', 'xs', 's'],
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['milk', 'charcoal', 'white', 'granite'],
};

const label: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  color,
  size,
  label,
};

const defaultArgs: Args = {
  size: size.options![0],
  color: color.options![0],
  label: 'Label',
};

const Template = ({ label, ...args }: Args): TemplateResult => html`
  <sbb-chip ${sbbSpread(args)}>${label}</sbb-chip>
`;

const TemplateFixedWidth = ({ label, ...args }: Args): TemplateResult => html`
  <sbb-chip ${sbbSpread(args)} style=${styleMap({ width: '10rem' })}> ${label} </sbb-chip>
`;

export const MilkXXS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const MilkXS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options![1],
  },
};

export const MilkS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options![2],
  },
};

export const Charcoal: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    color: color.options![1],
  },
};

export const White: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    color: color.options![2],
  },
};

export const Granite: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    color: color.options![3],
  },
};

export const FixedWidth: StoryObj = {
  render: TemplateFixedWidth,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const FixedWidthLongLabel: StoryObj = {
  render: TemplateFixedWidth,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    label: 'This is a very long label which will be cut.',
  },
};

const meta: Meta = {
  decorators: [
    (story, context) => html`
      <div style=${styleMap({ ...wrapperStyle(context), padding: '2rem', 'font-size': '0' })}>
        ${story()}
      </div>
    `,
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-chip',
};

export default meta;
