import { h } from 'jsx-dom';
import readme from './readme.md';

const changeEventHandler = (event) => {
  const div = document.createElement('div');
  div.innerText = `value is: ${event.target.value}; valueAsDate is: ${event.target.valueAsDate}.`;
  document.getElementById('container-value').append(div);
};

const value = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Time input attribute',
  },
};

const valueAsDate = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Time input attribute',
  },
};

const form = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Time input attribute',
  },
};

const readonly = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Time input attribute',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Time input attribute',
  },
};

const required = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Time input attribute',
  },
};

const accessibilityLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Time input attribute',
  },
};

const size = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 'l'],
  table: {
    category: 'Form-field attribute',
  },
};

const label = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const optional = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const borderless = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const iconStart = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const iconEnd = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const basicArgTypes = {
  value,
  'value-as-date': valueAsDate,
  form,
  disabled,
  readonly,
  required,
  'accessibility-label': accessibilityLabel,
};

const formFieldBasicArgsTypes = {
  ...basicArgTypes,
  label,
  size,
  optional,
  borderless,
  iconStart,
  iconEnd,
};

const basicArgs = {
  value: '12:00',
  'value-as-date': new Date(new Date(0).setHours(12, 0, 0, 0)),
  form: undefined,
  disabled: false,
  readonly: false,
  required: false,
  'accessibility-label': undefined,
};

const formFieldBasicArgs = {
  ...basicArgs,
  label: 'Label',
  size: size.options[0],
  optional: false,
  borderless: false,
  iconStart: undefined,
  iconEnd: undefined,
};

const formFieldBasicArgsWithIcons = {
  ...basicArgs,
  label: 'Label',
  size: size.options[0],
  optional: false,
  borderless: false,
  iconStart: 'clock-small',
  iconEnd: 'circle-information-small',
};

const TemplateSbbTimeInput = (args) => [
  <sbb-time-input {...args} onChange={(event) => changeEventHandler(event)}></sbb-time-input>,
  <div style="margin-block-start: 1rem;">Change time:</div>,
  <div id="container-value"></div>,
];

const TemplateSbbTimeInputInFormField = ({
  label,
  optional,
  borderless,
  iconStart,
  iconEnd,
  size,
  errorClass,
  ...args
}) => (
  <sbb-form-field
    size={size}
    label={label}
    optional={optional}
    borderless={borderless}
    width="collapse"
  >
    {iconStart && <sbb-icon slot="prefix" name={iconStart} />}
    <sbb-time-input class={errorClass} {...args}></sbb-time-input>
    {iconEnd && <sbb-icon slot="suffix" name={iconEnd} />}
    {errorClass && <sbb-form-error>Error</sbb-form-error>}
  </sbb-form-field>
);

export const sbbTimeInput = TemplateSbbTimeInput.bind({});
sbbTimeInput.argTypes = { ...basicArgTypes };
sbbTimeInput.args = { ...basicArgs };

export const sbbTimeInputInFormField = TemplateSbbTimeInputInFormField.bind({});
sbbTimeInputInFormField.argTypes = { ...formFieldBasicArgsTypes };
sbbTimeInputInFormField.args = { ...formFieldBasicArgs };

export const sbbTimeInputInFormFieldWithIcons = TemplateSbbTimeInputInFormField.bind({});
sbbTimeInputInFormFieldWithIcons.argTypes = { ...formFieldBasicArgsTypes };
sbbTimeInputInFormFieldWithIcons.args = { ...formFieldBasicArgsWithIcons };

export const sbbTimeInputInFormFieldBorderless = TemplateSbbTimeInputInFormField.bind({});
sbbTimeInputInFormFieldBorderless.argTypes = { ...formFieldBasicArgsTypes };
sbbTimeInputInFormFieldBorderless.args = {
  ...formFieldBasicArgsWithIcons,
  borderless: true,
};

export const sbbTimeInputInFormFieldDisabled = TemplateSbbTimeInputInFormField.bind({});
sbbTimeInputInFormFieldDisabled.argTypes = { ...formFieldBasicArgsTypes };
sbbTimeInputInFormFieldDisabled.args = {
  ...formFieldBasicArgsWithIcons,
  disabled: true,
};

export const sbbTimeInputInFormFieldReadonly = TemplateSbbTimeInputInFormField.bind({});
sbbTimeInputInFormFieldReadonly.argTypes = { ...formFieldBasicArgsTypes };
sbbTimeInputInFormFieldReadonly.args = {
  ...formFieldBasicArgsWithIcons,
  readonly: true,
};

export const sbbTimeInputInFormFieldWithError = TemplateSbbTimeInputInFormField.bind({});
sbbTimeInputInFormFieldWithError.argTypes = { ...formFieldBasicArgsTypes };
sbbTimeInputInFormFieldWithError.args = {
  ...formFieldBasicArgsWithIcons,
  errorClass: 'sbb-invalid',
};

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
      handles: ['change'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-time-input',
};
