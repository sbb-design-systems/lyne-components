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
  NoticesTrip,
} from './sbb-timetable-row.sample-data';
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

const active = {
  control: {
    type: 'boolean',
  },
};

const boarding = {
  control: {
    type: 'select',
  },
  options: [
    'BOARDING_ALIGHTING_NOT_POSSIBLE',
    'BOARDING_ALIGHTING_BY_CREW',
    'BOARDING_ALIGHTING_BY_NOTIFICATION',
    'BOARDING_ALIGHTING_SELF',
  ],
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
  active,
  'data-now': now,
  'boarding-alighting-accessibility': boarding,
};

const defaultArgs = {
  'accessibility-label': 'Aria Label',
  'disable-animation': isChromatic(),
  'loading-trip': false,
  active: false,
  'data-now': new Date('2022-12-01T12:11:00').valueOf(),
  trip: defaultTrip,
  'boarding-alighting-accessibility': boarding.options[0],
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

export const LoadingTrip = Template.bind({});
LoadingTrip.argTypes = defaultArgTypes;
LoadingTrip.args = {
  ...defaultArgs,
  'loading-trip': true,
};

export const Position = Template.bind({});
Position.argTypes = defaultArgTypes;
Position.args = {
  ...defaultArgs,
  trip: progressTrip,
  'data-now': undefined,
};

export const PositionDisabledAnimation = Template.bind({});
PositionDisabledAnimation.argTypes = defaultArgTypes;
PositionDisabledAnimation.args = {
  ...defaultArgs,
  'disable-animation': true,
  trip: progressTrip,
  'data-now': undefined,
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
};

export const QuayChanged = Template.bind({});
QuayChanged.argTypes = defaultArgTypes;
QuayChanged.args = {
  ...defaultArgs,
  trip: quayChangeTrip,
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

export const Notices = Template.bind({});
Notices.argTypes = defaultArgTypes;
Notices.args = {
  ...defaultArgs,
  trip: NoticesTrip,
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
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/timetable/sbb-timetable-row',
};
