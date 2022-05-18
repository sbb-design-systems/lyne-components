import {
  ColorCharcoalDefault,
  ColorWhiteDefault
} from 'lyne-design-tokens/dist/js/tokens.es6';
import events from './lyne-button.events.ts';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {
  const variantsWithRedBg = [
    'primary-negative',
    'secondary-negative',
    'tertiary-negative',
    'transparent-negative'
  ];

  if (variantsWithRedBg.indexOf(context.args.variant) === -1) {
    return `background-color: ${ColorWhiteDefault};`;
  }

  return `background-color: ${ColorCharcoalDefault};`;
};

// --- Component

const Template = (args) => (
  <lyne-button {...args}>
    {getMarkupForSvg(args.iconSlot)}
  </lyne-button>
);

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
    'arrow-compass-small',
    'pie-small'
  ],
  table: {
    category: 'Icon'
  }
};

const disabledArg = {
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
    'secondary',
    'tertiary',
    'transparent',
    'primary-negative',
    'secondary-negative',
    'tertiary-negative',
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
const basicArgTypes = {
  variant,
  size,
  'disabled': disabledArg,
  label,
  icon,
  iconSlot,
  'icon-description': iconDescription
};

const basicArgs = {
  variant: variant.options[0],
  size: size.options[0],
  disabled: false,
  label: 'Button',
  icon: true,
  iconSlot: iconSlot.options[0],
  name: 'sample-name',
  value: 'sample-value'
};
/* eslint-enable sort-keys */

export const primary = Template.bind({});
export const secondary = Template.bind({});
export const tertiary = Template.bind({});
export const transparent = Template.bind({});
export const primaryNegative = Template.bind({});
export const secondaryNegative = Template.bind({});
export const tertiaryNegative = Template.bind({});
export const transparentNegative = Template.bind({});
export const noIcon = Template.bind({});
export const iconOnly = Template.bind({});
export const small = Template.bind({});
export const disabled = Template.bind({});

primary.argTypes = basicArgTypes;
secondary.argTypes = basicArgTypes;
tertiary.argTypes = basicArgTypes;
transparent.argTypes = basicArgTypes;
primaryNegative.argTypes = basicArgTypes;
secondaryNegative.argTypes = basicArgTypes;
tertiaryNegative.argTypes = basicArgTypes;
transparentNegative.argTypes = basicArgTypes;
noIcon.argTypes = basicArgTypes;
iconOnly.argTypes = basicArgTypes;
small.argTypes = basicArgTypes;
disabled.argTypes = basicArgTypes;

primary.args = JSON.parse(JSON.stringify(basicArgs));
secondary.args = JSON.parse(JSON.stringify(basicArgs));
tertiary.args = JSON.parse(JSON.stringify(basicArgs));
transparent.args = JSON.parse(JSON.stringify(basicArgs));
primaryNegative.args = JSON.parse(JSON.stringify(basicArgs));
secondaryNegative.args = JSON.parse(JSON.stringify(basicArgs));
tertiaryNegative.args = JSON.parse(JSON.stringify(basicArgs));
transparentNegative.args = JSON.parse(JSON.stringify(basicArgs));
noIcon.args = JSON.parse(JSON.stringify(basicArgs));
iconOnly.args = JSON.parse(JSON.stringify(basicArgs));
small.args = JSON.parse(JSON.stringify(basicArgs));
disabled.args = JSON.parse(JSON.stringify(basicArgs));

/* eslint-disable prefer-destructuring */
secondary.args.variant = variant.options[1];
tertiary.args.variant = variant.options[2];
transparent.args.variant = variant.options[3];
primaryNegative.args.variant = variant.options[4];
secondaryNegative.args.variant = variant.options[5];
tertiaryNegative.args.variant = variant.options[6];
transparentNegative.args.variant = variant.options[7];
small.args.size = size.options[1];
/* eslint-enable prefer-destructuring */

noIcon.args.icon = false;
noIcon.args.iconSlot = false;

iconOnly.args.label = '';
iconOnly.args['icon-description'] = 'Icon description for screenreaders';

disabled.args.disabled = true;

primary.documentation = {
  title: 'Primary'
};

secondary.documentation = {
  title: 'Secondary'
};

tertiary.documentation = {
  title: 'Tertiary'
};

transparent.documentation = {
  title: 'Transparent'
};

primaryNegative.documentation = {
  container: {
    styles: {
      'background-color': ColorCharcoalDefault
    }
  },
  title: 'Primary Negative'
};

secondaryNegative.documentation = {
  container: {
    styles: {
      'background-color': ColorCharcoalDefault
    }
  },
  title: 'Secondary Negative'
};

tertiaryNegative.documentation = {
  container: {
    styles: {
      'background-color': ColorCharcoalDefault
    }
  },
  title: 'Tertiary Negative'
};

transparentNegative.documentation = {
  container: {
    styles: {
      'background-color': ColorCharcoalDefault
    }
  },
  title: 'Transparent Negative'
};

noIcon.documentation = {
  title: 'No Icon'
};

iconOnly.documentation = {
  title: 'Icon only'
};

small.documentation = {
  title: 'Small size'
};

disabled.documentation = {
  title: 'Disabled'
};

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}padding: 2rem`}>
        <Story/>
      </div>
    )
  ],
  documentation: {
    disableArgs: ['iconslot']
  },
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
  title: 'components/lyne-button'
};
