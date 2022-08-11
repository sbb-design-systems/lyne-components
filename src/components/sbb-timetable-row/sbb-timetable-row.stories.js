import { h } from 'jsx-dom';
import readme from './readme.md';
import data from './sbb-timetable-row.sample-data';

const loading = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'State',
  },
};

// TEMPLATES

const Template = (args) => (
  <sbb-timetable-row {...args}>
    <sbb-pearl-chain slot="pearlChain" class="timetable__row-chain" />
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
SbbTimetableRow.args = {
  config: data,
};

export const SbbTimetableRowLoading = Template.bind({});
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
