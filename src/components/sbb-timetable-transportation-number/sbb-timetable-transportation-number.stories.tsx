/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './sbb-timetable-transportation-number.sample-data';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/html';
import type { InputType } from '@storybook/types';

const Template = (args): JSX.Element => (
  <sbb-timetable-transportation-number
    appearance={args.appearance}
    config={JSON.stringify(args.config)}
  ></sbb-timetable-transportation-number>
);

const appearance: InputType = {
  control: {
    type: 'select',
  },
  options: ['first-level', 'second-level'],
};

const config: Args = {
  table: {
    disable: false,
  },
};

const defaultArgTypes: ArgTypes = {
  appearance,
  config,
};

const defaultArgs: Args = {
  appearance: appearance.options[0],
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const BusFirstLevel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    config: sampleData.bus,
  },
};

export const BusSecondLevel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    appearance: appearance.options[1],
    config: sampleData.bus,
  },
};

export const CableCarFirstLevel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    config: sampleData.cableCar,
  },
};

export const CableCarSecondLevel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    appearance: appearance.options[1],
    config: sampleData.cableCar,
  },
};

export const TrainFirstLevel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    config: sampleData.train,
  },
};

export const TrainSecondLevel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    appearance: appearance.options[1],
    config: sampleData.train,
  },
};

export const TramFirstLevel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    config: sampleData.tram,
  },
};

export const TramSecondLevel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    appearance: appearance.options[1],
    config: sampleData.tram,
  },
};

const meta: Meta = {
  decorators: [(Story) => <Story />],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'internals/sbb-timetable-transportation-number',
};

export default meta;
