import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './../lyne-pearl-chain/lyne-pearl-chain.sample-data';

/* ************************************************* */
/* Slot templates, used in Storybook template        */
/* ************************************************* */

/* --- icon slot ----------------------------------- */

const iconArgs = {
  icon: 'ticket-route-medium'
};

const SlotIconTemplate = (args) => (
  <span>{getMarkupForSvg(args.icon)}</span>
);

/* --- title slot ---------------------------------- */

const lyneTitleArgs = {
  'level': 2,
  'text': '1/2',
  'visual-level': 1
};

const SlotLyneTitleTemplate = (args) => (
  <lyne-title {...args} />
);

const lyneJourneyHeaderArgs = {
  destination: 'Loèche-les-Bains',
  isRoundTrip: true,
  markup: 'h2',
  origin: 'La Chaux de Fonds',
  size: 5
};

const SlotLyneJourneyHeaderTemplate = (args) => (
  <lyne-journey-header {...args} />
);

/* --- pearl chain slot ---------------------------------- */

const SlotPearlChainTemplate = () => (
  <lyne-pearl-chain legs={JSON.stringify(sampleData.stop4)} />
);

/* --- card-badge slot ----------------------------- */

const cardBadgeArgs = {
  isDiscount: true,
  price: '88.88',
  size: 'small',
  // slotGeneric: '<span>on <time datetime="2021-11-25">Black Friday</time></span>',
  text: 'from CHF'
};

const SlotCardBadgeTemplate = (args) => (
  <lyne-card-badge {...args}>
    {args.slotGeneric &&
      <span slot='generic' dangerouslySetInnerHTML={{
        __html: args.slotGeneric
      }}></span>
    }
  </lyne-card-badge>
);

/* --- action slot ----------------------------- */

const actionArgs = {
  'href-value': 'https://github.com/lyne-design-system/lyne-components',
  // 'icon': 'qrcode-small',
  'icon-placement': 'start',
  'text': 'Abo bearbeiten',
  'variant': 'secondary'
};

const SlotActionTemplate = (args) => (
  <lyne-link-button {...args}>
    {args.icon &&
      <span slot='icon'>{getMarkupForSvg(args.icon)}</span>
    }
  </lyne-link-button>
);

/* ************************************************* */
/* Storybook templates                               */
/* ************************************************* */

const TemplateLyneTitle = (args) => (
  <lyne-product-subscription {...args}>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitleArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionArgs}/></div>
  </lyne-product-subscription>
);

const TemplateLyneJourneyHeader = (args) => (
  <lyne-product-subscription {...args}>
    <div slot='icon'><SlotIconTemplate {...iconArgs}/></div>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitleArgs}/><SlotLyneJourneyHeaderTemplate {...lyneJourneyHeaderArgs}/></div>
    <div slot='connection-details'><SlotPearlChainTemplate /></div>
    <div slot='card-badge'><SlotCardBadgeTemplate {...cardBadgeArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionArgs}/></div>
  </lyne-product-subscription>
);

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

const text = {
  control: {
    type: 'text'
  }
};

const lead = {
  control: {
    type: 'text'
  }
};

const defaultArgTypes = {
  lead,
  text
};

const defaultArgs = {
  lead: 'Halbtax-Abo',
  text: '2. Klasse, gültig bis 30.11.2021'
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- ProductSubscription with Lyne Title --------- */
export const ProductSubscriptionLyneTitle = TemplateLyneTitle.bind({});

ProductSubscriptionLyneTitle.argTypes = defaultArgTypes;
ProductSubscriptionLyneTitle.args = {
  ...defaultArgs
};

ProductSubscriptionLyneTitle.documentation = {
  title: 'Product of type subscription'
};

/* --- ProductSubscription with Journey Title ----- */
export const ProductSubscriptionLyneJourneyHeader = TemplateLyneJourneyHeader.bind({});

ProductSubscriptionLyneJourneyHeader.argTypes = defaultArgTypes;
ProductSubscriptionLyneJourneyHeader.args = {
  ...defaultArgs
};

ProductSubscriptionLyneJourneyHeader.documentation = {
  title: 'Product of type subscription'
};

/* --- next story ... ------------------------------ */

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
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
  title: 'lyne-product-subscription'
};
