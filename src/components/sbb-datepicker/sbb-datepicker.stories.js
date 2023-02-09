import { h } from 'jsx-dom';
import readme from './readme.md';

const wide = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Datepicker attribute',
  },
};

const min = {
  control: {
    type: 'number',
  },
  table: {
    category: 'Datepicker attribute',
  },
};

const max = {
  control: {
    type: 'number',
  },
  table: {
    category: 'Datepicker attribute',
  },
};

const value = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Datepicker attribute',
  },
};

const form = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Datepicker attribute',
  },
};

const readonly = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Datepicker attribute',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Datepicker attribute',
  },
};

const required = {
  control: {
    type: 'boolean',
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
  'accessibility-label': accessibilityLabel,
};

const formFieldBasicArgsTypes = {
  ...basicArgTypes,
  label,
  size,
  optional,
  borderless,
};

const selected = new Date();

const basicArgs = {
  value: `15.${selected.getMonth() + 1}.${selected.getFullYear()}`,
  form: undefined,
  disabled: false,
  readonly: false,
  required: false,
  wide: false,
  'accessibility-label': undefined,
};

const formFieldBasicArgs = {
  ...basicArgs,
  label: 'Label',
  size: size.options[0],
  optional: false,
  borderless: false,
};

const Template = ({ label, optional, borderless, size, ...args }) => [
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
    <sbb-datepicker {...args} onChange={(event) => changeEventHandler(event)}></sbb-datepicker>
  </sbb-form-field>,
  <div id="container-value"></div>,
];

const changeEventHandler = (event) => {
  const div = document.createElement('div');
  div.innerText = `value is: ${event.target.value}; valueAsDate is: ${event.target.valueAsDate}.`;
  document.getElementById('container-value').append(div);
};

export const Default = Template.bind({});

Default.argTypes = {
  ...formFieldBasicArgsTypes,
};

Default.args = {
  ...formFieldBasicArgs,
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
    actions: {},
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/datepicker/sbb-datepicker',
};
