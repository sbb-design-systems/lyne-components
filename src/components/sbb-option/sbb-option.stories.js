import { h } from 'jsx-dom';
import readme from './readme.md';

const iconName = {
  control: {
    type: 'text',
  },
};

const value = {
  control: {
    type: 'text',
  },
};

const active = {
  control: {
    type: 'boolean',
  },
};

const numberOfOptions = {
  control: {
    type: 'number',
  },
};

const defaultArgTypes = {
  value,
  'icon-name': iconName,
  active: active,
  numberOfOptions,
};

const defaultArgs = {
  value: 'Value',
  'icon-name': undefined,
  active: false,
  numberOfOptions: 5,
};

const createOptions = ({ value, numberOfOptions, ...args }) =>
  new Array(numberOfOptions).fill(null).map((_, i) => {
    return <sbb-option {...args} value={`${value} ${i + 1}`}>{`${value} ${i + 1}`}</sbb-option>;
  });

const StandaloneTemplate = (args) => createOptions(args);

const AutocompleteTemplate = (args) => (
  <sbb-form-field>
    <input />
    <sbb-autocomplete>{createOptions(args)}</sbb-autocomplete>
  </sbb-form-field>
);

const defaultDecorator = [
  (Story) => (
    <div style={'border: 3px solid red'}>
      <Story />
    </div>
  ),
];

export const Standalone = StandaloneTemplate.bind({});
Standalone.argTypes = defaultArgTypes;
Standalone.args = { ...defaultArgs };
Standalone.decorators = defaultDecorator;

export const WithIcon = StandaloneTemplate.bind({});
WithIcon.argTypes = defaultArgTypes;
WithIcon.args = { ...defaultArgs, 'icon-name': 'clock-small' };
WithIcon.decorators = defaultDecorator;

export const Autocomplete = AutocompleteTemplate.bind({});
Autocomplete.argTypes = defaultArgTypes;
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
  title: 'components/sbb-option',
};
