import type { Meta, StoryObj, Args } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';
import sampleData from './timetable-row-header.sample-data';
import './timetable-row-header';

const Template = ({ config }: Args): TemplateResult => html`
  <sbb-timetable-row-header config=${JSON.stringify(config)}></sbb-timetable-row-header>
`;

const config: Args = {
  table: {
    disable: false,
  },
};

const defaultArgTypes = {
  config,
};

export const SbbTimetableRowHeaderElement: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[0],
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
  title: 'internals/sbb-timetable-row-header',
};

export default meta;
