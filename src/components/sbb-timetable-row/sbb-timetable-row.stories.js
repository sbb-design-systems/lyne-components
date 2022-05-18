import { h } from 'jsx-dom';
import readme from './readme.md';

import sampleData from './sbb-timetable-row.sample-data';

const Template = (args) => (
  <sbb-timetable-row
    config={JSON.stringify(args.config)}
  >
  </sbb-timetable-row>
);

const config = {
  table: {
    disable: false
  }
};

const defaultArgTypes = {
  config
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const SbbTimetableRow = Template.bind({});

SbbTimetableRow.argTypes = defaultArgTypes;
SbbTimetableRow.args = {
  config: sampleData[0]
};

SbbTimetableRow.documentation = {
  title: 'SBB Timetable Row'
};

export default {
  decorators: [
    (Story) => (
      <div style='background: #f6f6f6; padding: 2rem;'>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'components/timetable/sbb-timetable-row'
};
