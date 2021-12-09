import { h } from 'jsx-dom';
import readme from './readme.md';

import sampleData from './lyne-timetable-row-column-headers.sample-data';

const Template = (args) => (
  <lyne-timetable-row-column-headers
    config={JSON.stringify(args.config)}
    role='row'
  >
  </lyne-timetable-row-column-headers>
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
export const LyneTimetableRowColumnHeaders = Template.bind({});

LyneTimetableRowColumnHeaders.argTypes = defaultArgTypes;
LyneTimetableRowColumnHeaders.args = {
  config: sampleData
};

LyneTimetableRowColumnHeaders.documentation = {
  title: 'Lyne Timetable Row Column Headers'
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Timetable/lyne-timetable-row-column-headers'
};
