import events from './sbb-tag.events.ts';
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

const Template = ({ label, ...args }) => (
  <sbb-tag {...args}>
    {label}
    {args.amount !== undefined && <span slot="amount">{args.amount}</span>}
  </sbb-tag>
);

export const defaultTag = Template.bind({});
defaultTag.argTypes = defaultArgTypes;
defaultTag.args = {
  ...defaultArgs,
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
    actions: {
      handles: ['change', events.didChange],
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
