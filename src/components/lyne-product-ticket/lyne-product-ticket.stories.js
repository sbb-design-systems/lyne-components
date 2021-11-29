import {
  ColorMilkDefault,
  ColorWhiteDefault
} from 'lyne-design-tokens/dist/js/tokens.es6';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './../lyne-pearl-chain/lyne-pearl-chain.sample-data';

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
/* Slot templates, used in Storybook template        */
/* ************************************************* */

/* --- icon slot ----------------------------------- */

const iconArgs = {
  icon: 'ticket-route-medium'
};

const iconBicycleArgs = {
  icon: 'bicycle-medium'
};

const SlotIconTemplate = (args) => (
  getMarkupForSvg(args.icon)
);

/* --- title slot ---------------------------------- */

const lyneTitleArgs = {
  'level': 3,
  'text': 'Tageskarte',
  'visual-level': 5
};

const lyneTitlePersonalizedArgs = {
  'level': 3,
  'text': 'Libero Tageskarte: Alle Zonen',
  'visual-level': 5
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
  isDiscount: true
};

const cardBadgeDetailedArgs = {
  isDiscount: true,
  price: '37.50',
  size: 'small',
  text: 'from CHF'
};

const cardBadgeSlotArgs = {
  isDiscount: true,
  size: 'small',
  // eslint-disable-next-line max-len
  slotGeneric: '<span><time datetime="2021-11-25">Black Friday</time> Special</span>'
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

const actionTicketArgs = {
  'href-value': 'https://github.com/lyne-design-system/lyne-components',
  'icon-placement': 'start',
  'text': 'Kaufen',
  'variant': 'secondary'
};

const actionTicketPersonalizedArgs = {
  'href-value': 'https://github.com/lyne-design-system/lyne-components',
  'icon': 'qrcode-small',
  'icon-placement': 'start',
  'text': 'Billett',
  'variant': 'secondary'
};

const actionTicketPersonalizedConnectionArgs = {
  'href-value': 'https://github.com/lyne-design-system/lyne-components',
  'icon-placement': 'start',
  'text': 'Details',
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

const TemplateTicket = (args) => (
  <lyne-product-ticket {...args}>
    <div slot='icon'><SlotIconTemplate {...iconArgs}/></div>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitleArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionTicketArgs}/></div>
  </lyne-product-ticket>
);

const TemplateTicketBicycle = (args) => (
  <lyne-product-ticket {...args}>
    <div slot='icon'><SlotIconTemplate {...iconBicycleArgs}/></div>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitleArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionTicketArgs}/></div>
  </lyne-product-ticket>
);

const TemplateTicketCardBadge = (args) => (
  <lyne-product-ticket {...args}>
    <div slot='icon'><SlotIconTemplate {...iconArgs}/></div>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitleArgs}/></div>
    <div slot='card-badge'><SlotCardBadgeTemplate {...cardBadgeArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionTicketArgs}/></div>
  </lyne-product-ticket>
);

const TemplateTicketCardBadgeDetailed = (args) => (
  <lyne-product-ticket {...args}>
    <div slot='icon'><SlotIconTemplate {...iconArgs}/></div>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitleArgs}/></div>
    <div slot='card-badge'><SlotCardBadgeTemplate {...cardBadgeDetailedArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionTicketArgs}/></div>
  </lyne-product-ticket>
);

const TemplateTicketCardBadgeSlot = (args) => (
  <lyne-product-ticket {...args}>
    <div slot='icon'><SlotIconTemplate {...iconArgs}/></div>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitleArgs}/></div>
    <div slot='card-badge'><SlotCardBadgeTemplate {...cardBadgeSlotArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionTicketArgs}/></div>
  </lyne-product-ticket>
);

const TemplateTicketPersonalized = (args) => (
  <lyne-product-ticket {...args}>
    <div slot='icon'><SlotIconTemplate {...iconArgs}/></div>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitlePersonalizedArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionTicketPersonalizedArgs}/></div>
  </lyne-product-ticket>
);

