import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = ({ iconSlot, label, amountSlot, ...args }) => (
  <sbb-tab-title {...args}>
    {iconSlot && <sbb-icon slot="icon" name={iconSlot}></sbb-icon>}
    {label}
    {amountSlot && <span slot="amount">{amountSlot}</span>}
  </sbb-tab-title>
);

const label = {
  control: {
    type: 'text',
  },
};

const iconName = {
  control: {
    type: 'select',
  },
  options: ['app-icon-small', 'train-small', 'swisspass-small', 'pie-small'],
};

const amount = {
  control: {
    type: 'number',
  },
};

const amountSlot = {
  control: {
    type: 'number',
  },
};

const activeArg = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Tab State',
  },
};

const disabledArg = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Tab State',
  },
};

const basicArgTypes = {
  label,
  'icon-name': iconName,
  iconSlot: iconName,
  amount,
  amountSlot,
  active: activeArg,
  disabled: disabledArg,
};

const basicArgs = {
  label: 'Tab title',
  'icon-name': iconName.options[0],
  iconSlot: undefined,
  amount: 123,
  amountSlot: undefined,
  active: false,
  disabled: false,
};

export const Default = Template.bind({});
Default.argTypes = basicArgTypes;
Default.args = { ...basicArgs };

export const Active = Template.bind({});
Active.argTypes = basicArgTypes;
Active.args = { ...basicArgs, active: true };

export const Disabled = Template.bind({});
Disabled.argTypes = basicArgTypes;
Disabled.args = { ...basicArgs, disabled: true };

export const ActiveAndDisabled = Template.bind({});
ActiveAndDisabled.argTypes = basicArgTypes;
ActiveAndDisabled.args = { ...basicArgs, disabled: true, active: true };

export const WithoutIcon = Template.bind({});
WithoutIcon.argTypes = basicArgTypes;
WithoutIcon.args = { ...basicArgs, 'icon-name': undefined };

export const WithoutAmount = Template.bind({});
WithoutAmount.argTypes = basicArgTypes;
WithoutAmount.args = { ...basicArgs, amount: undefined };

export const WithoutIconAndWithoutAmount = Template.bind({});
WithoutIconAndWithoutAmount.argTypes = basicArgTypes;
WithoutIconAndWithoutAmount.args = { ...basicArgs, amount: undefined, 'icon-name': undefined };

export const SlottedIcon = Template.bind({});
SlottedIcon.argTypes = basicArgTypes;
SlottedIcon.args = {
  ...basicArgs,
  'icon-name': undefined,
  iconSlot: 'train-small',
};

export const SlottedAmount = Template.bind({});
SlottedAmount.argTypes = basicArgTypes;
SlottedAmount.args = { ...basicArgs, amount: undefined, amountSlot: 123 };

export const SlottedAmountDisabled = Template.bind({});
SlottedAmountDisabled.argTypes = basicArgTypes;
SlottedAmountDisabled.args = { ...basicArgs, amount: undefined, amountSlot: 123, disabled: true };

export const WithEllipsis = Template.bind({});
WithEllipsis.argTypes = basicArgTypes;
WithEllipsis.args = {
  ...basicArgs,
  label: `A very long label which gets ellipsis when there is no more space to display it`,
};
WithEllipsis.decorators = [
  (Story) => (
    <div style={'max-width: 400px'}>
      <Story />
    </div>
  ),
];

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-tab-title',
};
