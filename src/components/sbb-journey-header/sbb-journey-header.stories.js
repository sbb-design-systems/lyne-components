import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {
  if (context.args.negative) {
    return `background-color: var(--sbb-color-charcoal-default);`;
  }

  return `background-color:  var(--sbb-color-white-default);`;
};

const origin = {
  control: {
    type: 'text',
  },
};

const destination = {
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
  options: ['1', '2', '3', '4', '5', '6'],
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
  origin,
  destination,
  'round-trip': roundTrip,
  level,
  size,
  negative,
};

const defaultArgs = {
  origin: 'La Chaux de Fonds',
  destination: 'Loèche-les-Bains',
  'round-trip': false,
  level: '3',
  size: 'm',
  negative: false,
};

const defaultArgsH1 = {
  ...defaultArgs,
  level: '1',
};

const defaultArgsH6 = {
  ...defaultArgs,
  level: '6',
};

const Template = (args) => <sbb-journey-header {...args} />;

export const DefaultH3 = Template.bind({});
DefaultH3.argTypes = defaultArgTypes;
DefaultH3.args = { ...defaultArgs };

export const DefaultH3RoundTrip = Template.bind({});
DefaultH3RoundTrip.argTypes = defaultArgTypes;
DefaultH3RoundTrip.args = { ...defaultArgs, 'round-trip': true };

export const DefaultH3SizeL = Template.bind({});
DefaultH3SizeL.argTypes = defaultArgTypes;
DefaultH3SizeL.args = { ...defaultArgs, size: 'l' };

export const DefaultH3Negative = Template.bind({});
DefaultH3Negative.argTypes = defaultArgTypes;
DefaultH3Negative.args = { ...defaultArgs, negative: true };

export const DefaultH3SizeLRoundTripShortText = Template.bind({});
DefaultH3SizeLRoundTripShortText.argTypes = defaultArgTypes;
DefaultH3SizeLRoundTripShortText.args = {
  ...defaultArgs,
  origin: 'Bern',
  destination: 'Thun',
  'round-trip': true,
  size: 'l',
};

export const H1 = Template.bind({});
H1.argTypes = defaultArgTypes;
H1.args = { ...defaultArgsH1 };

export const H1RoundTrip = Template.bind({});
H1RoundTrip.argTypes = defaultArgTypes;
H1RoundTrip.args = { ...defaultArgsH1, 'round-trip': true };

export const H1SizeL = Template.bind({});
H1SizeL.argTypes = defaultArgTypes;
H1SizeL.args = { ...defaultArgsH1, size: 'l' };

export const H1Negative = Template.bind({});
H1Negative.argTypes = defaultArgTypes;
H1Negative.args = { ...defaultArgsH1, negative: true };

export const H1SizeLRoundTripShortText = Template.bind({});
H1SizeLRoundTripShortText.argTypes = defaultArgTypes;
H1SizeLRoundTripShortText.args = {
  ...defaultArgsH1,
  origin: 'Bern',
  destination: 'Thun',
  'round-trip': true,
  size: 'l',
};

export const H6 = Template.bind({});
H6.argTypes = defaultArgTypes;
H6.args = { ...defaultArgsH6 };

export const H6RoundTrip = Template.bind({});
H6RoundTrip.argTypes = defaultArgTypes;
H6RoundTrip.args = { ...defaultArgsH6, 'round-trip': true };

export const H6SizeL = Template.bind({});
H6SizeL.argTypes = defaultArgTypes;
H6SizeL.args = { ...defaultArgsH6, size: 'l' };

export const H6Negative = Template.bind({});
H6Negative.argTypes = defaultArgTypes;
H6Negative.args = { ...defaultArgsH6, negative: true };

export const H6SizeLRoundTripShortText = Template.bind({});
H6SizeLRoundTripShortText.argTypes = defaultArgTypes;
H6SizeLRoundTripShortText.args = {
  ...defaultArgsH6,
  origin: 'Bern',
  destination: 'Thun',
  'round-trip': true,
  size: 'l',
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
