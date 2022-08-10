import { SbbColorCharcoalDefault, SbbColorWhiteDefault } from '@sbb-esta/lyne-design-tokens';
import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {
  if (context.args.negative) {
    return `background-color: ${SbbColorCharcoalDefault};`;
  }

  return `background-color: ${SbbColorWhiteDefault};`;
};

// we don't need to pass the args.text to the <sbb-title> tag, but Storybook wants all in it.
const Template = (args) => (
  <sbb-title {...args}>
    <span slot="title">{args.text}</span>
  </sbb-title>
);

const levels = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const negative = {
  control: {
    type: 'boolean',
  },
  options: [true, false],
  table: {
    category: 'Styling Variant',
  },
};

const defaultArgTypes = {
  level: levels,
  negative,
  'visual-level': levels,
};

const defaultArgs = {
  level: 1,
  text: 'Data without insights are trivial, and insights without action are pointless',
  'title-id': '',
  negative: false,
  'visual-level': 1,
  'visually-hidden': false,
};

export const h1 = Template.bind({});

h1.argTypes = defaultArgTypes;
h1.args = JSON.parse(JSON.stringify(defaultArgs));
h1.args['visual-level'] = null;
h1.documentation = {
  title: 'Title Level 1',
};

export const h1Negative = Template.bind({});

h1Negative.argTypes = defaultArgTypes;
h1Negative.args = {
  ...defaultArgs,
  negative: true,
};
h1.args['visual-level'] = null;
h1Negative.documentation = {
  title: 'Title Level 1 Negative',
};

export const h2 = Template.bind({});

h2.argTypes = defaultArgTypes;
h2.args = JSON.parse(JSON.stringify(defaultArgs));
h2.args.level = 2;
h2.args['visual-level'] = null;
h2.documentation = {
  title: 'Title Level 2',
};

export const h3 = Template.bind({});

h3.argTypes = defaultArgTypes;
h3.args = JSON.parse(JSON.stringify(defaultArgs));
h3.args.level = 3;
h3.args['visual-level'] = null;
h3.documentation = {
  title: 'Title Level 3',
};

export const h4 = Template.bind({});

h4.argTypes = defaultArgTypes;
h4.args = JSON.parse(JSON.stringify(defaultArgs));
h4.args.level = 4;
h4.args['visual-level'] = null;
h4.documentation = {
  title: 'Title Level 4',
};

export const h5 = Template.bind({});

h5.argTypes = defaultArgTypes;
h5.args = JSON.parse(JSON.stringify(defaultArgs));
h5.args.level = 5;
h5.args['visual-level'] = null;
h5.documentation = {
  title: 'Title Level 5',
};

export const h6 = Template.bind({});

h6.argTypes = defaultArgTypes;
h6.args = JSON.parse(JSON.stringify(defaultArgs));
h6.args.level = 6;
// optional
h6.args['visual-level'] = null;
h6.documentation = {
  title: 'Title Level 6',
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
  title: 'components/sbb-title',
};
