import { h } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';

const getBasicTemplate = ({ text, ...args }, id, iconSlot) => (
  <sbb-menu-action {...args}>
    {text} {id}
    {iconSlot && <sbb-icon slot="icon" name="pie-small" />}
  </sbb-menu-action>
);

const TemplateMenuAction = (args) => (
  <div>
    {getBasicTemplate(args, 1)}
    {getBasicTemplate(args, 2)}
    {getBasicTemplate(args, 3)}
  </div>
);

const TemplateMenuActionCustomIcon = (args) => (
  <div>
    {getBasicTemplate(args, 1, true)}
    {getBasicTemplate(args, 2, false)}
    {getBasicTemplate(args, 3, true)}
  </div>
);

const text = {
  control: {
    type: 'text',
  },
};

const amount = {
  control: {
    type: 'text',
  },
};

const iconName = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Icon',
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

const disabled = {
  control: {
    type: 'boolean',
  },
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
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  text,
  amount,
  'icon-name': iconName,
  href,
  target,
  rel,
  download,
  type,
  disabled,
  name,
  value,
  form,
  'aria-label': ariaLabel,
};

const defaultArgs = {
  text: 'Details',
  amount: '99',
  'icon-name': 'tick-small',
  href: 'https://www.sbb.ch/en',
  target: '_blank',
  rel: undefined,
  download: false,
  type: undefined,
  disabled: false,
  name: undefined,
  value: undefined,
  form: undefined,
  'aria-label': ariaLabel,
};

const buttonArgs = {
  ...defaultArgs,
  href: undefined,
  type: type.options[0],
  name: 'detail',
  value: 'Value',
  form: 'form-name',
};

export const menuActionLink = TemplateMenuAction.bind({});
menuActionLink.argTypes = defaultArgTypes;
menuActionLink.args = { ...defaultArgs };
menuActionLink.documentation = {
  title: 'Menu action - link mode',
};

export const menuActionButton = TemplateMenuAction.bind({});
menuActionButton.argTypes = defaultArgTypes;
menuActionButton.args = { ...buttonArgs };
menuActionButton.documentation = {
  title: 'Menu action - button mode',
};

export const menuActionLinkCustomIconNoAmount = TemplateMenuActionCustomIcon.bind({});
menuActionLinkCustomIconNoAmount.argTypes = defaultArgTypes;
menuActionLinkCustomIconNoAmount.args = {
  ...defaultArgs,
  amount: undefined,
  'icon-name': undefined,
};
menuActionLinkCustomIconNoAmount.documentation = {
  title: 'Menu action - link mode, custom icon, no amount',
};

export const menuActionLinkNoIconNoAmount = TemplateMenuAction.bind({});
menuActionLinkNoIconNoAmount.argTypes = defaultArgTypes;
menuActionLinkNoIconNoAmount.args = { ...defaultArgs, 'icon-name': undefined, amount: undefined };
menuActionLinkNoIconNoAmount.documentation = {
  title: 'Menu action - link mode, no icon, no amount',
};

export const menuActionButtonDisabled = TemplateMenuAction.bind({});
menuActionButtonDisabled.argTypes = defaultArgTypes;
menuActionButtonDisabled.args = { ...buttonArgs, disabled: true };
menuActionButtonDisabled.documentation = {
  title: 'Menu action - button mode (disabled)',
};

export const menuActionButtonEllipsis = TemplateMenuAction.bind({});
menuActionButtonEllipsis.argTypes = defaultArgTypes;
menuActionButtonEllipsis.args = {
  ...buttonArgs,
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};
menuActionButtonEllipsis.documentation = {
  title: 'Menu action - button mode (disabled)',
};

export default {
  decorators: [
    (Story) => (
      <div style={'background-color: var(--sbb-color-black-default); width: 320px;'}>
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
  title: 'components/sbb-menu-action',
};
