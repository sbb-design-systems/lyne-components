import type { Meta, StoryObj, Args } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';

import readme from './readme.md?raw';
import sampleData from './timetable-occupancy.sample-data';
import './timetable-occupancy';

const Template = ({ config }: Args): TemplateResult => html`
  <sbb-timetable-occupancy config=${JSON.stringify(config)}></sbb-timetable-occupancy>
`;

const config: Args = {
  table: {
    disable: false,
  },
};

const defaultArgTypes = {
  config,
};

export const NoneNoneOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[0],
  },
};

export const NonLowOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[1],
  },
};

export const LowLowOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[2],
  },
};

export const LowMediumOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[3],
  },
};

export const MediumMediumOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[4],
  },
};

export const LowHighOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[5],
  },
};

export const MediumHighOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[6],
  },
};

export const HighHighOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[7],
  },
};

const meta: Meta = {
  decorators: [(story) => html`${story()}`],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'internals/sbb-timetable-occupancy',
};

export default meta;
