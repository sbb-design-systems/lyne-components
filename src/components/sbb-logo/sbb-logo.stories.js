import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {
  if (context.args.variant === 'negative' || context.args.variant === 'white-on-black') {
    return 'background-color: var(--sbb-color-charcoal-default);';
  }

  return ``;
};

const Template = (args) => <sbb-logo {...args} />;

const variants = {
  control: {
    type: 'select',
  },
  options: ['default', 'negative', 'on-red', 'black-on-white', 'white-on-black'],
};

const protectiveRoom = {
  control: {
    type: 'select',
  },
  options: ['none', 'ideal', 'minimal'],
};

const defaultArgTypes = {
  'protective-room': protectiveRoom,
  variant: variants,
};

const defaultArgs = {
  'protective-room': protectiveRoom.options[0],
  variant: variants.options[0],
};

export const NoProtectiveRoom = Template.bind({});
NoProtectiveRoom.argTypes = defaultArgTypes;
NoProtectiveRoom.args = { ...defaultArgs };

export const IdealProtectiveRoom = Template.bind({});
IdealProtectiveRoom.argTypes = defaultArgTypes;
IdealProtectiveRoom.args = { ...defaultArgs, 'protective-room': protectiveRoom.options[1] };

export const MinimalProtectiveRoom = Template.bind({});
MinimalProtectiveRoom.argTypes = defaultArgTypes;
MinimalProtectiveRoom.args = { ...defaultArgs, 'protective-room': protectiveRoom.options[2] };

export const Negative = Template.bind({});
Negative.argTypes = defaultArgTypes;
Negative.args = {
  ...defaultArgs,
  variant: variants.options[1],
  'protective-room': protectiveRoom.options[1],
};

export const OnRed = Template.bind({});
OnRed.argTypes = defaultArgTypes;
OnRed.args = {
  ...defaultArgs,
  variant: variants.options[2],
  'protective-room': protectiveRoom.options[1],
};

export const BlackOnWhite = Template.bind({});
BlackOnWhite.argTypes = defaultArgTypes;
BlackOnWhite.args = {
  ...defaultArgs,
  variant: variants.options[3],
  'protective-room': protectiveRoom.options[1],
};

export const WhiteOnBlack = Template.bind({});
WhiteOnBlack.argTypes = defaultArgTypes;
WhiteOnBlack.args = {
  ...defaultArgs,
  variant: variants.options[4],
  'protective-room': protectiveRoom.options[1],
};

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)};max-width: 300px;`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'brand elements/SBB Logo',
};
