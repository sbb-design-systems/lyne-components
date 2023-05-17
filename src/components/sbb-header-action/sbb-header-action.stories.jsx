import { h } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';

const TemplateSingle = (args) => <sbb-header-action {...args}>{args.text}</sbb-header-action>;

const TemplateMultiple = (args) => (
  <div style="display: flex; gap: 2rem;">
    <sbb-header-action {...args}>{args.text} 1</sbb-header-action>
    <sbb-header-action {...args}>{args.text} 2</sbb-header-action>
    <sbb-header-action {...args}>{args.text} 3</sbb-header-action>
  </div>
);

const text = {
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

const iconName = {
  control: {
    type: 'text',
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

const download = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Link',
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

const name = {
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

const form = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const ariaLabel = {
  control: { type: 'text' },
};

const basicArgTypes = {
  text,
  'expand-from': expandFrom,
  'icon-name': iconName,
  href,
  target,
  rel,
  download,
  type,
  name,
  value,
  form,
  'aria-label': ariaLabel,
};

const basicArgs = {
  text: 'Menu',
  'expand-from': expandFrom.options[0],
  'icon-name': 'hamburger-menu-small',
  href: 'https://github.com/lyne-design-system/lyne-components',
  target: '_blank',
  rel: undefined,
  download: false,
  type: undefined,
  name: undefined,
  value: undefined,
  form: undefined,
  'aria-label': undefined,
};

const basicArgsButton = {
  ...basicArgs,
  href: undefined,
  target: undefined,
  download: undefined,
  type: type.options[0],
  name: 'header-button',
  value: 'value',
  form: 'form',
};

export const sbbHeaderActionLink = TemplateSingle.bind({});
sbbHeaderActionLink.argTypes = basicArgTypes;
sbbHeaderActionLink.args = { ...basicArgs };
sbbHeaderActionLink.documentation = {
  title: 'Header action (link version)',
};

export const sbbHeaderActionButton = TemplateSingle.bind({});
sbbHeaderActionButton.argTypes = basicArgTypes;
sbbHeaderActionButton.args = { ...basicArgsButton };
sbbHeaderActionButton.documentation = {
  title: 'Header action (button version)',
};

export const sbbHeaderActionLinkMultiple = TemplateMultiple.bind({});
sbbHeaderActionLinkMultiple.argTypes = basicArgTypes;
sbbHeaderActionLinkMultiple.args = { ...basicArgs };
sbbHeaderActionLinkMultiple.documentation = {
  title: 'Header action multiple (link version)',
};

export const sbbHeaderActionButtonMultiple = TemplateMultiple.bind({});
sbbHeaderActionButtonMultiple.argTypes = basicArgTypes;
sbbHeaderActionButtonMultiple.args = { ...basicArgsButton };
sbbHeaderActionButtonMultiple.documentation = {
  title: 'Header action multiple (button version)',
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
    withActions,
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
  title: 'components/sbb-header-action',
};
