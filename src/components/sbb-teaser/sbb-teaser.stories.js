import { SbbColorWhiteDefault } from '@sbb-esta/lyne-design-tokens/dist/js/sbb-tokens.mjs';
import { h } from 'jsx-dom';
import readme from './readme.md';

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

/* --- General ------------------------------------- */

const accessibilityLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'General',
  },
};

/* --- Layout ------------------------------------- */

const isStacked = {
  control: {
    type: 'boolean',
  },
};

/* --- Link ---------------------------------------- */

const hrefValue = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

/* --- Style and positioning ----------------------- */

/* eslint-disable sort-keys */
const defaultArgTypes = {
  'accessibility-label': accessibilityLabel,
  isStacked,
  'href-value': hrefValue,
};

const defaultArgs = {
  'accessibility-label':
    'The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the Teaser, either through text or iconography',
  isStacked: true,
  'href-value': 'https://github.com/lyne-design-system/lyne-components',
  description: 'This is a paragraph',
};

/* ************************************************* */
/* Slot templates, used in Storybook template        */
/* ************************************************* */

const sbbTeaserImageArgs = {
  src: 'https://via.placeholder.com/400x300',
  alt: '400x300 image',
};

const SlotSbbTeaserImageTemplate = (args) => <img slot="image" src={args.src} alt={args.alt} />;

const sbbTeaserHeadlineArgs = {
  headline: 'This is a title',
  longHeadline:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
};

const SlotSbbTeaserHeadlineTemplate = (args) => (
  <sbb-title slot="headline" level="5" text={args.headline} />
);

const SlotSbbTeaserLongHeadlineTemplate = (args) => (
  <sbb-title slot="headline" level="5" text={args.longHeadline} />
);

const sbbTeaserDescriptionArgs = {
  description: 'This is a paragraph',
  longDescription:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
};

const SlotSbbTeaserDescriptionTemplate = (args) => <p slot="description">{args.description}</p>;

const SlotSbbTeaserLongDescriptionTemplate = (args) => (
  <p slot="description">{args.longDescription}</p>
);

/* ************************************************* */
/* Storybook templates                               */
/* ************************************************* */

const TemplateDefaultTeaser = (args) => (
  <sbb-teaser {...args}>
    <SlotSbbTeaserImageTemplate {...sbbTeaserImageArgs} style="width:110px;" />
    <SlotSbbTeaserHeadlineTemplate {...sbbTeaserHeadlineArgs} />
    <SlotSbbTeaserDescriptionTemplate {...sbbTeaserDescriptionArgs} />
  </sbb-teaser>
);

const TemplateLongText = (args) => (
  <sbb-teaser {...args} style="width: 110px">
    <SlotSbbTeaserImageTemplate {...sbbTeaserImageArgs} style="max-width:110px;" />
    <SlotSbbTeaserLongHeadlineTemplate {...sbbTeaserHeadlineArgs} />
    <SlotSbbTeaserLongDescriptionTemplate {...sbbTeaserDescriptionArgs} />
  </sbb-teaser>
);

const TemplateTeaserList = (args) => (
  <ul style="display:grid; list-style: none; grid-template-columns: repeat(auto-fit, 20rem); gap: 2rem;">
    <li>
      <TemplateDefaultTeaser {...args} style="" />
    </li>
    <li>
      <TemplateDefaultTeaser {...args} style="" />
    </li>
    <li>
      <TemplateDefaultTeaser {...args} style="" />
    </li>
    <li>
      <TemplateDefaultTeaser {...args} style="" />
    </li>
    <li>
      <TemplateDefaultTeaser {...args} style="" />
    </li>
    <li>
      <TemplateDefaultTeaser {...args} style="" />
    </li>
  </ul>
);

const TemplateTeaserListIsStacked = (args) => (
  <ul style="display:grid; list-style: none; grid-template-columns: repeat(auto-fit, 20rem); gap: 2rem;">
    <li>
      <TemplateDefaultTeaser {...args} style="" />
    </li>
    <li>
      <TemplateDefaultTeaser {...args} style="" />
    </li>
    <li>
      <TemplateDefaultTeaser {...args} style="" />
    </li>
    <li>
      <TemplateDefaultTeaser {...args} style="" />
    </li>
  </ul>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- Teaser, Journey --------- */
export const defaultTeaser = TemplateDefaultTeaser.bind({});
export const TeaserWithLongText = TemplateLongText.bind({});
export const teaserList = TemplateTeaserList.bind({});
export const teaserListIsStacked = TemplateTeaserListIsStacked.bind({});

defaultTeaser.argTypes = defaultArgTypes;
defaultTeaser.args = {
  ...defaultArgs,
};

TeaserWithLongText.argTypes = defaultArgTypes;
TeaserWithLongText.args = {
  ...defaultArgs,
  description:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
};

teaserList.argTypes = defaultArgTypes;
teaserList.args = {
  ...defaultArgs,
  isStacked: false,
};

teaserListIsStacked.argTypes = defaultArgTypes;
teaserListIsStacked.args = {
  ...defaultArgs,
};

defaultTeaser.documentation = {
  container: {
    styles: {
      'background-color': SbbColorWhiteDefault,
    },
  },
  title: 'Teaser, Journey',
};

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

export default {
  decorators: [
    (Story) => (
      <div style={`padding: 2rem; max-width: 760px`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-teaser',
};
