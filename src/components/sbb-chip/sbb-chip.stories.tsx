/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

const wrapperStyle = (context) => {
  if (context.args.color === 'milk' || context.args.color === 'white') {
    return `background-color: var(--sbb-color-granite-default);`;
  }

  return `background-color: var(--sbb-color-white-default);`;
};

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
  size: size.options[0],
  color: color.options[0],
  label: 'Label',
};

const Template = ({ label, ...args }) => <sbb-chip {...args}>{label}</sbb-chip>;
const TemplateFixedWidth = ({ label, ...args }): JSX.Element => (
  <sbb-chip {...args} style={{width: '10rem'}}>
    {label}
  </sbb-chip>
);

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
  size: size.options[1],
},
};



export const MilkS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
  size: size.options[2],
},
};



export const Charcoal: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
  color: color.options[1],
},
};



export const White: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
  color: color.options[2],
},
};



export const Granite: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
  color: color.options[3],
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



const meta: Meta =  {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}padding: 2rem;font-size:0;`}>
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
  title: 'components/sbb-chip',
};

export default meta;
