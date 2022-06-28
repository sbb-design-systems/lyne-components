import { SbbColorCharcoalDefault, SbbColorWhiteDefault } from '@sbb-esta/lyne-design-tokens';
import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {
  if (context.args.variant === 'positive') {
    return `background-color: ${SbbColorWhiteDefault};`;
  }

  return `background-color: ${SbbColorCharcoalDefault};`;
};

const Template = (args) => (
  <sbb-link-list {...args}>
    <li class="link-list__item" slot="link-list__item">
      <sbb-link
        href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text="Rückerstattungen"
        text-size={args.textSize}
        variant={args.variant}
      ></sbb-link>
    </li>
    <li className="link-list__item" slot="link-list__item">
      <sbb-link
        href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text="Fundbüro"
        text-size={args.textSize}
        variant={args.variant}
      ></sbb-link>
    </li>
    <li className="link-list__item" slot="link-list__item">
      <sbb-link
        href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text="Beschwerden"
        text-size={args.textSize}
        variant={args.variant}
      ></sbb-link>
    </li>
    <li className="link-list__item" slot="link-list__item">
      <sbb-link
        href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text="Lob aussprechen"
        text-size={args.textSize}
        variant={args.variant}
      ></sbb-link>
    </li>
    <li className="link-list__item" slot="link-list__item">
      <sbb-link
        href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text="Sachbeschädigung melden"
        text-size={args.textSize}
        variant={args.variant}
      ></sbb-link>
    </li>
  </sbb-link-list>
);

const listDirection = {
  control: {
    type: 'select',
  },
  options: ['vertical', 'horizontal', 'horizontal-from-large'],
  table: {
    category: 'List Styling',
  },
};

const textSize = {
  control: {
    type: 'select',
  },
  options: ['xs', 's', 'm'],
  table: {
    category: 'List Items',
  },
};

const titleText = {
  control: {
    type: 'text',
  },
  table: {
    category: 'List Title',
  },
};

const titleLevel = {
  control: {
    type: 'inline-radio',
  },
  options: [2, 3, 4, 5, 6],
  table: {
    category: 'List Title',
  },
};

const variant = {
  control: {
    type: 'select',
  },
  options: ['positive', 'negative'],
  table: {
    category: 'List Styling',
  },
};

const defaultArgTypes = {
  'list-direction': listDirection,
  textSize,
  'title-level': titleLevel,
  'title-text': titleText,
  variant,
};

const defaultArgs = {
  'list-direction': listDirection.options[0],
  textSize: textSize.options[1],
  'title-level': titleLevel.options[0],
  'title-text': 'Help & Contact',
  variant: variant.options[0],
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const LinkListPositive = Template.bind({});

LinkListPositive.argTypes = defaultArgTypes;
LinkListPositive.args = {
  ...defaultArgs,
};

LinkListPositive.documentation = {
  title: 'Link List Positive',
};

export const LinkListXSNoTitle = Template.bind({});

LinkListXSNoTitle.argTypes = defaultArgTypes;
LinkListXSNoTitle.args = {
  ...defaultArgs,
  textSize: textSize.options[0],
  'title-text': '',
};

LinkListXSNoTitle.documentation = {
  title: 'Link List XS No Title',
};

export const LinkListNoTitle = Template.bind({});

LinkListNoTitle.argTypes = defaultArgTypes;
LinkListNoTitle.args = {
  ...defaultArgs,
  'title-text': '',
};

LinkListNoTitle.documentation = {
  title: 'Link List No Title',
};

export const LinkListNegative = Template.bind({});

LinkListNegative.argTypes = defaultArgTypes;
LinkListNegative.args = {
  ...defaultArgs,
  variant: variant.options[1],
};

LinkListNegative.documentation = {
  title: 'Link List Negative',
};

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}padding: 2rem`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-link-list',
};
