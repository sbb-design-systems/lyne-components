import { h } from 'jsx-dom';
import readme from './readme.md';
import { defaultTrip } from '../sbb-timetable-row/sbb-timetable-row.sample-data';

const Template = (args) => (
  <sbb-timetable>
    <sbb-timetable-row {...args} />
    <sbb-timetable-row {...args} />
    <sbb-timetable-row {...args} />
  </sbb-timetable>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const sbbTimetable = Template.bind({});
sbbTimetable.args = {
  'loading-trip': defaultTrip.loadingTrip,
  trip: defaultTrip,
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
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/timetable/sbb-timetable (Unfinished)',
};
