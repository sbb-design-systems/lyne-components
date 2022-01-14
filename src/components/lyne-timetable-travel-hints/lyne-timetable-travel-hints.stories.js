import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-travel-hints.sample-data';

const Template = (args) => (
  <lyne-timetable-travel-hints
    appearance={args.appearance}
    config={JSON.stringify(args.config)}
  >
  </lyne-timetable-travel-hints>
);

const appearance = {
  control: {
    type: 'select'
  },
  options: [
    'first-level-list',
    'second-level-list'
  ]
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
  appearance: appearance.options[0]
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
  title: 'Internals/lyne-timetable-travel-hints'
};
