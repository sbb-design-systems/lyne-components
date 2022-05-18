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
    'horizontal--start',
    'horizontal--end',
    'horizontal--start--centered',
    'horizontal--end--centered',
    'horizontal--centered',
    'horizontal--space-between',
    'horizontal--space-between--centered'
  ],
  table: {
    category: 'Appearance'
  }
};

const collapseHorizontalBelow = {
  control: {
    type: 'select'
  },
  options: [
    'micro',
    'small',
    'medium',
    'large',
    'wide',
    'wide--max-content',
    'ultra',
    'ultra--max-content'
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

const isPlaceholder = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Prototyping'
  }
};

const noWrap = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Appearance'
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

const stackWidth = {
  control: {
    type: 'text'
  },
  options: spacingOptions,
  table: {
    category: 'Size'
  }
};

const stackHeight = {
  control: {
    type: 'text'
  },
  options: spacingOptions,
  table: {
    category: 'Size'
  }
};

const defaultArgTypes = {
  appearance,
  'collapse-horizontal-below': collapseHorizontalBelow,
  'gap-horizontal': gapHorizontal,
  'gap-vertical': gapVertical,
  'is-placeholder': isPlaceholder,
  'no-wrap': noWrap,
  'space-leading': spaceLeading,
  'space-trailing': spaceTrailing,
  'stack-height': stackHeight,
  'stack-width': stackWidth
};

const defaultArgs = {
  appearance: appearance.options[0]
};

/* ************************************************* */
/* Storybook template                                */
/* ************************************************* */

const template = (args) => (
  <lyne-stack {...args}>
    <lyne-title level='2' text='Lyne' variant='positive' visual-level='5'></lyne-title>
    <p>Is user-centered and empowering, holistic and inclusive, encourages ...</p>
    <lyne-link-button href-value='https://github.com/lyne-design-system/lyne-components' text='Discover Lyne' variant='primary'></lyne-link-button>
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

const templatePlaceholder = (args) => (
  <lyne-stack {...args}></lyne-stack>
);

const templatePlaceholderWithTitle = (args) => (
  <lyne-stack {...args}>
    <lyne-title level='2' text='Stack placeholder' variant='positive' visual-level='5'></lyne-title>
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

/* --- Stack horizontal centered, with horizontal gap responsive size S --- */
export const stackHorizontalCenteredWithHorizontalGapResponsiveS = template.bind({});

stackHorizontalCenteredWithHorizontalGapResponsiveS.argTypes = defaultArgTypes;
stackHorizontalCenteredWithHorizontalGapResponsiveS.args = {
  ...defaultArgs,
  'appearance': appearance.options[6],
  'gap-horizontal': gapHorizontal.options[18]
};
stackHorizontalCenteredWithHorizontalGapResponsiveS.documentation = {
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
  'appearance': appearance.options[6],
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

/* --- Stack placeholder with title ------------------------ */
export const stackPlaceholder = templatePlaceholder.bind({});

stackPlaceholder.argTypes = defaultArgTypes;
stackPlaceholder.args = {
  ...defaultArgs,
  'is-placeholder': true,
  'stack-height': '10vh',
  'stack-width': '100%'
};
stackPlaceholder.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Stack placeholder'
};

/* --- Stack placeholder with title ------------------------ */
export const stackPlaceholderWithTitle = templatePlaceholderWithTitle.bind({});

stackPlaceholderWithTitle.args = {
  ...defaultArgs,
  'is-placeholder': true,
  'space-leading': 'responsive-xl',
  'stack-height': '14vh',
  'stack-width': '32vw'
};
stackPlaceholderWithTitle.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Stack placeholder with title'
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
