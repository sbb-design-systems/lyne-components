import type { Args, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread';

import readme from './readme.md?raw';
import './train-blocked-passage';

const Template = (args: Args): TemplateResult => html`
  <sbb-train-blocked-passage ${sbbSpread(args)}></sbb-train-blocked-passage>
`;

export const blockedPassage: StoryObj = {
  render: Template,
};

const meta: Meta = {
  decorators: [(story) => html` <div style="padding: 2rem;">${story()}</div> `],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'timetable/sbb-train-blocked-passage',
};

export default meta;
