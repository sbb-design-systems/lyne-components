import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <sbb-journey-summary config={args}>
    <div
      style={{
        display: 'flex',
        paddingTop: '24px',
        justifyContent: 'space-between',
      }}
    >
      <sbb-button
        variant="secondary"
        icon=""
        icon-description="context menu"
        iconslot="context-menu-small"
        name="samplename"
      >
        <sbb-icon name="context-menu-small"></sbb-icon>
      </sbb-button>
      <sbb-button label="Button label"></sbb-button>
    </div>
  </sbb-journey-summary>
);

export const summary = Template.bind({});
export const summaryNoVias = Template.bind({});
export const summaryNoArrivalWalk = Template.bind({});
export const summaryDate = Template.bind({});
summary.args = {
  vias: ['via1', 'via2', 'via3', 'via4', 'via5', 'via6'],
  legs: '{"legs": [{"cancellation": false, "duration": 50},{"cancellation": false, "duration": 50}]}',
  origin: 'Station',
  destination: 'Station',
  departure: { time: '2022-08-29T20:30:00+02:00' },
  arrival: { time: '2022-08-29T20:35:00+02:00' },
};

summaryNoVias.args = {
  origin: 'Station',
  destination: 'Station',
  legs: '{"legs": [{"cancellation": false, "duration": 20},{"cancellation": false, "duration": 80}]}',
  arrivalWalk: 10,
  departureWalk: 5,
  departure: { time: '2022-08-29T20:30:00+02:00' },
  arrival: { time: '2022-08-29T22:30:00+02:00' },
};

summaryNoArrivalWalk.args = {
  origin: 'Station',
  destination: 'Station',
  legs: '{"legs": [{"cancellation": false, "duration": 60},{"cancellation": false, "duration": 40}]}',
  departureWalk: 5,
  departure: { time: '2022-08-30T20:30:00+02:00' },
  arrival: { time: '2022-08-29T22:30:00+02:00' },
};

summaryDate.args = {
  vias: ['via1', 'via2', 'via3', 'via4'],
  legs: '{"legs": [{"cancellation": false, "duration": 50},{"cancellation": false, "duration": 50}]}',
  origin: 'Station',
  destination: 'Station',
  departure: { time: '2022-09-19T20:30:00+02:00' },
  arrival: { time: '2022-09-19T22:30:00+02:00' },
};

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

export default {
  decorators: [(Story) => <Story />],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/timetable/sbb-journey-summary (Unfinished)',
};
