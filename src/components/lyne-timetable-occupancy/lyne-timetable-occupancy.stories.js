import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-occupancy.sample-data';

const Template = (args) => (
  <lyne-timetable-occupancy
    { ...args.GridCellRole ?
      role='gridcell'
      : ''
    }
    config={JSON.stringify(args.config)}
  >
  </lyne-timetable-occupancy>
);

const GridCellRole = {
  control: {
    type: 'boolean'
  }
}

const config = {
  table: {
    disable: true
  }
};

const defaultArgTypes = {
  config,
  'grid-cell-role': GridCellRole
};

const defaultArgs = {
  'grid-cell-role': true
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const LowLowOccupancy = Template.bind({});

LowLowOccupancy.argTypes = defaultArgTypes;
LowLowOccupancy.args = {
  ...defaultArgs,
  config: sampleData[2]
};

LowLowOccupancy.documentation = {
  title: 'Low/Low Occupancy'
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 1rem'}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    backgrounds: {
      disable: true
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Timetable/lyne-timetable-occupancy'
};
