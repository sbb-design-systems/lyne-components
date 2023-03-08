import { h } from 'jsx-dom';
import readme from './readme.md';

const iconName = {
  control: {
    type: 'text',
  },
};

const value = {
  control: {
    type: 'text',
  },
};

const active = {
  control: {
    type: 'boolean',
  },
};

const preserveIconSpace = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes = {
  value,
  'icon-name': iconName,
  active: active,
  'preserve-icon-space': preserveIconSpace,
};

const defaultArgs = {
  value: 'First value',
  'icon-name': 'clock-small',
  active: false,
  'preserve-icon-space': false,
};

const Template = ({ value, ...args }) => (
  <div>
    <sbb-option {...args}>{value}</sbb-option>
    <sbb-option {...args}>{value}</sbb-option>
    <sbb-option {...args}>{value}</sbb-option>
  </div>
);

const defaultDecorator = [
  (Story) => (
    <div style={'border: 3px solid red'}>
      <Story />
    </div>
  ),
];

export const Basic = Template.bind({});
Basic.argTypes = defaultArgTypes;
Basic.args = { ...defaultArgs };
Basic.decorators = defaultDecorator;

export const NoIcon = Template.bind({});
NoIcon.argTypes = defaultArgTypes;
NoIcon.args = { ...defaultArgs, 'icon-name': '' };
NoIcon.decorators = defaultDecorator;

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
      handles: ['click'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-option',
};