const TemplateTicketPersonalizedConnection = (args) => (
  <lyne-product-ticket {...args}>
    <div slot='title'><SlotLyneJourneyHeaderTemplate {...lyneJourneyHeaderArgs}/></div>
    <div slot='connection-details'><SlotPearlChainTemplate /></div>
    <div slot='action'><SlotActionTemplate {...actionTicketPersonalizedConnectionArgs}/></div>
  </lyne-product-ticket>
);

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

const text = {
  control: {
    type: 'text'
  }
};

const defaultArgTypes = {
  appearance,
  text
};

const defaultArgs = {
  appearance: appearance.options[0],
  text: 'Gültig heute'
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- ProductTicket ------------------------------- */
export const ProductTicket = TemplateTicket.bind({});

ProductTicket.argTypes = defaultArgTypes;
ProductTicket.args = {
  ...defaultArgs
};

ProductTicket.documentation = {
  title: 'Product of type ticket'
};

/* --- ProductTicket bicycle negative -------------- */
export const ProductTicketBicycleNegative = TemplateTicketBicycle.bind({});

ProductTicketBicycleNegative.argTypes = defaultArgTypes;
ProductTicketBicycleNegative.args = {
  ...defaultArgs,
  appearance: appearance.options[1]
};

ProductTicketBicycleNegative.documentation = {
  title: 'Product of type ticket with bicycle icon, appearance primary negative'
};

/* --- ProductTicket with card badge discount ------ */
export const ProductTicketCardBadgeDiscount = TemplateTicketCardBadge.bind({});

ProductTicketCardBadgeDiscount.argTypes = defaultArgTypes;
ProductTicketCardBadgeDiscount.args = {
  ...defaultArgs
};

ProductTicketCardBadgeDiscount.documentation = {
  title: 'Product of type ticket with card badge discount'
};

/* --- ProductTicket with card badge detailed negative ------ */
export const ProductTicketCardBadgeDiscountDetailed = TemplateTicketCardBadgeDetailed.bind({});

ProductTicketCardBadgeDiscountDetailed.argTypes = defaultArgTypes;
ProductTicketCardBadgeDiscountDetailed.args = {
  ...defaultArgs
};

ProductTicketCardBadgeDiscountDetailed.documentation = {
  title: 'Product of type ticket with card badge discount detailed'
};

/* --- ProductTicket with card badge slot ------ */
export const ProductTicketCardBadgeSlot = TemplateTicketCardBadgeSlot.bind({});

ProductTicketCardBadgeSlot.argTypes = defaultArgTypes;
ProductTicketCardBadgeSlot.args = {
  ...defaultArgs
};

ProductTicketCardBadgeSlot.documentation = {
  title: 'Product of type ticket with card badge discount and custom slot'
};

/* --- ProductTicket personalized ---------------- */
export const ProductTicketPersonalized = TemplateTicketPersonalized.bind({});

ProductTicketPersonalized.argTypes = defaultArgTypes;
ProductTicketPersonalized.args = {
  ...defaultArgs,
  text: 'Heute, Gültig 24 Stunden'
};

ProductTicketPersonalized.documentation = {
  title: 'Product of type ticket with personalization'
};

/* --- ProductTicket with journey title ----- */
export const ProductTicketJourneyHeader = TemplateTicketPersonalizedConnection.bind({});

ProductTicketJourneyHeader.argTypes = defaultArgTypes;
ProductTicketJourneyHeader.args = {
  ...defaultArgs,
  text: 'Dienstag, 30.11.2021, 3 h 37 min'
};

ProductTicketJourneyHeader.documentation = {
  title: 'Product of type ticket with journey title and connection details'
};

/* --- next story ... ------------------------------ */

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)} padding: 2rem`}>
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
  title: 'cards/lyne-product-ticket'
};
