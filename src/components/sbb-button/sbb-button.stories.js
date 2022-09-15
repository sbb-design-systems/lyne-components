import images from '../../global/images';
import { SbbColorCharcoalDefault, SbbColorWhiteDefault } from '@sbb-esta/lyne-design-tokens';
import events from './sbb-button.events.ts';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {
  if (context.args.variant === 'translucent') {
    return `background: url('${images[1]}');background-size: cover;`;
  }

  if (context.args.negative) {
    if (context.args.variant === 'translucent') {
      return `background: url('${images[5]}');background-size: cover;`;
    } else {
      return 'background-color: #484040;';
    }
  }

  return `background-color: ${SbbColorWhiteDefault};`;
};

const focusStyle = (context) => {
  if (context.args.negative) {
    // eslint-disable-next-line no-warning-comments
    // TODO: Use css variable if globally available
    return `--sbb-focus-outline-color:${SbbColorWhiteDefault};`;
  }

  return '';
};

// --- Component

// we don't need to pass the args.label to the <sbb-button> tag, but Storybook wants all in it.
const Template = (args) => (
  <div>
    <sbb-button {...args}>
      {args.icon && <span slot="icon">{getMarkupForSvg(args.iconSlot)}</span>}
      {args.label}
    </sbb-button>
  </div>
);

const AnchorWrappedButtonTemplate = (args) => (
  <div>
    <a
      href="#"
      style="display: block; text-decoration: none; text-align: center; border-radius: 5px;background-color: #212121;padding: 2rem"
    >
      <span style="display: block; color: #fff; text-decoration: none; margin-bottom: 16px;">
        Example anchor wrapping a sbb-button
      </span>
      <sbb-button {...args}>
        {args.icon && <span slot="icon">{getMarkupForSvg(args.iconSlot)}</span>}
        {args.label}
      </sbb-button>
    </a>
  </div>
);

// --- Arg types

const iconOnly = {
  control: {
    type: 'boolean',
  },
  options: [true, false],
  table: {
    category: 'Icon',
  },
};
const icon = {
  control: {
    type: 'boolean',
  },
  options: [true, false],
  table: {
    category: 'Icon',
  },
};

const iconDescription = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Icon',
  },
};

const iconSlot = {
  control: {
    type: 'select',
  },
  options: [
    'arrow-right-small',
    'arrow-down-small',
    'arrow-compass-small',
    'pie-small',
    'cross-small',
  ],
  table: {
    category: 'Icon',
  },
};

const disabledArg = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'General properties',
  },
};

const eventId = {
  control: {
    type: 'text',
  },
  table: {
    category: 'General properties',
  },
};

const label = {
  control: {
    type: 'text',
  },
  table: {
    category: 'General properties',
  },
};

const negative = {
  control: {
    type: 'boolean',
  },
  options: [true, false],
  table: {
    category: 'Styling Variant',
  },
};

const variant = {
  control: {
    type: 'select',
  },
  options: ['primary', 'secondary', 'translucent', 'transparent'],
  table: {
    category: 'Styling Variant',
  },
};

const size = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm'],
  table: {
    category: 'General properties',
  },
};

/* eslint-disable sort-keys */
const basicArgTypes = {
  variant,
  size,
  disabled: disabledArg,
  label,
  'icon-only': iconOnly,
  eventId,
  icon,
  iconSlot,
  'icon-description': iconDescription,
  negative,
};

const basicArgs = {
  variant: variant.options[0],
  size: size.options[0],
  disabled: false,
  label: 'Button',
  'event-id': 'Event ID',
  'icon-only': false,
  icon: false,
  iconSlot: iconSlot.options[4],
  name: 'sample-name',
  value: 'sample-value',
  negative: false,
};
/* eslint-enable sort-keys */
// Default, plain button with label only
export const buttonWithLabelOnly = Template.bind({});
buttonWithLabelOnly.argTypes = basicArgTypes;
buttonWithLabelOnly.args = JSON.parse(JSON.stringify(basicArgs));
buttonWithLabelOnly.documentation = {
  title: 'Sbb-Button with label',
};

// Plain button with label only
export const buttonWithLabelAndIcon = Template.bind({});
buttonWithLabelAndIcon.argTypes = basicArgTypes;
buttonWithLabelAndIcon.args = {
  ...basicArgs,
  icon: true,
};
buttonWithLabelAndIcon.documentation = {
  title: 'Sbb-Button with label and icon',
};

export const buttonWithIconOnly = Template.bind({});
buttonWithIconOnly.argTypes = basicArgTypes;
buttonWithIconOnly.args = {
  ...basicArgs,
  icon: true,
  'icon-only': true,
  label: '',
};
buttonWithIconOnly.documentation = {
  title: 'Sbb-Button with icon only',
};

export const buttonInsideAnchor = AnchorWrappedButtonTemplate.bind({});
buttonInsideAnchor.argTypes = basicArgTypes;
buttonInsideAnchor.args = {
  ...basicArgs,
  icon: true,
};
buttonInsideAnchor.documentation = {
  title: 'Sbb-Button inside an anchor',
};

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}padding: 2rem;${focusStyle(context)}`}>
        <Story />
      </div>
    ),
  ],
  documentation: {
    disableArgs: ['iconslot'],
  },
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
  title: 'components/sbb-button',
};
