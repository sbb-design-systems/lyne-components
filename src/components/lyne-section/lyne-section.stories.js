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

  return `background-color: ${ColorWhiteDefault};`;
  // return `background-color: ${ColorCharcoalDefault};`;
};

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

const appearance = {
  control: {
    type: 'select'
  },
  options: [
    'primary',
    'primary-negative'
  ],
  table: {
    category: 'Appearance'
  }
};

const width = {
  control: {
    type: 'select'
  },
  options: [
    'full-bleed--forever',
    'full-bleed--until-ultra-plus',
    'full-bleed--until-ultra',
    'page-spacing'
  ],
  table: {
    category: 'Appearance'
  }
};

const defaultArgTypes = {
  appearance,
  width
};

const defaultArgs = {
  appearance: appearance.options[0],
  width: width.options[0]
};

/* ************************************************* */
/* Storybook template                                */
/* ************************************************* */

const Template = (args) => (
  <lyne-section {...args}>
    <lyne-teaser-hero slot='full-width' button-text='Mehr erfahren' loading='eager' image-src='https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg' link='https://www.sbb.ch' open-in-new-window='false' text='Rücksichtsvoll mit SBB Green Class.'></lyne-teaser-hero>
  </lyne-section>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- Section ------------------------ */
export const WIPSection = Template.bind({});

WIPSection.argTypes = defaultArgTypes;
WIPSection.args = JSON.parse(JSON.stringify(defaultArgs));
WIPSection.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Section (WIP)'
};

/* --- Section negative --------------- */
export const WIPSectionNegative = Template.bind({});

WIPSectionNegative.argTypes = defaultArgTypes;
WIPSectionNegative.args = {
  ...defaultArgs,
  appearance: appearance.options[1]
};
WIPSectionNegative.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Section Negative (WIP)'
};

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}`}>
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
  title: 'components/layout/lyne-section'
};
