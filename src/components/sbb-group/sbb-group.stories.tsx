/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/html';
import type { InputType } from '@storybook/types';

const wrapperStyle = (context): Record<string, string> => {
  if (context.args.color === 'white') {
    return { 'background-color': 'var(--sbb-color-milk-default)' };
  } else if (context.args.color === 'milk') {
    return { 'background-color': 'var(--sbb-color-white-default)' };
  }

  return { 'background-color': 'var(--sbb-color-platinum-default)' };
};

const GroupTemplate = (args): JSX.Element => (
  <sbb-group {...args} style={{ 'max-width': '20rem' }}>
    <span class="sbb-text-m">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <br />
      Can be multiline.
    </span>
  </sbb-group>
);

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk', 'transparent'],
};

const padding: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['3x-xxs', 'xxxs-xxs', '4x-xxs', 'xxs-xxs', 'xxxs-s', 's-s', 'l-l'],
};
const defaultArgTypes: ArgTypes = {
  color,
  padding,
};

const defaultArgs: Args = {
  color: color.options[0],
  padding: padding.options[3],
};

export const ColorWhite: StoryObj = {
  render: GroupTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const ColorMilk: StoryObj = {
  render: GroupTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    color: color.options[1],
  },
};

export const ColorTransparent: StoryObj = {
  render: GroupTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    color: color.options[2],
  },
};

export const Padding3X_XXS: StoryObj = {
  render: GroupTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    padding: padding.options[0],
  },
};

export const PaddingXXXS_XXS: StoryObj = {
  render: GroupTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    padding: padding.options[1],
  },
};

export const Padding4X_XXS: StoryObj = {
  render: GroupTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    padding: padding.options[2],
  },
};

export const PaddingXXS_XXS: StoryObj = {
  render: GroupTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    padding: padding.options[3],
  },
};

export const PaddingXXXS_S: StoryObj = {
  render: GroupTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    padding: padding.options[4],
  },
};

export const PaddingS_S: StoryObj = {
  render: GroupTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    padding: padding.options[5],
  },
};

export const PaddingL_L: StoryObj = {
  render: GroupTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    padding: padding.options[6],
  },
};

const meta: Meta = {
  decorators: [
    (Story, context) => (
      <div style={{ ...wrapperStyle(context), padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-group',
};

export default meta;
