import {
  ColorMilkDefault,
  ColorWhiteDefault
} from 'lyne-design-tokens/dist/js/tokens.es6';
import { h } from 'jsx-dom';
import readme from './readme.md';

/* ************************************************* */
/* Storybook component wrapper, used in Storybook    */
/* ************************************************* */

const wrapperStyle = (context) => {
  const variantsOnDarkBg = ['primary-negative'];

  if (variantsOnDarkBg.indexOf(context.args.appearance) === -1) {
    return `background-color: ${ColorWhiteDefault};`;
  }

  return `background-color: ${ColorMilkDefault};`;
};

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

/* --- General ------------------------------------- */

const accessibilityLabel = {
  control: {
    type: 'text'
  },
  table: {
    category: 'General'
  }
};

/* --- Darkmode -------------------------------------- */

const appearance = {
  control: {
    type: 'select'
  },
  options: [
    'primary',
    'primary-negative'
  ]
};

/* --- Layout ------------------------------------- */

const isStacked = {
  control: {
    type: 'boolean'
  }
};

/* --- Link ---------------------------------------- */

const hrefValue = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Link'
  }
};

const imgSrc = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Link'
  }
};

const imgAlt = {
  control: {
    type: 'text'
  }
};

/* --- Title ---------------------------------------- */

const Headline = {
  control: {
    type: 'text'
  },
  table: {
    category: 'General'
  }
};

/* --- Text ---------------------------------------- */

const Description = {
  control: {
    type: 'text'
  },
  table: {
    category: 'General'
  }
};

/* --- Style and positioning ----------------------- */

/* eslint-disable sort-keys */
const defaultArgTypes = {
  'accessibility-label': accessibilityLabel,
  isStacked,
  appearance,
  'img-src': imgSrc,
  'img-alt': imgAlt,
  'href-value': hrefValue,
  'headline': Headline,
  'description': Description
};

const defaultArgs = {
  'accessibility-label': 'The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the Teaser, either through text or iconography',
  'isStacked': true,
  'href-value': 'https://github.com/lyne-design-system/lyne-components',
  'img-src': 'https://via.placeholder.com/400x300',
  'img-alt': '400x300 image',
  'headline': 'This is a title',
  'description': 'This is a paragraph',
  'appearance': appearance.options[0]
};

/* ************************************************* */
/* Storybook templates                               */
/* ************************************************* */

const TemplateDefaultTeaser = (args) => (
  <lyne-teaser {...args}/>
);

const TemplateNegativ = (args) => (
  <lyne-teaser {...args}/>
);

const TemplateLongText = (args) => (
  <lyne-teaser {...args}/>
);

const TemplateTeaserList = (args) => (
  <ul style='display:grid; list-style: none; grid-template-columns: repeat(auto-fit, 20rem); gap: 1rem;'>
    <li>
      <lyne-teaser {...args} style='display:block; width: 240px;'/>
    </li>
    <li>
      <lyne-teaser {...args} style='display:block; width: 240px;'/>
    </li>
    <li>
      <lyne-teaser {...args} style='display:block; width: 240px;'/>
    </li>
    <li>
      <lyne-teaser {...args} style='display:block; width: 240px;'/>
    </li>
    <li>
      <lyne-teaser {...args} style='display:block; width: 240px;'/>
    </li>
    <li>
      <lyne-teaser {...args} style='display:block; width: 240px;'/>
    </li>
  </ul>
);

const TemplateTeaserListisStacked = (args) => (
  <ul style='display:grid; list-style: none; grid-template-columns: repeat(auto-fit, 20rem); gap: 1rem;'>
    <li>
      <lyne-teaser {...args} style='display:block; width: 240px;'/>
    </li>
    <li>
      <lyne-teaser {...args} style='display:block; width: 240px;'/>
    </li>
    <li>
      <lyne-teaser {...args} style='display:block; width: 240px;'/>
    </li>
    <li>
      <lyne-teaser {...args} style='display:block; width: 240px;'/>
    </li>
  </ul>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- Teaser, Journey --------- */
export const defaultTeaser = TemplateDefaultTeaser.bind({});
export const primaryNegative = TemplateNegativ.bind({});
export const TeaserWithLongText = TemplateLongText.bind({});
export const teaserList = TemplateTeaserList.bind({});
export const teaserListisStacked = TemplateTeaserListisStacked.bind({});

defaultTeaser.argTypes = defaultArgTypes;
defaultTeaser.args = {
  ...defaultArgs
};

primaryNegative.argTypes = defaultArgTypes;
primaryNegative.args = {
  ...defaultArgs,
  appearance: appearance.options[1]
};

TeaserWithLongText.argTypes = defaultArgTypes;
TeaserWithLongText.args = {
  ...defaultArgs,
  description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
};

teaserList.argTypes = defaultArgTypes;
teaserList.args = {
  ...defaultArgs,
  isStacked: false
};

teaserListisStacked.argTypes = defaultArgTypes;
teaserListisStacked.args = {
  ...defaultArgs
};

defaultTeaser.documentation = {
  container: {
    styles: {
      'background-color': ColorWhiteDefault
    }
  },
  title: 'Teaser, Journey'
};

primaryNegative.documentation = {
  container: {
    styles: {
      'background-color': ColorMilkDefault
    }
  },
  title: 'Primary Negative'
};

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)} padding: 2rem; max-width: 760px;`}>
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
  title: 'components/lyne-teaser'
};
