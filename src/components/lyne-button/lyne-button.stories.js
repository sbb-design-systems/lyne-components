import events from './lyne-button.events.ts';
import { h } from 'jsx-dom';
import lyneIcons from 'lyne-icons/dist/icons.json';
import readme from './readme.md';

// --- Helper methods

const getMarkupForSvg = (svgName) => {
  const icon = lyneIcons.icons[svgName];
  const frag = document.createRange()
    .createContextualFragment(icon);

  return frag.firstChild;
};

const wrapperStyle = (context) => {
  const variantsWithRedBg = [
    'primary-negative',
    'secondary-negative',
    'tertiary-negative',
    'transparent-negative'
  ];

  if (variantsWithRedBg.indexOf(context.args.variant) === -1) {
    return 'background-color: white;';
  }

  return 'background-color: #eb0000;';
};

// --- Component

const Template = (args) => (
  <lyne-button {...args}>
    {getMarkupForSvg(args.iconSlot)}
  </lyne-button>
);

export const lyneButton = Template.bind({});

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

const iconSlot = {
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
  table: {
    category: 'General properties'
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
lyneButton.argTypes = {
  variant,
  size,
  disabled,
  label,
  icon,
  iconSlot: iconSlot,
  'icon-description': iconDescription
};

lyneButton.args = {
  'variant': variant.options[0],
  'size': size.options[0],
  'disabled': false,
  'label': 'Button',
  'icon': true,
  iconSlot: iconSlot.options[0],
  'name': 'sample-name',
  'value': 'sample-value'
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
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-button'
};
