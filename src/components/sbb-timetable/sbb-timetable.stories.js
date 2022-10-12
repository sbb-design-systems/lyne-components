import { h } from 'jsx-dom';
import readme from './readme.md';
import { config } from '../sbb-timetable-row/sbb-timetable-row.sample-data';

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
  'loading-price': config.loadingPrice,
  'loading-trip': config.loadingTrip,
  trip: config.trip,
  price: config.price,
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
