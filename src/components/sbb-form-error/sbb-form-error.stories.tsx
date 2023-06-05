/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in tincidunt
quis, mattis eu quam. Nulla sit amet lorem fermentum, molestie nunc ut, hendrerit risus. Vestibulum rutrum elit et
lacus sollicitudin, quis malesuada lorem vehicula. Suspendisse at augue quis tellus vulputate tempor. Vivamus urna
velit, varius nec est ac, mollis efficitur lorem. Quisque non nisl eget massa interdum tempus. Praesent vel feugiat
metus. Donec pharetra odio at turpis bibendum, vel commodo dui vulputate. Aenean congue nec nisl vel bibendum.
Praesent sit amet lorem augue. Suspendisse ornare a justo sagittis fermentum.`;

const TemplateError = (args) => <sbb-form-error>{args.errorText}</sbb-form-error>;

const TemplateErrorWithIcon = (args): JSX.Element => (
  <sbb-form-error>
    <sbb-icon name={args.iconName} slot="icon" />
    {args.errorText}
  </sbb-form-error>
);

const iconNameArg: InputType = {
  control: {
    type: 'text',
  },
};
const errorTextArg: InputType = {
  control: {
    type: 'text',
  },
};

export const Error: StoryObj = {
  render: TemplateError,
  argTypes: { errorText: iconNameArg },
  args: { errorText: 'Required field.' },
};




export const ErrorWithCustomIconAndLongMessage: StoryObj = {
  render: TemplateErrorWithIcon,
  argTypes: { errorText: iconNameArg, iconName: errorTextArg },
  args: {
  errorText: longText,
  iconName: 'chevron-small-right-small',
},
};




const meta: Meta =  {
  decorators: [
    (Story) => (
      <div style={{padding: '2rem'}}>
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
  title: 'components/form elements/sbb-form-error',
};

export default meta;
