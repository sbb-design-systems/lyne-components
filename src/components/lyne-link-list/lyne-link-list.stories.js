import {
  ColorCharcoalDefault,
  ColorWhiteDefault
} from 'lyne-design-tokens/dist/js/tokens.es6';
import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {

  if (context.args.variant === 'positive') {
    return `background-color: ${ColorWhiteDefault};`;
  }

  return `background-color: ${ColorCharcoalDefault};`;

};

const Template = (args) => (
  <lyne-link-list {...args}>
    <li class='link-list__item' slot='link-list__item'>
      <lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Rückerstattungen' text-size='s' variant={args.variant}></lyne-link>
    </li>
    <li className='link-list__item' slot='link-list__item'>
      <lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Fundbüro' text-size='s' variant={args.variant}></lyne-link>
    </li>
    <li className='link-list__item' slot='link-list__item'>
      <lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Beschwerden' text-size='s' variant={args.variant}></lyne-link>
    </li>
    <li className='link-list__item' slot='link-list__item'>
      <lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Lob aussprechen' text-size='s' variant={args.variant}></lyne-link>
    </li>
    <li className='link-list__item' slot='link-list__item'>
      <lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Sachbeschädigung melden' text-size='s' variant={args.variant}></lyne-link>
    </li>
  </lyne-link-list>
);

const titleText = {
  control: {
    type: 'text'
  },
  table: {
    category: 'List Title'
  }
};

const titleLevel = {
  control: {
    type: 'inline-radio'
  },
  options: [
    2,
    3,
    4,
    5,
    6
  ],
  table: {
    category: 'List Title'
  }
};

const variant = {
  control: {
    type: 'select'
  },
  options: [
    'positive',
    'negative'
  ],
  table: {
    category: 'List Styling'
  }
};

const defaultArgTypes = {
  'title-text': titleText,
  'title-level': titleLevel,
  variant
};

const defaultArgs = {
  'title-text': 'Help & Contact',
  'title-level': titleLevel.options[0],
  'variant': variant.options[0]
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const LyneLinkListPositive = Template.bind({});

LyneLinkListPositive.argTypes = defaultArgTypes;
LyneLinkListPositive.args = {
  ...defaultArgs
};

LyneLinkListPositive.documentation = {
  'title': 'Link List Positive'
};

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}padding: 2rem`}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-link-list'
};
