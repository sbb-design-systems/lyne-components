import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-sbb-logo
    variant={args.variant}
    protective-room={args.protectiveRoom}
  />
);

export const SBBLogo = Template.bind({});

const variants = {
  control: {
    type: 'select'
  },
  options: [
    'default',
    'negative',
    'on-red',
    'black-on-white',
    'white-on-black'
  ]
};

const protectiveRoom = {
  control: {
    type: 'select'
  },
  options: [
    'ideal',
    'minimal'
  ]
};

SBBLogo.argTypes = {
  variant: variants,
  protectiveRoom: protectiveRoom
};

SBBLogo.args = {
  variant: variants.options[0],
  protectiveRoom: protectiveRoom.options[0]
};

export default {
  decorators: [
    (Story) => (
      <div style='max-width: 300px;'>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Brand Elements/SBB Logo'
};
