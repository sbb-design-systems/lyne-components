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
  <lyne-title {...args} />
);

const levels = {
  control: {
    type: 'inline-radio'
  },
  options: [
    1,
    2,
    3,
    4,
    5,
    6
  ]
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
    category: 'Styling Variant'
  }
};

const defaultArgTypes = {
  'level': levels,
  variant,
  'visual-level': levels
};

const defaultArgs = {
  'level': 1,
  'text': 'Data without insights are trivial, and insights without action are pointless',
  'title-id': '',
  'variant': variant.options[0],
  'visual-level': 1,
  'visually-hidden': false
};

export const h1 = Template.bind({});

h1.argTypes = defaultArgTypes;
h1.args = JSON.parse(JSON.stringify(defaultArgs));
h1.documentation = {
  title: 'Title Level 1'
};

export const h1Negative = Template.bind({});

h1Negative.argTypes = defaultArgTypes;
h1Negative.args = {
  ...defaultArgs,
  variant: variant.options[1]
};
h1Negative.documentation = {
  title: 'Title Level 1 Negative'
};

export const h2 = Template.bind({});

h2.argTypes = defaultArgTypes;
h2.args = JSON.parse(JSON.stringify(defaultArgs));
h2.args.level = 2;
h2.args['visual-level'] = 2;
h2.documentation = {
  title: 'Title Level 2'
};

export const h3 = Template.bind({});

h3.argTypes = defaultArgTypes;
h3.args = JSON.parse(JSON.stringify(defaultArgs));
h3.args.level = 3;
h3.args['visual-level'] = 3;
h3.documentation = {
  title: 'Title Level 3'
};

export const h4 = Template.bind({});

h4.argTypes = defaultArgTypes;
h4.args = JSON.parse(JSON.stringify(defaultArgs));
h4.args.level = 4;
h4.args['visual-level'] = 4;
h4.documentation = {
  title: 'Title Level 4'
};

export const h5 = Template.bind({});

h5.argTypes = defaultArgTypes;
h5.args = JSON.parse(JSON.stringify(defaultArgs));
h5.args.level = 5;
h5.args['visual-level'] = 5;
h5.documentation = {
  title: 'Title Level 5'
};

export const h6 = Template.bind({});

h6.argTypes = defaultArgTypes;
h6.args = JSON.parse(JSON.stringify(defaultArgs));
h6.args.level = 6;
h6.args['visual-level'] = 6;
h6.documentation = {
  title: 'Title Level 6'
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
  title: 'components/lyne-title'
};
