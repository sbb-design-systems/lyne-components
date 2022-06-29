import { h } from 'jsx-dom';
import readme from './readme.md';

const openInNewWindowControl = {
  control: {
    type: 'inline-radio',
  },
  options: ['true', 'false'],
};

/* --- sbb-text slot ----------------------------------- */

const sbbPanelTextArgs = {
  text: 'Rücksichtsvoll mit SBB Green Class',
};

const SlotSbbPanelTextTemplate = (args) => <p slot="text">{args.text}</p>;

/* --- sbb-panel - link slot ----------------------------------- */

const sbbPanelLinkArgs = {
  href: 'https://www.sbb.ch/',
  text: 'Mehr erfahren',
};

const SlotPanelSbbLinkTemplate = (args) => (
  <sbb-link
    slot="link"
    href-value={args.href}
    icon="chevron-small-right-small"
    icon-flip=""
    icon-placement="end"
    id-value=""
    text={args.text}
    text-size="m"
    variant="block-negative"
  >
    <span slot="icon">
      <svg width="24" height="24" viewBox="0,0,24,24" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="m10.6776,7.74045,3.949,3.90395.3597.3557-.3597.3555-3.95,3.904-.70297-.7112L13.5639,12,9.97459,8.4516l.70301-.71115z"
        ></path>
      </svg>
    </span>
  </sbb-link>
);

const TemplateSbbPanelDefault = (args) => (
  <sbb-panel slot="panel" {...args}>
    <SlotSbbPanelTextTemplate {...sbbPanelTextArgs} />
    <SlotPanelSbbLinkTemplate {...sbbPanelLinkArgs} />
  </sbb-panel>
);

const sbbTeaserHeroImageArgs = {
  imageSrc:
    'https://cdn.img.sbb.ch/content/dam/internet/sharedimages/personen/frau-im-ferien.jpg?crop=focalpoint&fp-x=0.5053125&fp-y=0.6458333&fp-z=1&w=1536&h=960&auto=format,compress,cs=tinysrgb&q=30',
  loading: '',
  performanceMark: '',
  pictureSizesConfig: '',
};

const SlotTeaserHeroImageTemplate = (args) => (
  <img slot="image" src={args.imageSrc} alt="SBB CFF FFS Angestellte" />
);

// --- Component

const TemplateSbbTeaserHeroDefault = (args) => (
  <sbb-teaser-hero link="sbb.ch" accessibilityTitle="sbb-teaser-hero label" {...args}>
    <TemplateSbbPanelDefault />
    <SlotTeaserHeroImageTemplate {...sbbTeaserHeroImageArgs} />
  </sbb-teaser-hero>
);

export const defaultTeaser = TemplateSbbTeaserHeroDefault.bind({});
export const openInNewWindow = TemplateSbbTeaserHeroDefault.bind({});

defaultTeaser.argTypes = {
  'open-in-new-window': openInNewWindowControl,
};

defaultTeaser.documentation = {
  title: 'Default Teaser',
};

openInNewWindow.argTypes = {
  'open-in-new-window': openInNewWindowControl,
};

openInNewWindow.args = {
  link: 'https://www.sbb.ch',
  'new-window-info-text': 'Link öffnet in neuem Fenster.',
  'open-in-new-window': openInNewWindowControl.options[0],
};

openInNewWindow.documentation = {
  title: 'Teaser Link open in new Window',
};

export default {
  decorators: [
    (Story) => (
      <div>
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
