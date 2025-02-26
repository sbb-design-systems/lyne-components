import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import { MOCK_SEAT_RESERVATION_LAYOUT_0 } from '../seat-reservation-sample-data.js';

import readme from './readme.md?raw';
import { assetsTemplate } from './seat-reservation-assets.js';

import './seat-reservation.js';

const seatReservationLayoutType: InputType = {
  control: { type: 'object' },
  table: {
    disable: false,
  },
  description: 'Seat reservation layout Object',
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
  layout: seatReservationLayoutType,
  'max-reservations': maxReservationType,
  'align-vertical': alignVerticalType,
  disable: disabledType,
};

const defaultArgs: Args = {
  layout: MOCK_SEAT_RESERVATION_LAYOUT_0,
  'max-reservations': 4,
  'align-vertical': false,
  disable: false,
};

const Template = ({ layout, ...args }: Args): TemplateResult =>
  html`<sbb-seat-reservation
    layout=${JSON.stringify(layout)}
    ${sbbSpread(args)}
  ></sbb-seat-reservation>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const Assets: StoryObj = {
  render: () => assetsTemplate,
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      //handles: [SbbSeatReservationElement.events.myEventName],
      handles: [],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation',
};

export default meta;
