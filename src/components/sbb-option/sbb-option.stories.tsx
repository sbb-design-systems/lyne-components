/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import events from './sbb-option.events';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
};

const active: InputType = {
  control: {
    type: 'boolean',
  },
};

const numberOfOptions: InputType = {
  control: {
    type: 'number',
  },
};

const defaultArgTypes: ArgTypes = {
  value,
  'icon-name': iconName,
  active: active,
  numberOfOptions,
};

const defaultArgs: Args = {
  value: 'Value',
  'icon-name': undefined,
  active: false,
  numberOfOptions: 5,
};

const createOptions = ({ value, numberOfOptions, ...args }) =>
  new Array(numberOfOptions).fill(null).map((_, i) => {
    return <sbb-option {...args} value={`${value} ${i + 1}`}>{`${value} ${i + 1}`}</sbb-option>;
  });

const StandaloneTemplate = (args) => createOptions(args);

const AutocompleteTemplate = (args): JSX.Element => (
  <sbb-form-field>
    <input />
    <sbb-autocomplete>{createOptions(args)}</sbb-autocomplete>
  </sbb-form-field>
);

const defaultDecorator = [
  (Story) => (
    <div style={{border: '3px solid red'}}>
      <Story />
    </div>
  ),
];

export const Standalone: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  decorators: defaultDecorator,
};




export const WithIcon: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'icon-name': 'clock-small' },
  decorators: defaultDecorator,
};




export const Autocomplete: StoryObj = {
  render: AutocompleteTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
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
    actions: {
      handles: [events.selectionChange],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-option',
};

export default meta;
