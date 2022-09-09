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

// TEMPLATES
const Template = (args) => <sbb-timetable-row {...args}></sbb-timetable-row>;

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const SbbTimetableRow = Template.bind({});
SbbTimetableRow.args = {
  'loading-price': config.loadingPrice,
  'loading-trip': config.loadingTrip,
  trip: config.trip,
  price: config.price,
};

export const SbbTimetableRowPosition = Template.bind({});
SbbTimetableRowPosition.args = {
  disableAnimation: false,
  trip: configPosition.trip,
};

export const SbbTimetableRowPositionDisabledAnimation = Template.bind({});
SbbTimetableRowPositionDisabledAnimation.args = {
  disableAnimation: true,
  trip: configPosition.trip,
};

export const SbbTimetableRowMinimal = Template.bind({});
SbbTimetableRowMinimal.args = {
  trip: configMinimal.trip,
};

export const SbbTimetableRowCancelled = Template.bind({});
SbbTimetableRowCancelled.args = {
  trip: configCancelled.trip,
};

export const SbbTimetableRowCancelledStops = Template.bind({});
SbbTimetableRowCancelledStops.args = {
  trip: configCancelledStops.trip,
};

export const SbbTimetableRowPast = Template.bind({});
SbbTimetableRowPast.args = {
  trip: configPast.trip,
};

export const SbbTimetableRowLoading = Template.bind({});
SbbTimetableRowLoading.args = {
  loadingTrip: true,
  trip: config.trip,
  price: config.price,
};

SbbTimetableRow.documentation = {
  title: 'SBB Timetable Row',
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
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/timetable/sbb-timetable-row (Unfinished)',
};
