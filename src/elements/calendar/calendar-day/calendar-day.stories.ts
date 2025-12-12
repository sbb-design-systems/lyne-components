import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import './calendar-day.component.ts';

const Template = (args: Args): TemplateResult =>
  html`<sbb-calendar-day ${sbbSpread(args)}></sbb-calendar-day>`;

export const Default: StoryObj = {
  render: Template,
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-calendar/sbb-calendar-day',
};

export default meta;
