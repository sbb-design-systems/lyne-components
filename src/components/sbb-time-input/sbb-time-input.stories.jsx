import { h } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';

const changeEventHandler = (event) => {
  const div = document.createElement('div');
  div.innerText = `value is: ${event.target.value}; valueAsDate is: ${event.target.valueAsDate}.`;
  document.getElementById('container-value').append(div);
};

const setValueAsDate = () => {
  const timeInput = document.getElementsByTagName('sbb-time-input')[0];
  timeInput.valueAsDate = new Date();
};

const setValue = () => {
  const timeInput = document.getElementsByTagName('sbb-time-input')[0];
  timeInput.value = '0';
};

const value = {
  control: {
    type: 'text',
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

const ariaLabel = {
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
  form,
  disabled,
  readonly,
  required,
  'aria-label': ariaLabel,
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
  form: undefined,
  disabled: false,
  readonly: false,
  required: false,
  'aria-label': undefined,
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

const TemplateSbbTimeInput = ({
  label,
  optional,
  borderless,
  iconStart,
  iconEnd,
  size,
  errorClass,
  ...args
}) => [
  <sbb-form-field
    size={size}
    label={label}
    optional={optional}
    borderless={borderless}
    width="collapse"
  >
    {iconStart && <sbb-icon slot="prefix" name={iconStart} />}
    <sbb-time-input
      class={errorClass}
      {...args}
      onChange={(event) => changeEventHandler(event)}
    ></sbb-time-input>
    {iconEnd && <sbb-icon slot="suffix" name={iconEnd} />}
    {errorClass && <sbb-form-error>Error</sbb-form-error>}
  </sbb-form-field>,
  <div style="display: flex; gap: 1em; margin-block-start: 2rem;">
    <sbb-button variant="secondary" size="m" onClick={() => setValueAsDate()}>
      Set valueAsDate to current datetime
    </sbb-button>
    <sbb-button variant="secondary" size="m" onClick={() => setValue()}>
      Set value to 0
    </sbb-button>
  </div>,
  <div style="margin-block-start: 1rem;">Change time in input:</div>,
  <div id="container-value"></div>,
];

export const SbbTimeInput = TemplateSbbTimeInput.bind({});
SbbTimeInput.argTypes = { ...formFieldBasicArgsTypes };
SbbTimeInput.args = { ...formFieldBasicArgs };

export const SbbTimeInputWithIcons = TemplateSbbTimeInput.bind({});
SbbTimeInputWithIcons.argTypes = { ...formFieldBasicArgsTypes };
SbbTimeInputWithIcons.args = { ...formFieldBasicArgsWithIcons };

export const SbbTimeInputBorderless = TemplateSbbTimeInput.bind({});
SbbTimeInputBorderless.argTypes = { ...formFieldBasicArgsTypes };
SbbTimeInputBorderless.args = {
  ...formFieldBasicArgsWithIcons,
  borderless: true,
};

export const SbbTimeInputDisabled = TemplateSbbTimeInput.bind({});
SbbTimeInputDisabled.argTypes = { ...formFieldBasicArgsTypes };
SbbTimeInputDisabled.args = {
  ...formFieldBasicArgsWithIcons,
  disabled: true,
};

export const SbbTimeInputReadonly = TemplateSbbTimeInput.bind({});
SbbTimeInputReadonly.argTypes = { ...formFieldBasicArgsTypes };
SbbTimeInputReadonly.args = {
  ...formFieldBasicArgsWithIcons,
  readonly: true,
};

export const SbbTimeInputWithError = TemplateSbbTimeInput.bind({});
SbbTimeInputWithError.argTypes = { ...formFieldBasicArgsTypes };
SbbTimeInputWithError.args = {
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
    withActions,
  ],
  parameters: {
    actions: {
      handles: ['change', 'input'],
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
