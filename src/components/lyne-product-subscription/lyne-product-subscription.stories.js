import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';
import readme from './readme.md';

/* ************************************************* */
/* Slot templates, used in Storybook template        */
/* ************************************************* */

/* --- title slot ---------------------------------- */

const titleArgs = {
  'level': 2,
  'text': '1/2',
  'visual-level': 1
};

const SlotTitleTemplate = (args) => (
  <lyne-title {...args} />
);

/* --- action slot --------------------------------- */

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

const Template = (args) => (
  <lyne-product-subscription {...args}>
    <div slot='title'><SlotTitleTemplate {...titleArgs}/></div>
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
  text: '2. Klasse, gültig bis 12.11.2021'
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
