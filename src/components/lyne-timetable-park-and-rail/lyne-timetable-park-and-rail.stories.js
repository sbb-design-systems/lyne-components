import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-park-and-rail.sample-data';

const Template = (args) => (
  <lyne-timetable-park-and-rail
    appearance={args.appearance}
    config={JSON.stringify(args.config)}
    role={
      args.gridCellRole
        ? 'gridcell'
        : 'none'
    }
  >
  </lyne-timetable-park-and-rail>
);

const appearance = {
  control: {
    type: 'select'
  },
  options: ['first-level']
};

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
  appearance,
  config,
  gridCellRole
};

const defaultArgs = {
  appearance: appearance.options[0],
  gridCellRole: true
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const ParkAndRail = Template.bind({});

ParkAndRail.argTypes = defaultArgTypes;
ParkAndRail.args = {
  ...defaultArgs,
  config: sampleData[0]
};

ParkAndRail.documentation = {
  title: 'P+Rail Icon'
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
  title: 'Timetable/lyne-timetable-park-and-rail'
};
