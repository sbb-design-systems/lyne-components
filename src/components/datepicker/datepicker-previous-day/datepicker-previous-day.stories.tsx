/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md?raw';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, Decorator, StoryContext } from '@storybook/web-components';
import { InputType } from '@storybook/types';
import { Args, ArgTypes } from '@storybook/web-components';
import './datepicker-previous-day';
import '../../form-field';
import '../datepicker';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative
    ? 'var(--sbb-color-black-default)'
    : 'var(--sbb-color-white-default)',
});

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  negative,
};

const defaultArgs: Args = {
  negative: false,
};

const StandaloneTemplate = (args, picker = null): JSX.Element => (
  <sbb-datepicker-previous-day {...args} date-picker={picker}></sbb-datepicker-previous-day>
);

const PickerAndButtonTemplate = (args): JSX.Element => (
  <div style={{ display: 'flex', gap: '1em' }}>
    {StandaloneTemplate(args, 'datepicker')}
    <input value="15.02.2023" id="datepicker-input" />
    <sbb-datepicker
      id="datepicker"
      input="datepicker-input"
      data-now={new Date(2023, 0, 12, 0, 0, 0).valueOf()}
    ></sbb-datepicker>
  </div>
);

const FormFieldTemplate = (args): JSX.Element => (
  <sbb-form-field {...args}>
    <input value="15.02.2023" />
    <sbb-datepicker></sbb-datepicker>
    {StandaloneTemplate(args)}
  </sbb-form-field>
);

const EmptyFormFieldTemplate = (args): JSX.Element => (
  <sbb-form-field {...args}>
    <input />
    <sbb-datepicker></sbb-datepicker>
    {StandaloneTemplate(args)}
  </sbb-form-field>
);

export const Standalone: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const StandaloneNegative: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const WithPicker: StoryObj = {
  render: PickerAndButtonTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const InFormField: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const EmptyFormField: StoryObj = {
  render: EmptyFormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [
    (Story, context) => (
      <div style={{ ...wrapperStyle(context), padding: '2rem' }}>
        <Story></Story>
      </div>
    ),
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: ['click', 'change'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-datepicker/sbb-datepicker-previous-day',
};

export default meta;
