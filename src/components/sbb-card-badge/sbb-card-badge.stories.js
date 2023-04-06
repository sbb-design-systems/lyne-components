import { h } from 'jsx-dom';
import readme from './readme.md';

/* ************************************************* */
/* Storybook component wrapper, used in Storybook    */
/* ************************************************* */

const wrapperStyle = (context) => {
  const variantsOnDarkBg = ['primary-negative'];

  if (variantsOnDarkBg.indexOf(context.args.appearance) === -1) {
    return 'background-color: var(--sbb-color-white-default);';
  }

  return 'background-color: var(--sbb-color-charcoal-default);';
};

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

const ariaLabel = {
  control: {
    type: 'text',
  },
};

const appearance = {
  control: {
    type: 'select',
  },
  options: ['primary', 'primary-negative'],
  table: {
    category: 'Appearance',
  },
};

const isDiscount = {
  control: {
    type: 'boolean',
  },
};

const text = {
  control: {
    type: 'text',
  },
};

const price = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  'aria-label': ariaLabel,
  appearance,
  'is-discount': isDiscount,
  price,
  text,
};

const defaultArgs = {
  'aria-label': 'Super saver sales ticket price starts at CHF 37.50',
  appearance: appearance.options[0],
};

/* ************************************************* */
/* Documentation platform                            */
/* ************************************************* */

const defaultDocumentationStyles = {
  overflow: 'hidden',
  position: 'relative',
};

/* ************************************************* */
/* Slot templates, used in Storybook template        */
/* ************************************************* */

/* --- generic slot -------------------------------- */

const SlotGenericTemplate = () => (
  <span>
    <time datetime="2021-11-25">Black Friday</time> Special
  </span>
);

/* ************************************************* */
/* Storybook templates                               */
/* ************************************************* */

const Template = (args) => <sbb-card-badge {...args}></sbb-card-badge>;

const TemplateWithSlot = (args) => (
  <sbb-card-badge {...args}>
    <div slot="generic">
      <SlotGenericTemplate />
    </div>
  </sbb-card-badge>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- CardBadge full fledged ---------------------- */
export const CardBadgeFullFledged = TemplateWithSlot.bind({});

CardBadgeFullFledged.argTypes = defaultArgTypes;
CardBadgeFullFledged.args = {
  ...defaultArgs,
  'aria-label': 'Super saver sales ticket price starts at CHF 92.50 Black Friday Special',
  'is-discount': true,
  price: '92.50',
  text: 'from CHF',
};

CardBadgeFullFledged.documentation = {
  container: {
    styles: {
      ...defaultDocumentationStyles,
    },
  },
  title: 'Card badge full fledged',
};

/* --- CardBadge discount ------------------ */
export const CardBadgeDiscount = Template.bind({});

CardBadgeDiscount.argTypes = defaultArgTypes;
CardBadgeDiscount.args = {
  ...defaultArgs,
  'aria-label': 'Super saver sales ticket.',
  'is-discount': true,
};

CardBadgeDiscount.documentation = {
  container: {
    styles: {
      ...defaultDocumentationStyles,
    },
  },
  title: 'Card badge with discount',
};

/* --- CardBadge discount negative -------- */
export const CardBadgeDiscountNegative = Template.bind({});

CardBadgeDiscountNegative.argTypes = defaultArgTypes;
CardBadgeDiscountNegative.args = {
  ...defaultArgs,
  'aria-label': 'Super saver sales ticket.',
  appearance: appearance.options[1],
  'is-discount': true,
};

CardBadgeDiscountNegative.documentation = {
  container: {
    styles: {
      ...defaultDocumentationStyles,
    },
  },
  title: 'Card badge with discount negative',
};

/* --- CardBadge with text and price ------------ */
export const CardBadgeWithTextAndPrice = Template.bind({});

CardBadgeWithTextAndPrice.argTypes = defaultArgTypes;
CardBadgeWithTextAndPrice.args = {
  ...defaultArgs,
  'aria-label': 'Super saver sales ticket price starts at CHF 37.50',
  price: '37.50',
  text: 'from CHF',
};

CardBadgeWithTextAndPrice.documentation = {
  container: {
    styles: {
      ...defaultDocumentationStyles,
    },
  },
  title: 'Card badge with text and price',
};

/* --- CardBadge with text and price negative ---------- */
export const CardBadgeWithTextAndPriceNegative = Template.bind({});

CardBadgeWithTextAndPriceNegative.argTypes = defaultArgTypes;
CardBadgeWithTextAndPriceNegative.args = {
  ...defaultArgs,
  'aria-label': 'Super saver sales ticket price starts at CHF 18.70',
  appearance: appearance.options[1],
  price: '18.70',
  text: 'from CHF',
};

CardBadgeWithTextAndPriceNegative.documentation = {
  container: {
    styles: {
      ...defaultDocumentationStyles,
    },
  },
  title: 'Card badge with text and price negative',
};

/* --- CardBadge discount with slot ------------------------- */
export const CardBadgeDiscountWithSlot = TemplateWithSlot.bind({});

CardBadgeDiscountWithSlot.argTypes = defaultArgTypes;
CardBadgeDiscountWithSlot.args = {
  ...defaultArgs,
  'aria-label': 'Super saver sales ticket Black Friday Special',
  'is-discount': true,
};

CardBadgeDiscountWithSlot.documentation = {
  container: {
    styles: {
      ...defaultDocumentationStyles,
    },
  },
  title: 'Card badge discount with slot',
};

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)} padding: 2rem; position: relative; overflow: hidden;`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-card-badge (Unfinished)',
};
