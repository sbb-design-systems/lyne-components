import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';
import sampleData from './timetable-travel-hints.sample-data';
import './timetable-travel-hints';

const Template = (args: Args): TemplateResult => html`
  <sbb-timetable-travel-hints
    appearance=${args.appearance}
    config=${JSON.stringify(args.config)}
  ></sbb-timetable-travel-hints>
`;

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

export const TravelHintsList: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    config: sampleData[0],
  },
};

const meta: Meta = {
  decorators: [(story) => html` <div style="padding: 2rem;">${story()}</div> `],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'internals/sbb-timetable-travel-hints',
};

export default meta;
