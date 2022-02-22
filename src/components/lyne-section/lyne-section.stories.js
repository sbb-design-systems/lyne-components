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

const defaultArgTypes = {
  appearance
};

const defaultArgs = {
  'accessibility-title': 'Section',
  'appearance': appearance.options[0]
};

/* ************************************************* */
/* Storybook template                                */
/* ************************************************* */

const Template = (args) => (
  <lyne-section {...args}>
    <div slot='col-1'>
      <lyne-sbb-clock initial-time='now'></lyne-sbb-clock>
    </div>
    <div slot='col-2'>
      <lyne-stack space-leading='fixed-6x'>
        <lyne-sbb-clock initial-time='now'></lyne-sbb-clock>
        <lyne-stack space-leading='fixed-12x'>
          <lyne-sbb-clock initial-time='now'></lyne-sbb-clock>
        </lyne-stack>
      </lyne-stack>
    </div>
    <div slot='col-3'>
      <lyne-sbb-clock initial-time='now'></lyne-sbb-clock>
    </div>
    <div slot='col-4'>
      <lyne-stack space-leading='fixed-16x'>
        <lyne-sbb-clock initial-time='now'></lyne-sbb-clock>
      </lyne-stack>
    </div>
  </lyne-section>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- Footer ------------------------ */
export const section = Template.bind({});

section.argTypes = defaultArgTypes;
section.args = JSON.parse(JSON.stringify(defaultArgs));
section.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Section'
};

/* --- Section negative --------------- */
export const sectionNegative = Template.bind({});

sectionNegative.argTypes = defaultArgTypes;
sectionNegative.args = {
  ...defaultArgs,
  appearance: appearance.options[1]
};
sectionNegative.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Section Negative'
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
  title: 'page sections/lyne-section'
};
