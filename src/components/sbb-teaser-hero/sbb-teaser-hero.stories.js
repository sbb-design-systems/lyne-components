import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleImages from '../../global/images';

const accessibilityLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'link',
  },
};

const href = {
  control: {
    type: 'text',
  },
  table: {
    category: 'link',
  },
};

const rel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'link',
  },
};

const target = {
  control: {
    type: 'text',
  },
  table: {
    category: 'link',
  },
};

const content = {
  control: {
    type: 'text',
  },
};

const linkContent = {
  control: {
    type: 'text',
  },
};

const imageSrc = {
  control: {
    type: 'text',
  },
};

const imageAlt = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  'accessibility-label': accessibilityLabel,
  href,
  rel,
  target,
  content,
  'link-content': linkContent,
  'image-src': imageSrc,
  'image-alt': imageAlt,
};

const defaultArgs = {
  'accessibility-label': undefined,
  href: 'https://www.sbb.ch',
  rel: undefined,
  target: undefined,
  content: 'Break out and explore castles and palaces.',
  'link-content': 'Find out more',
  'image-src': sampleImages[1],
  'image-alt': 'SBB CFF FFS Employee',
};

const TemplateSbbTeaserHeroDefault = (args) => (
  <sbb-teaser-hero {...args}>{args.content}</sbb-teaser-hero>
);

const TemplateSbbTeaserWithSlots = (args) => (
  <sbb-teaser-hero {...args}>
    {args.content}
    <span slot="link-content">{args['link-content']}</span>
    <sbb-image slot="image" image-src={args['image-src']} alt={args['image-alt']} />
  </sbb-teaser-hero>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

export const defaultTeaser = TemplateSbbTeaserHeroDefault.bind({});
defaultTeaser.argTypes = defaultArgTypes;
defaultTeaser.args = {
  ...defaultArgs,
};

export const openInNewWindow = TemplateSbbTeaserHeroDefault.bind({});
openInNewWindow.argTypes = defaultArgTypes;
openInNewWindow.args = {
  ...defaultArgs,
  target: '_blank',
};

export const withoutLink = TemplateSbbTeaserHeroDefault.bind({});
withoutLink.argTypes = defaultArgTypes;
withoutLink.args = {
  ...defaultArgs,
  href: undefined,
};

export const withSlots = TemplateSbbTeaserWithSlots.bind({});
withSlots.argTypes = defaultArgTypes;
withSlots.args = {
  ...defaultArgs,
};

export default {
  decorators: [
    (Story) => (
      <div style="padding: 1em">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'components/sbb-teaser-hero',
};
