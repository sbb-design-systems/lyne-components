import { h } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';

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

const ariaLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const defaultArgTypes = {
  label,
  value,
  checked,
  disabled,
  'icon-name': iconName,
  'aria-label': ariaLabel,
};

const defaultArgs = {
  label: 'Option',
  value: 'Value',
  checked: false,
  disabled: false,
  'icon-name': undefined,
  'aria-label': undefined,
};

const DefaultTemplate = ({ label, ...args }) => (
  <sbb-toggle-option {...args}>{label}</sbb-toggle-option>
);

const SlottedIconTemplate = ({ label, 'icon-name': iconName, ...args }) => (
  <sbb-toggle-option {...args}>
    <sbb-icon slot="icon" name={iconName}></sbb-icon>
    {label}
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

export const IconOnlySlotted = SlottedIconTemplate.bind({});
IconOnlySlotted.argTypes = { ...defaultArgTypes };
IconOnlySlotted.args = { ...defaultArgs, label: undefined, 'icon-name': iconName.options[1] };

export const LabelAndIconSlotted = SlottedIconTemplate.bind({});
LabelAndIconSlotted.argTypes = { ...defaultArgTypes, 'icon-name': iconName, value };
LabelAndIconSlotted.args = { ...defaultArgs, 'icon-name': iconName.options[1] };

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
      handles: ['input'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-toggle-option',
};
