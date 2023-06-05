/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Option group',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option group',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Option',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Option',
  },
};

const disabledSingle: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option',
  },
};

const numberOfOptions: InputType = {
  control: {
    type: 'number',
  },
};

const defaultArgTypes: ArgTypes = {
  label,
  'icon-name': iconName,
  value,
  disabled,
  disabledSingle,
  numberOfOptions,
};

const defaultArgs: Args = {
  label: 'Option group',
  'icon-name': undefined,
  value: 'Option',
  disabled: false,
  disabledSingle: false,
  numberOfOptions: 3,
};

const defaultDecorator = [
  (Story) => (
    <div style={{border: '3px solid red'}}>
      <Story />
    </div>
  ),
];

const createOptions = ({ value, numberOfOptions, disabledSingle, ...args }) =>
  new Array(numberOfOptions).fill(null).map((_, i) => {
    return (
      <sbb-option {...args} value={`${value} ${i + 1}`} disabled={disabledSingle && i === 0}>
        {`${value} ${i + 1}`}
      </sbb-option>
    );
  });

const Template = ({ label, disabled, ...args }): JSX.Element[] => [
  <sbb-optgroup label={label + ' 1'} disabled={disabled}>
    {createOptions(args)}
  </sbb-optgroup>,
  <sbb-optgroup label={label + ' 2'} disabled={disabled}>
    {createOptions(args)}
  </sbb-optgroup>,
];

const TemplateAutocomplete = (args) => {
  return (
    <sbb-form-field label="Autocomplete">
      <input placeholder="Placeholder" />
      <sbb-autocomplete>{Template(args)}</sbb-autocomplete>
    </sbb-form-field>
  );
};

export const Standalone: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs },
  decorators: defaultDecorator,
};




export const Autocomplete: StoryObj = {
  render: TemplateAutocomplete,
  argTypes: { ...defaultArgTypes },
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
      handles: ['click'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-optgroup',
};

export default meta;
