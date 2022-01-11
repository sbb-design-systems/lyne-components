import {
  ColorMilkDefault,
  ColorWhiteDefault
} from 'lyne-design-tokens/dist/js/tokens.es6';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from '../lyne-pearl-chain/lyne-pearl-chain.sample-data';

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

const idValue = {
  control: {
    type: 'text'
  },
  table: {
    category: 'General'
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

/* --- Button -------------------------------------- */

const isButton = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Button'
  }
};

const isDisabled = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Button'
  }
};

const eventId = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Button'
  }
};

const type = {
  control: {
    type: 'select'
  },
  options: [
    'button',
    'reset',
    'submit'
  ],
  table: {
    category: 'Button'
  }
};

const name = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Button'
  }
};

const value = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Button'
  }
};

/* --- Style and positioning ----------------------- */

const appearance = {
  control: {
    type: 'select'
  },
  options: [
    'primary',
    'primary-negative'
  ],
  table: {
    category: 'Style and positioning'
  }
};

const layout = {
  control: {
    type: 'select'
  },
  options: [
    'standard',
    'loose'
  ],
  table: {
    category: 'Style and positioning'
  }
};

/* eslint-disable sort-keys */
const defaultArgTypes = {
  appearance,
  layout,
  'id-value': idValue,
  'accessibility-label': accessibilityLabel,
  'href-value': hrefValue,
  'is-button': isButton,
  'is-disabled': isDisabled,
  type,
  'event-id': eventId,
  name,
  value
};

const defaultArgs = {
  'appearance': appearance.options[0],
  'accessibility-label': 'The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography',
  'layout': layout.options[0],
  'href-value': 'https://github.com/lyne-design-system/lyne-components'
};
/* eslint-enable sort-keys */

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

/* --- category slot ---------------------------------- */

const lyneCategoryArgs = {
  text: 'Sparbillett'
};

const SlotLyneCategoryTemplate = (args) => (
  <span>{args.text}</span>
);

/* --- title slot ---------------------------------- */

const lyneTitleDayPassArgs = {
  'level': 2,
  'text': 'Tageskarte',
  'visual-level': 6
};

const lyneTitleDayPassBicycleArgs = {
  'level': 2,
  'text': 'Velo Tageskarte',
  'visual-level': 6
};

const lyneTitleTravelCardPointToPointArgs = {
  'level': 2,
  'text': 'Streckenkarte',
  'visual-level': 6
};

const lyneTitleTravelCardLiberoArgs = {
  'level': 2,
  'text': 'Libero Tageskarte: Alle Zonen',
  'visual-level': 6
};

const lyneTitleTravelCardGAArgs = {
  'level': 2,
  'text': 'GA',
  'visual-level': 1
};

