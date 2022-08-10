import { h } from 'jsx-dom';
import readme from './readme.md';
import events from './sbb-header-action.events';

const Template = (args) => (
  <div style="display: flex; justify-content: start;">
    <sbb-header-action {...args}>
      <span>{args.text} 1</span>
    </sbb-header-action>
    <sbb-header-action {...args}>
      <span>{args.text} 2</span>
    </sbb-header-action>
    <sbb-header-action {...args}>
      <span>{args.text} 3</span>
    </sbb-header-action>
  </div>
);

const download = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Link',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Button',
  },
};

const href = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const icon = {
  control: {
    type: 'text',
  },
};

const actionHeaderId = {
  control: {
    type: 'text',
  },
};

const text = {
  control: {
    type: 'text',
  },
};

const accessibilityLabel = {
  control: {
    type: 'text',
  },
};

const expandFromArg = {
  control: {
    type: 'inline-radio',
  },
  options: ['zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
};

const basicArgTypes = {
  download,
  disabled,
  href: href,
  icon,
  'action-header-id': actionHeaderId,
  'accessibility-label': accessibilityLabel,
  text,
  'expand-from-arg': expandFromArg,
};

const basicArgs = {
  download: false,
  disabled: false,
  href: 'https://github.com/lyne-design-system/lyne-components',
  icon: 'hamburger-menu-small',
  'action-header-id': 'menu',
  'accessibility-label': 'Accessibility label',
  text: 'Menu',
  'expand-from-arg': expandFromArg.options[0],
};

export const sbbHeaderAction = Template.bind({});

sbbHeaderAction.args = JSON.parse(JSON.stringify(basicArgs));

sbbHeaderAction.argTypes = basicArgTypes;

sbbHeaderAction.documentation = {
  title: 'Header action (link version)',
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
      handles: [events.click],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/header/sbb-header-action',
};
