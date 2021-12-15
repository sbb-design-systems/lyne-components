import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-row-header.sample-data';

const Template = (args) => (
  <lyne-timetable-row-header
    config={JSON.stringify(args.config)}
    role='rowheader'
  >
  </lyne-timetable-row-header>
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
export const LyneTimetableRowHeader = Template.bind({});

LyneTimetableRowHeader.argTypes = defaultArgTypes;
LyneTimetableRowHeader.args = {
  config: sampleData[0]
};

LyneTimetableRowHeader.documentation = {
  title: 'Lyne Timetable Row Header'
};

export default {
  decorators: [
    (Story) => (
      <Story/>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Timetable/lyne-timetable-row-header'
};