const lyneTitleTravelCardHalfFareArgs = {
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

/* --- lead slot ---------------------------------- */

const lyneLeadGAArgs = {
  'level': 3,
  'text': 'Generalabonnement',
  'visual-level': 6
};

const lyneLeadGALongArgs = {
  'level': 3,
  'text': 'Mit dem Generalabonnement geniessen Sie freie Fahrt.',
  'visual-level': 6
};

const lyneLeadHalfFareArgs = {
  'level': 3,
  'text': 'Halbtax-Abo',
  'visual-level': 6
};

const lyneLeadHalfFareLongArgs = {
  'level': 3,
  'text': 'Mit dem Halbtax zum halben Preis fahren.',
  'visual-level': 6
};

const SlotLyneLeadTemplate = (args) => (
  <lyne-title {...args} />
);

/* --- text slot ---------------------------------- */

const lyneTextValidTodayArgs = {
  text: 'Gültig heute'
};

const lyneTextValidTodayLongArgs = {
  text: 'Heute, Gültig 24 Stunden'
};

const lyneTextTravelCardValidityArgs = {
  text: '2. Klasse, gültig bis 30.11.2021'
};

const lyneTextTravelCardPointToPointArgs = {
  text: 'Für regelmässige Streckenfahrten'
};

const lyneTextConnectionDetailsArgs = {
  text: 'Samstag, 21.02.2021, 1 h 26 min'
};

const SlotLyneTextTemplate = (args) => (
  <span>{args.text}</span>
);

/* --- pearl chain slot ---------------------------------- */

const SlotPearlChainTemplate = () => (
  <lyne-pearl-chain legs={JSON.stringify(sampleData.stop4)} />
);

/* --- card-badge slot ----------------------------- */

const cardBadgeMinimalArgs = {
  isDiscount: true
};

const cardBadgeArgs = {
  isDiscount: true,
  price: '20.50',
  text: 'from CHF'
};

const cardBadgeWithSlotArgs = {
  isDiscount: true,
  price: '92.50',
  slotGeneric: '<span>on <time datetime="2021-11-25">Black Friday</time></span>',
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

const actionBuyArgs = {
  label: 'Kaufen',
  size: 'small',
  variant: 'secondary',
  visualButtonOnly: true
};

const actionDetailsArgs = {
  label: 'Details',
  variant: 'secondary',
  visualButtonOnly: true
};

const actionHalfFareArgs = {
  label: 'Zum halben Preis fahren',
  variant: 'secondary',
  visualButtonOnly: true
};

const actionGAArgs = {
  label: 'Alle GA im Überblick',
  variant: 'secondary',
  visualButtonOnly: true
};

const actionWithPenArgs = {
  icon: 'highlighter-small',
  label: 'Abo bearbeiten',
  variant: 'secondary',
  visualButtonOnly: true
};

const actionWithQrArgs = {
  icon: 'qrcode-small',
  label: 'Billett',
  variant: 'secondary',
  visualButtonOnly: true
};

const SlotActionTemplate = (args) => (
  <lyne-button {...args}>
    {getMarkupForSvg(args.icon)}
  </lyne-button>
);

/* ************************************************* */
/* Storybook templates                               */
/* ************************************************* */

const TemplateTopProductDayPass = (args) => (
  <lyne-card-product {...args}>
    <div slot='icon'><SlotIconTemplate {...iconArgs}/></div>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitleDayPassArgs}/></div>
    <div slot='text'><SlotLyneTextTemplate {...lyneTextValidTodayArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionBuyArgs}/></div>
  </lyne-card-product>
);

const TemplateTopProductDayPassBicycle = (args) => (
  <lyne-card-product {...args}>
    <div slot='icon'><SlotIconTemplate {...iconBicycleArgs}/></div>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitleDayPassBicycleArgs}/></div>
    <div slot='text'><SlotLyneTextTemplate {...lyneTextValidTodayArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionBuyArgs}/></div>
  </lyne-card-product>
);

const TemplateTopProductTravelCardPointToPoint = (args) => (
  <lyne-card-product {...args}>
    <div slot='icon'><SlotIconTemplate {...iconArgs}/></div>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitleTravelCardPointToPointArgs}/></div>
    <div slot='text'><SlotLyneTextTemplate {...lyneTextTravelCardPointToPointArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionBuyArgs}/></div>
  </lyne-card-product>
);

const TemplateYourProductPointToPointPersonalized = (args) => (
  <lyne-card-product {...args}>
    <div slot='icon'><SlotIconTemplate {...iconArgs}/></div>
    <div slot='title'><SlotLyneJourneyHeaderTemplate {...lyneJourneyHeaderArgs}/></div>
    <div slot='text'><SlotLyneTextTemplate {...lyneTextValidTodayArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionBuyArgs}/></div>
  </lyne-card-product>
);

const TemplateYourProductTravelCardPersonalized = (args) => (
  <lyne-card-product {...args}>
    <div slot='icon'><SlotIconTemplate {...iconArgs}/></div>
    <div slot='category'><SlotLyneCategoryTemplate {...lyneCategoryArgs}/></div>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitleTravelCardLiberoArgs}/></div>
    <div slot='text'><SlotLyneTextTemplate {...lyneTextValidTodayLongArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionWithQrArgs}/></div>
  </lyne-card-product>
);

