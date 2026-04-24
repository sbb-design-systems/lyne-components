import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';

import type { SbbChipLabelElement } from './chip-label.component.ts';
import readme from './readme.md?raw';

import '../chip-label.ts';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['xxxs', 'xxs', 'xs', 's'] satisfies SbbChipLabelElement['size'][],
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['milk', 'charcoal', 'white', 'granite'] satisfies SbbChipLabelElement['color'][],
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
  <sbb-chip-label ${sbbSpread(args)}>${label}</sbb-chip-label>
`;

const TemplateFixedWidth = ({ label, ...args }: Args): TemplateResult => html`
  <sbb-chip-label ${sbbSpread(args)} style="width: 10rem;"> ${label} </sbb-chip-label>
`;

export const XXXS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options![0],
  },
};

export const XXS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options![1],
  },
};

export const XS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options![2],
  },
};

export const S: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options![3],
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
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.color === 'milk' || context.args.color === 'white'
        ? 'var(--sbb-background-color-4)'
        : 'var(--sbb-background-color-1)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/Chip Label',
};

export default meta;
