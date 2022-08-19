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
  config: config,
};

export const SbbTimetableRowPosition = Template.bind({});
SbbTimetableRowPosition.args = {
  disableAnimation: false,
  config: configPosition,
};

export const SbbTimetableRowPositionDisabledAnimation = Template.bind({});
SbbTimetableRowPositionDisabledAnimation.args = {
  disableAnimation: true,
  config: configPosition,
};

export const SbbTimetableRowMinimal = Template.bind({});
SbbTimetableRowMinimal.args = {
  config: configMinimal,
};

export const SbbTimetableRowCancelled = Template.bind({});
SbbTimetableRowCancelled.args = {
  config: configCancelled,
};

export const SbbTimetableRowCancelledStops = Template.bind({});
SbbTimetableRowCancelledStops.args = {
  config: configCancelledStops,
};

export const SbbTimetableRowPast = Template.bind({});
SbbTimetableRowPast.args = {
  config: configPast,
};

export const SbbTimetableRowLoading = Template.bind({});
SbbTimetableRowLoading.args = {
  loading: true,
  config: config,
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
