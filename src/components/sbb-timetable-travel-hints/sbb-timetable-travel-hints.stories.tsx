/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './sbb-timetable-travel-hints.sample-data';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/html';
import type { InputType } from '@storybook/types';

const Template = (args): JSX.Element => (
  <sbb-timetable-travel-hints
    appearance={args.appearance}
    config={JSON.stringify(args.config)}
  ></sbb-timetable-travel-hints>
);

const appearance: InputType = {
  control: {
    type: 'select',
  },
  options: ['first-level-list', 'second-level-list'],
};

const config: Args = {
  table: {
    disable: false,
  },
};

const gridCellRole: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  appearance,
  config,
  gridCellRole,
};

const defaultArgs: Args = {
  appearance: appearance.options[0],
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const TravelHintsList: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    config: sampleData[0],
  },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'internals/sbb-timetable-travel-hints',
};

export default meta;
