import { h } from 'jsx-dom';
import readme from './readme.md';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';

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

const SlotSbbPanelTextTemplate = (args) => <span slot="text">{args.text}</span>;

/* --- sbb-panel - link slot ----------------------------------- */

const sbbPanelLinkArgs = {
  href: 'https://www.sbb.ch/',
  text: 'Mehr erfahren',
};

const SlotPanelSbbLinkTemplate = (args) => (
  <sbb-link slot="link" href-value={args.href} icon-flip="" id-value="" text={args.text}>
    <span slot="icon">{getMarkupForSvg('chevron-small-right-small')}</span>
  </sbb-link>
);

const TemplateSbbPanelDefault = (args) => (
  <sbb-panel slot="panel" {...args}>
    <SlotSbbPanelTextTemplate {...args} />
    <SlotPanelSbbLinkTemplate {...sbbPanelLinkArgs} />
  </sbb-panel>
);

const sbbTeaserHeroImageArgs = {
  imageSrc:
    'https://cdn.img.sbb.ch/content/dam/internet/sharedimages/personen/frau-im-ferien.jpg?crop=focalpoint&fp-x=0.5053125&fp-y=0.6458333&fp-z=1&w=1536&h=960&auto=format,compress,cs=tinysrgb&q=30',
};

const SlotTeaserHeroImageTemplate = (args) => (
  <img slot="image" src={args.imageSrc} alt="SBB CFF FFS Angestellte" />
);

// --- Component

const TemplateSbbTeaserHeroDefault = (args) => (
  <sbb-teaser-hero {...args}>
    <TemplateSbbPanelDefault {...args} />
    <SlotTeaserHeroImageTemplate {...sbbTeaserHeroImageArgs} />
  </sbb-teaser-hero>
);

const TemplateSbbPanelWithoutLink = (args) => (
  <sbb-teaser-hero {...args}>
    <sbb-panel slot="panel" {...args}>
      <SlotSbbPanelTextTemplate {...args} />
    </sbb-panel>
    <SlotTeaserHeroImageTemplate {...sbbTeaserHeroImageArgs} />
  </sbb-teaser-hero>
);

export const defaultTeaser = TemplateSbbTeaserHeroDefault.bind({});
export const openInNewWindow = TemplateSbbTeaserHeroDefault.bind({});
export const withoutLink = TemplateSbbPanelWithoutLink.bind({});

defaultTeaser.argTypes = {
  'open-in-new-window': openInNewWindowControl,
  text: panelText,
};

defaultTeaser.args = {
  link: 'https://www.sbb.ch',
  'accessibility-title': 'sbb teaser hero label',
  text: 'Rücksichtsvoll mit SBB Green Class',
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
  text: 'Rücksichtsvoll mit SBB Green Class',
  link: 'https://www.sbb.ch',
  'new-window-info-text': 'Link öffnet in neuem Fenster.',
  'open-in-new-window': openInNewWindowControl.options[0],
};

withoutLink.argTypes = {
  text: panelText,
};

withoutLink.args = {
  text: 'Rücksichtsvoll mit SBB Green Class',
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
  title: 'components/sbb-teaser-hero (Unfinished)',
};
