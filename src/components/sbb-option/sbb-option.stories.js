import { h } from 'jsx-dom';
import readme from './readme.md';
import events from './sbb-option.events';

const preserveIconSpace = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Wrapper property',
  },
};

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

const disabled = {
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
  active,
  disabled,
  numberOfOptions,
  preserveIconSpace,
};

const defaultArgs = {
  value: 'Value',
  'icon-name': undefined,
  active: false,
  disabled: false,
  numberOfOptions: 5,
  preserveIconSpace: false,
};

const createOptions = ({
  value,
  active,
  disabled,
  numberOfOptions,
  preserveIconSpace,
  ...args
}) => {
  const style = preserveIconSpace ? '--sbb-option-icon-container-display: block;' : '';
  return new Array(numberOfOptions).fill(null).map((_, i) => {
    return (
      <sbb-option
        style={style}
        active={active && i === 0}
        disabled={disabled && i === 0}
        {...args}
        value={`${value} ${i + 1}`}
      >
        {`${value} ${i + 1}`}
      </sbb-option>
    );
  });
};

const StandaloneTemplate = (args) => createOptions(args);

const AutocompleteTemplate = (args) => (
  <sbb-form-field>
    <input />
    <sbb-autocomplete>{createOptions(args)}</sbb-autocomplete>
  </sbb-form-field>
);

const SelectTemplate = (args) => (
  <sbb-form-field label="sbb-select field">
    <sbb-select placeholder="Please select.">{createOptions(args)}</sbb-select>
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

export const WithDisabledState = StandaloneTemplate.bind({});
WithDisabledState.argTypes = defaultArgTypes;
WithDisabledState.args = { ...defaultArgs, disabled: true };
WithDisabledState.decorators = defaultDecorator;

export const WithActiveState = StandaloneTemplate.bind({});
WithActiveState.argTypes = defaultArgTypes;
WithActiveState.args = { ...defaultArgs, active: true };
WithActiveState.decorators = defaultDecorator;

export const WithIconSpace = StandaloneTemplate.bind({});
WithIconSpace.argTypes = defaultArgTypes;
WithIconSpace.args = { ...defaultArgs, preserveIconSpace: true };
WithIconSpace.decorators = defaultDecorator;

export const Autocomplete = AutocompleteTemplate.bind({});
Autocomplete.argTypes = defaultArgTypes;
Autocomplete.args = { ...defaultArgs };

export const Select = SelectTemplate.bind({});
Select.argTypes = defaultArgTypes;
Select.args = { ...defaultArgs };

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
      handles: [events.selectionChange],
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
