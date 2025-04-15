import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import { mapRawDataToSeatReservation } from '../common.js';

import readme from './readme.md?raw';
import { SbbSeatReservationElement } from './seat-reservation.js';

const seatReservationType: InputType = {
  control: { type: 'object' },
  table: {
    disable: false,
  },
  description: 'Seat reservation Object',
};

const maxReservationType: InputType = {
  control: { type: 'number' },
  description: 'Maximal number of possible clickable seats',
};

const navigationType: InputType = {
  control: { type: 'boolean' },
  description: 'Controls the seat reservation navigation to show or hide',
};

const alignVerticalType: InputType = {
  control: { type: 'boolean' },
  description:
    'Controls the visual represention of seat reservation in a horizonal or vertical alignment',
};

const disabledType: InputType = {
  control: { type: 'boolean' },
  description: 'Any click functionality is prevented',
};

const heightType: InputType = {
  control: { type: 'number' },
  description: 'Can be used to display the seat reservation schema in a defined size.',
};

const baseGridSizeType: InputType = {
  control: { type: 'number' },
  description:
    'Specifies the size of a single cell to be used when calculating positions and dimensions of all elements.',
};

const defaultArgTypes: ArgTypes = {
  seatReservation: seatReservationType,
  'max-reservations': maxReservationType,
  'has-navigation': navigationType,
  'align-vertical': alignVerticalType,
  'base-grid-size': baseGridSizeType,
  height: heightType,
  disable: disabledType,
};

const mappedSeatReservationTrainh = mapRawDataToSeatReservation('TRAIN');
const defaultArgs: Args = {
  seatReservation: mappedSeatReservationTrainh,
  'max-reservations': 4,
  'has-navigation': true,
  'align-vertical': false,
  'base-grid-size': 16,
  height: null,
  disable: false,
};

const Template = ({ seatReservation, ...args }: Args): TemplateResult =>
  html`<sbb-seat-reservation
    .seatReservation=${seatReservation}
    ${sbbSpread(args)}
  ></sbb-seat-reservation>`;

export const Train: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

const mappedSeatReservationBus = mapRawDataToSeatReservation('BUS');
const busArgs: Args = {
  seatReservation: mappedSeatReservationBus,
  'has-navigation': true,
  'max-reservations': 4,
  'align-vertical': false,
  disable: false,
};

export const Bus: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: busArgs,
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [SbbSeatReservationElement.events.selectedPlaces],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation',
};

export default meta;
