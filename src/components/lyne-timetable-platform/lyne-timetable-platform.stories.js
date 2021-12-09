import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-platform.sample-data';

const Template = (args) => (
  <lyne-timetable-platform
    config={JSON.stringify(args.config)}
    role={
      args.gridCellRole
        ? 'gridcell'
        : 'none'
    }
  >
  </lyne-timetable-platform>
);

const config = {
  table: {
    disable: false
  }
};

const gridCellRole = {
  control: {
    type: 'boolean'
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
export const LyneTimetablePlatform = Template.bind({});

LyneTimetablePlatform.argTypes = defaultArgTypes;
LyneTimetablePlatform.args = {
  ...defaultArgs,
  config: sampleData[0]
};

LyneTimetablePlatform.documentation = {
  title: 'Lyne Timetable Platform'
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
  title: 'Timetable/lyne-timetable-platform'
};
