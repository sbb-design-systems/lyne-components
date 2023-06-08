/** @jsx h */
import { Fragment, h, JSX } from 'jsx-dom';
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

const multiple: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
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
  multiple,
  numberOfOptions,
};

const defaultArgs: Args = {
  label: 'Option group',
  'icon-name': undefined,
  value: 'Option',
  disabled: false,
  disabledSingle: false,
  multiple: false,
  numberOfOptions: 3,
};

const defaultDecorator: Decorator[] = [
  (Story) => (
    <div style={{ border: '3px solid red' }}>
      <Story />
    </div>
  ),
];

const createOptions = (args): JSX.Element[] =>
  new Array(args.numberOfOptions).fill(null).map((_, i) => {
    return (
      <sbb-option
        value={`${args.value} ${i + 1}`}
        disabled={args.disabledSingle && i === 0}
        icon-name={args['icon-name']}
      >
        {`${args.value} ${i + 1}`}
      </sbb-option>
    );
  });

const Template = ({ label, disabled, ...args }): JSX.Element => (
  <Fragment>
    <sbb-optgroup label={label + ' 1'} disabled={disabled}>
      {createOptions(args)}
    </sbb-optgroup>
    <sbb-optgroup label={label + ' 2'} disabled={disabled}>
      {createOptions(args)}
    </sbb-optgroup>
  </Fragment>
);

const TemplateAutocomplete = (args): JSX.Element => {
  return (
    <sbb-form-field label="Autocomplete">
      <input placeholder="Placeholder" />
      <sbb-autocomplete>{Template(args)}</sbb-autocomplete>
    </sbb-form-field>
  );
};

const TemplateSelect = (args): JSX.Element => {
  return (
    <sbb-form-field label="Select">
      <sbb-select multiple={args.multiple} placeholder="Select">
        {Template(args)}
      </sbb-select>
    </sbb-form-field>
  );
};

export const Standalone: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  decorators: defaultDecorator,
};

export const Autocomplete: StoryObj = {
  render: TemplateAutocomplete,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Select: StoryObj = {
  render: TemplateSelect,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const MultipleSelect: StoryObj = {
  render: TemplateSelect,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, multiple: true },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: 'undefined' }}>
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
