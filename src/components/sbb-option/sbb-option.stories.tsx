/** @jsx h */
import { Fragment, h, JSX } from 'jsx-dom';
import readme from './readme.md';
import events from './sbb-option.events';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/html';
import type { InputType } from '@storybook/types';

const preserveIconSpace: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Wrapper property',
  },
};

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

const disabled: InputType = {
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
  active,
  disabled,
  numberOfOptions,
  preserveIconSpace,
};

const defaultArgs: Args = {
  value: 'Value',
  'icon-name': undefined,
  active: false,
  disabled: false,
  numberOfOptions: 5,
  preserveIconSpace: false,
};

const createOptions = ({
  value,
  active,
  disabled,
  numberOfOptions,
  preserveIconSpace,
  ...args
}): JSX.Element[] => {
  const style = preserveIconSpace ? { '--sbb-option-icon-container-display': 'block' } : {};
  return [
    ...new Array(numberOfOptions).fill(null).map((_, i) => {
      return (
        <sbb-option
          style={style}
          active={active && i === 0}
          disabled={disabled && i === 0}
          {...args}
          value={`${value} ${i + 1}`}
        >
          {`${value} ${i + 1}`}
        </sbb-option>
      );
    }),
    <sbb-option style={style} {...args} value="long-value">
      Option Lorem ipsum dolor sit amet.
    </sbb-option>,
  ];
};

const StandaloneTemplate = (args): JSX.Element => <Fragment>{createOptions(args)}</Fragment>;

const AutocompleteTemplate = (args): JSX.Element => (
  <sbb-form-field label="sbb-autocomplete">
    <input placeholder="Please select." />
    <sbb-autocomplete>{createOptions(args)}</sbb-autocomplete>
  </sbb-form-field>
);

const SelectTemplate = (args): JSX.Element => (
  <sbb-form-field label="sbb-select">
    <sbb-select placeholder="Please select.">{createOptions(args)}</sbb-select>
  </sbb-form-field>
);

const defaultDecorator = [
  (Story) => (
    <div style={{ border: '3px solid red' }}>
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

export const WithDisabledState: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
  decorators: defaultDecorator,
};

export const WithActiveState: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, active: true },
  decorators: defaultDecorator,
};

export const WithIconSpace: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, preserveIconSpace: true },
  decorators: defaultDecorator,
};

export const Autocomplete: StoryObj = {
  render: AutocompleteTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Select: StoryObj = {
  render: SelectTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', width: '350px' }}>
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
