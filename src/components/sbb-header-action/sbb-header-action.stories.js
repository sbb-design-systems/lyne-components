import { h } from 'jsx-dom';
import readme from './readme.md';
import events from './sbb-header-action.events';

const Template = (args) => (
  <div style="display: flex; gap: 2rem;">
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

const text = {
  control: {
    type: 'text',
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

const expandFrom = {
  control: {
    type: 'inline-radio',
  },
  options: ['zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
};

const href = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const download = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Link',
  },
};

const target = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const rel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const name = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const type = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
  table: {
    category: 'Button',
  },
};

const form = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const eventId = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const value = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
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

const basicArgTypes = {
  text,
  icon,
  'expand-from': expandFrom,
  'action-header-id': actionHeaderId,
  href,
  target,
  rel,
  download,
  type,
  name,
  value,
  form,
  eventId,
  'accessibility-label': accessibilityLabel,
  'accessibility-describedby': accessibilityDescribedby,
  'accessibility-labelledby': accessibilityLabelledby,
};

const basicArgs = {
  text: 'Menu',
  icon: 'hamburger-menu-small',
  'expand-from': expandFrom.options[0],
  'action-header-id': 'menu',
  href: 'https://github.com/lyne-design-system/lyne-components',
  target: '_blank',
  download: false,
  type: undefined,
  name: undefined,
  value: undefined,
  form: undefined,
  eventId: undefined,
  'accessibility-label': 'Accessibility label',
  'accessibility-describedby': undefined,
  'accessibility-labelledby': undefined,
};

export const sbbHeaderActionLink = Template.bind({});
sbbHeaderActionLink.argTypes = basicArgTypes;
sbbHeaderActionLink.args = { ...basicArgs };
sbbHeaderActionLink.documentation = {
  title: 'Header action (link version)',
};

export const sbbHeaderActionButton = Template.bind({});
sbbHeaderActionButton.argTypes = basicArgTypes;
sbbHeaderActionButton.args = {
  ...basicArgs,
  href: undefined,
  target: undefined,
  download: undefined,
  type: 'button',
  name: 'header-button',
  value: undefined,
  form: undefined,
  eventId: 'Header button',
};
sbbHeaderActionButton.documentation = {
  title: 'Header action (button version)',
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
