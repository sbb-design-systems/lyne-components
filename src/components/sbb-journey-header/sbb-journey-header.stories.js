import { SbbColorCharcoalDefault, SbbColorWhiteDefault } from '@sbb-esta/lyne-design-tokens';
import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {
  if (context.args.negative) {
    return `background-color: ${SbbColorCharcoalDefault};`;
  }

  return `background-color: ${SbbColorWhiteDefault};`;
};

const destination = {
  control: {
    type: 'text',
  },
};
const origin = {
  control: {
    type: 'text',
  },
};

const roundTrip = {
  control: {
    type: 'boolean',
  },
};

const level = {
  control: {
    type: 'inline-radio',
  },
  options: ['1', '2', '3', '4', '5', '6', 'span'],
};

const size = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 'l'],
};

const negative = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes = {
  destination,
  origin,
  'round-trip': roundTrip,
  level,
  size,
  negative,
};

const defaultArgs = {
  destination: 'Loèche-les-Bains',
  origin: 'La Chaux de Fonds',
  'round-trip': false,
  level: '1',
  size: 'm',
  negative: false,
};

const Template = (args) => <sbb-journey-header {...args} />;

export const span = Template.bind({});
span.argTypes = defaultArgTypes;
span.args = { ...defaultArgs, level: 'span' };

export const h1 = Template.bind({});
h1.argTypes = defaultArgTypes;
h1.args = { ...defaultArgs };

export const h1RoundTrip = Template.bind({});
h1RoundTrip.argTypes = defaultArgTypes;
h1RoundTrip.args = { ...defaultArgs, 'round-trip': true };

export const h1SizeL = Template.bind({});
h1SizeL.argTypes = defaultArgTypes;
h1SizeL.args = { ...defaultArgs, size: 'l' };

export const h1Negative = Template.bind({});
h1Negative.argTypes = defaultArgTypes;
h1Negative.args = { ...defaultArgs, negative: true };

export const h2 = Template.bind({});
h2.argTypes = defaultArgTypes;
h2.args = { ...defaultArgs, level: '2' };

export const h2RoundTrip = Template.bind({});
h2RoundTrip.argTypes = defaultArgTypes;
h2RoundTrip.args = { ...defaultArgs, level: '2', 'round-trip': true };

export const h2SizeL = Template.bind({});
h2SizeL.argTypes = defaultArgTypes;
h2SizeL.args = { ...defaultArgs, level: '2', size: 'l' };

export const h2Negative = Template.bind({});
h2Negative.argTypes = defaultArgTypes;
h2Negative.args = { ...defaultArgs, level: '2', negative: true };

export const h2SizeLRoundTripShortText = Template.bind({});
h2SizeLRoundTripShortText.argTypes = defaultArgTypes;
h2SizeLRoundTripShortText.args = {
  ...defaultArgs,
  level: '2',
  size: 'l',
  'round-trip': true,
  destination: 'Thun',
  origin: 'Bern',
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
  title: 'components/timetable/sbb-journey-header',
};
