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
    disable: true
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
export const DayChange = Template.bind({});

DayChange.argTypes = defaultArgTypes;
DayChange.args = {
  ...defaultArgs,
  config: sampleData[0]
};

DayChange.documentation = {
  title: 'Day Change'
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
  title: 'Timetable/lyne-timetable-row-day-change'
};
