import { h } from 'jsx-dom';
import readme from './readme.md';
import events from './sbb-datepicker.events';

const value = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const readonly = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const required = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const form = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const min = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const max = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const wide = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Datepicker attribute',
  },
};

const filterFunctions = [
  () => true,
  (d) => d.getDay() !== 6 && d.getDay() !== 0,
  (d) => d.getDate() % 2 === 1,
];
const dateFilter = {
  options: Object.keys(filterFunctions),
  mapping: filterFunctions,
  control: {
    type: 'select',
    labels: {
      0: 'No dateFilter function.',
      1: 'The dateFilter function includes only working days.',
      2: 'The dateFilter function excludes even days.',
    },
  },
  table: {
    category: 'Datepicker attribute',
  },
};

const accessibilityLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Datepicker attribute',
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

const basicArgTypes = {
  value,
  form,
  disabled,
  readonly,
  required,
  min,
  max,
  wide,
  dateFilter,
  'accessibility-label': accessibilityLabel,
};

const basicArgs = {
  value: `15.02.2023`,
  form: undefined,
  disabled: false,
  readonly: false,
  required: false,
  min: undefined,
  max: undefined,
  wide: false,
  dateFilter: dateFilter.options[0],
  'aria-label': undefined,
};

const formFieldBasicArgsTypes = {
  ...basicArgTypes,
  label,
  size,
  optional,
  borderless,
};

const formFieldBasicArgs = {
  ...basicArgs,
  label: 'Label',
  size: size.options[0],
  optional: false,
  borderless: false,
};

const getInputAttributes = (min, max) => {
  let attr = {};
  if (min) {
    attr.min = new Date(min).getTime() / 1000;
  }
  if (max) {
    attr.max = new Date(max).getTime() / 1000;
  }
  return attr;
};

const Template = ({ min, max, wide, dateFilter, ...args }) => {
  return [
    <div style="display: flex; gap: 0.25rem;">
      <sbb-datepicker-previous-day date-picker="datepicker" />
      <sbb-datepicker-toggle date-picker="datepicker" />
      <input {...args} id="datepicker-input" {...getInputAttributes(min, max)} />
      <sbb-datepicker
        id="datepicker"
        input="datepicker-input"
        ref={(calendarRef) => {
          calendarRef.dateFilter = dateFilter;
        }}
        wide={wide}
        onChange={(event) => changeEventHandler(event)}
      ></sbb-datepicker>
      <sbb-datepicker-next-day date-picker="datepicker" />
    </div>,
    <div id="container-value" style="margin-block-start: 1rem;">
      Change date to get the latest value:
    </div>,
  ];
};

const TemplateFormField = ({
  min,
  max,
  label,
  optional,
  borderless,
  size,
  wide,
  dateFilter,
  ...args
}) => {
  return [
    <sbb-form-field
      size={size}
      label={label}
      optional={optional}
      borderless={borderless}
      width="collapse"
    >
      <sbb-datepicker-previous-day />
      <sbb-datepicker-next-day />
      <sbb-datepicker-toggle />
      <input {...args} {...getInputAttributes(min, max)} />
      <sbb-datepicker
        ref={(calendarRef) => {
          calendarRef.dateFilter = dateFilter;
        }}
        wide={wide}
        onChange={(event) => changeEventHandler(event)}
      ></sbb-datepicker>
    </sbb-form-field>,
    <div id="container-value" style="margin-block-start: 1rem;">
      Change date to get the latest value:
    </div>,
  ];
};

const changeEventHandler = async (event) => {
  const div = document.createElement('div');
  div.innerText = `valueAsDate is: ${await event.target.getValueAsDate()}.`;
  document.getElementById('container-value').append(div);
};

export const WithoutFormField = Template.bind({});
WithoutFormField.argTypes = { ...basicArgTypes };
WithoutFormField.args = { ...basicArgs };

export const InFormField = TemplateFormField.bind({});
InFormField.argTypes = { ...formFieldBasicArgsTypes };
InFormField.args = { ...formFieldBasicArgs };

export const InFormFieldDisabled = TemplateFormField.bind({});
InFormFieldDisabled.argTypes = { ...formFieldBasicArgsTypes };
InFormFieldDisabled.args = { ...formFieldBasicArgs, disabled: true };

export const InFormFieldReadonly = TemplateFormField.bind({});
InFormFieldReadonly.argTypes = { ...formFieldBasicArgsTypes };
InFormFieldReadonly.args = { ...formFieldBasicArgs, readonly: true };

export const InFormFieldWide = TemplateFormField.bind({});
InFormFieldWide.argTypes = { ...formFieldBasicArgsTypes };
InFormFieldWide.args = { ...formFieldBasicArgs, wide: true };

export const InFormFieldWithMinAndMax = TemplateFormField.bind({});
InFormFieldWithMinAndMax.argTypes = { ...formFieldBasicArgsTypes };
InFormFieldWithMinAndMax.args = {
  ...formFieldBasicArgs,
  min: new Date(1675814400000),
  max: new Date(1677024000000),
};

export const InFormFieldWithDateFilter = TemplateFormField.bind({});
InFormFieldWithDateFilter.argTypes = { ...formFieldBasicArgsTypes };
InFormFieldWithDateFilter.args = { ...formFieldBasicArgs, dateFilter: dateFilter.options[1] };

export const InFormFieldLarge = TemplateFormField.bind({});
InFormFieldLarge.argTypes = { ...formFieldBasicArgsTypes };
InFormFieldLarge.args = { ...formFieldBasicArgs, size: size.options[1] };

export const InFormFieldOptional = TemplateFormField.bind({});
InFormFieldOptional.argTypes = { ...formFieldBasicArgsTypes };
InFormFieldOptional.args = { ...formFieldBasicArgs, optional: true };

export const InFormFieldBorderless = TemplateFormField.bind({});
InFormFieldBorderless.argTypes = { ...formFieldBasicArgsTypes };
InFormFieldBorderless.args = { ...formFieldBasicArgs, borderless: true };

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
      handles: [events.inputUpdated, events.datePickerUpdated, events.change],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-datepicker',
};
