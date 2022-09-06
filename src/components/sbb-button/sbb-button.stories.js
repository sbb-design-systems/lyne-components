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
const FixedWidthTemplate = (args) => (
  <div>
    <sbb-button>I am a button</sbb-button>

    <p>
      <sbb-button
        {...args}
        style={{
          width: '200px',
        }}
      >
        {args.icon && <span slot="icon">{getMarkupForSvg(args.iconSlot)}</span>}
        {args.label}
      </sbb-button>
    </p>
    <p>
      <sbb-button
        {...args}
        style={{
          width: '600px',
        }}
      >
        {args.icon && <span slot="icon">{getMarkupForSvg(args.iconSlot)}</span>}
        Button with long text
      </sbb-button>
    </p>
  </div>
);

// --- Arg types

const iconOnly = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Icon',
  },
};
const icon = {
  control: {
    type: 'boolean',
  },
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
  options: ['arrow-right-small', 'arrow-down-small', 'arrow-compass-small', 'pie-small'],
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

const visualButtonOnlyArg = {
  control: {
    type: 'boolean',
  },
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
  iconOnly,
  eventId,
  icon,
  iconSlot,
  'icon-description': iconDescription,
  'visual-button-only': visualButtonOnlyArg,
  negative,
};

const basicArgs = {
  variant: variant.options[0],
  size: size.options[0],
  disabled: false,
  label: 'Button',
  'event-id': 'Event ID',
  iconOnly: false,
  icon: true,
  iconSlot: iconSlot.options[0],
  name: 'sample-name',
  value: 'sample-value',
  'visual-button-only': false,
  negative: false,
};
/* eslint-enable sort-keys */

export const primary = Template.bind({});
export const secondary = Template.bind({});
export const translucent = Template.bind({});
export const transparent = Template.bind({});
export const primaryNegative = Template.bind({});
export const secondaryNegative = Template.bind({});
export const translucentNegative = Template.bind({});
export const transparentNegative = Template.bind({});
export const noIcon = Template.bind({});
export const withIconOnly = Template.bind({});
export const sizeM = Template.bind({});
export const disabled = Template.bind({});
export const fixedWidth = FixedWidthTemplate.bind({});
export const visualOnly = Template.bind({});

primary.argTypes = basicArgTypes;
secondary.argTypes = basicArgTypes;
translucent.argTypes = basicArgTypes;
transparent.argTypes = basicArgTypes;
primaryNegative.argTypes = basicArgTypes;
secondaryNegative.argTypes = basicArgTypes;
translucentNegative.argTypes = basicArgTypes;
transparentNegative.argTypes = basicArgTypes;
noIcon.argTypes = basicArgTypes;
withIconOnly.argTypes = basicArgTypes;
sizeM.argTypes = basicArgTypes;
disabled.argTypes = basicArgTypes;
fixedWidth.argTypes = basicArgTypes;
visualOnly.argTypes = basicArgTypes;

primary.args = JSON.parse(JSON.stringify(basicArgs));
primary.args.variant = variant.options[0];

secondary.args = JSON.parse(JSON.stringify(basicArgs));
secondary.args.variant = variant.options[1];

translucent.args = JSON.parse(JSON.stringify(basicArgs));
translucent.args.variant = variant.options[2];

transparent.args = JSON.parse(JSON.stringify(basicArgs));
transparent.args.variant = variant.options[3];

primaryNegative.args = JSON.parse(JSON.stringify(basicArgs));
primaryNegative.args.variant = variant.options[0];
primaryNegative.args.negative = true;

secondaryNegative.args = JSON.parse(JSON.stringify(basicArgs));
secondaryNegative.args.variant = variant.options[1];
secondaryNegative.args.negative = true;

translucentNegative.args = JSON.parse(JSON.stringify(basicArgs));
translucentNegative.args.variant = variant.options[2];
translucentNegative.args.negative = true;

transparentNegative.args = JSON.parse(JSON.stringify(basicArgs));
transparentNegative.args.negative = true;
transparentNegative.args.variant = variant.options[3];

noIcon.args = JSON.parse(JSON.stringify(basicArgs));
noIcon.args.icon = false;
noIcon.args.iconSlot = false;

withIconOnly.args = JSON.parse(JSON.stringify(basicArgs));
withIconOnly.args.label = '';
withIconOnly.args['icon-description'] = 'Icon description for screenreaders';

sizeM.args = JSON.parse(JSON.stringify(basicArgs));
sizeM.args.size = size.options[1];

disabled.args = JSON.parse(JSON.stringify(basicArgs));
disabled.args.disabled = true;

fixedWidth.args = JSON.parse(JSON.stringify(basicArgs));

visualOnly.args = JSON.parse(JSON.stringify(basicArgs));
visualOnly.args.visualButtonOnly = true;

primary.documentation = {
  title: 'Primary',
};

secondary.documentation = {
  title: 'Secondary',
};

translucent.documentation = {
  title: 'Translucent',
};

transparent.documentation = {
  title: 'Transparent',
};

primaryNegative.documentation = {
  container: {
    styles: {
      'background-color': SbbColorCharcoalDefault,
    },
  },
  title: 'Primary Negative',
};

secondaryNegative.documentation = {
  container: {
    styles: {
      'background-color': SbbColorCharcoalDefault,
    },
  },
  title: 'Secondary Negative',
};

translucentNegative.documentation = {
  container: {
    styles: {
      'background-color': SbbColorCharcoalDefault,
    },
  },
  title: 'Translucent Negative',
};

transparentNegative.documentation = {
  container: {
    styles: {
      'background-color': SbbColorCharcoalDefault,
    },
  },
  title: 'Transparent Negative',
};

noIcon.documentation = {
  title: 'No Icon',
};

withIconOnly.documentation = {
  title: 'Icon only',
};

sizeM.documentation = {
  title: 'M size',
};

disabled.documentation = {
  title: 'Disabled',
};

visualOnly.documentation = {
  title: 'Visual only',
};

fixedWidth.documentation = {
  title: 'Fixed width with overflow',
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
  title: 'components/sbb-button (Unfinished)',
};
