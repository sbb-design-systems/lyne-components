import { h } from 'jsx-dom';
import readme from './readme.md';
import {
  cancelledLeg,
  progressLeg,
  pastLeg,
  futureLeg,
  longFutureLeg,
  redirectedOnDepartureLeg,
  redirectedOnArrivalLeg,
} from './sbb-pearl-chain.sample-data';
import isChromatic from 'chromatic/isChromatic';

const disableAnimation = {
  control: {
    type: 'boolean',
  },
};

const now = {
  control: {
    type: 'date',
  },
};

const defaultArgTypes = {
  'disable-animation': disableAnimation,
  'data-now': now,
};

const defaultArgs = {
  'disable-animation': isChromatic(),
  'data-now': new Date('2022-12-01T12:11:00').valueOf(),
};

const Template = (args) => {
  return <sbb-pearl-chain {...args} />;
};

export const NoStops = Template.bind({});
NoStops.argTypes = defaultArgTypes;
NoStops.args = {
  ...defaultArgs,
  legs: [futureLeg],
};
NoStops.documentation = {
  title: 'No stops',
};

export const ManyStops = Template.bind({});
ManyStops.argTypes = defaultArgTypes;
ManyStops.args = {
  ...defaultArgs,
  legs: [futureLeg, longFutureLeg, futureLeg, futureLeg],
};

export const Cancelled = Template.bind({});
Cancelled.argTypes = defaultArgTypes;
Cancelled.args = {
  ...defaultArgs,
  legs: [cancelledLeg],
};

export const CancelledManyStops = Template.bind({});
CancelledManyStops.argTypes = defaultArgTypes;
CancelledManyStops.args = {
  ...defaultArgs,
  legs: [futureLeg, cancelledLeg, futureLeg, cancelledLeg],
};

export const withPosition = Template.bind({});
withPosition.argTypes = defaultArgTypes;
withPosition.args = {
  ...defaultArgs,
  legs: [progressLeg],
  'data-now': new Date('2022-12-05T12:11:00').valueOf(),
};

export const Past = Template.bind({});
Past.argTypes = defaultArgTypes;
Past.args = {
  ...defaultArgs,
  legs: [pastLeg, pastLeg],
  'data-now': new Date('2023-11-01T12:11:00').valueOf(),
};

export const DepartureStopSkipped = Template.bind({});
DepartureStopSkipped.argTypes = defaultArgTypes;
DepartureStopSkipped.args = {
  ...defaultArgs,
  legs: [pastLeg, progressLeg, longFutureLeg, redirectedOnDepartureLeg, futureLeg],
  'data-now': new Date('2022-12-05T12:11:00').valueOf(),
};

export const ArrivalStopSkipped = Template.bind({});
ArrivalStopSkipped.argTypes = defaultArgTypes;
ArrivalStopSkipped.args = {
  ...defaultArgs,
  legs: [pastLeg, progressLeg, longFutureLeg, redirectedOnArrivalLeg, futureLeg],
  'data-now': new Date('2022-12-05T12:11:00').valueOf(),
};

export const FirstStopSkipped = Template.bind({});
FirstStopSkipped.argTypes = defaultArgTypes;
FirstStopSkipped.args = {
  ...defaultArgs,
  legs: [redirectedOnDepartureLeg, futureLeg, longFutureLeg],
  'data-now': new Date('2022-12-05T12:11:00').valueOf(),
};

export const LastStopSkipped = Template.bind({});
LastStopSkipped.argTypes = defaultArgTypes;
LastStopSkipped.args = {
  ...defaultArgs,
  legs: [futureLeg, longFutureLeg, redirectedOnArrivalLeg],
  'data-now': new Date('2022-12-05T12:11:00').valueOf(),
};

export const Mixed = Template.bind({});
Mixed.argTypes = defaultArgTypes;
Mixed.args = {
  ...defaultArgs,
  legs: [pastLeg, progressLeg, longFutureLeg, cancelledLeg, futureLeg],
  'data-now': new Date('2022-12-05T12:11:00').valueOf(),
};

export default {
  decorators: [
    (Story) => (
      <div style={'max-width: 80%;'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/timetable/sbb-pearl-chain',
};
