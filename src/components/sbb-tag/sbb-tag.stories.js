import { h } from 'jsx-dom';
import readme from './readme.md';

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

const accessibilityLabel = {
  control: {
    type: 'text',
  },
};

const accessibilityDescribedby = {
  control: {
    type: 'text',
  },
};

const accessibilityLabelledby = {
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
  'accessibility-label': accessibilityLabel,
  'accessibility-describedby': accessibilityDescribedby,
  'accessibility-labelledby': accessibilityLabelledby,
};

const defaultArgs = {
  checked: false,
  disabled: false,
  label: 'Label',
  value: 'Value',
  'icon-name': undefined,
  amount: undefined,
  'accessibility-label': undefined,
  'accessibility-describedby': undefined,
  'accessibility-labelledby': undefined,
};

const defaultArgsIconAndAmount = {
  ...defaultArgs,
  amount: 123,
  'icon-name': 'dog-small',
};

const Template = ({ label, ...args }) => (
  <sbb-tag {...args}>
    {label}
    {args.amount !== undefined && <span slot="amount">{args.amount}</span>}
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

export const withAmount = Template.bind({});
withAmount.argTypes = defaultArgTypes;
withAmount.args = { ...defaultArgs, amount: 123 };

export const withIcon = Template.bind({});
withIcon.argTypes = defaultArgTypes;
withIcon.args = { ...defaultArgs, 'icon-name': 'dog-small' };

export const withAmountAndIcon = Template.bind({});
withAmountAndIcon.argTypes = defaultArgTypes;
withAmountAndIcon.args = { ...defaultArgsIconAndAmount };

export const withAmountAndIconChecked = Template.bind({});
withAmountAndIconChecked.argTypes = defaultArgTypes;
withAmountAndIconChecked.args = { ...defaultArgsIconAndAmount, checked: true };

export const withAmountAndIconDisabled = Template.bind({});
withAmountAndIconDisabled.argTypes = defaultArgTypes;
withAmountAndIconDisabled.args = { ...defaultArgsIconAndAmount, disabled: true };

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
      handles: ['change'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-tag',
};
