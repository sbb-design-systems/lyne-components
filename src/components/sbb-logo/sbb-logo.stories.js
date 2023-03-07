import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {
  if (context.args.negative) {
    return 'background-color: var(--sbb-color-charcoal-default);';
  }

  return ``;
};

const Template = (args) => <sbb-logo {...args} />;

const negative = {
  control: {
    type: 'boolean',
  },
};

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
  negative,
  'protective-room': protectiveRoom,
  'accessibility-label': accessibilityLabel,
};

const defaultArgs = {
  negative: false,
  'protective-room': protectiveRoom.options[0],
  'accessibility-label': undefined,
};

export const NoProtectiveRoom = Template.bind({});
NoProtectiveRoom.argTypes = defaultArgTypes;
NoProtectiveRoom.args = { ...defaultArgs };

export const MinimalProtectiveRoom = Template.bind({});
MinimalProtectiveRoom.argTypes = defaultArgTypes;
MinimalProtectiveRoom.args = { ...defaultArgs, 'protective-room': protectiveRoom.options[1] };

export const IdealProtectiveRoom = Template.bind({});
IdealProtectiveRoom.argTypes = defaultArgTypes;
IdealProtectiveRoom.args = { ...defaultArgs, 'protective-room': protectiveRoom.options[2] };

export const Negative = Template.bind({});
Negative.argTypes = defaultArgTypes;
Negative.args = {
  ...defaultArgs,
  negative: true,
  'protective-room': protectiveRoom.options[2],
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
    chromatic: {
      viewports: [320],
    },
  },
  title: 'components/sbb-logo',
};
