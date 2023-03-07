import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-signet {...args} />;

const protectiveRoom = {
  control: {
    type: 'select',
  },
  options: ['none', 'minimal', 'ideal'],
};

const accessibilityLabel = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  'protective-room': protectiveRoom,
  'accessibility-label': accessibilityLabel,
};

const defaultArgs = {
  'protective-room': protectiveRoom.options[0],
  'accessibility-label': undefined,
};

export const NoProtectiveRoom = Template.bind({});
NoProtectiveRoom.argTypes = defaultArgTypes;
NoProtectiveRoom.args = { ...defaultArgs, 'protective-room': protectiveRoom.options[0] };

export const MinimalProtectiveRoom = Template.bind({});
MinimalProtectiveRoom.argTypes = defaultArgTypes;
MinimalProtectiveRoom.args = { ...defaultArgs, 'protective-room': protectiveRoom.options[1] };

export const IdealProtectiveRoom = Template.bind({});
IdealProtectiveRoom.argTypes = defaultArgTypes;
IdealProtectiveRoom.args = { ...defaultArgs, 'protective-room': protectiveRoom.options[2] };

export default {
  decorators: [
    (Story) => (
      <div style="max-width: 300px;">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: {
      viewports: [320],
    },
  },
  title: 'components/sbb-signet',
};
