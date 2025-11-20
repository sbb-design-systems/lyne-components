import type { Meta, StoryObj, ArgTypes, Args, StoryContext } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import './title.component.ts';

// we don't need to pass the args.text to the <sbb-title> tag, but Storybook wants all in it.
const Template = ({ text, ...args }: Args): TemplateResult =>
  html`<sbb-title ${sbbSpread(args)}>${text}</sbb-title>`;

const LeanTemplate = (args: Args): TemplateResult =>
  html`${Template(args)}
    <p>
      In 'lean' mode, where the 'sbb-lean' class is applied to the
      <html> tag, the title is given smaller sizes and spacings.
      This story simulates the lean mode.
    </p>`;

const level: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  level,
  negative,
  'visual-level': level,
};

const defaultArgs: Args = {
  level: level.options![0],
  text: 'Data without insights are trivial, and insights without action are pointless',
  negative: false,
  'visual-level': undefined,
};

export const h1: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const h1Negative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    negative: true,
  },
};

export const h2: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, level: level.options![1] },
};

export const h3: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, level: level.options![2] },
};

export const h4: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, level: level.options![3] },
};

export const h5: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, level: level.options![4] },
};

export const h6: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, level: level.options![5] },
};

export const h6VisualLevel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, level: level.options![0], 'visual-level': level.options![5] },
};

export const leanSize: StoryObj = {
  render: LeanTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  parameters: { isLean: true },
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
  title: 'elements/sbb-title',
};

export default meta;
