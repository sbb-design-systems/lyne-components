import { h } from 'jsx-dom';
import readme from './readme.md';

// import sampleData from './sbb-timetable-row.sample-data';

const loading = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input',
  },
};

const Template = (args) => (
  <sbb-timetable-row {...args}>
    {/*<sbb-card-badge slot="badge" text="text"></sbb-card-badge>*/}
    <sbb-icon style="color:" slot="pictogram" name="train-small"></sbb-icon>
    <sbb-icon slot="transportNumber" name="ic-6"></sbb-icon>
    <p slot="direction">Richtung RonshornStraße</p>

    <time slot="walkTimeBefore" datetime="5m" style="margin-right: 1rem">
      <sbb-icon name="walk-small"></sbb-icon>
      <span>5'</span>
    </time>

    <time slot="leftTime" style="margin-right: 1rem">
      14:52
    </time>

    <span slot="pearlChain">
      <sbb-pearl-chain></sbb-pearl-chain>
    </span>
    <time slot="rightTime" style="margin-left: 1rem">
      14:52
    </time>

    <time slot="walkTimeAfter" datetime="5m" style="margin-left: 1rem">
      <span>5'</span>
      <sbb-icon name="walk-small"></sbb-icon>
    </time>

    <span slot="plattform">Gl. 3</span>

    <ul slot="travelHints">
      <li>
        <sbb-icon name="tick-small"></sbb-icon>
      </li>
      <li>
        <sbb-icon name="tick-small"></sbb-icon>
      </li>
      <li>
        <sbb-icon name="tick-small"></sbb-icon>
      </li>
      <li>
        <sbb-icon name="tick-small"></sbb-icon>
      </li>
    </ul>
    <time slot="duration" datetime="3h 19m">
      3h 19min
    </time>
    <sbb-icon slot="warning" name="train-small"></sbb-icon>
  </sbb-timetable-row>
);

const defaultArgTypes = {
  loading: loading,
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const SbbTimetableRow = Template.bind({});

SbbTimetableRow.argTypes = defaultArgTypes;
SbbTimetableRow.args = {};

export const SbbTimetableRowLoading = Template.bind({});
SbbTimetableRowLoading.argTypes = defaultArgTypes;
SbbTimetableRowLoading.args = {
  loading: true,
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
