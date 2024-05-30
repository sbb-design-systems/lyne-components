import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import isChromatic from 'chromatic/isChromatic';
import { nothing, type TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../storybook/helpers/spread.js';
import type { SbbTime } from '../core/interfaces/types.js';

import readme from './readme.md?raw';

import './clock.js';

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

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { hours: undefined, minutes: undefined, seconds: undefined },
};

export const Paused: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { hours: 10, minutes: 10, seconds: 30 },
};

/**
 * Stop the clock for Chromatic visual regression tests
 * and set time to given time
 */
if (isChromatic()) {
  Default.args = {
    now: { hours: 10, minutes: 10, seconds: 30 },
  };
}

const meta: Meta = {
  decorators: [(story) => html`<div style=${styleMap({ 'max-width': '600px' })}>${story()}</div>`],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-clock',
};

export default meta;