const TemplateYourProductTicketPersonalized = (args) => (
  <lyne-card-product {...args}>
    <div slot='title'><SlotLyneJourneyHeaderTemplate {...lyneJourneyHeaderArgs}/></div>
    <div slot='text'><SlotLyneTextTemplate {...lyneTextConnectionDetailsArgs}/></div>
    <div slot='details'><SlotPearlChainTemplate /></div>
    <div slot='action'><SlotActionTemplate {...actionDetailsArgs}/></div>
  </lyne-card-product>
);

const TemplateTravelCardGA = (args) => (
  <lyne-card-product {...args}>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitleTravelCardGAArgs}/></div>
    <div slot='lead'><SlotLyneLeadTemplate {...lyneLeadGALongArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionGAArgs}/></div>
  </lyne-card-product>
);

const TemplateTravelCardGAPersonalized = (args) => (
  <lyne-card-product {...args}>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitleTravelCardGAArgs}/></div>
    <div slot='lead'><SlotLyneLeadTemplate {...lyneLeadGAArgs}/></div>
    <div slot='text'><SlotLyneTextTemplate {...lyneTextTravelCardValidityArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionWithPenArgs}/></div>
  </lyne-card-product>
);

const TemplateTravelCardHalfFarePersonalized = (args) => (
  <lyne-card-product {...args}>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitleTravelCardHalfFareArgs}/></div>
    <div slot='lead'><SlotLyneLeadTemplate {...lyneLeadHalfFareArgs}/></div>
    <div slot='text'><SlotLyneTextTemplate {...lyneTextTravelCardValidityArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionWithPenArgs}/></div>
  </lyne-card-product>
);

const TemplateTravelCardHalfFare = (args) => (
  <lyne-card-product {...args}>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitleTravelCardHalfFareArgs}/></div>
    <div slot='lead'><SlotLyneLeadTemplate {...lyneLeadHalfFareLongArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionHalfFareArgs}/></div>
  </lyne-card-product>
);

const TemplateTheWholeShabang = (args) => (
  <lyne-card-product {...args}>
    <div slot='icon'><SlotIconTemplate {...iconArgs}/></div>
    <div slot='category'><SlotLyneCategoryTemplate {...lyneCategoryArgs}/></div>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitleTravelCardGAArgs}/><SlotLyneJourneyHeaderTemplate {...lyneJourneyHeaderArgs}/></div>
    <div slot='lead'><SlotLyneLeadTemplate {...lyneLeadGAArgs}/></div>
    <div slot='text'><SlotLyneTextTemplate {...lyneTextTravelCardValidityArgs}/></div>
    <div slot='details'><SlotPearlChainTemplate /></div>
    <div slot='card-badge'><SlotCardBadgeTemplate {...cardBadgeArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionWithQrArgs}/></div>
  </lyne-card-product>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- CardProduct, Top Product Day Pass --------- */
export const TopProductDayPass = TemplateTopProductDayPass.bind({});

TopProductDayPass.argTypes = defaultArgTypes;
TopProductDayPass.args = {
  ...defaultArgs
};

TopProductDayPass.documentation = {
  title: 'CardProduct, Top Product Day Pass'
};

/* --- CardProduct, Top Product Day Pass Bicycle --------- */
export const TopProductDayPassBicycle = TemplateTopProductDayPassBicycle.bind({});

TopProductDayPassBicycle.argTypes = defaultArgTypes;
TopProductDayPassBicycle.args = {
  ...defaultArgs
};

TopProductDayPassBicycle.documentation = {
  title: 'CardProduct, Top Product Day Pass Bicycle'
};

/* --- CardProduct, Top Product Travel Card Point to Point --------- */
export const TopProductTravelCardPointToPoint = TemplateTopProductTravelCardPointToPoint.bind({});

