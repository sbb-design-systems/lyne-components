import events from './lyne-cta-button.events.ts';
import { h } from 'jsx-dom';
import lyneIcons from 'lyne-icons/dist/icons.json';

const getMarkupForSvg = (svgName) => {
  const icon = lyneIcons.icons[svgName];
  const frag = document.createRange()
    .createContextualFragment(icon);

  return frag.firstChild;
};

const Template = (args) => (
  <lyne-cta-button
    disabled={args.disabled}
    icon={args.icon}
    label={args.label}
    variant={args.variant}
    size={args.size}
  >
    {getMarkupForSvg(args.iconslot)}
  </lyne-cta-button>
);

export const button = Template.bind({});

const icon = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Properties'
  }
};

const disabled = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Properties'
  }
};

const label = {
  control: {
    type: 'text'
  },
  description: 'Overwritten description',
  table: {
    category: 'Properties',
    type: {
      detail: 'Something really really long',
      summary: 'Something short'
    }
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
    category: 'Slots'
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
    category: 'Properties'
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
    category: 'Properties'
  }
};

/* eslint-disable sort-keys */
button.argTypes = {
  variant,
  size,
  disabled,
  label,
  icon,
  iconslot
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
  parameters: {
    actions: {
      handles: [events.click]
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
