import { h } from 'jsx-dom';
import readme from './readme.md';

import sampleData from './lyne-timetable-row.sample-data';

const Template = (args) => (
  <lyne-timetable-row
    config={JSON.stringify(args.config)}
    role='row'
  >
  </lyne-timetable-row>
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
export const LyneTimetableRow = Template.bind({});

LyneTimetableRow.argTypes = defaultArgTypes;
LyneTimetableRow.args = {
  config: sampleData[0]
};

LyneTimetableRow.documentation = {
  title: 'Lyne Timetable Row'
};

export default {
  decorators: [
    (Story) => (
      <div>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Timetable/lyne-timetable-row'
};
