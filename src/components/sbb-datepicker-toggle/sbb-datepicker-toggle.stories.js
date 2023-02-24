import { h } from 'jsx-dom';
import readme from './readme.md';

const StandaloneTemplate = (picker = null) => (
  <sbb-datepicker-toggle date-picker={picker}></sbb-datepicker-toggle>
);

const PickerAndButtonTemplate = () => (
  <div style="display: flex; gap: 1em;">
    <input id="datepicker-input" />
    {StandaloneTemplate('datepicker')}
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
  title: 'components/form elements/sbb-datepicker-toggle',
};
