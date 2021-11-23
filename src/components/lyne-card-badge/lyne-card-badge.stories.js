import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';
import readme from './readme.md';

/* ************************************************* */
/* Slot templates, used in Storybook template        */
/* ************************************************* */

/* --- generic slot --------------------------------- */

const genericArgs = {
  'href-value': 'https://github.com/lyne-design-system/lyne-components',
  // 'icon': 'qrcode-small',
  'icon-placement': 'start',
  'text': 'Abo bearbeiten',
  'variant': 'secondary'
};

const SlotGenericTemplate = (args) => (
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
  <lyne-card-badge {...args}>
    <div slot='generic'><SlotGenericTemplate {...genericArgs}/></div>
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
    'secondary'
  ]
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
  appearance: 'primary',
  isDiscount: true,
  price: '88.88',
  size: 'small',
  text: 'ab CHF'
};

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
  title: 'Card badge'
};

/* --- next story ... ------------------------------ */

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem; position: relative; overflow: hidden;'}>
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
