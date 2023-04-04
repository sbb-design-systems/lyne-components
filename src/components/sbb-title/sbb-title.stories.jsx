import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {
  if (context.args.negative) {
    return 'background-color: var(--sbb-color-charcoal-default);';
  }

  return 'background-color: var(--sbb-color-white-default);';
};

// we don't need to pass the args.text to the <sbb-title> tag, but Storybook wants all in it.
const Template = ({ text, ...args }) => <sbb-title {...args}>{text}</sbb-title>;

const level = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const negative = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes = {
  level,
  negative,
  'visual-level': level,
};

const defaultArgs = {
  level: level.options[0],
  text: 'Data without insights are trivial, and insights without action are pointless',
  negative: false,
  'visual-level': undefined,
  'visually-hidden': false,
};

export const h1 = Template.bind({});

h1.argTypes = defaultArgTypes;
h1.args = { ...defaultArgs };

export const h1Negative = Template.bind({});
h1Negative.argTypes = defaultArgTypes;
h1Negative.args = {
  ...defaultArgs,
  negative: true,
};

export const h2 = Template.bind({});
h2.argTypes = defaultArgTypes;
h2.args = { ...defaultArgs, level: level.options[1] };

export const h3 = Template.bind({});
h3.argTypes = defaultArgTypes;
h3.args = { ...defaultArgs, level: level.options[2] };

export const h4 = Template.bind({});
h4.argTypes = defaultArgTypes;
h4.args = { ...defaultArgs, level: level.options[3] };

export const h5 = Template.bind({});
h5.argTypes = defaultArgTypes;
h5.args = { ...defaultArgs, level: level.options[4] };

export const h6 = Template.bind({});
h6.argTypes = defaultArgTypes;
h6.args = { ...defaultArgs, level: level.options[5] };

export const h6VisualLevel = Template.bind({});
h6VisualLevel.argTypes = defaultArgTypes;
h6VisualLevel.args = { ...defaultArgs, level: level.options[0], 'visual-level': level.options[5] };

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
