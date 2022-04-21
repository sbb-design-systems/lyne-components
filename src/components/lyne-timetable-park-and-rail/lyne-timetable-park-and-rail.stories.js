import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-park-and-rail.sample-data';

const Template = (args) => (
  <lyne-timetable-park-and-rail
    appearance={args.appearance}
    config={JSON.stringify(args.config)}
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

const defaultArgTypes = {
  appearance,
  config
};

const defaultArgs = {
  appearance: appearance.options[0]
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
  title: 'internals/lyne-timetable-park-and-rail'
};
