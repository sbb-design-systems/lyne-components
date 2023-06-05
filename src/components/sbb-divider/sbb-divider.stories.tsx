/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

const documentationPlatformContainerStyle = (context) => {
  if (context.args.negative) {
    return {};
  }

  return 'background-color: var(--sbb-color-white-default);';
};

const wrapperStyle = (context) => {
  if (context.args.negative) {
    return 'background-color: var(--sbb-color-charcoal-default);';
  }

  return 'background-color: var(--sbb-color-white-default);';
};

const Template = (args): JSX.Element => (
  <div style={{height: '340px', padding: '20px'}}>
    <sbb-divider {...args} />
  </div>
);

const orientation: InputType = {
  control: {
    type: 'select',
  },
  options: ['horizontal', 'vertical'],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Appearance',
  },
};

const defaultArgTypes: ArgTypes = {
  orientation,
  negative,
};

const defaultArgs: Args = {
  orientation: orientation.options[0],
  negative: false,
};

export const dividerHorizontal: StoryObj = {
  render: Template,
  args: { ...defaultArgs },
  argTypes: defaultArgTypes,
};





export const dividerVertical: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
  orientation: 'vertical',
},
};




export const dividerNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
  negative: true,
},
};





const meta: Meta =  {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}`}>
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
  title: 'components/sbb-divider',
};

export default meta;
