import { h } from 'jsx-dom';
import {
  futureLeg,
  longFutureLeg,
  pastLeg,
  progressLeg,
} from '../sbb-pearl-chain/sbb-pearl-chain.sample-data';
import readme from './readme.md';
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
  'data-now': new Date('2022-12-05T12:11:00').valueOf(),
};

const Template = ({ 'disable-animation': disableAnimation, 'data-now': dataNow, ...args }) => (
  <sbb-journey-summary disable-animation={disableAnimation} data-now={dataNow} trip={args.trip}>
    <div
      style={{
        display: 'flex',
        paddingTop: '24px',
        justifyContent: 'space-between',
      }}
      slot="content"
    >
      <sbb-button variant="secondary" icon-name="context-menu-small"></sbb-button>
      <sbb-button>Button label</sbb-button>
    </div>
  </sbb-journey-summary>
);

const TemplateNoSlot = ({
  'disable-animation': disableAnimation,
  'data-now': dataNow,
  trip: trip,
}) => (
  <sbb-journey-summary
    disable-animation={disableAnimation}
    data-now={dataNow}
    trip={trip}
  ></sbb-journey-summary>
);

const TemplateRoundtrip = ({
  'disable-animation': disableAnimation,
  'data-now': dataNow,
  trip: trip,
  return: returnTrip,
}) => (
  <sbb-journey-summary
    disable-animation={disableAnimation}
    data-now={dataNow}
    trip={trip}
    return={returnTrip}
  ></sbb-journey-summary>
);

export const summaryNoSlot = TemplateNoSlot.bind({});
export const summary = Template.bind({});
export const summaryNoVias = Template.bind({});
export const summaryNoArrivalWalk = Template.bind({});
export const summaryPosition = Template.bind({});
export const summaryRoundtrip = TemplateRoundtrip.bind({});

summaryNoSlot.argTypes = defaultArgTypes;
summaryNoSlot.args = {
  ...defaultArgs,
  trip: {
    vias: ['via1', 'via2', 'via3', 'via4', 'via5', 'via6'],
    legs: [futureLeg, longFutureLeg, futureLeg],
    origin: 'Station',
    destination: 'Station',
    departure: '2022-08-29T20:30:00+02:00',
    arrival: '2022-08-29T20:35:00+02:00',
    duration: 60,
  },
};

summary.argTypes = defaultArgTypes;
summary.args = {
  ...defaultArgs,
  trip: {
    vias: ['via1', 'via2', 'via3', 'via4', 'via5', 'vi6'],
    legs: [futureLeg, longFutureLeg, futureLeg],
    origin: 'Station',
    destination: 'Station',
    departure: '2022-08-29T20:30:00+02:00',
    arrival: '2022-08-29T20:35:00+02:00',
    duration: 120,
  },
};

summaryNoVias.argTypes = defaultArgTypes;
summaryNoVias.args = {
  ...defaultArgs,
  trip: {
    origin: 'Station',
    destination: 'Station',
    legs: [futureLeg, longFutureLeg, futureLeg],
    arrivalWalk: 10,
    departureWalk: 5,
    departure: '2022-08-29T20:30:00+02:00',
    arrival: '2022-08-29T22:30:00+02:00',
    duration: 120,
  },
};

summaryNoArrivalWalk.argTypes = defaultArgTypes;
summaryNoArrivalWalk.args = {
  ...defaultArgs,
  trip: {
    origin: 'Station',
    destination: 'Station',
    legs: [futureLeg, longFutureLeg, futureLeg],
    departureWalk: 5,
    departure: '2022-08-30T20:30:00+02:00',
    arrival: '2022-08-29T22:30:00+02:00',
    duration: 120,
  },
};

summaryPosition.argTypes = defaultArgTypes;
summaryPosition.args = {
  ...defaultArgs,
  trip: {
    vias: ['via1', 'via2', 'via3', 'via4'],
    legs: [pastLeg, progressLeg, futureLeg],
    origin: 'Station',
    destination: 'Station',
    departure: '2022-09-19T20:30:00+02:00',
    arrival: '2022-09-19T22:30:00+02:00',
    duration: 120,
  },
};

summaryRoundtrip.argTypes = defaultArgTypes;
summaryRoundtrip.args = {
  ...defaultArgs,
  trip: {
    vias: ['via1', 'via2', 'via3', 'via4'],
    legs: [pastLeg, progressLeg, futureLeg],
    origin: 'Station',
    destination: 'Station',
    departure: '2022-09-19T20:30:00+02:00',
    arrival: '2022-09-19T22:30:00+02:00',
    duration: 120,
  },
  return: {
    vias: ['via5', 'via6', 'via7', 'via8'],
    legs: [pastLeg, progressLeg, futureLeg],
    origin: 'Station',
    destination: 'Station',
    departure: '2022-09-20T18:30:00+02:00',
    arrival: '2022-09-20T20:30:00+02:00',
    duration: 120,
  },
};

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

export default {
  decorators: [(Story) => <Story />],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/timetable/sbb-journey-summary (Unfinished)',
};
