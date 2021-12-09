import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-travel-hints.sample-data';

const Template = (args) => (
  <lyne-timetable-travel-hints
    config={JSON.stringify(args.config)}
    role={
      args.gridCellRole
        ? 'gridcell'
        : 'none'
    }
    variant={args.variant}
  >
  </lyne-timetable-travel-hints>
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

const variant = {
  control: {
    type: 'select'
  },
  options: [
    'first-level-list',
    'second-level-list'
  ]
};

const defaultArgTypes = {
  config,
  gridCellRole,
  variant
};

const defaultArgs = {
  gridCellRole: true,
  variant: variant.options[0]
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const TravelHintsList = Template.bind({});

TravelHintsList.argTypes = defaultArgTypes;
TravelHintsList.args = {
  ...defaultArgs,
  config: sampleData[0]
};

TravelHintsList.documentation = {
  title: 'Travel Hints Icon List'
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
  title: 'Timetable/lyne-timetable-travel-hints'
};
