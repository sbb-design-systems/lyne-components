import {
  ColorMilkDefault,
  ColorWhiteDefault
} from 'lyne-design-tokens/dist/js/tokens.es6';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
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
    category: 'Appearance'
  }
};

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
  appearance,
  lead,
  text
};

const defaultArgs = {
  appearance: appearance.options[0],
  lead: 'Mit dem GA geniessen Sie freie Fahrt.'
};

/* ************************************************* */
/* Slot templates, used in Storybook template        */
/* ************************************************* */

/* --- title slot ---------------------------------- */

const lyneTitleArgs = {
  'level': 2,
  'text': 'GA',
  'visual-level': 1
};

const lyneTitlePersonalizedArgs = {
  'level': 2,
  'text': '1/2',
  'visual-level': 1
};

const SlotLyneTitleTemplate = (args) => (
  <lyne-title {...args} />
);

/* --- action slot ----------------------------- */

const actionArgs = {
  'href-value': 'https://github.com/lyne-design-system/lyne-components',
  'icon-placement': 'start',
  'text': 'Alle GA im Überblick',
  'variant': 'secondary'
};

const actionPersonalizedArgs = {
  'href-value': 'https://github.com/lyne-design-system/lyne-components',
  'icon': 'highlighter-small',
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

const Template = (args) => (
  <lyne-product-subscription {...args}>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitleArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionArgs}/></div>
  </lyne-product-subscription>
);

const TemplatePersonalized = (args) => (
  <lyne-product-subscription {...args}>
    <div slot='title'><SlotLyneTitleTemplate {...lyneTitlePersonalizedArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionPersonalizedArgs}/></div>
  </lyne-product-subscription>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- ProductSubscription ------------------------- */
export const ProductSubscription = Template.bind({});

ProductSubscription.argTypes = defaultArgTypes;
ProductSubscription.args = {
  ...defaultArgs
};

ProductSubscription.documentation = {
  title: 'Product of type subscription'
};

/* --- ProductSubscription personalized ------------ */
export const ProductSubscriptionPersonalized = TemplatePersonalized.bind({});

ProductSubscriptionPersonalized.argTypes = defaultArgTypes;
ProductSubscriptionPersonalized.args = {
  ...defaultArgs,
  lead: 'Halbtax-Abo',
  text: '2. Klasse, gültig bis 30.11.2021'
};

ProductSubscriptionPersonalized.documentation = {
  title: 'Product of type subscription, personalized'
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
  title: 'cards/lyne-product-subscription'
};
