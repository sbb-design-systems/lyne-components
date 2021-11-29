import {
  ColorCharcoalDefault,
  ColorWhiteDefault
} from 'lyne-design-tokens/dist/js/tokens.es6';
// import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';
import readme from './readme.md';

/* ************************************************* */
/* Storybook component wrapper, used in Storybook    */
/* ************************************************* */

const wrapperStyle = (context) => {
  const variantsOnDarkBg = ['primary-negative'];

  if (variantsOnDarkBg.indexOf(context.args.appearance) === -1) {
    return `background-color: ${ColorWhiteDefault};`;
  }

  return `background-color: ${ColorCharcoalDefault};`;
};

/* ************************************************* */
/* Slot templates, used in Storybook template        */
/* ************************************************* */

/* --- generic slot -------------------------------- */

/*
 * const genericArgs = {
 *   'href-value': 'https://github.com/lyne-design-system/lyne-components',
 *   'icon': 'qrcode-small',
 *   'icon-placement': 'start',
 *   'text': 'Abo bearbeiten',
 *   'variant': 'primary-negative'
 * };
 */

/*
 * const SlotGenericTemplate = (args) => (
 *   <lyne-link-button {...args}>
 *     {args.icon &&
 *       <span slot='icon'>{getMarkupForSvg(args.icon)}</span>
 *     }
 *   </lyne-link-button>
 * );
 */

const SlotGenericTemplate = () => (
  <span>on <time datetime='2021-11-25'>Black Friday</time></span>
);

/* ************************************************* */
/* Storybook templates                               */
/* ************************************************* */

/*
 * const Template = (args) => (
 *   <lyne-card-badge {...args}>
 *     <div slot='generic'><SlotGenericTemplate {...genericArgs}/></div>
 *   </lyne-card-badge>
 * );
 */

const Template = (args) => (
  <lyne-card-badge {...args}></lyne-card-badge>
);

const TemplateWithSlot = (args) => (
  <lyne-card-badge {...args}>
    <div slot='generic'><SlotGenericTemplate/></div>
  </lyne-card-badge>
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

const size = {
  control: {
    type: 'select'
  },
  options: [
    'regular',
    'small'
  ]
};

const isDiscount = {
  control: {
    type: 'boolean'
  }
};

const text = {
  control: {
    type: 'text'
  }
};

const price = {
  control: {
    type: 'text'
  }
};

const defaultArgTypes = {
  appearance,
  isDiscount,
  price,
  size,
  text
};

const defaultArgs = {
  appearance: appearance.options[0],
  size: size.options[0]
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- CardBadge full fledged ---------------------- */
export const CardBadgeFullFledged = TemplateWithSlot.bind({});

CardBadgeFullFledged.argTypes = defaultArgTypes;
CardBadgeFullFledged.args = {
  ...defaultArgs,
  isDiscount: true,
  price: '88.88',
  text: 'from CHF'
};

CardBadgeFullFledged.documentation = {
  title: 'Card badge full fledged'
};

/* --- CardBadge discount ------------------ */
export const CardBadgeDiscount = Template.bind({});

CardBadgeDiscount.argTypes = defaultArgTypes;
CardBadgeDiscount.args = {
  ...defaultArgs,
  isDiscount: true
};

CardBadgeDiscount.documentation = {
  title: 'Card badge with discount'
};

/* --- CardBadge discount negative -------- */
export const CardBadgeDiscountNegative = Template.bind({});

CardBadgeDiscountNegative.argTypes = defaultArgTypes;
CardBadgeDiscountNegative.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  isDiscount: true
};

CardBadgeDiscountNegative.documentation = {
  title: 'Card badge with discount negative'
};

/* --- CardBadge discount small ------------ */
export const CardBadgeDiscountSmall = Template.bind({});

CardBadgeDiscountSmall.argTypes = defaultArgTypes;
CardBadgeDiscountSmall.args = {
  ...defaultArgs,
  isDiscount: true,
  size: size.options[1]
};

CardBadgeDiscountSmall.documentation = {
  title: 'Card badge small with discount'
};

/* --- CardBadge discount small negative ---------- */
export const CardBadgeDiscountSmallNegative = Template.bind({});

CardBadgeDiscountSmallNegative.argTypes = defaultArgTypes;
CardBadgeDiscountSmallNegative.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  isDiscount: true,
  size: size.options[1]
};

CardBadgeDiscountSmallNegative.documentation = {
  title: 'Card badge small with discount negative'
};

/* --- CardBadge with text and price ------------ */
export const CardBadgeWithTextAndPrice = Template.bind({});

CardBadgeWithTextAndPrice.argTypes = defaultArgTypes;
CardBadgeWithTextAndPrice.args = {
  ...defaultArgs,
  price: '88.88',
  text: 'from CHF'
};

CardBadgeWithTextAndPrice.documentation = {
  title: 'Card badge with text and price'
};

/* --- CardBadge with text and price negative ---------- */
export const CardBadgeWithTextAndPriceNegative = Template.bind({});

CardBadgeWithTextAndPriceNegative.argTypes = defaultArgTypes;
CardBadgeWithTextAndPriceNegative.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  price: '88.88',
  text: 'from CHF'
};

CardBadgeWithTextAndPriceNegative.documentation = {
  title: 'Card badge with text and price negative'
};

/* --- CardBadge discount with slot ------------------------- */
export const CardBadgeDiscountWithSlot = TemplateWithSlot.bind({});

CardBadgeDiscountWithSlot.argTypes = defaultArgTypes;
CardBadgeDiscountWithSlot.args = {
  ...defaultArgs,
  isDiscount: true
};

CardBadgeDiscountWithSlot.documentation = {
  title: 'Card badge discount with slot'
};

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)} padding: 2rem; position: relative; overflow: hidden;`}>
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
  title: 'lyne-card-badge'
};
