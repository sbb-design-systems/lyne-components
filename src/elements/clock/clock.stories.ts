import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import { html, nothing, type TemplateResult } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';
import type { SbbTime } from '../core/interfaces/types.ts';

import readme from './readme.md?raw';

import './clock.component.ts';

const hours: InputType = { control: { type: 'number', min: 0, max: 23 } };
const minutes: InputType = { control: { type: 'number', min: 0, max: 59 } };
// Note: SBB Clock doesn't have the second 59, this is awaited in still position always
const seconds: InputType = { control: { type: 'number', min: 0, max: 58 } };

const Template = ({ hours, minutes, seconds, ...args }: Args): TemplateResult => {
  const timeString: SbbTime = `${hours}:${minutes}:${seconds}`;
  const hasCustomTime = hours !== undefined && minutes !== undefined && seconds !== undefined;
  return html`<sbb-clock
    now=${hasCustomTime ? timeString : nothing}
    ${sbbSpread(args)}
  ></sbb-clock>`;
};

const defaultArgTypes: ArgTypes = {
  hours,
  minutes,
  seconds,
};

const defaultArgs: Args = {
  hours: undefined,
  minutes: undefined,
  seconds: undefined,
};

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Paused: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, hours: 9, minutes: 10, seconds: 30 },
};

const meta: Meta = {
  decorators: [(story) => html`<div style="max-width: 600px;">${story()}</div>`],
  parameters: {
    backgroundColor: () => 'var(--sbb-background-color-3)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-clock',
};

export default meta;
