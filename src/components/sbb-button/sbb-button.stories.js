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

const Template = ({ label, ...args }) => (
  <div>
    <sbb-button {...args}>
      {args.iconName && <span slot="icon">{args.iconName}</span>}
      {label}
    </sbb-button>
  </div>
);

const FixedWidthTemplate = ({ label, ...args }) => (
  <div>
    <p>
      <sbb-button
        {...args}
        style={{
          width: '200px',
        }}
      >
        {args.iconName && <span slot="icon">{args.iconName}</span>}
        {label}
      </sbb-button>
    </p>
    <p>
      <sbb-button
        {...args}
        style={{
          maxWidth: '100%',
          width: '600px',
        }}
      >
        <span slot="icon">{getMarkupForSvg('pie-small')}</span>
        Wide Button
      </sbb-button>
    </p>
  </div>
);

// --- Arg types

const iconDescription = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Icon',
  },
};

const iconName = {
  control: {
    type: 'select',
  },
  options: [
    '',
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
  'icon-name': iconName,
  'icon-description': iconDescription,
  negative,
};

const basicArgs = {
  variant: variant.options[0],
  size: size.options[0],
  disabled: false,
  label: 'Button',
  'icon-name': iconName.options[0],
  name: 'sample-name',
  value: 'sample-value',
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
export const iconOnly = Template.bind({});
export const sizeM = Template.bind({});
export const disabled = Template.bind({});
export const fixedWidth = FixedWidthTemplate.bind({});

primary.argTypes = basicArgTypes;
secondary.argTypes = basicArgTypes;
translucent.argTypes = basicArgTypes;
transparent.argTypes = basicArgTypes;
primaryNegative.argTypes = basicArgTypes;
secondaryNegative.argTypes = basicArgTypes;
translucentNegative.argTypes = basicArgTypes;
transparentNegative.argTypes = basicArgTypes;
noIcon.argTypes = basicArgTypes;
iconOnly.argTypes = basicArgTypes;
sizeM.argTypes = basicArgTypes;
disabled.argTypes = basicArgTypes;
fixedWidth.argTypes = basicArgTypes;

primary.args = JSON.parse(JSON.stringify(basicArgs));
secondary.args = JSON.parse(JSON.stringify(basicArgs));
translucent.args = JSON.parse(JSON.stringify(basicArgs));
transparent.args = JSON.parse(JSON.stringify(basicArgs));
primaryNegative.args = JSON.parse(JSON.stringify(basicArgs));
secondaryNegative.args = JSON.parse(JSON.stringify(basicArgs));
translucentNegative.args = JSON.parse(JSON.stringify(basicArgs));
transparentNegative.args = JSON.parse(JSON.stringify(basicArgs));
noIcon.args = JSON.parse(JSON.stringify(basicArgs));
iconOnly.args = JSON.parse(JSON.stringify(basicArgs));
sizeM.args = JSON.parse(JSON.stringify(basicArgs));
disabled.args = JSON.parse(JSON.stringify(basicArgs));
fixedWidth.args = JSON.parse(JSON.stringify(basicArgs));

primary.args = {
  ...basicArgs,
  variant: variant.options[0],
};
secondary.args = {
  ...basicArgs,
  variant: variant.options[1],
};
translucent.args = {
  ...basicArgs,
  variant: variant.options[2],
};
transparent.args = {
  ...basicArgs,
  variant: variant.options[3],
};
primaryNegative.args = {
  ...basicArgs,
  variant: variant.options[0],
  negative: true,
};
secondaryNegative.args = {
  ...basicArgs,
  variant: variant.options[1],
  negative: true,
};
translucentNegative.args = {
  ...basicArgs,
  variant: variant.options[2],
  negative: true,
};
transparentNegative.args = {
  ...basicArgs,
  variant: variant.options[3],
  negative: true,
};
sizeM.args = {
  ...basicArgs,
  size: size.options[1],
};

fixedWidth.args = {
  ...basicArgs,
  label: 'Button with long text',
};

/* eslint-enable prefer-destructuring */

iconOnly.args = {
  ...basicArgs,
  'icon-name': iconName.options[5],
  label: '',
};

disabled.args.disabled = true;

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

iconOnly.documentation = {
  title: 'Icon only',
};

sizeM.documentation = {
  title: 'M size',
};

disabled.documentation = {
  title: 'Disabled',
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
  title: 'components/sbb-button',
};
