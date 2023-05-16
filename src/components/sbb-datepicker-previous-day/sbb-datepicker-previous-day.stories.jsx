import { h } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';

const StandaloneTemplate = (picker = null) => (
  <sbb-datepicker-previous-day date-picker={picker}></sbb-datepicker-previous-day>
);

const PickerAndButtonTemplate = () => (
  <div style="display: flex; gap: 1em;">
    {StandaloneTemplate('datepicker')}
    <input id="datepicker-input" />
    <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
  </div>
);

const FormFieldTemplate = () => (
  <sbb-form-field>
    <input />
    <sbb-datepicker></sbb-datepicker>
    {StandaloneTemplate()}
  </sbb-form-field>
);

export const Standalone = StandaloneTemplate.bind({});

export const WithPicker = PickerAndButtonTemplate.bind({});

export const InFormField = FormFieldTemplate.bind({});

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
    withActions,
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
  title: 'components/form elements/sbb-datepicker-previous-day',
};
