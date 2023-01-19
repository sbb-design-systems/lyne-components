import { SbbColorCharcoalDefault, SbbColorWhiteDefault } from '@sbb-esta/lyne-design-tokens';
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
  options: ['1', '2', '3', '4', '5', '6', 'none'],
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
  level: '1',
  size: 'm',
  negative: false,
};

const defaultArgsLvl2 = {
  ...defaultArgs,
  level: '2',
};

const Template = (args) => <sbb-journey-header {...args} />;

export const Span = Template.bind({});
Span.argTypes = defaultArgTypes;
Span.args = { ...defaultArgs, level: 'none' };

export const H1 = Template.bind({});
H1.argTypes = defaultArgTypes;
H1.args = { ...defaultArgs };

export const H1RoundTrip = Template.bind({});
H1RoundTrip.argTypes = defaultArgTypes;
H1RoundTrip.args = { ...defaultArgs, 'round-trip': true };

export const H1SizeL = Template.bind({});
H1SizeL.argTypes = defaultArgTypes;
H1SizeL.args = { ...defaultArgs, size: 'l' };

export const H1Negative = Template.bind({});
H1Negative.argTypes = defaultArgTypes;
H1Negative.args = { ...defaultArgs, negative: true };

export const H2 = Template.bind({});
H2.argTypes = defaultArgTypes;
H2.args = { ...defaultArgsLvl2 };

export const H2RoundTrip = Template.bind({});
H2RoundTrip.argTypes = defaultArgTypes;
H2RoundTrip.args = { ...defaultArgsLvl2, 'round-trip': true };

export const H2SizeL = Template.bind({});
H2SizeL.argTypes = defaultArgTypes;
H2SizeL.args = { ...defaultArgsLvl2, size: 'l' };

export const H2Negative = Template.bind({});
H2Negative.argTypes = defaultArgTypes;
H2Negative.args = { ...defaultArgsLvl2, negative: true };

export const H2SizeLRoundTripShortText = Template.bind({});
H2SizeLRoundTripShortText.argTypes = defaultArgTypes;
H2SizeLRoundTripShortText.args = {
  ...defaultArgsLvl2,
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
