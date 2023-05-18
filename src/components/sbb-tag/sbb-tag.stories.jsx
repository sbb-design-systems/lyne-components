import { h } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';

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

const label = {
  control: {
    type: 'text',
  },
};

const value = {
  control: {
    type: 'text',
  },
};

const icon = {
  control: {
    type: 'text',
  },
};

const amount = {
  control: {
    type: 'number',
  },
};

const ariaLabel = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  checked,
  disabled,
  label,
  value,
  'icon-name': icon,
  amount,
  'aria-label': ariaLabel,
};

const defaultArgs = {
  checked: false,
  disabled: false,
  label: 'Label',
  value: 'Value',
  'icon-name': undefined,
  amount: undefined,
  'aria-label': undefined,
};

const defaultArgsIconAndAmount = {
  ...defaultArgs,
  amount: 123,
  'icon-name': 'dog-small',
};

const Template = ({ label, ...args }) => <sbb-tag {...args}>{label}</sbb-tag>;

const TemplateSlottedIconAndAmount = ({ label, ...args }) => (
  <sbb-tag {...args}>
    <sbb-icon slot="icon" name="pie-small" />
    {label}
    <span slot="amount">999</span>
  </sbb-tag>
);

export const basicTag = Template.bind({});
basicTag.argTypes = defaultArgTypes;
basicTag.args = { ...defaultArgs };

export const checkedTag = Template.bind({});
checkedTag.argTypes = defaultArgTypes;
checkedTag.args = { ...defaultArgs, checked: true };

export const disabledTag = Template.bind({});
disabledTag.argTypes = defaultArgTypes;
disabledTag.args = { ...defaultArgs, disabled: true };

export const checkedAndDisabledTag = Template.bind({});
checkedAndDisabledTag.argTypes = defaultArgTypes;
checkedAndDisabledTag.args = { ...defaultArgs, checked: true, disabled: true };

export const withAmount = Template.bind({});
withAmount.argTypes = defaultArgTypes;
withAmount.args = { ...defaultArgs, amount: 123 };

export const withIcon = Template.bind({});
withIcon.argTypes = defaultArgTypes;
withIcon.args = { ...defaultArgs, 'icon-name': 'dog-small' };

export const withAmountAndIcon = Template.bind({});
withAmountAndIcon.argTypes = defaultArgTypes;
withAmountAndIcon.args = { ...defaultArgsIconAndAmount };

export const withAmountAndIconSlotted = TemplateSlottedIconAndAmount.bind({});
withAmountAndIconSlotted.argTypes = defaultArgTypes;
withAmountAndIconSlotted.args = { ...defaultArgs };

export const withAmountAndIconChecked = Template.bind({});
withAmountAndIconChecked.argTypes = defaultArgTypes;
withAmountAndIconChecked.args = { ...defaultArgsIconAndAmount, checked: true };

export const withAmountAndIconDisabled = Template.bind({});
withAmountAndIconDisabled.argTypes = defaultArgTypes;
withAmountAndIconDisabled.args = { ...defaultArgsIconAndAmount, disabled: true };

export const withAmountAndIconCheckedAndDisabled = Template.bind({});
withAmountAndIconCheckedAndDisabled.argTypes = defaultArgTypes;
withAmountAndIconCheckedAndDisabled.args = {
  ...defaultArgsIconAndAmount,
  checked: true,
  disabled: true,
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
      handles: ['input', 'change'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-tag',
};
