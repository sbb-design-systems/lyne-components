import events from './sbb-time-input.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const size = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
  table: {
    category: 'Time input attribute',
  },
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

const accessibilityDescribedby = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Time input attribute',
  },
};

const accessibilityLabelledby = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Time input attribute',
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
  size,
  value,
  'value-as-date': valueAsDate,
  form,
  disabled,
  readonly,
  required,
  'accessibility-label': accessibilityLabel,
  'accessibility-describedby': accessibilityDescribedby,
  'accessibility-labelledby': accessibilityLabelledby,
};

const formFieldBasicArgsTypes = {
  ...basicArgTypes,
  label,
  optional,
  borderless,
};

const basicArgs = {
  size: size.options[0],
  value: '12:00',
  'value-as-date': valueAsDate,
  form: undefined,
  disabled: false,
  readonly: false,
  required: false,
  'accessibility-label': undefined,
  'accessibility-describedby': undefined,
  'accessibility-labelledby': undefined,
};

const formFieldBasicArgs = {
  ...basicArgs,
  label: 'Label',
  optional: undefined,
  borderless: undefined,
};

const TemplateSbbTimeInput = (args) => <sbb-time-input {...args}></sbb-time-input>;

const TemplateSbbTimeInputInFormField = ({ label, optional, borderless, ...args }) => (
  <sbb-form-field label={label} optional={optional} borderless={borderless}>
    {TemplateSbbTimeInput(args)}
  </sbb-form-field>
);

export const sbbTimeInput = TemplateSbbTimeInput.bind({});
sbbTimeInput.argTypes = { ...basicArgTypes };
sbbTimeInput.args = { ...basicArgs };

export const sbbTimeInputInFormField = TemplateSbbTimeInputInFormField.bind({});
sbbTimeInputInFormField.argTypes = { ...formFieldBasicArgsTypes };
sbbTimeInputInFormField.args = { ...formFieldBasicArgs };

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
      handles: ['change', events.didChange],
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
