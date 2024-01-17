import type { Meta, StoryObj, Args } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';
import sampleData from './timetable-barrier-free.sample-data';
import './timetable-barrier-free';

const Template = ({ config }: Args): TemplateResult => html`
  <sbb-timetable-barrier-free config=${JSON.stringify(config)}></sbb-timetable-barrier-free>
`;

const config: Args = {
  table: {
    disable: false,
  },
};

const defaultArgTypes = {
  config,
};

export const BarrierFree: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[0],
  },
};

export const BarrierFreePartially: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[1],
  },
};

export const BarrierFreeReservation: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[2],
  },
};

export const nonBarrierFree: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[3],
  },
};

export const BarrierFreeUnknown: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[4],
  },
};

const meta: Meta = {
  decorators: [(story) => html`${story()}`],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'Internals/sbb-timetable-barrier-free',
};

export default meta;
