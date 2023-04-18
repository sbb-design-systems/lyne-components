import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './sbb-timetable-park-and-rail.sample-data';

const Template = (args) => (
  <sbb-timetable-park-and-rail
    appearance={args.appearance}
    config={JSON.stringify(args.config)}
  ></sbb-timetable-park-and-rail>
);

const appearance = {
  control: {
    type: 'select',
  },
  options: ['first-level'],
};

const config = {
  table: {
    disable: false,
  },
};

const defaultArgTypes = {
  appearance,
  config,
};

const defaultArgs = {
  appearance: appearance.options[0],
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const ParkAndRail = Template.bind({});

ParkAndRail.argTypes = defaultArgTypes;
ParkAndRail.args = {
  ...defaultArgs,
  config: sampleData[0],
};

ParkAndRail.documentation = {
  title: 'P+Rail Icon',
};

export default {
  decorators: [(Story) => <Story />],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'internals/sbb-timetable-park-and-rail',
};
