import { h } from 'jsx-dom';
import readme from './readme.md';
import events from './sbb-toggle-option.events';

const label = {
  control: {
    type: 'text',
  },
};

const checked = {
  control: {
    type: 'boolean',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
};

const iconName = {
  control: {
    type: 'select',
  },
  options: ['arrow-right-small', 'app-icon-small', 'train-small', 'swisspass-small'],
};

const value = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  label,
  value,
  checked,
  disabled,
  'icon-name': iconName,
};

const defaultArgs = {
  label: 'Option',
  value: 'Value',
  checked: false,
  disabled: false,
  'icon-name': undefined,
};

const DefaultTemplate = (args) => (
  <sbb-toggle-option {...args}>
    <span slot="label">{args.label}</span>
  </sbb-toggle-option>
);

export const Default = DefaultTemplate.bind({});
Default.argTypes = { ...defaultArgTypes, value };
Default.args = { ...defaultArgs };

export const IconOnly = DefaultTemplate.bind({});
IconOnly.argTypes = { ...defaultArgTypes };
IconOnly.args = { ...defaultArgs, label: undefined, 'icon-name': iconName.options[1] };

export const LabelAndIcon = DefaultTemplate.bind({});
LabelAndIcon.argTypes = { ...defaultArgTypes, 'icon-name': iconName, value };
LabelAndIcon.args = { ...defaultArgs, 'icon-name': iconName.options[1] };

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
      handles: [events.didSelect],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/toggle/sbb-toggle-option',
};
