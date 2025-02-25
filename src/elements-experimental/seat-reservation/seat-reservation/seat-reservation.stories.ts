import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import type { SeatReservationLayout } from '../seat-reservation.js';

import readme from './readme.md?raw';
import { assetsTemplate } from './seat-reservation-assets.js';

import './seat-reservation.js';

const seatReservationLayoutSample: SeatReservationLayout = {
  coachItems: [
    {
      id: 'coach-layout-0',
      number: '1',
      dimension: {
        w: 64,
        h: 10,
      },
      places: [
        {
          number: '1',
          propertyIds: ['WINDOW'],
          state: 'FREE',
          remarkId: 'Hint for seat',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 10,
            y: 0,
            z: 0,
          },
        },
      ],
      internals: [
        {
          icon: 'LUGGAGE_AREA',
          dimension: {
            w: 2,
            h: 4,
          },
          position: {
            x: 36,
            y: 0,
            z: 0,
          },
        },
      ],
      directedInternals: [
        {
          icon: 'DRIVER_AREA',
          dimension: {
            w: 13,
            h: 8,
          },
          position: {
            x: 0,
            y: 1,
            z: 0,
          },
        },
      ],
      compartmentNumbers: [
        {
          number: '2',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 10,
            y: 4,
            z: 0,
          },
        },
      ],
    },
  ],
};

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
  'seat-reservation-layout': seatReservationLayoutType,
  'max-reservations': maxReservationType,
  'align-vertical': alignVerticalType,
  disable: disabledType,
};

const defaultArgs: Args = {
  'seat-reservation-layout': seatReservationLayoutSample,
  'max-reservations': 4,
  'align-vertical': false,
  disable: false,
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-seat-reservation ${sbbSpread(args)}></sbb-seat-reservation>`;

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
