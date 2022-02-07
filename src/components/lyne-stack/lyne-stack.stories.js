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

const appearance = {
  control: {
    type: 'select'
  },
  options: [
    'vertical',
    'horizontal'
  ],
  table: {
    category: 'Appearance'
  }
};

const defaultArgTypes = {
  appearance
};

const defaultArgs = {
  appearance: appearance.options[0]
};

/* ************************************************* */
/* Storybook template                                */
/* ************************************************* */

const Template = (args) => (
  <lyne-stack {...args}>
    <lyne-title level='2' text='Newsletter.' variant='positive' visual-level='5'></lyne-title><p>Our newsletter regularly informs you of attractive offers from SBB via e-mail.</p><lyne-button variant='secondary' size='large' label='Subscribe' name='sample-name' value='sample-value'></lyne-button>
  </lyne-stack>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- Stack ------------------------ */
export const stack = Template.bind({});

stack.argTypes = defaultArgTypes;
stack.args = JSON.parse(JSON.stringify(defaultArgs));
stack.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Stack'
};

/* --- Stack negative --------------- */
export const stackHorizontal = Template.bind({});

stackHorizontal.argTypes = defaultArgTypes;
stackHorizontal.args = {
  ...defaultArgs,
  appearance: appearance.options[1]
};
stackHorizontal.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Stack horizontal'
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
  title: 'layout/lyne-stack'
};
