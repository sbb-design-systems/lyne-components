import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import { elementMountingOptions } from '../seat-reservation.js';

import readme from './readme.md?raw';

import './seat-reservation-area.js';

const width: InputType = {
  control: {
    type: 'number',
  },
};

const height: InputType = {
  control: {
    type: 'number',
  },
};

const rotation: InputType = {
  control: {
    type: 'number',
  },
};

const mounting: InputType = {
  control: {
    type: 'select',
  },
  options: elementMountingOptions,
};

const background: InputType = {
  control: {
    type: 'select',
  },
  options: ['light', 'dark'],
};

const defaultArgTypes: ArgTypes = {
  width,
  height,
  rotation,
  mounting,
  background,
};

const defaultArgs: Args = {
  width: 6,
  height: 6,
  rotation: 0,
  background: 'dark',
  mounting: elementMountingOptions[0],
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-seat-reservation-area ${sbbSpread(args)}></sbb-seat-reservation-area>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-area',
};

export default meta;
