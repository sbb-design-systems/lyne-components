import events from './lyne-cta-button.events.ts';
import { h } from 'jsx-dom';
import lyneIcons from 'lyne-icons/dist/icons.json';

// --- Helper methods

const getMarkupForSvg = (svgName) => {
  const icon = lyneIcons.icons[svgName];
  const frag = document.createRange()
    .createContextualFragment(icon);

  return frag.firstChild;
};

const wrapperStyle = (context) => {
  const variantsWithBlackBg = [
    'primary-negative',
    'secondary-negative',
    'tertiary-negative',
    'transparent-negative'
  ];

  if (variantsWithBlackBg.indexOf(context.args.variant) === -1) {
    return 'background-color: white;';
  }

  return 'background-color: black;';
};

// --- Component

const Template = (args) => (
  <lyne-cta-button
    disabled={args.disabled}
    icon={args.icon}
    label={args.label}
    variant={args.variant}
    size={args.size}
    icon-description={args.iconDescription}
    name='sample-name'
    value='sample-value'
  >
    {getMarkupForSvg(args.iconslot)}
  </lyne-cta-button>
);

export const button = Template.bind({});

// --- Arg types

const icon = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Icon'
  }
};

const iconDescription = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Icon'
  }
};

const iconslot = {
  control: {
    type: 'select'
  },
  options: [
    'arrow-right-small',
    'arrow-down-small',
    'lyne-arrow-compass-small'
  ],
  table: {
    category: 'Icon'
  }
};

const disabled = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'General properties'
  }
};

const label = {
  control: {
    type: 'text'
  },
  description: 'Overwritten description',
  table: {
    category: 'General properties',
    type: {
      detail: 'Something really really long',
      summary: 'Something short'
    }
  }
};

const variant = {
  control: {
    type: 'select'
  },
  options: [
    'primary',
    'primary-negative',
    'secondary',
    'secondary-negative',
    'tertiary',
    'tertiary-negative',
    'transparent',
    'transparent-negative'
  ],
  table: {
    category: 'General properties'
  }
};

const size = {
  control: {
    type: 'radio'
  },
  options: [
    'large',
    'small'
  ],
  table: {
    category: 'General properties'
  }
};

/* eslint-disable sort-keys */
button.argTypes = {
  variant,
  size,
  disabled,
  label,
  icon,
  iconslot,
  iconDescription
};

button.args = {
  variant: variant.options[0],
  size: size.options[0],
  disabled: false,
  label: 'Button',
  icon: true,
  iconslot: iconslot.options[0]
};
/* eslint-enable sort-keys */

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}padding: 2rem`}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    actions: {
      handles: [events.click]
    },
    backgrounds: {
      disable: true
    },
    chromatic: {
      delay: 1000,
      viewports: [
        320,
        764,
        1201
      ]
    },
    docs: {
      source: {
        type: 'code'
      }
    }
  },
  title: 'Button'
};
