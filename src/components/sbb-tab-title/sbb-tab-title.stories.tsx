/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/html';
import type { InputType } from '@storybook/types';

const Template = ({ iconSlot, label, amountSlot, ...args }): JSX.Element => (
  <sbb-tab-title {...args}>
    {iconSlot && <sbb-icon slot="icon" name={iconSlot}></sbb-icon>}
    {label}
    {amountSlot && <span slot="amount">{amountSlot}</span>}
  </sbb-tab-title>
);

const label: InputType = {
  control: {
    type: 'text',
  },
};

const iconName: InputType = {
  control: {
    type: 'select',
  },
  options: ['app-icon-small', 'train-small', 'swisspass-small', 'pie-small'],
};

const amount: InputType = {
  control: {
    type: 'number',
  },
};

const amountSlot: InputType = {
  control: {
    type: 'number',
  },
};

const activeArg: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Tab State',
  },
};

const disabledArg: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Tab State',
  },
};

const basicArgTypes: ArgTypes = {
  label,
  'icon-name': iconName,
  iconSlot: iconName,
  amount,
  amountSlot,
  active: activeArg,
  disabled: disabledArg,
};

const basicArgs: Args = {
  label: 'Tab title',
  'icon-name': iconName.options[0],
  iconSlot: undefined,
  amount: 123,
  amountSlot: undefined,
  active: false,
  disabled: false,
};

export const Default: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const Active: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgs, active: true },
};

export const Disabled: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true },
};

export const ActiveAndDisabled: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true, active: true },
};

export const WithoutIcon: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'icon-name': undefined },
};

export const WithoutAmount: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgs, amount: undefined },
};

export const WithoutIconAndWithoutAmount: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgs, amount: undefined, 'icon-name': undefined },
};

export const SlottedIcon: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'icon-name': undefined,
    iconSlot: 'train-small',
  },
};

export const SlottedAmount: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgs, amount: undefined, amountSlot: 123 },
};

export const SlottedAmountDisabled: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgs, amount: undefined, amountSlot: 123, disabled: true },
};

export const WithEllipsis: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    label: `A very long label which gets ellipsis when there is no more space to display it`,
  },
  decorators: [
    (Story) => (
      <div style={{ 'max-width': '400px' }}>
        <Story />
      </div>
    ),
  ],
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
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
  title: 'components/sbb-tab/sbb-tab-title',
};

export default meta;
