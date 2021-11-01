import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-link-list {...args}>
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
    (Story) => (
      <div style={'padding: 2rem'}>
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
