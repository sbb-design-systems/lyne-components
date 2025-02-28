import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import { MOCK_SEAT_RESERVATION_LAYOUT_0 } from '../seat-reservation-sample-data.js';

import readme from './readme.md?raw';

import './seat-reservation.js';

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

const alignVerticalType: InputType = {
  control: { type: 'boolean' },
  description:
    'Controls the visual represention of seat reservation in a horizonal or vertical alignment',
};

const disabledType: InputType = {
  control: { type: 'boolean' },
  description: 'Any click functionality is prevented',
};

const defaultArgTypes: ArgTypes = {
  seatReservation: seatReservationType,
  'max-reservations': maxReservationType,
  'align-vertical': alignVerticalType,
  disable: disabledType,
};

const defaultArgs: Args = {
  seatReservation: MOCK_SEAT_RESERVATION_LAYOUT_0,
  'max-reservations': 4,
  'align-vertical': false,
  disable: false,
};

const Template = ({ seatReservation, ...args }: Args): TemplateResult =>
  html`<sbb-seat-reservation
    .seatReservation=${seatReservation}
    ${sbbSpread(args)}
  ></sbb-seat-reservation>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: defaultArgs,
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
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation',
};

export default meta;
