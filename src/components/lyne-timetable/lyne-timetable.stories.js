import { h } from 'jsx-dom';
import readme from './readme.md';

import sampleData from './lyne-timetable.sample-data';

const Template = (args) => (
  <lyne-timetable
    config={JSON.stringify(args.config)}
  >
  </lyne-timetable>
);

const config = {
  table: {
    disable: true
  }
};

const defaultArgTypes = {
  config
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const LyneTimetable = Template.bind({});

LyneTimetable.argTypes = defaultArgTypes;
LyneTimetable.args = {
  config: sampleData
};

LyneTimetable.documentation = {
  title: 'Lyne Timetable'
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
  title: 'Timetable/lyne-timetable'
};
