import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <sbb-tab-title {...args}>
    <sbb-icon slot="icon" name={args.iconSlot}></sbb-icon>
    {args.label}
    <sbb-tab-amount>{args.amountSlot}</sbb-tab-amount>
  </sbb-tab-title>
);

const label = {
  control: {
    type: 'text',
  },
};

const iconSlot = {
  control: {
    type: 'select',
  },
  options: ['app-icon-small', 'train-small', 'swisspass-small', 'pie-small'],
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
  iconSlot,
  amountSlot,
  active: activeArg,
  disabled: disabledArg,
};

const basicArgs = {
  label: 'Tab title',
  iconSlot: iconSlot.options[0],
  amountSlot: '123',
  active: false,
  disabled: false,
};

export const title = Template.bind({});

title.argTypes = basicArgTypes;
title.args = JSON.parse(JSON.stringify(basicArgs));

title.documentation = {
  title: 'Tab Title',
};

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
