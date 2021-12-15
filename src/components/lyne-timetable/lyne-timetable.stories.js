import { h } from 'jsx-dom';
import readme from './readme.md';
import rowButtonEvents from '../lyne-timetable-row-button/lyne-timetable-row-button.events.ts';

import sampleData from './lyne-timetable.sample-data';

const Template = (args) => (
  <lyne-timetable>
    <lyne-timetable-row-column-headers config={args.columnHeaders} role='row' />
    <lyne-timetable-row-day-change config={args.timetableRowsDayChange[0]} role='row' />
    <lyne-timetable-row config={args.timetableRows[0]} role='row' />
    <lyne-timetable-row config={args.timetableRows[1]} role='row' />
    <lyne-timetable-row config={args.timetableRows[2]} role='row' />
    <lyne-timetable-row config={args.timetableRows[3]} role='row' />
    <lyne-timetable-row-day-change config={args.timetableRowsDayChange[1]} role='row' />
    <lyne-timetable-row config={args.timetableRows[3]} role='row' />
  </lyne-timetable>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const LyneTimetable = Template.bind({});

LyneTimetable.args = {
  columnHeaders: JSON.stringify(sampleData.columnHeaders),
  timetableRows: [
    JSON.stringify(sampleData.timetableRows[0]),
    JSON.stringify(sampleData.timetableRows[1]),
    JSON.stringify(sampleData.timetableRows[2]),
    JSON.stringify(sampleData.timetableRows[3])
  ],
  timetableRowsDayChange: [
    JSON.stringify(sampleData.timetableRowsDayChange[0]),
    JSON.stringify(sampleData.timetableRowsDayChange[1])
  ]
}

LyneTimetable.documentation = {
  title: 'Lyne Timetable'
};


export default {
  decorators: [
    (Story) => (
      <Story/>
    )
  ],
  parameters: {
    actions: {
      handles: [rowButtonEvents.click]
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Timetable/lyne-timetable'
};
