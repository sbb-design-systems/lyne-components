import type { Meta, StoryObj, Args } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';

import readme from './readme.md?raw';
import sampleData from './timetable-row-day-change.sample-data';
import './timetable-row-day-change';

const Template = ({ config }: Args): TemplateResult => html`
  <sbb-timetable-row-day-change config=${JSON.stringify(config)}></sbb-timetable-row-day-change>
`;

const config: Args = {
  table: {
    disable: false,
  },
};

const defaultArgTypes = {
  config,
};

export const currentDayHidden: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[0],
  },
};

export const currentDayVisible: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[1],
  },
};

export const dayChange: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[2],
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
  title: 'internals/sbb-timetable-row-day-change',
};

export default meta;
