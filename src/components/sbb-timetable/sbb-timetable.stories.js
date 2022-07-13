import { h } from 'jsx-dom';
import readme from './readme.md';
import rowButtonEvents from '../sbb-timetable-row-button/sbb-timetable-row-button.events.ts';
import timeTableButtonEvents from '../sbb-timetable-button/sbb-timetable-button.events.ts';

import sampleData from './sbb-timetable.sample-data';

const Template = (args) => (
  <sbb-timetable>
    <sbb-timetable-row-column-headers config={args.columnHeaders} role="row" />
    <sbb-timetable-row-day-change config={args.timetableRowsDayChange[0]} role="row" />
    <sbb-timetable-row config={args.timetableRows[0]} role="row" />
    <sbb-timetable-row config={args.timetableRows[1]} role="row" />
    <sbb-timetable-row config={args.timetableRows[2]} role="row" />
    <sbb-timetable-row config={args.timetableRows[3]} role="row" />
    <sbb-timetable-row-day-change config={args.timetableRowsDayChange[1]} role="row" />
    <sbb-timetable-row config={args.timetableRows[3]} role="row" />
  </sbb-timetable>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const sbbTimetable = Template.bind({});

sbbTimetable.args = {
  columnHeaders: JSON.stringify(sampleData.columnHeaders),
  timetableRows: [
    JSON.stringify(sampleData.timetableRows[0]),
    JSON.stringify(sampleData.timetableRows[1]),
    JSON.stringify(sampleData.timetableRows[2]),
    JSON.stringify(sampleData.timetableRows[3]),
  ],
  timetableRowsDayChange: [
    JSON.stringify(sampleData.timetableRowsDayChange[0]),
    JSON.stringify(sampleData.timetableRowsDayChange[1]),
  ],
};

sbbTimetable.documentation = {
  title: 'SBB Timetable',
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
      handles: [rowButtonEvents.click, timeTableButtonEvents.click],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/timetable/sbb-timetable (Unfinished)',
};
