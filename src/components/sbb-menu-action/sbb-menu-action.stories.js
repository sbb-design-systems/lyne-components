import events from './sbb-menu-action.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const text = {
  control: {
    type: 'text',
  },
};

const icon = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Icon',
  },
};

const amount = {
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

const menuActionId = {
  control: {
    type: 'text',
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

const disabled = {
  control: {
    type: 'boolean',
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

const value = {
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

const defaultArgTypes = {
  text,
  icon,
  amount,
  href,
  download,
  rel,
  target,
  'menu-action-id': menuActionId,
  'accessibility-label': accessibilityLabel,
  'accessibility-describedby': accessibilityDescribedby,
  'accessibility-labelledby': accessibilityLabelledby,
  name,
  type,
  form,
  disabled,
  'event-id': eventId,
  value,
};

const defaultArgs = {
  'menu-action-id': undefined,
  icon: 'tick-small',
  amount: '99',
  'accessibility-label': 'Details',
  'accessibility-describedby': '',
  'accessibility-labelledby': '',
  text: 'Details',
  href: 'https://www.sbb.ch/en',
  download: false,
  rel: undefined,
  target: '_blank',
  name: undefined,
  type: undefined,
  form: undefined,
  'event-id': undefined,
  disabled: false,
};

const buttonArgs = {
  ...defaultArgs,
  href: undefined,
  download: undefined,
  target: undefined,
  name: 'detail',
  type: type.options[0],
  form: 'form-name',
  value: 'Value',
  'event-id': 'Event ID for button click',
};

const getBasicTemplate = (args, id, icon) => (
  <sbb-menu-action {...args} menu-action-id={`${args['menu-action-id']}-${id}`}>
    <span>
      {args.text} {id}
    </span>
    {icon && <sbb-icon slot="icon" name="pie-small" />}
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
menuActionLinkCustomIconNoAmount.args = { ...defaultArgs, icon: undefined, amount: undefined };
menuActionLinkCustomIconNoAmount.documentation = {
  title: 'Menu action - link mode, custom icon, no amount',
};

export const menuActionLinkNoIconNoAmount = TemplateMenuAction.bind({});
menuActionLinkNoIconNoAmount.argTypes = defaultArgTypes;
menuActionLinkNoIconNoAmount.args = { ...defaultArgs, icon: undefined, amount: undefined };
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
  title: 'components/menu/sbb-menu-action',
};
