/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, Decorator } from '@storybook/html';

const StandaloneTemplate = (picker = null): JSX.Element => (
  <sbb-datepicker-next-day date-picker={picker}></sbb-datepicker-next-day>
);

const PickerAndButtonTemplate = (): JSX.Element => (
  <div style={{ display: 'flex', gap: '1em' }}>
    <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
    <input id="datepicker-input" />
    {StandaloneTemplate('datepicker')}
  </div>
);

const FormFieldTemplate = (): JSX.Element => (
  <sbb-form-field>
    <input />
    <sbb-datepicker></sbb-datepicker>
    {StandaloneTemplate()}
  </sbb-form-field>
);

export const Standalone: StoryObj = {
  render: StandaloneTemplate,
};

export const WithPicker: StoryObj = {
  render: PickerAndButtonTemplate,
};

export const InFormField: StoryObj = {
  render: FormFieldTemplate,
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
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
  title: 'components/form elements/sbb-datepicker-next-day',
};

export default meta;
