import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import { mapIconToSvg } from '../common/mapper/icon-mapper.js';

import readme from './readme.md?raw';
import { assetsTemplate } from './seat-reservation-assets.js';

import './seat-reservation-graphic.component.js';

const name: InputType = {
  control: {
    type: 'select',
  },
  options: Object.keys(mapIconToSvg),
};

const stretch: InputType = {
  control: {
    type: 'boolean',
  },
};

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

const defaultArgTypes: ArgTypes = {
  name: name,
  stretch,
  width,
  height,
  rotation,
};

const defaultArgs: Args = {
  name: 'BISTRO',
  stretch: false,
  width: 32,
  height: 32,
  rotation: 0,
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-seat-reservation-graphic ${sbbSpread(args)}></sbb-seat-reservation-graphic>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const pramAreaWidth32Height32: StoryObj = {
  render: Template,
  args: { ...defaultArgs, name: 'PRAM_AREA', width: 32, height: 32 },
};

export const StairAreaWidth32Height32Rotation315: StoryObj = {
  render: Template,
  args: { ...defaultArgs, name: 'STAIR_AREA', width: 32, height: 32, rotation: 315 },
};

export const coachBorderMiddleWidth20Height128Stretch: StoryObj = {
  render: Template,
  args: { ...defaultArgs, name: 'COACH_BORDER_MIDDLE', stretch: true, width: 20, height: 128 },
};

export const availableAssets: StoryObj = {
  render: () => assetsTemplate,
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
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-graphic',
};

export default meta;
