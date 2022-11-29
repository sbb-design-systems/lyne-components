import { h } from 'jsx-dom';
import readme from './readme.md';
import {
  config,
  configPosition,
  configMinimal,
  configCancelled,
  configCancelledStops,
  configPast,
} from './sbb-timetable-row.sample-data';
import events from './sbb-timetable-row.events';
import isChromatic from 'chromatic/isChromatic';

const accessibilityLabel = {
  control: {
    type: 'text',
  },
};

const disableAnimation = {
  control: {
    type: 'boolean',
  },
};

const loadingTrip = {
  control: {
    type: 'boolean',
  },
};

const loadingPrice = {
  control: {
    type: 'boolean',
  },
};

const active = {
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
  'accessibility-label': accessibilityLabel,
  'disable-animation': disableAnimation,
  'loading-trip': loadingTrip,
  'loading-price': loadingPrice,
  active,
  'data-now': now,
};

const defaultArgs = {
  'accessibility-label': 'Aria Label',
  'disable-animation': isChromatic(),
  active: false,
  'data-now': undefined,
};

// TEMPLATES
const Template = (args) => <sbb-timetable-row {...args}></sbb-timetable-row>;

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const Basic = Template.bind({});
Basic.argTypes = defaultArgTypes;
Basic.args = {
  ...defaultArgs,
  'loading-price': config.loadingPrice,
  'loading-trip': config.loadingTrip,
  trip: config.trip,
  price: config.price,
};

export const Active = Template.bind({});
Active.argTypes = defaultArgTypes;
Active.args = {
  ...defaultArgs,
  'loading-price': config.loadingPrice,
  'loading-trip': config.loadingTrip,
  trip: config.trip,
  price: config.price,
  active: true,
};

export const LoadingTrip = Template.bind({});
LoadingTrip.argTypes = defaultArgTypes;
LoadingTrip.args = {
  ...defaultArgs,
  'loading-trip': true,
  trip: config.trip,
  price: config.price,
};

export const PriceLoading = Template.bind({});
PriceLoading.argTypes = defaultArgTypes;
PriceLoading.args = {
  ...defaultArgs,
  trip: config.trip,
  price: config.price,
  'loading-price': true,
  'loading-trip': config.loadingTrip,
};

export const LoadingAll = Template.bind({});
LoadingAll.argTypes = defaultArgTypes;
LoadingAll.args = {
  ...defaultArgs,
  'loading-price': true,
  'loading-trip': true,
  trip: config.trip,
  price: config.price,
};

export const Position = Template.bind({});
Position.argTypes = defaultArgTypes;
Position.args = {
  ...defaultArgs,
  trip: configPosition.trip,
  'data-now': new Date('2024-06-21T02:29').valueOf(),
};

export const PositionDisabledAnimation = Template.bind({});
PositionDisabledAnimation.argTypes = defaultArgTypes;
PositionDisabledAnimation.args = {
  ...defaultArgs,
  'disable-animation': true,
  trip: configPosition.trip,
  'data-now': new Date('2023-12-31T10:00').valueOf(),
};

export const Minimal = Template.bind({});
Minimal.argTypes = defaultArgTypes;
Minimal.args = {
  ...defaultArgs,
  trip: configMinimal.trip,
  'data-now': new Date('2022-06-30T10:00').valueOf(),
};

export const Cancelled = Template.bind({});
Cancelled.argTypes = defaultArgTypes;
Cancelled.args = {
  ...defaultArgs,
  trip: configCancelled.trip,
};

export const CancelledStops = Template.bind({});
CancelledStops.argTypes = defaultArgTypes;
CancelledStops.args = {
  ...defaultArgs,
  trip: configCancelledStops.trip,
};

export const Past = Template.bind({});
Past.argTypes = defaultArgTypes;
Past.args = {
  ...defaultArgs,
  trip: configPast.trip,
  'data-now': new Date('2022-10-30T17:00:00').valueOf(),
};

export default {
  decorators: [
    (Story) => (
      <div style="background: #f6f6f6; padding: 2rem;">
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: {
      handles: [events.click],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/timetable/sbb-timetable-row',
};
