import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-row-day-change.sample-data';

const Template = (args) => (
  <lyne-timetable-row-day-change
    config={JSON.stringify(args.config)}
    role={
      args.gridCellRole
        ? 'gridcell'
        : 'none'
    }
  >
  </lyne-timetable-row-day-change>
);

const gridCellRole = {
  control: {
    type: 'boolean'
  }
};

const config = {
  table: {
    disable: false
  }
};

const defaultArgTypes = {
  config,
  gridCellRole
};

const defaultArgs = {
  gridCellRole: true
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const currentDayHidden = Template.bind({});

currentDayHidden.argTypes = defaultArgTypes;
currentDayHidden.args = {
  ...defaultArgs,
  config: sampleData[0]
};

currentDayHidden.documentation = {
  title: 'Current Day Hidden'
};

export const currentDayVisible = Template.bind({});

currentDayVisible.argTypes = defaultArgTypes;
currentDayVisible.args = {
  ...defaultArgs,
  config: sampleData[1]
};

currentDayVisible.documentation = {
  title: 'Current Day Visible'
};

export const dayChange = Template.bind({});

dayChange.argTypes = defaultArgTypes;
dayChange.args = {
  ...defaultArgs,
  config: sampleData[2]
};

dayChange.documentation = {
  title: 'Day Change'
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
  title: 'Timetable/lyne-timetable-row-day-change'
};
