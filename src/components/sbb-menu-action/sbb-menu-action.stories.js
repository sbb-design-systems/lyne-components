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
  href: href,
  download,
  'menu-action-id': menuActionId,
  'accessibility-label': accessibilityLabel,
  'accessibility-describedby': accessibilityDescribedby,
  'accessibility-labelledby': accessibilityLabelledby,
  name,
  type,
  form,
  disabled,
  'event-id': eventId,
};

const defaultArgs = {
  'menu-action-id': undefined,
  icon: 'circle-information-small',
  amount: '99',
  'accessibility-label': 'Details',
  'accessibility-describedby': '',
  'accessibility-labelledby': '',
  text: 'Details',
  href: 'https://github.com/lyne-design-system/lyne-components',
  download: false,
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
  name: 'detail',
  type: type.options[0],
  form: 'form-name',
  'event-id': 'Event ID for button click',
};

const getBasicTemplate = (args, id, icon) => (
  <sbb-menu-action {...args} menu-action-id={`${args['menu-action-id']}-${id}`}>
    <span>
      {args.text} {id}
    </span>
    {icon && (
      <span slot="icon" style="padding-right: 8px; line-height: 0">
        <svg
          style="fill: white;"
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="4,4 20,4 4,20 20,20" />
        </svg>
      </span>
    )}
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
    {getBasicTemplate(args, 2, true)}
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

export const menuActionLinkCustomIcon = TemplateMenuActionCustomIcon.bind({});
menuActionLinkCustomIcon.argTypes = defaultArgTypes;
menuActionLinkCustomIcon.args = { ...defaultArgs, icon: undefined };
menuActionLinkCustomIcon.documentation = {
  title: 'Menu action - link mode, custom icon',
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
