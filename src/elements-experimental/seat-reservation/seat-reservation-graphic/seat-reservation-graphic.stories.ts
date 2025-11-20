import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';
import { mapIconToSvg } from '../common/mapper/icon-mapper.ts';

import readme from './readme.md?raw';
import { assetsTemplate } from './seat-reservation-assets.ts';

import './seat-reservation-graphic.component.ts';

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

const defaultArgTypes: ArgTypes = {
  name: name,
  stretch,
};

const defaultArgs: Args = {
  name: 'BISTRO',
  stretch: false,
  style: '--sbb-seat-reservation-graphic-width: 32;--sbb-seat-reservation-graphic-height: 32;',
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
  args: { ...defaultArgs, name: 'PRAM_AREA' },
};

export const StairAreaWidth32Height32Rotation315: StoryObj = {
  render: Template,
  args: {
    ...defaultArgs,
    name: 'STAIR_AREA',
    style:
      '--sbb-seat-reservation-graphic-width: 32;--sbb-seat-reservation-graphic-height: 32;--sbb-seat-reservation-graphic-rotation: 315',
  },
};

export const coachBorderMiddleWidth20Height128Stretch: StoryObj = {
  render: Template,
  args: {
    ...defaultArgs,
    name: 'COACH_BORDER_MIDDLE',
    stretch: true,
    style: '--sbb-seat-reservation-graphic-width: 20;--sbb-seat-reservation-graphic-height: 128;',
  },
};

export const availableAssets: StoryObj = {
  render: () => assetsTemplate,
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-graphic',
};

export default meta;
