import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-sbb-logo {...args} />
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
    'none',
    'ideal',
    'minimal'
  ]
};

SBBLogo.argTypes = {
  'protective-room': protectiveRoom,
  'variant': variants
};

SBBLogo.args = {
  'protective-room': protectiveRoom.options[0],
  'variant': variants.options[0]
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
