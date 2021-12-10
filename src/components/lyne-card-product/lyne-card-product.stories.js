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

const type = {
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

const defaultArgTypes = {
  appearance,
  type
};

const defaultArgs = {
  appearance: appearance.options[0],
  type: type.options[0]
};

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

/* --- category slot ---------------------------------- */

const lyneCategoryArgs = {
  text: 'Sparbillett'
};

const SlotLyneCategoryTemplate = (args) => (
  <span>{args.text}</span>
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

/* --- lead slot ---------------------------------- */

const lyneLeadArgs = {
  'level': 3,
  'text': 'Halbtax-Abo',
  'visual-level': 6
};

const SlotLyneLeadTemplate = (args) => (
  <lyne-title {...args} />
);

/* --- text slot ---------------------------------- */

const lyneTextArgs = {
  text: '2. Klasse, gültig bis 30.11.2021'
};

const SlotLyneTextTemplate = (args) => (
  <span>{args.text}</span>
);

/* --- pearl chain slot ---------------------------------- */

const SlotPearlChainTemplate = () => (
  <lyne-pearl-chain legs={JSON.stringify(sampleData.stop4)} />
);

/* --- card-badge slot ----------------------------- */

const cardBadgeArgs = {
  isDiscount: true,
  price: '88.88',
  // eslint-disable-next-line max-len
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
  <lyne-card-product {...args}>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitleArgs}/></div>
    <div slot='lead'><SlotLyneLeadTemplate {...lyneLeadArgs}/></div>
    <div slot='text'><SlotLyneTextTemplate {...lyneTextArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionArgs}/></div>
  </lyne-card-product>
);

const TemplateLyneJourneyHeader = (args) => (
  <lyne-card-product {...args}>
    <div slot='icon'><SlotIconTemplate {...iconArgs}/></div>
    <div slot='category'><SlotLyneCategoryTemplate {...lyneCategoryArgs}/></div>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitleArgs}/><SlotLyneJourneyHeaderTemplate {...lyneJourneyHeaderArgs}/></div>
    <div slot='lead'><SlotLyneLeadTemplate {...lyneLeadArgs}/></div>
    <div slot='text'><SlotLyneTextTemplate {...lyneTextArgs}/></div>
    <div slot='connection-details'><SlotPearlChainTemplate /></div>
    <div slot='card-badge'><SlotCardBadgeTemplate {...cardBadgeArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionArgs}/></div>
  </lyne-card-product>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- CardProduct with Lyne Title --------- */
export const CardProductLyneTitle = TemplateLyneTitle.bind({});

CardProductLyneTitle.argTypes = defaultArgTypes;
CardProductLyneTitle.args = {
  ...defaultArgs
};

CardProductLyneTitle.documentation = {
  title: 'CardProduct as a subscription'
};

/* --- CardProduct with Journey Title ----- */
export const CardProductLyneJourneyHeader = TemplateLyneJourneyHeader.bind({});

CardProductLyneJourneyHeader.argTypes = defaultArgTypes;
CardProductLyneJourneyHeader.args = {
  ...defaultArgs
};

CardProductLyneJourneyHeader.documentation = {
  title: 'CardProduct as a ticket'
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
