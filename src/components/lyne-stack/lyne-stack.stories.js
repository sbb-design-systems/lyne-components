import {
  ColorCharcoalDefault,
  ColorWhiteDefault
} from 'lyne-design-tokens/dist/js/tokens.es6';
import { h } from 'jsx-dom';
import readme from './readme.md';

/* ************************************************* */
/* Documentation platform container                  */
/* ************************************************* */

const documentationPlatformContainerStyle = (context) => {
  const variantsOnDarkBg = ['primary-negative'];

  if (variantsOnDarkBg.indexOf(context.args.appearance) === -1) {
    return {};
  }

  return {
    'background-color': ColorCharcoalDefault
  };
};

/* ************************************************* */
/* Storybook component wrapper, used in Storybook    */
/* ************************************************* */

const wrapperStyle = (context) => {
  const variantsOnDarkBg = ['primary-negative'];

  if (variantsOnDarkBg.indexOf(context.args.appearance) === -1) {
    return `background-color: ${ColorWhiteDefault};`;
  }

  return `background-color: ${ColorCharcoalDefault};`;
};

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

const spacingOptions = [
  'fixed-1x',
  'fixed-2x',
  'fixed-3x',
  'fixed-4x',
  'fixed-5x',
  'fixed-6x',
  'fixed-8x',
  'fixed-10x',
  'fixed-12x',
  'fixed-14x',
  'fixed-16x',
  'fixed-18x',
  'fixed-20x',
  'fixed-24x',
  'fixed-30x',
  'responsive-xxxs',
  'responsive-xxs',
  'responsive-xs',
  'responsive-s',
  'responsive-m',
  'responsive-l',
  'responsive-xl',
  'responsive-xxl'
];

const appearance = {
  control: {
    type: 'select'
  },
  options: [
    'vertical',
    'vertical--centered',
    'horizontal',
    'horizontal--centered'
  ],
  table: {
    category: 'Appearance'
  }
};

const gapHorizontal = {
  control: {
    type: 'select'
  },
  options: spacingOptions,
  table: {
    category: 'Spacing'
  }
};

const gapVertical = {
  control: {
    type: 'select'
  },
  options: spacingOptions,
  table: {
    category: 'Spacing'
  }
};

const spaceLeading = {
  control: {
    type: 'select'
  },
  options: spacingOptions,
  table: {
    category: 'Spacing'
  }
};

const spaceTrailing = {
  control: {
    type: 'select'
  },
  options: spacingOptions,
  table: {
    category: 'Spacing'
  }
};

const defaultArgTypes = {
  appearance,
  'gap-horizontal': gapHorizontal,
  'gap-vertical': gapVertical,
  'space-leading': spaceLeading,
  'space-trailing': spaceTrailing
};

const defaultArgs = {
  appearance: appearance.options[0]
};

/* ************************************************* */
/* Storybook template                                */
/* ************************************************* */

const template = (args) => (
  <lyne-stack {...args}>
    <lyne-title level='2' text='Newsletter.' variant='positive' visual-level='5'></lyne-title>
    <p>Our newsletter regularly informs you of attractive offers from SBB via e-mail.</p>
    <lyne-button variant='secondary' size='large' label='Subscribe' name='sample-name' value='sample-value'></lyne-button>
  </lyne-stack>
);

const templateUnorderedList = (args) => (
  <lyne-stack {...args}>
    <li>user-centered and empowering</li>
    <li>holistic and inclusive</li>
    <li>encourages performance and sustainability</li>
    <li>modular and flexible</li>
    <li>fosters consistency and cohesiveness</li>
  </lyne-stack>
);

const templateOrderedList = (args) => (
  <lyne-stack {...args}>
    <li>1. Lyne is user-centered and empowering.</li>
    <li>2. Lyne is holistic and inclusive.</li>
    <li>3. Lyne encourages performance and sustainability.</li>
    <li>4. Lyne is modular and flexible.</li>
    <li>5. Lyne fosters consistency and cohesiveness.</li>
  </lyne-stack>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- Stack vertical ------------------------ */
export const stackVertical = template.bind({});

stackVertical.argTypes = defaultArgTypes;
stackVertical.args = JSON.parse(JSON.stringify(defaultArgs));
stackVertical.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Stack'
};

/* --- Stack horizontal centered, with horizontal gap responsive size M --- */
export const stackHorizontalCenteredWithHorizontalGapResponsiveM = template.bind({});

stackHorizontalCenteredWithHorizontalGapResponsiveM.argTypes = defaultArgTypes;
stackHorizontalCenteredWithHorizontalGapResponsiveM.args = {
  ...defaultArgs,
  'appearance': appearance.options[3],
  'gap-horizontal': gapHorizontal.options[20]
};
stackHorizontalCenteredWithHorizontalGapResponsiveM.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Stack horizontal'
};

/* --- Stack, uses unordered list markup ------------------------ */
export const stackUsesUnorderedListMarkup = templateUnorderedList.bind({});

stackUsesUnorderedListMarkup.argTypes = defaultArgTypes;
stackUsesUnorderedListMarkup.args = {
  ...defaultArgs,
  'appearance': appearance.options[3],
  'gap-horizontal': gapHorizontal.options[18],
  'tag': 'ul'
};
stackUsesUnorderedListMarkup.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Stack'
};

/* --- Stack, uses ordered list markup ------------------------ */
export const stackUsesOrderedListMarkup = templateOrderedList.bind({});

stackUsesOrderedListMarkup.argTypes = defaultArgTypes;
stackUsesOrderedListMarkup.args = {
  ...defaultArgs,
  tag: 'ol'
};
stackUsesOrderedListMarkup.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Stack'
};

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}padding: 2rem`}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    },
    layout: 'fullscreen'
  },
  title: 'components/layout/lyne-stack'
};
