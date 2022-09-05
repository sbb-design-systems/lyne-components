import { h } from 'jsx-dom';
import readme from './readme.md';

/* --- link ---------------------------------------- */

const openInNewWindowControl = {
  control: {
    type: 'inline-radio',
  },
  options: ['true', 'false'],
};

/* --- text ---------------------------------------- */

const panelText = {
  control: {
    type: 'text',
  },
  table: {
    category: 'text',
  },
};

const sbbTeaserHeroImageArgs = {
  imageSrc:
    'https://cdn.img.sbb.ch/content/dam/internet/sharedimages/personen/frau-im-ferien.jpg?crop=focalpoint&fp-x=0.5053125&fp-y=0.6458333&fp-z=1&w=1536&h=960&auto=format,compress,cs=tinysrgb&q=30',
};

const SlotTeaserHeroImageTemplate = (args) => (
  <sbb-image slot="image" image-src={args.imageSrc} alt="SBB CFF FFS Angestellte" />
);

// --- Component

const TemplateSbbTeaserHeroDefault = (args) => (
  <sbb-teaser-hero {...args}>
    <SlotTeaserHeroImageTemplate {...sbbTeaserHeroImageArgs} />
  </sbb-teaser-hero>
);

const TemplateSbbPanelWithoutLink = (args) => (
  <sbb-teaser-hero {...args}>
    <SlotTeaserHeroImageTemplate {...sbbTeaserHeroImageArgs} />
  </sbb-teaser-hero>
);

const TemplateSbbPanelWithSlots = (args) => (
  <sbb-teaser-hero {...args}>
    <span slot="text">{args['panel-text']}</span>
    <span slot="panel-link-text">{args['panel-link-text']}</span>
    <SlotTeaserHeroImageTemplate {...sbbTeaserHeroImageArgs} />
  </sbb-teaser-hero>
);

export const defaultTeaser = TemplateSbbTeaserHeroDefault.bind({});
export const openInNewWindow = TemplateSbbTeaserHeroDefault.bind({});
export const withoutLink = TemplateSbbPanelWithoutLink.bind({});
export const withSlots = TemplateSbbPanelWithSlots.bind({});

defaultTeaser.argTypes = {
  'open-in-new-window': openInNewWindowControl,
};

defaultTeaser.args = {
  link: 'https://www.sbb.ch',
  'accessibility-title': 'sbb teaser hero label',
  'panel-text': 'Rücksichtsvoll mit SBB Green Class',
  'panel-link-text': 'Mehr erfahren',
  'open-in-new-window': openInNewWindowControl.options[1],
};

defaultTeaser.documentation = {
  title: 'Default Teaser',
};

openInNewWindow.argTypes = {
  'open-in-new-window': openInNewWindowControl,
  text: panelText,
};

openInNewWindow.args = {
  'panel-text': 'Rücksichtsvoll mit SBB Green Class',
  link: 'https://www.sbb.ch',
  'new-window-info-text': 'Link öffnet in neuem Fenster.',
  'open-in-new-window': openInNewWindowControl.options[0],
};

withoutLink.args = {
  'panel-text': 'Rücksichtsvoll mit SBB Green Class',
};

openInNewWindow.documentation = {
  title: 'Teaser Link open in new Window',
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
