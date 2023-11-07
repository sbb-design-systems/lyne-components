/** @jsx h */
import { h, JSX } from 'jsx-dom';
import {
  futureLeg,
  longFutureLeg,
  pastLeg,
  progressLeg,
} from '../pearl-chain/pearl-chain.sample-data';
import readme from './readme.md?raw';
import isChromatic from 'chromatic';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import type { InputType } from '@storybook/types';
import './journey-summary';
import '../button';

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
};

const roundTrip: InputType = {
  control: {
    type: 'boolean',
  },
};

const headerLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
  table: {
    category: 'Heading level of the journey header',
  },
};

const now: InputType = {
  control: {
    type: 'date',
  },
};
const defaultArgTypes: ArgTypes = {
  'disable-animation': disableAnimation,
  'data-now': now,
  'round-trip': roundTrip,
  'header-level': headerLevel,
};

const defaultArgs: Args = {
  'disable-animation': isChromatic(),
  'data-now': new Date('2022-12-05T12:11:00').valueOf(),
  'round-trip': false,
  'header-level': headerLevel.options[2],
};

const Template = (args): JSX.Element => (
  <sbb-journey-summary {...args}>
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

const TemplateNoSlot = (args): JSX.Element => <sbb-journey-summary {...args}></sbb-journey-summary>;

export const summaryNoSlot: StoryObj = {
  render: TemplateNoSlot,
  argTypes: defaultArgTypes,
  args: {
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
  },
};
export const summary: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
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
  },
};
export const summaryNoVias: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
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
  },
};
export const summaryNoArrivalWalk: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
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
  },
};
export const summaryPosition: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
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
  },
};
export const summaryRoundtrip: StoryObj = {
  render: TemplateNoSlot,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: {
      vias: ['via1', 'via2', 'via3', 'via4'],
      legs: [pastLeg, progressLeg, futureLeg],
      origin: 'Bern',
      destination: 'Basel',
      departure: '2022-09-19T20:30:00+02:00',
      arrival: '2022-09-19T22:30:00+02:00',
      duration: 120,
    },
    tripBack: {
      vias: ['via5', 'via6', 'via7', 'via8'],
      legs: [pastLeg, progressLeg, futureLeg],
      origin: 'Basel',
      destination: 'Bern',
      departure: '2022-09-20T22:30:00+02:00',
      arrival: '2022-09-20T00:30:00+02:00',
      duration: 120,
    },
    'round-trip': true,
  },
};
export const summaryRoundtripOneJourney: StoryObj = {
  render: TemplateNoSlot,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: {
      vias: ['via1', 'via2', 'via3', 'via4'],
      legs: [pastLeg, progressLeg, futureLeg],
      origin: 'Bern',
      destination: 'Basel',
      departure: '2022-09-19T20:30:00+02:00',
      arrival: '2022-09-19T22:30:00+02:00',
      duration: 120,
    },
    'round-trip': true,
  },
};

export const summaryHeaderLevel: StoryObj = {
  render: TemplateNoSlot,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'header-level': headerLevel.options[4],
    trip: {
      legs: [pastLeg, progressLeg, futureLeg],
      origin: 'Bern',
      destination: 'Basel',
      departure: '2022-09-19T20:30:00+02:00',
      arrival: '2022-09-19T22:30:00+02:00',
      duration: 120,
    },
    'round-trip': true,
  },
};

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

const meta: Meta = {
  decorators: [(Story) => <Story></Story>],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'timetable/sbb-journey-summary (Unfinished)',
};

export default meta;
