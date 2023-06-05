import { h } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';

import placeholderImage from './stories/placeholder.png';

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

/* --- General ------------------------------------- */

const title = {
  control: {
    type: 'text',
  },
  table: {
    category: 'General',
  },
};

const description = {
  control: {
    type: 'text',
  },
  table: {
    category: 'General',
  },
};

const ariaLabel = {
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

const href = {
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
  title,
  description,
  'aria-label': ariaLabel,
  'is-stacked': isStacked,
  href,
};

const defaultArgs = {
  title: 'This is a title',
  description: 'This is a paragraph',
  'aria-label':
    'The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the Teaser, either through text or iconography',
  'is-stacked': true,
  href: 'https://github.com/lyne-design-system/lyne-components',
};

/* ************************************************* */
/* Slot templates, used in Storybook template        */
/* ************************************************* */

/* ************************************************* */
/* Storybook templates                               */
/* ************************************************* */

const TemplateDefaultTeaser = (args) => {
  const { title, description, ...remainingArgs } = args;

  const sbbTeaserImageArgs = {
    src: placeholderImage,
    alt: '400x300 image',
  };

  return (
    <sbb-teaser {...remainingArgs}>
      <img slot="image" src={sbbTeaserImageArgs.src} alt={sbbTeaserImageArgs.alt} />
      <span slot="title">{title}</span>
      <p slot="description">{description}</p>
    </sbb-teaser>
  );
};

const TemplateTeaserList = (args) => (
  <ul style="display:grid; list-style: none; grid-template-columns: repeat(auto-fit, 20rem); gap: 2rem;">
    {[...Array(6)].map(() => (
      <li>
        <TemplateDefaultTeaser {...args} style="" />
      </li>
    ))}
  </ul>
);

const TemplateTeaserListIsStacked = (args) => (
  <ul style="display:grid; list-style: none; grid-template-columns: repeat(auto-fit, 20rem); gap: 2rem;">
    {[...Array(4)].map(() => (
      <li>
        <TemplateDefaultTeaser {...args} style="" />
      </li>
    ))}
  </ul>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- Teaser, Journey --------- */
export const defaultTeaser = TemplateDefaultTeaser.bind({});
export const TeaserWithLongText = TemplateDefaultTeaser.bind({});
export const teaserList = TemplateTeaserList.bind({});
export const teaserListIsStacked = TemplateTeaserListIsStacked.bind({});

defaultTeaser.argTypes = defaultArgTypes;
defaultTeaser.args = {
  ...defaultArgs,
};

TeaserWithLongText.argTypes = defaultArgTypes;
TeaserWithLongText.args = {
  ...defaultArgs,
  title:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  description:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
};

teaserList.argTypes = defaultArgTypes;
teaserList.args = {
  ...defaultArgs,
  'is-stacked': false,
};

teaserListIsStacked.argTypes = defaultArgTypes;
teaserListIsStacked.args = {
  ...defaultArgs,
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
    withActions,
  ],
  parameters: {
    actions: {
      handles: ['click'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-teaser',
};
