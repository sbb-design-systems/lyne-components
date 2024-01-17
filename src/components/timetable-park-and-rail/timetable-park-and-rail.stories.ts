import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';
import sampleData from './timetable-park-and-rail.sample-data';
import './timetable-park-and-rail';

const Template = (args: Args): TemplateResult => html`
  <sbb-timetable-park-and-rail
    appearance=${args.appearance}
    config=${JSON.stringify(args.config)}
  ></sbb-timetable-park-and-rail>
`;

const appearance: InputType = {
  control: {
    type: 'select',
  },
  options: ['first-level'],
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

export const ParkAndRail: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
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
  title: 'internals/sbb-timetable-park-and-rail',
};

export default meta;
