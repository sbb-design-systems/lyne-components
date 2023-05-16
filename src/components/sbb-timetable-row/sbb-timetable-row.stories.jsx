import { h } from 'jsx-dom';
import readme from './readme.md';
import {
  defaultTrip,
  progressTrip,
  cancelledTrip,
  partiallyCancelled,
  pastTrip,
  disturbanceTrip,
  TrainTrip,
  BusTrip,
  quayChangeTrip,
  ShipTrip,
  walkTimeTrip,
  extendedEnterTimeTrip,
  NoticesTrip,
  skippedDepartureStopTrip,
  skippedArrivalStopTrip,
  skippedFirstDepartureStopTrip,
  skippedLastArrivalStopTrip,
} from './sbb-timetable-row.sample-data';
import isChromatic from 'chromatic/isChromatic';
import { withActions } from '@storybook/addon-actions/decorator';

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

const boarding = {
  control: {
    type: 'object',
  },
};

const defaultArgTypes = {
  'disable-animation': disableAnimation,
  'loading-trip': loadingTrip,
  'loading-price': loadingPrice,
  active,
  'data-now': now,
  boarding,
};

const defaultArgs = {
  'disable-animation': isChromatic(),
  'loading-trip': false,
  'loading-price': false,
  active: false,
  'data-now': new Date('2022-12-01T12:11:00').valueOf(),
  trip: defaultTrip,
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
};

export const Active = Template.bind({});
Active.argTypes = defaultArgTypes;
Active.args = {
  ...defaultArgs,
  active: true,
};

export const Price = Template.bind({});
Price.argTypes = defaultArgTypes;
Price.args = {
  ...defaultArgs,
  price: { price: '39.90', text: 'ab CHF', isDiscount: false },
};

export const Discount = Template.bind({});
Discount.argTypes = defaultArgTypes;
Discount.args = {
  ...defaultArgs,
  price: { isDiscount: true },
};

export const discountPrice = Template.bind({});
discountPrice.argTypes = defaultArgTypes;
discountPrice.args = {
  ...defaultArgs,
  price: { price: '39.90', text: 'ab CHF', isDiscount: true },
};

export const LoadingPrice = Template.bind({});
LoadingPrice.argTypes = defaultArgTypes;
LoadingPrice.args = {
  ...defaultArgs,
  'loading-price': true,
  price: { price: '39.90', text: 'ab CHF', isDiscount: true },
};

export const LoadingTrip = Template.bind({});
LoadingTrip.argTypes = defaultArgTypes;
LoadingTrip.args = {
  ...defaultArgs,
  'loading-trip': true,
};

export const LoadingTripPrice = Template.bind({});
LoadingTripPrice.argTypes = defaultArgTypes;
LoadingTripPrice.args = {
  ...defaultArgs,
  'loading-trip': true,
  'loading-price': true,
  price: { price: '39.90', text: 'ab CHF', isDiscount: true },
};

export const Position = Template.bind({});
Position.argTypes = defaultArgTypes;
Position.args = {
  ...defaultArgs,
  trip: progressTrip,
  'data-now': new Date('2022-12-05T12:11:00').valueOf(),
};

export const PositionDisabledAnimation = Template.bind({});
PositionDisabledAnimation.argTypes = defaultArgTypes;
PositionDisabledAnimation.args = {
  ...defaultArgs,
  'disable-animation': true,
  trip: progressTrip,
  'data-now': new Date('2022-12-05T12:11:00').valueOf(),
};

export const Cancelled = Template.bind({});
Cancelled.argTypes = defaultArgTypes;
Cancelled.args = {
  ...defaultArgs,
  trip: cancelledTrip,
};

export const PartiallyCancelled = Template.bind({});
PartiallyCancelled.argTypes = defaultArgTypes;
PartiallyCancelled.args = {
  ...defaultArgs,
  trip: partiallyCancelled,
};

export const Past = Template.bind({});
Past.argTypes = defaultArgTypes;
Past.args = {
  ...defaultArgs,
  trip: pastTrip,
  'data-now': new Date('2023-12-01T12:11:00').valueOf(),
};

export const Disturbance = Template.bind({});
Disturbance.argTypes = defaultArgTypes;
Disturbance.args = {
  ...defaultArgs,
  trip: disturbanceTrip,
  'data-now': new Date('2022-12-05T12:11:00').valueOf(),
};

export const SkippedDepartureStop = Template.bind({});
SkippedDepartureStop.argTypes = defaultArgTypes;
SkippedDepartureStop.args = {
  ...defaultArgs,
  trip: skippedDepartureStopTrip,
  'data-now': new Date('2022-12-05T12:11:00').valueOf(),
};

export const SkippedArrivalStop = Template.bind({});
SkippedArrivalStop.argTypes = defaultArgTypes;
SkippedArrivalStop.args = {
  ...defaultArgs,
  trip: skippedArrivalStopTrip,
  'data-now': new Date('2022-12-05T12:11:00').valueOf(),
};

export const SkippedLastArrivalStop = Template.bind({});
SkippedLastArrivalStop.argTypes = defaultArgTypes;
SkippedLastArrivalStop.args = {
  ...defaultArgs,
  trip: skippedLastArrivalStopTrip,
  'data-now': new Date('2022-12-05T12:11:00').valueOf(),
};

export const SkippedFirstDepartureStop = Template.bind({});
SkippedFirstDepartureStop.argTypes = defaultArgTypes;
SkippedFirstDepartureStop.args = {
  ...defaultArgs,
  trip: skippedFirstDepartureStopTrip,
  'data-now': new Date('2022-12-05T12:11:00').valueOf(),
};

export const QuayChanged = Template.bind({});
QuayChanged.argTypes = defaultArgTypes;
QuayChanged.args = {
  ...defaultArgs,
  trip: quayChangeTrip,
  'data-now': new Date('2022-12-05T12:11:00').valueOf(),
};

export const Train = Template.bind({});
Train.argTypes = defaultArgTypes;
Train.args = {
  ...defaultArgs,
  trip: TrainTrip,
};

export const Bus = Template.bind({});
Bus.argTypes = defaultArgTypes;
Bus.args = {
  ...defaultArgs,
  trip: BusTrip,
};

export const Ship = Template.bind({});
Ship.argTypes = defaultArgTypes;
Ship.args = {
  ...defaultArgs,
  trip: ShipTrip,
};

export const WalkTime = Template.bind({});
WalkTime.argTypes = defaultArgTypes;
WalkTime.args = {
  ...defaultArgs,
  trip: walkTimeTrip,
};

export const ExtendedEnterTime = Template.bind({});
ExtendedEnterTime.argTypes = defaultArgTypes;
ExtendedEnterTime.args = {
  ...defaultArgs,
  trip: extendedEnterTimeTrip,
};

export const Notices = Template.bind({});
Notices.argTypes = defaultArgTypes;
Notices.args = {
  ...defaultArgs,
  trip: NoticesTrip,
  boarding: { name: 'sa-rs', text: 'boarding' },
};

export default {
  decorators: [
    (Story) => (
      <div style="background: #f6f6f6; padding: 2rem;">
        <Story />
      </div>
    ),
    withActions,
  ],
  parameters: {
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/timetable/sbb-timetable-row',
};
