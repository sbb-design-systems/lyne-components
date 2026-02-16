import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import { SbbSeatReservationPlaceControlElement } from './seat-reservation-place-control.component.ts';

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['SEAT', 'BICYCLE'],
};

const state: InputType = {
  control: {
    type: 'select',
  },
  options: ['FREE', 'SELECTED', 'RESTRICTED', 'ALLOCATED'],
};

const text: InputType = {
  control: {
    type: undefined,
  },
};

const defaultArgTypes: ArgTypes = {
  type,
  state,
  text,
};

const defaultArgs: Args = {
  type: 'SEAT',
  state: 'FREE',
  text: '',
  style:
    '--sbb-seat-reservation-place-control-text-scale-value: 32;--sbb-seat-reservation-place-control-width: 32;--sbb-seat-reservation-place-control-height: 32;--sbb-seat-reservation-place-control-rotation: 0; --sbb-seat-reservation-place-control-text-rotation: 0;',
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-seat-reservation-place-control
    ${sbbSpread(args)}
  ></sbb-seat-reservation-place-control>`;

export const DEFAULT: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const placeSeatFree: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'SEAT', state: 'FREE' },
};

export const placeSeatFreeRotation90TextRotationMinus90: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    text: '123',
    type: 'SEAT',
    state: 'FREE',
    style: defaultArgs.style.concat(
      '--sbb-seat-reservation-place-control-rotation: 90; --sbb-seat-reservation-place-control-text-rotation:-90',
    ),
  },
};

export const placeSeatSelected: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'SEAT', state: 'SELECTED' },
};

export const placeSeatRestricted: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'SEAT', state: 'RESTRICTED' },
};

export const placeSeatAllocated: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'SEAT', state: 'ALLOCATED' },
};

export const placeBicycleAvailable: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'BICYCLE', state: 'FREE' },
};

export const placeBicycleSelected: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'BICYCLE', state: 'SELECTED' },
};

export const placeBicycleRestricted: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'BICYCLE', state: 'RESTRICTED' },
};

export const placeBicycleAllocated: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: '123', type: 'BICYCLE', state: 'ALLOCATED' },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [SbbSeatReservationPlaceControlElement.events.selectplace],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-place-control',
};

export default meta;
