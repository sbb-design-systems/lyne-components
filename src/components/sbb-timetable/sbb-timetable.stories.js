import { h } from 'jsx-dom';
import readme from './readme.md';
import { defaultTrip } from '../sbb-timetable-row/sbb-timetable-row.sample-data';
import isChromatic from 'chromatic';

const Template = (args) => (
  <sbb-timetable>
    <sbb-timetable-row {...args} />
    <sbb-timetable-row {...args} />
    <sbb-timetable-row {...args} />
  </sbb-timetable>
);

const disableAnimation = {
  control: {
    type: 'boolean',
  },
};

const now = {
  control: {
    type: 'date',
  },
};

const defaultArgTypes = {
  'disable-animation': disableAnimation,
  'data-now': now,
};

const defaultArgs = {
  'disable-animation': isChromatic(),
  'data-now': new Date('2022-12-08T12:11:00').valueOf(),
};

export const sbbTimetable = Template.bind({});
sbbTimetable.argTypes = defaultArgTypes;
sbbTimetable.args = {
  ...defaultArgs,
  trip: defaultTrip,
};

export default {
  decorators: [
    (Story) => (
      <div style="background: #f6f6f6; padding: 2rem;">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/timetable/sbb-timetable (Unfinished)',
};
