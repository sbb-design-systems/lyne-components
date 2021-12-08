import {
  ColorCharcoalDefault,
  ColorWhiteDefault
} from 'lyne-design-tokens/dist/js/tokens.es6';
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

  return `background-color: ${ColorWhiteDefault};`;
};

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

const a11yLabel = {
  control: {
    type: 'text'
  }
};

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
  a11yLabel,
  appearance,
  isDiscount,
  price,
  text
};

const defaultArgs = {
  a11yLabel: 'Supersaver Ticket',
  appearance: appearance.options[0]
};

/* ************************************************* */
/* Slot templates, used in Storybook template        */
/* ************************************************* */

/* --- generic slot -------------------------------- */

const SlotGenericTemplate = () => (
  <span><time datetime='2021-11-25'>Black Friday</time> Special</span>
);

/* ************************************************* */
/* Storybook templates                               */
/* ************************************************* */

const Template = (args) => (
  <lyne-card-badge {...args}></lyne-card-badge>
);

const TemplateWithSlot = (args) => (
  <lyne-card-badge {...args}>
    <div slot='generic'><SlotGenericTemplate/></div>
  </lyne-card-badge>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- CardBadge full fledged ---------------------- */
export const CardBadgeFullFledged = TemplateWithSlot.bind({});

CardBadgeFullFledged.argTypes = defaultArgTypes;
CardBadgeFullFledged.args = {
  ...defaultArgs,
  isDiscount: true,
  price: '92.50',
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
  isDiscount: true
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
  isDiscount: true
};

CardBadgeDiscountSmallNegative.documentation = {
  title: 'Card badge small with discount negative'
};

/* --- CardBadge with text and price ------------ */
export const CardBadgeWithTextAndPrice = Template.bind({});

CardBadgeWithTextAndPrice.argTypes = defaultArgTypes;
CardBadgeWithTextAndPrice.args = {
  ...defaultArgs,
  price: '37.50',
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
  price: '18.70',
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
  title: 'cards/lyne-card-badge'
};
