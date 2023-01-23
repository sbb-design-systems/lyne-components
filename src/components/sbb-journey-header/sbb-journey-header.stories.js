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
  level: level.options[2],
  size: size.options[0],
  negative: false,
};

const Template = (args) => <sbb-journey-header {...args} />;

export const SizeM = Template.bind({});
SizeM.argTypes = defaultArgTypes;
SizeM.args = { ...defaultArgs };

export const SizeMRoundTrip = Template.bind({});
SizeMRoundTrip.argTypes = defaultArgTypes;
SizeMRoundTrip.args = { ...defaultArgs, 'round-trip': true };

export const SizeMNegative = Template.bind({});
SizeMNegative.argTypes = defaultArgTypes;
SizeMNegative.args = { ...defaultArgs, negative: true };

export const SizeMRoundTripShortText = Template.bind({});
SizeMRoundTripShortText.argTypes = defaultArgTypes;
SizeMRoundTripShortText.args = {
  ...defaultArgs,
  origin: 'Bern',
  destination: 'Thun',
  'round-trip': true,
};

export const SizeL = Template.bind({});
SizeL.argTypes = defaultArgTypes;
SizeL.args = { ...defaultArgs, size: size.options[1] };

export const SizeLRoundTripShortText = Template.bind({});
SizeLRoundTripShortText.argTypes = defaultArgTypes;
SizeLRoundTripShortText.args = {
  ...defaultArgs,
  origin: 'Bern',
  destination: 'Thun',
  'round-trip': true,
  size: size.options[1],
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
  title: 'components/sbb-journey-header',
};
