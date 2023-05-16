import { h } from 'jsx-dom';
import readme from './readme.md';

const label = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Option group',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option group',
  },
};

const iconName = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Option',
  },
};

const value = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Option',
  },
};

const disabledSingle = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option',
  },
};

const numberOfOptions = {
  control: {
    type: 'number',
  },
};

const defaultArgTypes = {
  label,
  'icon-name': iconName,
  value,
  disabled,
  disabledSingle,
  numberOfOptions,
};

const defaultArgs = {
  label: 'Option group',
  'icon-name': undefined,
  value: 'Option',
  disabled: false,
  disabledSingle: false,
  numberOfOptions: 3,
};

const defaultDecorator = [
  (Story) => (
    <div style={'border: 3px solid red'}>
      <Story />
    </div>
  ),
];

const createOptions = ({ value, numberOfOptions, disabledSingle, ...args }) =>
  new Array(numberOfOptions).fill(null).map((_, i) => {
    return (
      <sbb-option {...args} value={`${value} ${i + 1}`} disabled={disabledSingle && i === 0}>
        {`${value} ${i + 1}`}
      </sbb-option>
    );
  });

const Template = ({ label, disabled, ...args }) => [
  <sbb-optgroup label={label + ' 1'} disabled={disabled}>
    {createOptions(args)}
  </sbb-optgroup>,
  <sbb-optgroup label={label + ' 2'} disabled={disabled}>
    {createOptions(args)}
  </sbb-optgroup>,
];

const TemplateAutocomplete = (args) => {
  return (
    <sbb-form-field label="Autocomplete">
      <input placeholder="Placeholder" />
      <sbb-autocomplete>{Template(args)}</sbb-autocomplete>
    </sbb-form-field>
  );
};

export const Standalone = Template.bind({});
Standalone.argTypes = { ...defaultArgTypes };
Standalone.args = { ...defaultArgs };
Standalone.decorators = defaultDecorator;

export const Autocomplete = TemplateAutocomplete.bind({});
Autocomplete.argTypes = { ...defaultArgTypes };
Autocomplete.args = { ...defaultArgs };

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
  title: 'components/sbb-optgroup',
};
