import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-train {...args}></sbb-train>;

const directionLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Direction indicator',
  },
};

const directionLabelLevel = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const station = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Direction indicator',
  },
};

const accessibilityLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Direction indicator',
  },
};

const direction = {
  control: {
    type: 'inline-radio',
  },
  options: ['left', 'right'],
  table: {
    category: 'Direction indicator',
  },
};

const defaultArgTypes = {
  'direction-label': directionLabel,
  'direction-label-level': directionLabelLevel,
  'accessibility-label': accessibilityLabel,
  station,
  direction,
};

const defaultArgs = {
  'direction-label': 'Direction of travel',
  'direction-label-level': directionLabelLevel.options[2],
  'accessibility-label':
    'The top of the train is in Sector A. The train leaves the station in this direction.',
  station: 'Bern',
  direction: direction.options[0],
};

export const train = Template.bind({});
train.argTypes = defaultArgTypes;
train.args = defaultArgs;

export const trainWithoutStation = Template.bind({});
trainWithoutStation.argTypes = defaultArgTypes;
trainWithoutStation.args = { ...defaultArgs, station: '' };

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/timetable/train-formation/sbb-train',
};
