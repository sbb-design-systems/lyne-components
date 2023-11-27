import type { Meta, StoryObj, Args } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';

import readme from './readme.md?raw';
import sampleData from './timetable-row-column-headers.sample-data';
import './timetable-row-column-headers';

const Template = ({ config }: Args): TemplateResult => html`
  <sbb-timetable-row-column-headers
    config=${JSON.stringify(config)}
  ></sbb-timetable-row-column-headers>
`;

const config: Args = {
  table: {
    disable: false,
  },
};

const defaultArgTypes = {
  config,
};

export const SbbTimetableRowColumnHeaders: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData,
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
  title: 'internals/sbb-timetable-row-column-headers',
};

export default meta;
