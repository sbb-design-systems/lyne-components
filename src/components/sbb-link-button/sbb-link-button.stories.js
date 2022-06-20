import {
  SbbColorCharcoalDefault,
  SbbColorWhiteDefault
} from '@sbb-esta/lyne-design-tokens/dist/js/sbb-tokens.mjs';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {

  const variantsOnDarkBg = [
    'primary-negative',
    'secondary-negative'
  ];

  if (variantsOnDarkBg.indexOf(context.args.variant) === -1) {
    return `background-color: ${SbbColorWhiteDefault};`;
  }

  return `background-color: ${SbbColorCharcoalDefault};`;

};

const Template = (args) => (
  <sbb-link-button {...args}>
    {args.icon &&
      <span slot='icon'>{getMarkupForSvg(args.icon)}</span>
    }
  </sbb-link-button>
);

const download = {
  control: {
    type: 'boolean'
  }
};

const idValue = {
  control: {
    type: 'text'
  }
};

const iconFlip = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Icon'
  }
};

const hrefValue = {
  control: {
    type: 'text'
  }
};

const icon = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Icon'
  }
};

const iconPlacement = {
  control: {
    type: 'inline-radio'
  },
  options: [
    'start',
    'end'
  ],
  table: {
    category: 'Icon'
  }
};

const text = {
  control: {
    type: 'text'
  }
};

const variant = {
  control: {
    type: 'select'
  },
  options: [
    'primary',
    'secondary',
    'primary-negative',
    'secondary-negative'
  ]
};

const defaultArgTypes = {
  download,
  'href-value': hrefValue,
  icon,
  'icon-flip': iconFlip,
  'icon-placement': iconPlacement,
  'id-value': idValue,
  text,
  variant
};

const defaultArgs = {
  'download': false,
  'href-value': 'https://github.com/lyne-design-system/lyne-components',
  'icon': '',
  'icon-flip': false,
  'icon-placement': iconPlacement.options[0],
  'id-value': '',
  'text': 'Travelcards & tickets',
  'variant': variant.options[0]
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const LinkButtonPrimary = Template.bind({});

LinkButtonPrimary.argTypes = defaultArgTypes;
LinkButtonPrimary.args = {
  ...defaultArgs
};

LinkButtonPrimary.documentation = {
  title: 'Link Button Primary'
};

export const LinkButtonPrimaryNegative = Template.bind({});

LinkButtonPrimaryNegative.argTypes = defaultArgTypes;
LinkButtonPrimaryNegative.args = {
  ...defaultArgs,
  variant: variant.options[2]
};

LinkButtonPrimaryNegative.documentation = {
  title: 'Link Button Primary Negative'
};

export const LinkButtonPrimaryWithIcon = Template.bind({});

LinkButtonPrimaryWithIcon.argTypes = defaultArgTypes;
LinkButtonPrimaryWithIcon.args = {
  ...defaultArgs,
  'icon': 'user-small',
  'icon-flip': true
};

LinkButtonPrimaryWithIcon.documentation = {
  title: 'Link Button Primary With Icon'
};

export const LinkButtonSecondary = Template.bind({});

LinkButtonSecondary.argTypes = defaultArgTypes;
LinkButtonSecondary.args = {
  ...defaultArgs,
  variant: variant.options[1]
};

LinkButtonSecondary.documentation = {
  title: 'Link Button Secondary'
};

export const LinkButtonSecondaryNegative = Template.bind({});

LinkButtonSecondaryNegative.argTypes = defaultArgTypes;
LinkButtonSecondaryNegative.args = {
  ...defaultArgs,
  variant: variant.options[3]
};

LinkButtonSecondaryNegative.documentation = {
  title: 'Link Button Secondary Negative'
};

export const LinkButtonSecondaryWithIcon = Template.bind({});

LinkButtonSecondaryWithIcon.argTypes = defaultArgTypes;
LinkButtonSecondaryWithIcon.args = {
  ...defaultArgs,
  'icon': 'user-small',
  'icon-flip': true,
  'variant': variant.options[1]
};

LinkButtonSecondaryWithIcon.documentation = {
  title: 'Link Button Secondary With Icon'
};

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}padding: 2rem`}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    backgrounds: {
      disable: true
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'components/sbb-link-button'
};