TopProductTravelCardPointToPoint.argTypes = defaultArgTypes;
TopProductTravelCardPointToPoint.args = {
  ...defaultArgs
};

TopProductTravelCardPointToPoint.documentation = {
  title: 'CardProduct, Top Product Travel Card Point to Point'
};

/* --- CardProduct, Your Product Point to Point Ticket Personalized -------- */
export const YourProductPointToPointPersonalized = TemplateYourProductPointToPointPersonalized.bind({});

YourProductPointToPointPersonalized.argTypes = defaultArgTypes;
YourProductPointToPointPersonalized.args = {
  ...defaultArgs
};

YourProductPointToPointPersonalized.documentation = {
  title: 'CardProduct, Your Product Point to Point Ticket Personalized'
};

/* --- CardProduct, Your Product Travel Card Personalized -------- */
export const YourProductTravelCardPersonalized = TemplateYourProductTravelCardPersonalized.bind({});

YourProductTravelCardPersonalized.argTypes = defaultArgTypes;
YourProductTravelCardPersonalized.args = {
  ...defaultArgs
};

YourProductTravelCardPersonalized.documentation = {
  title: 'CardProduct, Your Product Ticket Personalized'
};

/* --- CardProduct, Your Product Point to Point Ticket Personalized -------- */
export const YourProductTicketPersonalized = TemplateYourProductTicketPersonalized.bind({});

YourProductTicketPersonalized.argTypes = defaultArgTypes;
YourProductTicketPersonalized.args = {
  ...defaultArgs
};

YourProductTicketPersonalized.documentation = {
  title: 'CardProduct, Your Product Ticket Personalized'
};

/* --- CardProduct, Travel Card GA --------- */
export const TravelCardGA = TemplateTravelCardGA.bind({});

TravelCardGA.argTypes = defaultArgTypes;
TravelCardGA.args = {
  ...defaultArgs,
  layout: layout.options[1]
};

TravelCardGA.documentation = {
  title: 'CardProduct, Travel Card GA'
};

/* --- CardProduct, Travel Card GA Personalized --------- */
export const TravelCardGAPersonalized = TemplateTravelCardGAPersonalized.bind({});

TravelCardGAPersonalized.argTypes = defaultArgTypes;
TravelCardGAPersonalized.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  layout: layout.options[1]
};

TravelCardGAPersonalized.documentation = {
  title: 'CardProduct, Travel Card GA Personalized'
};

/* --- CardProduct, Travel Card Half Fare --------- */
export const TravelCardHalfFare = TemplateTravelCardHalfFare.bind({});

TravelCardHalfFare.argTypes = defaultArgTypes;
TravelCardHalfFare.args = {
  ...defaultArgs,
  layout: layout.options[1]
};

TravelCardHalfFare.documentation = {
  title: 'CardProduct, Travel Card Half Fare'
};

/* --- CardProduct, Travel Card Half Fare Personalized --------- */
export const TravelCardHalfFarePersonalized = TemplateTravelCardHalfFarePersonalized.bind({});

TravelCardHalfFarePersonalized.argTypes = defaultArgTypes;
TravelCardHalfFarePersonalized.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  layout: layout.options[1]
};

TravelCardHalfFarePersonalized.documentation = {
  title: 'CardProduct, Travel Card Half Fare Personalized'
};

/*
 * The Whole Shabang, everything which can be added
 * to the product card so far. Even though this should not
 * be done, but this story showcases all possible elements which the card can
 * hold.
 * Not included are the appearance and layout variants since they are always
 * mutually exclusive.
 */
export const CardProductTheWholeShabang = TemplateTheWholeShabang.bind({});

CardProductTheWholeShabang.argTypes = defaultArgTypes;
CardProductTheWholeShabang.args = {
  ...defaultArgs
};

CardProductTheWholeShabang.documentation = {
  title: 'CardProduct, The Whole Shabang'
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
  title: 'cards/lyne-card-product'
};
